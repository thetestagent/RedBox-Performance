import type { Telemetry, HealthAnalysis } from "@/lib/types/database"

/**
 * Computes vehicle health score based on telemetry data
 * Uses multiple factors: temperature, RPM patterns, boost levels, AFR
 */
export function computeHealth(telemetry: Telemetry[]): HealthAnalysis {
  if (!telemetry.length) {
    return {
      score: 0,
      factors: { temperature: 0, rpm: 0, boost: 0, afr: 0 },
      status: "poor",
      recommendations: ["Connect your OBD device to start monitoring"],
    }
  }

  // Calculate averages
  const avgTemp = telemetry.reduce((sum, t) => sum + t.coolant_temp, 0) / telemetry.length
  const avgRPM = telemetry.reduce((sum, t) => sum + t.rpm, 0) / telemetry.length
  const avgBoost = telemetry.reduce((sum, t) => sum + t.boost_pressure, 0) / telemetry.length
  const avgAFR = telemetry.filter(t => t.afr).reduce((sum, t) => sum + (t.afr || 14.7), 0) / 
    (telemetry.filter(t => t.afr).length || 1)

  // Score each factor (0-100)
  const tempScore = calculateTempScore(avgTemp)
  const rpmScore = calculateRPMScore(avgRPM)
  const boostScore = calculateBoostScore(avgBoost)
  const afrScore = calculateAFRScore(avgAFR)

  // Weighted average
  const overallScore = Math.round(
    tempScore * 0.35 +
    rpmScore * 0.25 +
    boostScore * 0.20 +
    afrScore * 0.20
  )

  // Generate recommendations
  const recommendations = generateRecommendations({
    avgTemp,
    avgRPM,
    avgBoost,
    avgAFR,
    tempScore,
    rpmScore,
    boostScore,
    afrScore,
  })

  // Determine status
  let status: HealthAnalysis["status"]
  if (overallScore >= 90) status = "excellent"
  else if (overallScore >= 75) status = "good"
  else if (overallScore >= 50) status = "fair"
  else if (overallScore >= 25) status = "poor"
  else status = "critical"

  return {
    score: overallScore,
    factors: {
      temperature: tempScore,
      rpm: rpmScore,
      boost: boostScore,
      afr: afrScore,
    },
    status,
    recommendations,
  }
}

function calculateTempScore(avgTemp: number): number {
  // Optimal range: 80-95°C
  if (avgTemp >= 80 && avgTemp <= 95) return 100
  if (avgTemp < 80) return Math.max(0, 100 - (80 - avgTemp) * 2)
  if (avgTemp <= 100) return Math.max(0, 100 - (avgTemp - 95) * 10)
  if (avgTemp <= 110) return Math.max(0, 50 - (avgTemp - 100) * 5)
  return 0
}

function calculateRPMScore(avgRPM: number): number {
  // Optimal cruising: 1500-3500 RPM
  if (avgRPM >= 1500 && avgRPM <= 3500) return 100
  if (avgRPM < 1500) return Math.max(70, 100 - (1500 - avgRPM) * 0.02)
  if (avgRPM <= 5000) return Math.max(50, 100 - (avgRPM - 3500) * 0.03)
  if (avgRPM <= 6500) return Math.max(20, 50 - (avgRPM - 5000) * 0.02)
  return 10
}

function calculateBoostScore(avgBoost: number): number {
  // Optimal: 0.8-1.2 bar for typical turbo
  if (avgBoost >= 0.8 && avgBoost <= 1.2) return 100
  if (avgBoost < 0.8) return Math.max(60, 100 - (0.8 - avgBoost) * 50)
  if (avgBoost <= 1.5) return Math.max(70, 100 - (avgBoost - 1.2) * 100)
  if (avgBoost <= 2.0) return Math.max(40, 70 - (avgBoost - 1.5) * 60)
  return 20
}

function calculateAFRScore(avgAFR: number): number {
  // Optimal stoichiometric: 14.7, safe range: 12-16
  if (avgAFR >= 13.5 && avgAFR <= 15.0) return 100
  if (avgAFR >= 12.5 && avgAFR < 13.5) return 80
  if (avgAFR > 15.0 && avgAFR <= 16.0) return 80
  if (avgAFR >= 11.5 && avgAFR < 12.5) return 60
  if (avgAFR > 16.0 && avgAFR <= 17.0) return 60
  return 30
}

interface FactorData {
  avgTemp: number
  avgRPM: number
  avgBoost: number
  avgAFR: number
  tempScore: number
  rpmScore: number
  boostScore: number
  afrScore: number
}

function generateRecommendations(data: FactorData): string[] {
  const recommendations: string[] = []

  // Temperature recommendations
  if (data.tempScore < 70) {
    if (data.avgTemp > 100) {
      recommendations.push("Coolant temperature is running high. Check cooling system, thermostat, and coolant levels.")
    } else if (data.avgTemp < 80) {
      recommendations.push("Engine running cool. Thermostat may be stuck open or extended cold weather operation.")
    }
  }

  // RPM recommendations
  if (data.rpmScore < 70) {
    if (data.avgRPM > 5000) {
      recommendations.push("High average RPM detected. Consider upshifting earlier for better engine longevity.")
    }
  }

  // Boost recommendations
  if (data.boostScore < 70) {
    if (data.avgBoost > 1.5) {
      recommendations.push("High boost levels detected. Ensure intake temperatures are monitored.")
    } else if (data.avgBoost < 0.5) {
      recommendations.push("Low boost pressure. Check for boost leaks or turbo issues.")
    }
  }

  // AFR recommendations
  if (data.afrScore < 70) {
    if (data.avgAFR < 12) {
      recommendations.push("Running rich. Check fuel system and MAF sensor.")
    } else if (data.avgAFR > 16) {
      recommendations.push("Running lean. This can cause engine damage. Check for vacuum leaks.")
    }
  }

  if (recommendations.length === 0) {
    recommendations.push("All parameters within optimal range. Keep up the good driving habits!")
  }

  return recommendations
}
