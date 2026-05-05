import type { SimulationResult } from "@/lib/types/database"

/**
 * Simulation Engine - Predicts outcomes of optimization changes
 */

interface SimulationInput {
  currentBoost: number
  newBoost: number
  currentRPM: number
  currentTemp: number
  baseHP?: number
}

/**
 * Simulates the effect of boost changes on power and thermal load
 */
export function simulateOptimization(input: SimulationInput): SimulationResult {
  const { currentBoost, newBoost, currentRPM, currentTemp, baseHP = 200 } = input

  // Calculate boost ratio
  const boostRatio = newBoost / Math.max(currentBoost, 0.5)

  // Power gain estimation
  // Approximate: each 10% boost increase = 8% power increase
  const powerGainPercent = (boostRatio - 1) * 80
  const estimatedHP = baseHP * (1 + powerGainPercent / 100)

  // Thermal load calculation
  // Factors: boost increase, RPM, current temp
  const boostThermalFactor = Math.max(0, boostRatio - 1) * 2
  const rpmThermalFactor = currentRPM / 6000
  const tempThermalFactor = Math.max(0, (currentTemp - 80) / 40)
  
  const thermalLoad = (
    boostThermalFactor * 0.5 +
    rpmThermalFactor * 0.3 +
    tempThermalFactor * 0.2
  )

  return {
    powerGain: Number(powerGainPercent.toFixed(1)),
    thermalLoad: Number(thermalLoad.toFixed(2)),
    estimatedHP: Math.round(estimatedHP),
  }
}

/**
 * Simulates timing changes effect
 */
export function simulateTimingChange(
  timingAdvance: number,
  currentRPM: number
): { powerGain: number; knockRiskIncrease: number } {
  // Each degree of timing advance ≈ 1% power at optimal conditions
  // But risk increases exponentially
  const powerGain = timingAdvance * 0.8 // Conservative estimate
  const knockRiskIncrease = Math.pow(timingAdvance, 1.5) / 10

  return {
    powerGain: Number(powerGain.toFixed(1)),
    knockRiskIncrease: Number(knockRiskIncrease.toFixed(3)),
  }
}

/**
 * Runs full simulation with multiple scenarios
 */
export function runFullSimulation(input: SimulationInput): {
  conservative: SimulationResult
  moderate: SimulationResult
  aggressive: SimulationResult
  recommended: "conservative" | "moderate" | "aggressive"
} {
  const boostDelta = input.newBoost - input.currentBoost

  const conservative = simulateOptimization({
    ...input,
    newBoost: input.currentBoost + boostDelta * 0.5,
  })

  const moderate = simulateOptimization(input)

  const aggressive = simulateOptimization({
    ...input,
    newBoost: input.currentBoost + boostDelta * 1.5,
  })

  // Recommend based on thermal load
  let recommended: "conservative" | "moderate" | "aggressive" = "moderate"
  if (moderate.thermalLoad > 1.2) {
    recommended = "conservative"
  } else if (moderate.thermalLoad < 0.8 && input.currentTemp < 90) {
    recommended = "aggressive"
  }

  return {
    conservative,
    moderate,
    aggressive,
    recommended,
  }
}
