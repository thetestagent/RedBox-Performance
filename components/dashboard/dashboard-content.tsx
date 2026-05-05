"use client"

import Link from "next/link"
import { RadialGauge } from "./radial-gauge"
import { HealthScore } from "./health-score"
import { MetricCard } from "./metric-card"
import { TelemetryChart } from "./telemetry-chart"
import { AlertsList } from "./alerts-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Thermometer,
  Gauge,
  Zap,
  Droplets,
  Battery,
  Wind,
  Plus,
  Car,
  Activity,
} from "lucide-react"
import type { Vehicle, Telemetry, Alert } from "@/lib/types/database"

interface DashboardContentProps {
  vehicles: Vehicle[]
  selectedVehicle: Vehicle | null
  telemetry: Telemetry[]
  alerts: Alert[]
}

export function DashboardContent({
  vehicles,
  selectedVehicle,
  telemetry,
  alerts,
}: DashboardContentProps) {
  // Calculate current values from latest telemetry
  const latestTelemetry = telemetry[telemetry.length - 1]
  const currentRPM = latestTelemetry?.rpm || 0
  const currentTemp = latestTelemetry?.coolant_temp || 0
  const currentBoost = latestTelemetry?.boost_pressure || 0
  const currentSpeed = latestTelemetry?.speed || 0
  const currentThrottle = latestTelemetry?.throttle_position || 0
  const currentAFR = latestTelemetry?.afr || 14.7
  const currentBattery = latestTelemetry?.battery_voltage || 12.6
  const currentFuel = latestTelemetry?.fuel_level || 0

  // Calculate health score from telemetry
  const calculateHealthScore = () => {
    if (!telemetry.length) return { score: 0, status: "poor" as const }
    
    const avgTemp = telemetry.reduce((sum, t) => sum + t.coolant_temp, 0) / telemetry.length
    const avgRPM = telemetry.reduce((sum, t) => sum + t.rpm, 0) / telemetry.length
    
    let score = 100
    if (avgTemp > 100) score -= 20
    if (avgTemp > 110) score -= 20
    if (avgRPM > 4500) score -= 10
    if (avgRPM > 5500) score -= 15
    
    score = Math.max(0, Math.min(100, score))
    
    let status: "excellent" | "good" | "fair" | "poor" | "critical"
    if (score >= 90) status = "excellent"
    else if (score >= 75) status = "good"
    else if (score >= 50) status = "fair"
    else if (score >= 25) status = "poor"
    else status = "critical"
    
    return { score, status }
  }

  const health = calculateHealthScore()

  // Prepare chart data
  const chartData = telemetry.slice(-20).map((t, i) => ({
    time: new Date(t.recorded_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    rpm: Math.round(t.rpm / 100), // Scale for chart
    temp: t.coolant_temp,
    boost: t.boost_pressure * 10, // Scale for chart
  }))

  if (!selectedVehicle) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="p-6 rounded-full bg-primary/10 mb-6">
            <Car className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">No Vehicles Added</h1>
          <p className="text-muted-foreground mb-6 max-w-md">
            Add your first vehicle to start monitoring performance metrics and receive AI-powered optimization recommendations.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/vehicles/add">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Vehicle
            </Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-6 space-y-6">
      {/* Vehicle Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {selectedVehicle.nickname || `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`}
          </h1>
          <p className="text-sm text-muted-foreground">
            {selectedVehicle.engine_type || "Engine type not specified"} • VIN: {selectedVehicle.vin || "Not specified"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/vehicles">
              <Car className="w-4 h-4 mr-2" />
              Switch Vehicle
            </Link>
          </Button>
          <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
            <Link href="/optimize">
              <Zap className="w-4 h-4 mr-2" />
              Optimize
            </Link>
          </Button>
        </div>
      </div>

      {/* Health Score & Live Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <HealthScore score={health.score} status={health.status} previousScore={health.score - 2} />
        
        <Card className="lg:col-span-2 border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Live Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-center gap-8 py-4">
              <RadialGauge
                value={Math.round(currentRPM)}
                max={8000}
                label="RPM"
                unit="RPM"
                warningThreshold={6000}
                criticalThreshold={7000}
                size="lg"
              />
              <RadialGauge
                value={Math.round(currentTemp)}
                max={150}
                label="Coolant"
                unit="°C"
                warningThreshold={100}
                criticalThreshold={115}
                size="lg"
              />
              <RadialGauge
                value={Number(currentBoost.toFixed(1))}
                max={2.5}
                label="Boost"
                unit="bar"
                warningThreshold={1.8}
                criticalThreshold={2.2}
                size="lg"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Speed"
          value={Math.round(currentSpeed)}
          unit="km/h"
          icon={Gauge}
        />
        <MetricCard
          label="Throttle"
          value={Math.round(currentThrottle)}
          unit="%"
          icon={Zap}
          status={currentThrottle > 90 ? "warning" : "normal"}
        />
        <MetricCard
          label="AFR"
          value={currentAFR.toFixed(1)}
          icon={Wind}
          status={currentAFR < 12 || currentAFR > 16 ? "warning" : "normal"}
        />
        <MetricCard
          label="Battery"
          value={currentBattery.toFixed(1)}
          unit="V"
          icon={Battery}
          status={currentBattery < 12 ? "warning" : "normal"}
        />
        <MetricCard
          label="Coolant Temp"
          value={Math.round(currentTemp)}
          unit="°C"
          icon={Thermometer}
          status={currentTemp > 100 ? (currentTemp > 110 ? "critical" : "warning") : "normal"}
        />
        <MetricCard
          label="Fuel Level"
          value={Math.round(currentFuel)}
          unit="%"
          icon={Droplets}
          status={currentFuel < 15 ? "warning" : "normal"}
        />
      </div>

      {/* Charts & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TelemetryChart data={chartData} title="Telemetry History" />
        </div>
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <AlertsList alerts={alerts} />
          </CardContent>
        </Card>
      </div>

      {/* Connection Status */}
      {telemetry.length === 0 && (
        <Card className="border-border bg-card">
          <CardContent className="py-8">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="p-4 rounded-full bg-yellow-500/10 mb-4">
                <Activity className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No Telemetry Data</h3>
              <p className="text-sm text-muted-foreground max-w-md mb-4">
                Connect your OBD device to start receiving live telemetry data from your vehicle.
              </p>
              <Button variant="outline" asChild>
                <Link href="/connect">Connect OBD Device</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  )
}
