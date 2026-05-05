export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Vehicle {
  id: string
  user_id: string
  vin: string | null
  make: string
  model: string
  year: number
  engine_type: string | null
  nickname: string | null
  created_at: string
  updated_at: string
}

export interface Telemetry {
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
}

export interface OptimizationResult {
  id: string
  vehicle_id: string
  health_score: number
  risk_score: number
  power_gain: number | null
  thermal_load: number | null
  boost_adjustment: number | null
  timing_adjustment: number | null
  fuel_adjustment: number | null
  approved: boolean
  reason: string | null
  confidence: number | null
  created_at: string
}

export interface Alert {
  id: string
  vehicle_id: string
  alert_type: string
  severity: 'info' | 'warning' | 'critical'
  message: string
  acknowledged: boolean
  created_at: string
}

// AI Engine Types
export interface HealthAnalysis {
  score: number
  factors: {
    temperature: number
    rpm: number
    boost: number
    afr: number
  }
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical'
  recommendations: string[]
}

export interface OptimizationCandidate {
  boost: number
  timing: number
  fuel: number
}

export interface SimulationResult {
  powerGain: number
  thermalLoad: number
  estimatedHP: number
}

export interface ValidationResult {
  approved: boolean
  reason: string
  riskScore: number
  confidence: number
}
