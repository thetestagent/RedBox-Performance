import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  // Fetch user's vehicles
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Get selected vehicle (first one or none)
  const selectedVehicle = vehicles?.[0] || null

  // Fetch alerts for selected vehicle
  let alerts: Array<{
    id: string
    vehicle_id: string
    alert_type: string
    severity: "info" | "warning" | "critical"
    message: string
    acknowledged: boolean
    created_at: string
  }> = []
  if (selectedVehicle) {
    const { data: alertsData } = await supabase
      .from("alerts")
      .select("*")
      .eq("vehicle_id", selectedVehicle.id)
      .eq("acknowledged", false)
      .order("created_at", { ascending: false })
      .limit(10)
    alerts = alertsData || []
  }

  // Fetch recent telemetry for selected vehicle
  let telemetry: Array<{
    id: string
    vehicle_id: string
    rpm: number
    coolant_temp: number
    boost_pressure: number
    throttle_position: number
    intake_temp: number | null
    afr: number | null
    timing_advance: number | null
    speed: number
    fuel_level: number | null
    battery_voltage: number | null
    recorded_at: string
  }> = []
  if (selectedVehicle) {
    const { data: telemetryData } = await supabase
      .from("telemetry")
      .select("*")
      .eq("vehicle_id", selectedVehicle.id)
      .order("recorded_at", { ascending: false })
      .limit(50)
    telemetry = (telemetryData || []).reverse()
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader profile={profile} alertCount={alerts.length} />
      <DashboardContent
        vehicles={vehicles || []}
        selectedVehicle={selectedVehicle}
        telemetry={telemetry}
        alerts={alerts}
      />
    </div>
  )
}
