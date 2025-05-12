"use client";

import { useCostEstimator } from "@/contexts/CostEstimatorContext";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import PageNavigation from "@/components/PageNavigation";
import Link from "next/link";
import { FadeIn, ScaleIn, SlideInFromTop } from "@/components/ui/motion";

export default function TaxPage() {
  const { taxRate, setTaxRate, isAutoEntrepreneur, setIsAutoEntrepreneur } = useCostEstimator();
  const [localTaxRate, setLocalTaxRate] = useState(taxRate * 100);
  const { toast } = useToast();

  const handleTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLocalTaxRate(value);
  };

  const applyTaxRate = () => {
    const rate = localTaxRate / 100;
    setTaxRate(rate);
    
    toast({
      title: "Taux d'imposition mis à jour",
      description: `Taux d'imposition configuré à ${localTaxRate.toFixed(1)}%`,
    });
  };

  const handleAutoEntrepreneurChange = (checked: boolean) => {
    setIsAutoEntrepreneur(checked);
    
    toast({
      title: checked ? "Auto-entrepreneur activé" : "Auto-entrepreneur désactivé",
      description: checked 
        ? "L'impôt forfaitaire unique de 0.5% et CASNOS de 24000 DA/an sont maintenant appliqués." 
        : "Le régime standard d'imposition est maintenant appliqué.",
    });
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
              <CardTitle>Taux d'imposition</CardTitle>
            </CardHeader>
          </SlideInFromTop>
          
          <ScaleIn>
            <CardContent className="px-6 py-4">
              <FadeIn>
                <p className="text-base text-gray-600 mb-5">
                  Ajustez votre taux d'imposition en fonction de votre situation fiscale.
                </p>
              </FadeIn>
              
              <FadeIn delay={100}>
                <div className="flex gap-3 mb-4">
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      id="tax-rate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={localTaxRate}
                      onChange={handleTaxRateChange}
                      disabled={isAutoEntrepreneur}
                    />
                    <span className="text-base font-medium">%</span>
                  </div>
                  <Button onClick={applyTaxRate} disabled={isAutoEntrepreneur}>Appliquer</Button>
                </div>
                <p className="text-sm text-gray-500 mb-5">
                  Taux actuel: {(taxRate * 100).toFixed(1)}%
                </p>
              </FadeIn>

              <FadeIn delay={200}>
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 text-sm mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">Régime Auto-entrepreneur</h3>
                    <Switch 
                      checked={isAutoEntrepreneur} 
                      onCheckedChange={handleAutoEntrepreneurChange}
                    />
                  </div>
                  {isAutoEntrepreneur ? (
                    <div className="text-sm text-gray-700 mt-3">
                      <p className="mb-2">Le régime auto-entrepreneur comprend:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Impôt forfaitaire unique: <strong>0.5%</strong> du chiffre d'affaires</li>
                        <li>CASNOS: <strong>24,000 DA</strong> par an</li>
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Activez cette option pour appliquer le régime fiscal auto-entrepreneur.
                    </p>
                  )}
                </div>

                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 text-sm">
                  <h3 className="font-medium mb-3 text-gray-800">Informations fiscales</h3>
                  <ul className="space-y-2">
                    <li><strong>Taxe sur le chiffre d'affaires:</strong> Généralement autour de 20% (TVA)</li>
                    <li><strong>Impôt sur le revenu:</strong> Varie selon votre tranche d'imposition</li>
                    <li><strong>Déductions professionnelles:</strong> De nombreuses dépenses peuvent être déduites</li>
                    <li><strong>Cotisations sociales:</strong> À prévoir en fonction de votre statut</li>
                  </ul>
                  <p className="mt-3 text-xs text-gray-500">Note: Ces informations sont générales. Consultez un expert-comptable pour votre situation spécifique.</p>
                </div>
              </FadeIn>
            </CardContent>
          </ScaleIn>
          
          <CardFooter className="flex flex-col gap-4 p-6 pt-4 border-t">
            <PageNavigation />
          </CardFooter>
        </Card>
      </div>
    </main>
  );
} 