/**
 * Risk Model - Computes knock risk and overall safety score
 * Uses logistic function to model probability of issues
 */

/**
 * Computes knock risk based on temperature and boost
 * Returns value between 0 (no risk) and 1 (high risk)
 */
export function computeKnockRisk(temperature: number, boost: number): number {
  // Logistic function: 1 / (1 + e^(-x))
  // Where x = 0.03 * temp + 0.8 * boost - 5
  // This creates a sigmoid curve that increases risk with temp and boost
  const x = 0.03 * temperature + 0.8 * boost - 5
  return 1 / (1 + Math.exp(-x))
}

/**
 * Computes thermal stress risk
 */
export function computeThermalRisk(
  temperature: number,
  boost: number,
  rpm: number
): number {
  // Higher RPM + boost + temp = more thermal stress
  const tempFactor = Math.max(0, (temperature - 80) / 40) // 0-1 scale
  const boostFactor = boost / 2 // Normalize to ~0-1
  const rpmFactor = rpm / 7000 // Normalize to ~0-1
  
  const thermalLoad = (tempFactor * 0.4 + boostFactor * 0.3 + rpmFactor * 0.3)
  return Math.min(1, thermalLoad)
}

/**
 * Computes AFR risk (lean/rich conditions)
 */
export function computeAFRRisk(afr: number): number {
  // Optimal stoich is 14.7
  // Risk increases as we deviate
  const deviation = Math.abs(afr - 14.7)
  
  if (deviation <= 0.5) return 0
  if (deviation <= 1.0) return 0.2
  if (deviation <= 2.0) return 0.4
  if (deviation <= 3.0) return 0.6
  return 0.8
}

/**
 * Computes overall risk score
 */
export function computeOverallRisk(
  temperature: number,
  boost: number,
  rpm: number,
  afr: number = 14.7
): {
  overall: number
  knockRisk: number
  thermalRisk: number
  afrRisk: number
} {
  const knockRisk = computeKnockRisk(temperature, boost)
  const thermalRisk = computeThermalRisk(temperature, boost, rpm)
  const afrRisk = computeAFRRisk(afr)
  
  // Weighted combination - knock is most dangerous
  const overall = knockRisk * 0.5 + thermalRisk * 0.3 + afrRisk * 0.2
  
  return {
    overall: Number(overall.toFixed(3)),
    knockRisk: Number(knockRisk.toFixed(3)),
    thermalRisk: Number(thermalRisk.toFixed(3)),
    afrRisk: Number(afrRisk.toFixed(3)),
  }
}
