"use client";

import { useCostEstimator } from "@/contexts/CostEstimatorContext";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import PageNavigation from "@/components/PageNavigation";
import Link from "next/link";
import { FadeIn, ScaleIn, SlideInFromTop } from "@/components/ui/motion";

export default function TotalPage() {
  const { 
    expenses, 
    features, 
    removeExpense, 
    removeFeature, 
    taxRate, 
    subtotal, 
    taxAmount,
    casnos,
    isAutoEntrepreneur,
    totalCost,
    generateInvoice 
  } = useCostEstimator();
  
  const [name, setName] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      generateInvoice(name);
    } else {
      toast({
        title: "Nom requis",
        description: "Veuillez entrer votre nom pour générer une facture.",
        variant: "destructive"
      });
    }
  };

  return (
    <main className="container mx-auto py-8 px-4 max-w-4xl">
      <SlideInFromTop>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Calculateur de Coûts</h1>
          <div className="flex items-center justify-center mb-6">
            <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-medium">1</div>
            <div className="mx-1 h-1 w-14 bg-gray-200"></div>
            <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-medium">2</div>
            <div className="mx-1 h-1 w-14 bg-gray-200"></div>
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium shadow-sm">3</div>
          </div>
        </div>
      </SlideInFromTop>
      
      <div className="max-w-2xl mx-auto">
        <Card>
          <SlideInFromTop>
            <CardHeader className="pb-3">
              <CardTitle>Résultat final</CardTitle>
            </CardHeader>
          </SlideInFromTop>
          
          <ScaleIn>
            <CardContent className="px-6 py-4">
              {/* Expenses section */}
              {expenses.length > 0 && (
                <FadeIn>
                  <div className="mb-5">
                    <h3 className="text-base font-medium mb-3 text-gray-800">Dépenses</h3>
                    <ul className="space-y-2 max-h-40 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 p-3">
                      {expenses.map((expense) => (
                        <li key={expense.id} className="flex justify-between items-center py-1.5 px-3 text-sm rounded-lg hover:bg-gray-100 transition-colors">
                          <span className="text-gray-700">{expense.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-800">{expense.amount.toFixed(0)} DA/mois</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExpense(expense.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-600 hover:bg-gray-100"
                            >
                              ✕
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              )}

              {/* Features section */}
              {features.length > 0 && (
                <FadeIn delay={100}>
                  <div className="mb-5">
                    <h3 className="text-base font-medium mb-3 text-gray-800">Fonctionnalités</h3>
                    <ul className="space-y-2 max-h-40 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 p-3">
                      {features.map((feature) => {
                        const complexityLabel = feature.complexity === "low" ? "Basique" : feature.complexity === "high" ? "Complexe" : "Moyenne";
                        return (
                          <li key={feature.id} className="py-1.5 px-3 text-sm rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700">{feature.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-800">
                                  {(feature.hours * feature.hourlyRate).toFixed(0)} DA
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFeature(feature.id)}
                                  className="h-6 w-6 p-0 text-red-500 hover:text-red-600 hover:bg-gray-100"
                                >
                                  ✕
                                </Button>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {feature.hours}h × {complexityLabel} × {feature.hourlyRate.toFixed(0)} DA/h
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </FadeIn>
              )}

              {/* Total calculation */}
              <FadeIn delay={200}>
                <div className="py-4 border-t border-b border-gray-200 my-4">
                  <div className="flex justify-between py-1.5 text-sm">
                    <span className="text-gray-700">Sous-total</span>
                    <span className="font-medium text-gray-800">{subtotal.toFixed(0)} DA</span>
                  </div>
                  
                  {isAutoEntrepreneur ? (
                    <>
                      <div className="flex justify-between py-1.5 text-sm">
                        <span className="text-gray-700">Impôt forfaitaire unique (0.5%)</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800">{taxAmount.toFixed(0)} DA</span>
                          <Link href="/tax">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-500 hover:text-blue-600 hover:bg-gray-100">
                              ✎
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="flex justify-between py-1.5 text-sm">
                        <span className="text-gray-700">CASNOS (24 000 DA/an)</span>
                        <span className="font-medium text-gray-800">{casnos.toFixed(0)} DA</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between py-1.5 text-sm">
                      <span className="text-gray-700">Taxes ({(taxRate * 100).toFixed(1)}%)</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{taxAmount.toFixed(0)} DA</span>
                        <Link href="/tax">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-500 hover:text-blue-600 hover:bg-gray-100">
                            ✎
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between py-2 text-base font-bold mt-1 text-gray-800">
                    <span>Total</span>
                    <span>{totalCost.toFixed(0)} DA</span>
                  </div>
                </div>
              </FadeIn>

              {/* Invoice Generation */}
              <FadeIn delay={300}>
                <div className="mt-5">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="client-name" className="mb-1.5">Votre nom</Label>
                      <Input
                        id="client-name"
                        placeholder="Entrez votre nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={expenses.length === 0 && features.length === 0}
                    >
                      Générer un PDF
                    </Button>
                    
                    {expenses.length === 0 && features.length === 0 && (
                      <p className="text-sm text-center text-gray-500">
                        Ajoutez au moins une dépense ou fonctionnalité pour générer une facture
                      </p>
                    )}
                  </form>
                </div>
              </FadeIn>
            </CardContent>
          </ScaleIn>
          
          <CardFooter className="flex flex-col gap-4 p-6 pt-4 border-t">
            <PageNavigation />
            <div className="text-center w-full">
              <Link href="/">
                <Button variant="outline" className="text-sm">
                  Recommencer l'estimation
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
} 