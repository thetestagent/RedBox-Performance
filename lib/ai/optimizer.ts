import type { Telemetry, OptimizationCandidate } from "@/lib/types/database"

/**
 * Generates optimization candidate based on current telemetry and health
 * Scales adjustments based on engine health - healthier engines get more aggressive tuning
 */
export function generateOptimizationCandidate(
  telemetry: Telemetry[],
  healthScore: number
): OptimizationCandidate {
  if (!telemetry.length) {
    return { boost: 0, timing: 0, fuel: 0 }
  }

  // Calculate averages
  const avgBoost = telemetry.reduce((sum, t) => sum + t.boost_pressure, 0) / telemetry.length
  const avgRPM = telemetry.reduce((sum, t) => sum + t.rpm, 0) / telemetry.length
  const avgTemp = telemetry.reduce((sum, t) => sum + t.coolant_temp, 0) / telemetry.length

  // Scale factor based on health (0.5-1.0)
  const scaleFactor = Math.max(0.5, healthScore / 100)

  // Conservative optimization approach
  // Only optimize if conditions are favorable
  if (avgTemp > 100 || healthScore < 50) {
    return { boost: 0, timing: 0, fuel: 0 }
  }

  // Boost increase: max 15% based on health
  // Higher health = more aggressive boost increase
  const maxBoostIncrease = 0.15 * scaleFactor
  const currentBoostUtilization = avgBoost / 1.5 // Assume 1.5 bar as baseline max
  const boostHeadroom = 1 - currentBoostUtilization
  const boostAdjustment = Math.min(maxBoostIncrease, boostHeadroom * 0.5) * avgBoost

  // Timing advance: subtle adjustments based on conditions
  // More advance at lower RPM, less at higher RPM
  const rpmFactor = Math.max(0, 1 - (avgRPM - 2000) / 5000)
  const timingAdjustment = 2 * scaleFactor * rpmFactor // Max 2 degrees

  // Fuel adjustment: slight enrichment for safety
  const fuelAdjustment = -0.02 * scaleFactor // Negative = richer

  return {
    boost: Number((avgBoost + boostAdjustment).toFixed(3)),
    timing: Number(timingAdjustment.toFixed(2)),
    fuel: Number(fuelAdjustment.toFixed(3)),
  }
}

/**
 * Estimates power gain from optimization
 */
export function estimatePowerGain(
  currentBoost: number,
  optimizedBoost: number,
  baseHP: number = 200
): number {
  // Rough estimation: 1% boost increase ≈ 0.8% power increase
  const boostIncrease = ((optimizedBoost - currentBoost) / currentBoost) * 100
  const powerGainPercent = boostIncrease * 0.8
  return Number(powerGainPercent.toFixed(1))
}
