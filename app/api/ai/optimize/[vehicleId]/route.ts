import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { computeHealth } from "@/lib/ai/health"
import { generateOptimizationCandidate, estimatePowerGain } from "@/lib/ai/optimizer"
import { computeOverallRisk } from "@/lib/ai/risk"
import { simulateOptimization } from "@/lib/ai/simulation"
import { validateOptimization } from "@/lib/ai/validator"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ vehicleId: string }> }
) {
  try {
    const { vehicleId } = await params
    const supabase = await createClient()

    // Verify authentication
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify vehicle ownership
    const { data: vehicle } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", vehicleId)
      .single()

    if (!vehicle || vehicle.user_id !== user.id) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 })
    }

    // Get recent telemetry
    const { data: telemetry } = await supabase
      .from("telemetry")
      .select("*")
      .eq("vehicle_id", vehicleId)
      .order("recorded_at", { ascending: false })
      .limit(100)

    if (!telemetry || telemetry.length < 10) {
      return NextResponse.json({
        error: "Insufficient telemetry data",
        message: "At least 10 data points required for optimization analysis",
        currentDataPoints: telemetry?.length || 0,
      }, { status: 400 })
    }

    // Calculate averages from telemetry
    const avgRPM = telemetry.reduce((sum, t) => sum + t.rpm, 0) / telemetry.length
    const avgTemp = telemetry.reduce((sum, t) => sum + t.coolant_temp, 0) / telemetry.length
    const avgBoost = telemetry.reduce((sum, t) => sum + t.boost_pressure, 0) / telemetry.length
    const avgAFR = telemetry.filter(t => t.afr).reduce((sum, t) => sum + (t.afr || 14.7), 0) /
      (telemetry.filter(t => t.afr).length || 1)

    // Step 1: Compute health
    const health = computeHealth(telemetry)

    // Step 2: Generate optimization candidate
    const candidate = generateOptimizationCandidate(telemetry, health.score)

    // Step 3: Compute risk
    const risk = computeOverallRisk(avgTemp, candidate.boost, avgRPM, avgAFR)

    // Step 4: Simulate results
    const simulation = simulateOptimization({
      currentBoost: avgBoost,
      newBoost: candidate.boost,
      currentRPM: avgRPM,
      currentTemp: avgTemp,
    })

    // Step 5: Validate safety
    const validation = validateOptimization({
      candidate,
      riskScore: risk.overall,
      thermalLoad: simulation.thermalLoad,
      healthScore: health.score,
      currentBoost: avgBoost,
      currentTemp: avgTemp,
      currentAFR: avgAFR,
    })

    // Save optimization result
    const { data: result } = await supabase
      .from("optimization_results")
      .insert({
        vehicle_id: vehicleId,
        health_score: health.score,
        risk_score: risk.overall,
        power_gain: simulation.powerGain,
        thermal_load: simulation.thermalLoad,
        boost_adjustment: candidate.boost - avgBoost,
        timing_adjustment: candidate.timing,
        fuel_adjustment: candidate.fuel,
        approved: validation.approved,
        reason: validation.reason,
        confidence: validation.confidence,
      })
      .select()
      .single()

    return NextResponse.json({
      vehicle: {
        id: vehicle.id,
        name: vehicle.nickname || `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      },
      currentState: {
        avgRPM: Math.round(avgRPM),
        avgTemp: Math.round(avgTemp),
        avgBoost: Number(avgBoost.toFixed(2)),
        avgAFR: Number(avgAFR.toFixed(1)),
      },
      health: {
        score: health.score,
        status: health.status,
        factors: health.factors,
        recommendations: health.recommendations,
      },
      optimization: {
        candidate,
        powerGain: simulation.powerGain,
        estimatedHP: simulation.estimatedHP,
        thermalLoad: simulation.thermalLoad,
      },
      risk: {
        overall: risk.overall,
        knockRisk: risk.knockRisk,
        thermalRisk: risk.thermalRisk,
        afrRisk: risk.afrRisk,
      },
      validation: {
        approved: validation.approved,
        reason: validation.reason,
        confidence: validation.confidence,
      },
      resultId: result?.id,
    })
  } catch (error) {
    console.error("Optimization error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
