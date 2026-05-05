import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Car, Settings, Trash2, ArrowRight } from "lucide-react"
import { DeleteVehicleButton } from "@/components/vehicles/delete-vehicle-button"

export default async function VehiclesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader profile={profile} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Vehicles</h1>
            <p className="text-muted-foreground">Manage your connected vehicles</p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/vehicles/add">
              <Plus className="w-4 h-4 mr-2" />
              Add Vehicle
            </Link>
          </Button>
        </div>

        {!vehicles || vehicles.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="py-16">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="p-6 rounded-full bg-primary/10 mb-6">
                  <Car className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">No Vehicles Yet</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Add your first vehicle to start monitoring performance and receive AI-powered insights.
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/vehicles/add">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Vehicle
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="border-border bg-card hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Car className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {vehicle.nickname || `${vehicle.make} ${vehicle.model}`}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Engine</span>
                      <span className="text-foreground">{vehicle.engine_type || "Not specified"}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">VIN</span>
                      <span className="text-foreground font-mono text-xs">
                        {vehicle.vin ? `${vehicle.vin.slice(0, 8)}...` : "Not specified"}
                      </span>
                    </div>
                    <div className="pt-4 flex items-center gap-2">
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <Link href={`/vehicles/${vehicle.id}`}>
                          <Settings className="w-4 h-4 mr-2" />
                          Edit
                        </Link>
                      </Button>
                      <Button asChild size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                        <Link href={`/dashboard?vehicle=${vehicle.id}`}>
                          View
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <DeleteVehicleButton vehicleId={vehicle.id} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
