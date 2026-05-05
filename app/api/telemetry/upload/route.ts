import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { quickSafetyCheck } from "@/lib/ai/validator"

interface TelemetryPayload {
  vehicle_id: string
  rpm: number
  coolant_temp: number
  boost_pressure?: number
  throttle_position?: number
  intake_temp?: number
  afr?: number
  timing_advance?: number
  speed?: number
  fuel_level?: number
  battery_voltage?: number
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Verify authentication
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body: TelemetryPayload = await request.json()

    // Validate required fields
    if (!body.vehicle_id || body.rpm === undefined || body.coolant_temp === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: vehicle_id, rpm, coolant_temp" },
        { status: 400 }
      )
    }

    // Verify vehicle ownership
    const { data: vehicle } = await supabase
      .from("vehicles")
      .select("id, user_id")
      .eq("id", body.vehicle_id)
      .single()

    if (!vehicle || vehicle.user_id !== user.id) {
      return NextResponse.json({ error: "Vehicle not found or not owned" }, { status: 403 })
    }

    // Insert telemetry
    const { data: telemetry, error: telemetryError } = await supabase
      .from("telemetry")
      .insert({
        vehicle_id: body.vehicle_id,
        rpm: body.rpm,
        coolant_temp: body.coolant_temp,
        boost_pressure: body.boost_pressure || 0,
        throttle_position: body.throttle_position || 0,
        intake_temp: body.intake_temp,
        afr: body.afr,
        timing_advance: body.timing_advance,
        speed: body.speed || 0,
        fuel_level: body.fuel_level,
        battery_voltage: body.battery_voltage,
      })
      .select()
      .single()

    if (telemetryError) {
      console.error("Telemetry insert error:", telemetryError)
      return NextResponse.json({ error: "Failed to save telemetry" }, { status: 500 })
    }

    // Run quick safety check
    const safetyCheck = quickSafetyCheck(
      body.coolant_temp,
      body.boost_pressure || 0,
      body.rpm,
      body.afr
    )

    // Create alerts for any critical warnings
    if (safetyCheck.warnings.length > 0) {
      const criticalWarnings = safetyCheck.warnings.filter(w => w.startsWith("CRITICAL"))
      const regularWarnings = safetyCheck.warnings.filter(w => w.startsWith("WARNING"))

      for (const warning of criticalWarnings) {
        await supabase.from("alerts").insert({
          vehicle_id: body.vehicle_id,
          alert_type: "Safety Alert",
          severity: "critical",
          message: warning.replace("CRITICAL: ", ""),
        })
      }

      for (const warning of regularWarnings) {
        await supabase.from("alerts").insert({
          vehicle_id: body.vehicle_id,
          alert_type: "Performance Warning",
          severity: "warning",
          message: warning.replace("WARNING: ", ""),
        })
      }
    }

    return NextResponse.json({
      success: true,
      telemetry,
      safety: safetyCheck,
    })
  } catch (error) {
    console.error("Telemetry upload error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
