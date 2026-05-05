"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Vehicle } from "@/lib/types/database"

interface VehicleFormProps {
  vehicle?: Vehicle
}

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 40 }, (_, i) => currentYear - i)

const popularMakes = [
  "Audi", "BMW", "Chevrolet", "Dodge", "Ferrari", "Ford", "Honda",
  "Hyundai", "Jaguar", "Jeep", "Kia", "Lamborghini", "Land Rover",
  "Lexus", "Maserati", "Mazda", "McLaren", "Mercedes-Benz", "Mitsubishi",
  "Nissan", "Porsche", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo",
]

const engineTypes = [
  "Naturally Aspirated",
  "Turbocharged",
  "Twin-Turbo",
  "Supercharged",
  "Hybrid",
  "Electric",
]

export function VehicleForm({ vehicle }: VehicleFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const isEditing = !!vehicle

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    make: vehicle?.make || "",
    model: vehicle?.model || "",
    year: vehicle?.year || currentYear,
    engineType: vehicle?.engine_type || "",
    vin: vehicle?.vin || "",
    nickname: vehicle?.nickname || "",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setError("You must be logged in")
      setLoading(false)
      return
    }

    const vehicleData = {
      user_id: user.id,
      make: formData.make,
      model: formData.model,
      year: formData.year,
      engine_type: formData.engineType || null,
      vin: formData.vin || null,
      nickname: formData.nickname || null,
    }

    if (isEditing) {
      const { error: updateError } = await supabase
        .from("vehicles")
        .update(vehicleData)
        .eq("id", vehicle.id)

      if (updateError) {
        setError(updateError.message)
        setLoading(false)
        return
      }
    } else {
      const { error: insertError } = await supabase
        .from("vehicles")
        .insert(vehicleData)

      if (insertError) {
        setError(insertError.message)
        setLoading(false)
        return
      }
    }

    router.push("/vehicles")
    router.refresh()
  }

  return (
    <Card className="border-border bg-card">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select
                value={formData.year.toString()}
                onValueChange={(value) => setFormData({ ...formData, year: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="make">Make</Label>
              <Select
                value={formData.make}
                onValueChange={(value) => setFormData({ ...formData, make: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select make" />
                </SelectTrigger>
                <SelectContent>
                  {popularMakes.map((make) => (
                    <SelectItem key={make} value={make}>
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              type="text"
              placeholder="e.g., M3, GTI, WRX STI"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              required
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="engineType">Engine Type</Label>
            <Select
              value={formData.engineType}
              onValueChange={(value) => setFormData({ ...formData, engineType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select engine type" />
              </SelectTrigger>
              <SelectContent>
                {engineTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vin">VIN (Optional)</Label>
            <Input
              id="vin"
              type="text"
              placeholder="Vehicle Identification Number"
              value={formData.vin}
              onChange={(e) => setFormData({ ...formData, vin: e.target.value.toUpperCase() })}
              maxLength={17}
              className="bg-background border-border font-mono"
            />
            <p className="text-xs text-muted-foreground">17-character Vehicle Identification Number</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nickname">Nickname (Optional)</Label>
            <Input
              id="nickname"
              type="text"
              placeholder="e.g., Daily Driver, Track Car"
              value={formData.nickname}
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              className="bg-background border-border"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={loading || !formData.make || !formData.model}
            >
              {loading ? "Saving..." : isEditing ? "Update Vehicle" : "Add Vehicle"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
