import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { computeHealth } from "@/lib/ai/health"

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
      .select("id, user_id")
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

    if (!telemetry || telemetry.length === 0) {
      return NextResponse.json({
        health: {
          score: 0,
          factors: { temperature: 0, rpm: 0, boost: 0, afr: 0 },
          status: "poor",
          recommendations: ["No telemetry data available. Connect your OBD device to start monitoring."],
        },
        dataPoints: 0,
      })
    }

    // Compute health analysis
    const health = computeHealth(telemetry)

    return NextResponse.json({
      health,
      dataPoints: telemetry.length,
      lastUpdated: telemetry[0].recorded_at,
    })
  } catch (error) {
    console.error("Health analysis error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
