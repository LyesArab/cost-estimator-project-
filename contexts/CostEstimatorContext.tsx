"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { jsPDF } from "jspdf";
import { useToast } from "@/components/ui/use-toast";

export interface Expense {
  id: string;
  name: string;
  amount: number;
}

export interface Feature {
  id: string;
  name: string;
  complexity: "low" | "medium" | "high";
  hours: number;
  hourlyRate: number;
}

interface CostEstimatorContextType {
  expenses: Expense[];
  features: Feature[];
  taxRate: number;
  isAutoEntrepreneur: boolean;
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  addFeature: (feature: Feature) => void;
  removeFeature: (id: string) => void;
  setTaxRate: (rate: number) => void;
  setIsAutoEntrepreneur: (value: boolean) => void;
  totalExpenses: number;
  totalFeatureCosts: number;
  subtotal: number;
  taxAmount: number;
  casnos: number;
  totalCost: number;
  generateInvoice: (name: string) => void;
}

const CostEstimatorContext = createContext<CostEstimatorContextType | undefined>(undefined);

export function useCostEstimator() {
  const context = useContext(CostEstimatorContext);
  if (context === undefined) {
    throw new Error("useCostEstimator must be used within a CostEstimatorProvider");
  }
  return context;
}

interface CostEstimatorProviderProps {
  children: ReactNode;
}

export function CostEstimatorProvider({ children }: CostEstimatorProviderProps) {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [taxRate, setTaxRate] = useState<number>(0.20); // Default tax rate (20%)
  const [isAutoEntrepreneur, setIsAutoEntrepreneur] = useState<boolean>(false);

  const CASNOS_ANNUAL = 24000; // 24,000 DA per year
  const AUTO_ENTREPRENEUR_TAX_RATE = 0.005; // 0.5%

  // Function to add a new expense
  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  // Function to remove an expense
  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Function to add a new feature
  const addFeature = (feature: Feature) => {
    setFeatures([...features, feature]);
  };

  // Function to remove a feature
  const removeFeature = (id: string) => {
    setFeatures(features.filter(feature => feature.id !== id));
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  // Calculate total feature costs
  const totalFeatureCosts = features.reduce(
    (total, feature) => total + feature.hours * feature.hourlyRate,
    0
  );

  // Calculate total project cost before tax
  const subtotal = totalExpenses + totalFeatureCosts;

  // Calculate CASNOS (for auto-entrepreneur only)
  const casnos = isAutoEntrepreneur ? CASNOS_ANNUAL : 0;

  // Calculate tax amount
  const taxAmount = isAutoEntrepreneur 
    ? subtotal * AUTO_ENTREPRENEUR_TAX_RATE // 0.5% for auto-entrepreneur
    : subtotal * taxRate;

  // Calculate total project cost
  const totalCost = subtotal + taxAmount + casnos;

  // Function to generate PDF invoice
  const generateInvoice = (name: string) => {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(20);
    doc.text("Project Cost Estimate", 105, 20, { align: "center" });
    
    // Add invoice details
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);
    doc.text(`Name: ${name}`, 20, 50);
    
    // Add expenses section
    doc.setFontSize(16);
    doc.text("Expenses:", 20, 70);
    
    let yPosition = 80;
    expenses.forEach((expense) => {
      doc.setFontSize(12);
      doc.text(`${expense.name}: ${expense.amount.toFixed(0)} DA`, 30, yPosition);
      yPosition += 10;
    });
    
    // Add features section
    yPosition += 10;
    doc.setFontSize(16);
    doc.text("Features:", 20, yPosition);
    yPosition += 10;
    
    features.forEach((feature) => {
      doc.setFontSize(12);
      const cost = feature.hours * feature.hourlyRate;
      let complexityLabel = feature.complexity === "low" ? "Basique" : feature.complexity === "high" ? "Complexe" : "Moyenne";
      doc.text(`${feature.name} (${complexityLabel}): ${feature.hours} hrs × ${feature.hourlyRate.toFixed(0)} DA/hr = ${cost.toFixed(0)} DA`, 30, yPosition);
      yPosition += 10;
    });
    
    // Add totals
    yPosition += 10;
    doc.setFontSize(14);
    doc.text(`Subtotal: ${subtotal.toFixed(0)} DA`, 20, yPosition);
    yPosition += 10;
    
    if (isAutoEntrepreneur) {
      doc.text(`Impôt forfaitaire unique (0.5%): ${taxAmount.toFixed(0)} DA`, 20, yPosition);
      yPosition += 10;
      doc.text(`CASNOS: ${casnos.toFixed(0)} DA`, 20, yPosition);
    } else {
      doc.text(`Tax (${(taxRate * 100).toFixed(0)}%): ${taxAmount.toFixed(0)} DA`, 20, yPosition);
    }
    
    yPosition += 10;
    doc.setFontSize(16);
    doc.text(`Total: ${totalCost.toFixed(0)} DA`, 20, yPosition);
    
    // Save the PDF
    doc.save("project-cost-estimate.pdf");
    
    toast({
      title: "Invoice Generated",
      description: "Your invoice has been generated and downloaded.",
    });
  };

  const value = {
    expenses,
    features,
    taxRate,
    isAutoEntrepreneur,
    addExpense,
    removeExpense,
    addFeature,
    removeFeature,
    setTaxRate,
    setIsAutoEntrepreneur,
    totalExpenses,
    totalFeatureCosts,
    subtotal,
    taxAmount,
    casnos,
    totalCost,
    generateInvoice
  };

  return (
    <CostEstimatorContext.Provider value={value}>
      {children}
    </CostEstimatorContext.Provider>
  );
} 