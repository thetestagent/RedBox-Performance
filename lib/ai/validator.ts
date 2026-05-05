import type { OptimizationCandidate, ValidationResult } from "@/lib/types/database"

/**
 * Validation Engine - Ensures all optimizations are safe
 * This is the final safety gate before any recommendations are made
 */

interface ValidationInput {
  candidate: OptimizationCandidate
  riskScore: number
  thermalLoad: number
  healthScore: number
  currentBoost: number
  currentTemp: number
  currentAFR?: number
}

// Safety limits
const LIMITS = {
  MAX_BOOST_INCREASE: 0.15, // 15% max boost increase
  MAX_RISK_SCORE: 0.3, // 30% max risk
  MAX_THERMAL_LOAD: 1.5, // Thermal safety threshold
  MIN_HEALTH_SCORE: 50, // Minimum health to optimize
  MAX_TEMP: 105, // Max temperature to allow optimization
  AFR_SAFE_MIN: 11.5,
  AFR_SAFE_MAX: 16.5,
  MAX_TIMING_ADVANCE: 4, // Max degrees timing advance
}

/**
 * Validates optimization candidate against safety rules
 */
export function validateOptimization(input: ValidationInput): ValidationResult {
  const {
    candidate,
    riskScore,
    thermalLoad,
    healthScore,
    currentBoost,
    currentTemp,
    currentAFR = 14.7,
  } = input

  const errors: string[] = []
  let confidence = 1.0

  // Rule 1: Health score check
  if (healthScore < LIMITS.MIN_HEALTH_SCORE) {
    errors.push(`Engine health (${healthScore}) is below minimum threshold (${LIMITS.MIN_HEALTH_SCORE})`)
    confidence *= 0.5
  }

  // Rule 2: Risk score check
  if (riskScore > LIMITS.MAX_RISK_SCORE) {
    errors.push(`Risk score (${(riskScore * 100).toFixed(1)}%) exceeds safe limit (${LIMITS.MAX_RISK_SCORE * 100}%)`)
    confidence *= 0.6
  }

  // Rule 3: Thermal load check
  if (thermalLoad > LIMITS.MAX_THERMAL_LOAD) {
    errors.push(`Thermal load (${thermalLoad.toFixed(2)}) exceeds safe limit (${LIMITS.MAX_THERMAL_LOAD})`)
    confidence *= 0.5
  }

  // Rule 4: Temperature check
  if (currentTemp > LIMITS.MAX_TEMP) {
    errors.push(`Current temperature (${currentTemp}°C) is too high for optimization`)
    confidence *= 0.4
  }

  // Rule 5: Boost increase limit
  const boostIncreasePercent = ((candidate.boost - currentBoost) / currentBoost) * 100
  if (boostIncreasePercent > LIMITS.MAX_BOOST_INCREASE * 100) {
    errors.push(`Boost increase (${boostIncreasePercent.toFixed(1)}%) exceeds safe limit (${LIMITS.MAX_BOOST_INCREASE * 100}%)`)
    confidence *= 0.7
  }

  // Rule 6: AFR safety check
  if (currentAFR < LIMITS.AFR_SAFE_MIN || currentAFR > LIMITS.AFR_SAFE_MAX) {
    errors.push(`Current AFR (${currentAFR}) is outside safe range (${LIMITS.AFR_SAFE_MIN}-${LIMITS.AFR_SAFE_MAX})`)
    confidence *= 0.6
  }

  // Rule 7: Timing advance limit
  if (Math.abs(candidate.timing) > LIMITS.MAX_TIMING_ADVANCE) {
    errors.push(`Timing adjustment (${candidate.timing}°) exceeds safe limit (${LIMITS.MAX_TIMING_ADVANCE}°)`)
    confidence *= 0.7
  }

  // Determine approval
  const approved = errors.length === 0
  const reason = approved
    ? "All safety checks passed. Optimization is within safe parameters."
    : errors.join("; ")

  return {
    approved,
    reason,
    riskScore,
    confidence: Number((approved ? confidence : confidence * 0.5).toFixed(2)),
  }
}

/**
 * Quick safety check for real-time monitoring
 */
export function quickSafetyCheck(
  temp: number,
  boost: number,
  rpm: number,
  afr: number = 14.7
): { safe: boolean; warnings: string[] } {
  const warnings: string[] = []

  if (temp > 110) {
    warnings.push("CRITICAL: Coolant temperature dangerously high")
  } else if (temp > 100) {
    warnings.push("WARNING: Coolant temperature elevated")
  }

  if (boost > 2.0) {
    warnings.push("WARNING: Boost pressure very high")
  }

  if (rpm > 7000) {
    warnings.push("WARNING: Engine RPM near redline")
  }

  if (afr < 11) {
    warnings.push("WARNING: Running very rich")
  } else if (afr > 17) {
    warnings.push("CRITICAL: Running dangerously lean")
  }

  return {
    safe: !warnings.some(w => w.startsWith("CRITICAL")),
    warnings,
  }
}
