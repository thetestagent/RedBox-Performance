"use client"

import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import type { Vehicle, Telemetry, OptimizationResult } from "@/lib/types/database"

interface DiagnosticReportData {
  vehicle: Vehicle
  telemetry: Telemetry[]
  optimization?: OptimizationResult
  healthScore: number
  generatedAt: Date
}

// Convert image to base64
async function getBase64FromUrl(url: string): Promise<string> {
  const response = await fetch(url)
  const blob = await response.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export async function generateDiagnosticReport(data: DiagnosticReportData): Promise<void> {
  const { vehicle, telemetry, optimization, healthScore, generatedAt } = data
  const pdf = new jsPDF()

  // Colors
  const primaryRed = [220, 38, 38] as [number, number, number]
  const darkBg = [26, 26, 46] as [number, number, number]
  const textWhite = [255, 255, 255] as [number, number, number]
  const textGray = [156, 163, 175] as [number, number, number]

  // Try to load logo
  let logoBase64: string | null = null
  try {
    logoBase64 = await getBase64FromUrl("/images/redbox-badge.jpeg")
  } catch {
    console.log("Could not load logo for PDF")
  }

  // Header background
  pdf.setFillColor(...darkBg)
  pdf.rect(0, 0, 210, 50, "F")

  // Logo and title
  if (logoBase64) {
    pdf.addImage(logoBase64, "JPEG", 15, 10, 30, 30)
  }
  
  pdf.setTextColor(...textWhite)
  pdf.setFontSize(24)
  pdf.setFont("helvetica", "bold")
  pdf.text("DIAGNOSTIC REPORT", 55, 25)
  
  pdf.setFontSize(10)
  pdf.setFont("helvetica", "normal")
  pdf.setTextColor(...textGray)
  pdf.text("RedBox Performance AI - Vehicle Intelligence Platform", 55, 35)

  // Report info bar
  pdf.setFillColor(...primaryRed)
  pdf.rect(0, 50, 210, 8, "F")
  pdf.setTextColor(...textWhite)
  pdf.setFontSize(9)
  pdf.text(`Generated: ${generatedAt.toLocaleString()}`, 15, 55.5)
  pdf.text(`Report ID: RB-${Date.now().toString(36).toUpperCase()}`, 140, 55.5)

  // Vehicle Information Section
  let yPos = 70

  pdf.setTextColor(0, 0, 0)
  pdf.setFontSize(14)
  pdf.setFont("helvetica", "bold")
  pdf.text("VEHICLE INFORMATION", 15, yPos)
  
  pdf.setDrawColor(...primaryRed)
  pdf.setLineWidth(0.5)
  pdf.line(15, yPos + 2, 60, yPos + 2)

  yPos += 12
  pdf.setFontSize(10)
  pdf.setFont("helvetica", "normal")
  
  const vehicleInfo = [
    ["Make & Model", `${vehicle.make} ${vehicle.model}`],
    ["Year", vehicle.year.toString()],
    ["VIN", vehicle.vin || "Not provided"],
    ["Engine Type", vehicle.engine_type || "Not specified"],
    ["Nickname", vehicle.nickname || "-"],
  ]

  vehicleInfo.forEach(([label, value]) => {
    pdf.setTextColor(...textGray)
    pdf.text(label + ":", 15, yPos)
    pdf.setTextColor(0, 0, 0)
    pdf.text(value, 60, yPos)
    yPos += 7
  })

  // Health Score Section with visual gauge
  yPos += 10
  pdf.setFontSize(14)
  pdf.setFont("helvetica", "bold")
  pdf.setTextColor(0, 0, 0)
  pdf.text("ENGINE HEALTH ASSESSMENT", 15, yPos)
  pdf.setDrawColor(...primaryRed)
  pdf.line(15, yPos + 2, 75, yPos + 2)

  yPos += 15

  // Health score circle
  const centerX = 45
  const centerY = yPos + 20
  const radius = 18

  // Background circle
  pdf.setFillColor(240, 240, 240)
  pdf.circle(centerX, centerY, radius, "F")

  // Score text
  const scoreColor = healthScore >= 80 ? [34, 197, 94] : healthScore >= 60 ? [234, 179, 8] : [239, 68, 68]
  pdf.setFillColor(...(scoreColor as [number, number, number]))
  pdf.circle(centerX, centerY, radius - 3, "F")
  
  pdf.setTextColor(...textWhite)
  pdf.setFontSize(20)
  pdf.setFont("helvetica", "bold")
  pdf.text(healthScore.toString(), centerX - (healthScore >= 100 ? 10 : healthScore >= 10 ? 7 : 4), centerY + 3)
  pdf.setFontSize(8)
  pdf.text("/100", centerX + 8, centerY + 3)

  // Health status text
  pdf.setTextColor(0, 0, 0)
  pdf.setFontSize(12)
  pdf.setFont("helvetica", "bold")
  const healthStatus = healthScore >= 80 ? "EXCELLENT" : healthScore >= 60 ? "GOOD" : healthScore >= 40 ? "FAIR" : "NEEDS ATTENTION"
  pdf.text(healthStatus, 75, centerY - 5)
  
  pdf.setFontSize(9)
  pdf.setFont("helvetica", "normal")
  pdf.setTextColor(...textGray)
  const healthDesc = healthScore >= 80 
    ? "Your engine is performing optimally with all parameters within ideal ranges."
    : healthScore >= 60 
    ? "Engine performance is good with minor optimization opportunities."
    : healthScore >= 40
    ? "Some parameters are outside optimal range. Review recommendations."
    : "Multiple parameters require attention. Professional inspection recommended."
  
  const splitDesc = pdf.splitTextToSize(healthDesc, 100)
  pdf.text(splitDesc, 75, centerY + 2)

  yPos = centerY + 35

  // Telemetry Summary Table
  if (telemetry.length > 0) {
    yPos += 10
    pdf.setFontSize(14)
    pdf.setFont("helvetica", "bold")
    pdf.setTextColor(0, 0, 0)
    pdf.text("TELEMETRY SUMMARY", 15, yPos)
    pdf.setDrawColor(...primaryRed)
    pdf.line(15, yPos + 2, 60, yPos + 2)

    yPos += 8

    // Calculate averages
    const avgRpm = telemetry.reduce((a, b) => a + b.rpm, 0) / telemetry.length
    const avgTemp = telemetry.reduce((a, b) => a + b.coolant_temp, 0) / telemetry.length
    const avgBoost = telemetry.reduce((a, b) => a + (b.boost_pressure || 0), 0) / telemetry.length
    const maxRpm = Math.max(...telemetry.map(t => t.rpm))
    const maxTemp = Math.max(...telemetry.map(t => t.coolant_temp))

    autoTable(pdf, {
      startY: yPos,
      head: [["Parameter", "Average", "Maximum", "Status"]],
      body: [
        ["RPM", avgRpm.toFixed(0), maxRpm.toFixed(0), maxRpm > 6000 ? "High" : "Normal"],
        ["Coolant Temp (C)", avgTemp.toFixed(1), maxTemp.toFixed(1), maxTemp > 100 ? "Warning" : "Normal"],
        ["Boost Pressure", avgBoost.toFixed(2), Math.max(...telemetry.map(t => t.boost_pressure || 0)).toFixed(2), "Normal"],
        ["Data Points", telemetry.length.toString(), "-", "-"],
      ],
      theme: "striped",
      headStyles: { fillColor: primaryRed, textColor: textWhite },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 15 },
    })

    yPos = (pdf as any).lastAutoTable.finalY + 15
  }

  // Optimization Results
  if (optimization) {
    if (yPos > 220) {
      pdf.addPage()
      yPos = 20
    }

    pdf.setFontSize(14)
    pdf.setFont("helvetica", "bold")
    pdf.setTextColor(0, 0, 0)
    pdf.text("AI OPTIMIZATION ANALYSIS", 15, yPos)
    pdf.setDrawColor(...primaryRed)
    pdf.line(15, yPos + 2, 70, yPos + 2)

    yPos += 10

    // Status badge
    const statusColor = optimization.approved ? [34, 197, 94] : [239, 68, 68]
    pdf.setFillColor(...(statusColor as [number, number, number]))
    pdf.roundedRect(15, yPos, 40, 8, 2, 2, "F")
    pdf.setTextColor(...textWhite)
    pdf.setFontSize(9)
    pdf.setFont("helvetica", "bold")
    pdf.text(optimization.approved ? "APPROVED" : "REJECTED", 22, yPos + 5.5)

    yPos += 15

    autoTable(pdf, {
      startY: yPos,
      head: [["Metric", "Value", "Assessment"]],
      body: [
        ["Risk Score", `${(optimization.risk_score * 100).toFixed(1)}%`, optimization.risk_score < 0.3 ? "Low Risk" : "Elevated"],
        ["Power Gain", `+${optimization.power_gain?.toFixed(1) || 0}%`, optimization.power_gain && optimization.power_gain > 0 ? "Improvement" : "Neutral"],
        ["Thermal Load", optimization.thermal_load?.toFixed(2) || "N/A", optimization.thermal_load && optimization.thermal_load < 1.5 ? "Safe" : "Monitor"],
        ["Confidence", `${((optimization.confidence || 0) * 100).toFixed(0)}%`, optimization.confidence && optimization.confidence > 0.7 ? "High" : "Moderate"],
      ],
      theme: "striped",
      headStyles: { fillColor: primaryRed, textColor: textWhite },
      margin: { left: 15 },
    })

    yPos = (pdf as any).lastAutoTable.finalY + 10

    // Reason
    pdf.setFontSize(10)
    pdf.setFont("helvetica", "bold")
    pdf.setTextColor(0, 0, 0)
    pdf.text("Analysis Result:", 15, yPos)
    yPos += 6
    pdf.setFont("helvetica", "normal")
    pdf.setTextColor(...textGray)
    const reasonText = pdf.splitTextToSize(optimization.reason || "No additional notes.", 180)
    pdf.text(reasonText, 15, yPos)
  }

  // Footer on last page
  const pageCount = pdf.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i)
    
    // Footer line
    pdf.setDrawColor(...primaryRed)
    pdf.setLineWidth(0.5)
    pdf.line(15, 280, 195, 280)
    
    // Footer text
    pdf.setFontSize(8)
    pdf.setTextColor(...textGray)
    pdf.text("RedBox Performance AI - Precision Tuning Meets Intelligent Safety", 15, 286)
    pdf.text(`Page ${i} of ${pageCount}`, 180, 286)
    
    // Badge watermark
    if (logoBase64) {
      pdf.setGState(new (pdf as any).GState({ opacity: 0.1 }))
      pdf.addImage(logoBase64, "JPEG", 155, 240, 40, 40)
      pdf.setGState(new (pdf as any).GState({ opacity: 1 }))
    }
  }

  // Save the PDF
  const fileName = `RedBox_Diagnostic_${vehicle.make}_${vehicle.model}_${new Date().toISOString().split("T")[0]}.pdf`
  pdf.save(fileName)
}
