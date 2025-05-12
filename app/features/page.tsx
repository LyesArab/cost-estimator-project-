"use client";

import { useCostEstimator } from "@/contexts/CostEstimatorContext";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import PageNavigation from "@/components/PageNavigation";
import { FadeIn, ScaleIn, SlideInFromTop } from "@/components/ui/motion";

const featureSchema = z.object({
  name: z.string().min(1, "Un nom de fonctionnalité est requis"),
  complexity: z.enum(["low", "medium", "high"], {
    required_error: "Veuillez sélectionner un niveau de complexité",
  }),
  hours: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Le temps doit être un nombre positif",
  }),
  hourlyRate: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Le taux horaire doit être un nombre positif",
  }),
});

type FeatureFormValues = z.infer<typeof featureSchema>;

export default function FeaturesPage() {
  const { features, addFeature, removeFeature } = useCostEstimator();
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeatureFormValues>({
    resolver: zodResolver(featureSchema),
    defaultValues: {
      name: "",
      complexity: "medium",
      hours: "",
      hourlyRate: "50",
    },
  });

  const onSubmit = (data: FeatureFormValues) => {
    const newFeature = {
      id: crypto.randomUUID(),
      name: data.name,
      complexity: data.complexity,
      hours: parseFloat(data.hours),
      hourlyRate: parseFloat(data.hourlyRate),
    };

    addFeature(newFeature);
    
    toast({
      title: "Fonctionnalité ajoutée",
      description: `${data.name} a été ajouté à vos fonctionnalités.`,
    });
    
    reset({ name: "", complexity: "medium", hours: "", hourlyRate: data.hourlyRate });
  };

  const totalFeatureCost = features.reduce(
    (sum, feature) => sum + feature.hours * feature.hourlyRate, 0
  );

  const complexityLabels = {
    low: "Basique",
    medium: "Moyenne",
    high: "Complexe"
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-background py-8 px-4">
      <Card className="w-full max-w-3xl mx-auto shadow-md overflow-hidden">
        <SlideInFromTop>
          <CardHeader className="bg-card border-b pb-4">
            <div className="flex items-center justify-center gap-1 mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-medium">1</div>
                <div className="h-1 w-12 bg-muted mx-1"></div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">2</div>
                <div className="h-1 w-12 bg-muted mx-1"></div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-medium">3</div>
              </div>
            </div>
            <CardTitle className="text-center text-2xl font-bold">Calculateur de Coûts</CardTitle>
          </CardHeader>
        </SlideInFromTop>
        
        <ScaleIn>
          <CardContent className="p-6">
            <FadeIn>
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Fonctionnalités</h2>
                <p className="text-sm text-muted-foreground">
                  Définissez le temps nécessaire pour chaque fonctionnalité et son tarif horaire.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={100}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
                <div className="grid gap-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        id="feature-name"
                        placeholder="Nom de la fonctionnalité"
                        {...register("name")}
                        className="bg-white"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 mt-0.5">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="w-32">
                      <select
                        id="feature-complexity"
                        className="h-10 w-full rounded-md border border-input bg-white px-2 py-2 text-sm"
                        {...register("complexity")}
                      >
                        <option value="low">Basique</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Complexe</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1">
                      <div className="relative">
                        <Input
                          id="feature-hours"
                          placeholder="Heures"
                          type="number"
                          step="0.5"
                          min="0.5"
                          className="bg-white"
                          {...register("hours")}
                        />
                      </div>
                      {errors.hours && (
                        <p className="text-xs text-red-500 mt-0.5">{errors.hours.message}</p>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="relative">
                        <Input
                          id="feature-rate"
                          placeholder="Taux horaire"
                          type="number"
                          step="0.01"
                          min="1"
                          className="pl-7 bg-white"
                          {...register("hourlyRate")}
                        />
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                          <span className="text-muted-foreground">$</span>
                        </div>
                      </div>
                      {errors.hourlyRate && (
                        <p className="text-xs text-red-500 mt-0.5">{errors.hourlyRate.message}</p>
                      )}
                    </div>
                    
                    <Button type="submit" className="px-4" size="sm">Ajouter</Button>
                  </div>
                </div>
              </form>
            </FadeIn>

            <FadeIn delay={200}>
              {features.length > 0 && (
                <div className="mt-4 border rounded-lg overflow-hidden">
                  <div className="max-h-60 overflow-y-auto">
                    <div className="divide-y">
                      {features.map((feature) => (
                        <div key={feature.id} className="p-3 hover:bg-muted/30">
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{feature.name}</span>
                              <span className="px-1.5 py-0.5 text-xs rounded bg-primary/10 text-primary">{complexityLabels[feature.complexity]}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFeature(feature.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:bg-red-100 hover:text-red-600"
                            >
                              ✕
                            </Button>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{feature.hours} h × ${feature.hourlyRate}/h</span>
                            <span className="font-medium text-foreground">${(feature.hours * feature.hourlyRate).toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="px-3 py-3 bg-muted/20 border-t flex justify-between items-center">
                    <span className="font-medium">Total des fonctionnalités:</span>
                    <span className="font-bold">${totalFeatureCost.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </FadeIn>
          </CardContent>
        </ScaleIn>

        <CardFooter className="p-6 pt-2 border-t">
          <PageNavigation />
        </CardFooter>
      </Card>
    </main>
  );
} 