"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Zap,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Thermometer,
  Gauge,
  Car,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Vehicle } from "@/lib/types/database"

interface OptimizationResult {
  vehicle: { id: string; name: string }
  currentState: {
    avgRPM: number
    avgTemp: number
    avgBoost: number
    avgAFR: number
  }
  health: {
    score: number
    status: string
    factors: { temperature: number; rpm: number; boost: number; afr: number }
    recommendations: string[]
  }
  optimization: {
    candidate: { boost: number; timing: number; fuel: number }
    powerGain: number
    estimatedHP: number
    thermalLoad: number
  }
  risk: {
    overall: number
    knockRisk: number
    thermalRisk: number
    afrRisk: number
  }
  validation: {
    approved: boolean
    reason: string
    confidence: number
  }
}

interface OptimizeContentProps {
  vehicles: Vehicle[]
}

export function OptimizeContent({ vehicles }: OptimizeContentProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<OptimizationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function runOptimization() {
    if (!selectedVehicle) return
    
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(`/api/ai/optimize/${selectedVehicle}`)
      const data = await response.json()

      if (!response.ok) {
        setError(data.message || data.error || "Optimization failed")
        return
      }

      setResult(data)
    } catch (err) {
      setError("Failed to run optimization analysis")
    } finally {
      setLoading(false)
    }
  }

  if (vehicles.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="p-6 rounded-full bg-primary/10 mb-6">
            <Car className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">No Vehicles Available</h1>
          <p className="text-muted-foreground mb-6 max-w-md">
            Add a vehicle first to run AI optimization analysis.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/vehicles/add">
              <Plus className="w-4 h-4 mr-2" />
              Add Vehicle
            </Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Optimization</h1>
        <p className="text-muted-foreground">Analyze and optimize your vehicle performance</p>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="w-full sm:w-64 space-y-2">
              <label className="text-sm font-medium text-foreground">Select Vehicle</label>
              <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.nickname || `${v.year} ${v.make} ${v.model}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={runOptimization}
              disabled={!selectedVehicle || loading}
              className="bg-primary hover:bg-primary/90"
            >
              <Zap className="w-4 h-4 mr-2" />
              {loading ? "Analyzing..." : "Run Optimization"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-500/50 bg-red-500/10">
          <CardContent className="py-6">
            <div className="flex items-center gap-3 text-red-500">
              <AlertTriangle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <div className="space-y-6">
          {/* Health Score & Approval Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Health Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl font-bold text-primary">{result.health.score}</div>
                  <div>
                    <div className="text-lg font-medium text-foreground capitalize">{result.health.status}</div>
                    <div className="text-sm text-muted-foreground">Health Score</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {result.health.recommendations.map((rec, i) => (
                    <p key={i} className="text-sm text-muted-foreground">• {rec}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={cn(
              "border-border",
              result.validation.approved ? "bg-green-500/5 border-green-500/50" : "bg-red-500/5 border-red-500/50"
            )}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Validation Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  {result.validation.approved ? (
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  ) : (
                    <XCircle className="w-12 h-12 text-red-500" />
                  )}
                  <div>
                    <div className={cn(
                      "text-lg font-bold",
                      result.validation.approved ? "text-green-500" : "text-red-500"
                    )}>
                      {result.validation.approved ? "Approved" : "Not Approved"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Confidence: {(result.validation.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{result.validation.reason}</p>
              </CardContent>
            </Card>
          </div>

          {/* Optimization Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Power Gain
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-500 mb-1">
                  +{result.optimization.powerGain.toFixed(1)}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Estimated {result.optimization.estimatedHP} HP
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-primary" />
                  Thermal Load
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={cn(
                  "text-4xl font-bold mb-1",
                  result.optimization.thermalLoad > 1.2 ? "text-red-500" : 
                  result.optimization.thermalLoad > 0.8 ? "text-yellow-500" : "text-green-500"
                )}>
                  {result.optimization.thermalLoad.toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {result.optimization.thermalLoad > 1.2 ? "High" : 
                   result.optimization.thermalLoad > 0.8 ? "Moderate" : "Low"} thermal stress
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-primary" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={cn(
                  "text-4xl font-bold mb-1",
                  result.risk.overall > 0.3 ? "text-red-500" : 
                  result.risk.overall > 0.15 ? "text-yellow-500" : "text-green-500"
                )}>
                  {(result.risk.overall * 100).toFixed(0)}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Overall risk score
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Metrics */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Current Vehicle State</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-secondary">
                  <div className="text-2xl font-bold text-foreground">{result.currentState.avgRPM}</div>
                  <div className="text-sm text-muted-foreground">Avg RPM</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary">
                  <div className="text-2xl font-bold text-foreground">{result.currentState.avgTemp}°C</div>
                  <div className="text-sm text-muted-foreground">Avg Temp</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary">
                  <div className="text-2xl font-bold text-foreground">{result.currentState.avgBoost} bar</div>
                  <div className="text-sm text-muted-foreground">Avg Boost</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary">
                  <div className="text-2xl font-bold text-foreground">{result.currentState.avgAFR}</div>
                  <div className="text-sm text-muted-foreground">Avg AFR</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  )
}
