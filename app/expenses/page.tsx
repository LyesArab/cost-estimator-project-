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

const expenseSchema = z.object({
  name: z.string().min(1, "Un nom de dépense est requis"),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Le montant doit être un nombre positif",
  }),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

export default function ExpensesPage() {
  const { expenses, addExpense, removeExpense } = useCostEstimator();
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      name: "",
      amount: "",
    },
  });

  const onSubmit = (data: ExpenseFormValues) => {
    const newExpense = {
      id: crypto.randomUUID(),
      name: data.name,
      amount: parseFloat(data.amount),
    };

    addExpense(newExpense);
    
    toast({
      title: "Dépense ajoutée",
      description: `${data.name} a été ajouté à vos dépenses.`,
    });
    
    reset();
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <main className="flex items-center justify-center min-h-screen bg-background py-8 px-4">
      <Card className="w-full max-w-3xl mx-auto shadow-md overflow-hidden">
        <SlideInFromTop>
          <CardHeader className="bg-card border-b pb-4">
            <div className="flex items-center justify-center gap-1 mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">1</div>
                <div className="h-1 w-12 bg-muted mx-1"></div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-medium">2</div>
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
                <h2 className="text-xl font-bold mb-2">Dépenses mensuelles</h2>
                <p className="text-sm text-muted-foreground">
                  Ajoutez vos dépenses liées au projet: serveurs, abonnements, licences, etc.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={100}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mb-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      id="expense-name"
                      placeholder="Exemple: Serveur, Abonnement, Licence, etc."
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-0.5">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="w-32">
                    <div className="relative">
                      <Input
                        id="expense-amount"
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        min="0"
                        className="pl-7"
                        {...register("amount")}
                      />
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <span className="text-muted-foreground">DA</span>
                      </div>
                    </div>
                    {errors.amount && (
                      <p className="text-xs text-red-500 mt-0.5">{errors.amount.message}</p>
                    )}
                  </div>
                  
                  <Button type="submit" className="px-4" size="sm">Ajouter</Button>
                </div>
              </form>
            </FadeIn>

            <FadeIn delay={200}>
              {expenses.length > 0 && (
                <div className="mt-4 border rounded-lg overflow-hidden">
                  <div className="max-h-60 overflow-y-auto">
                    <table className="w-full">
                      <tbody>
                        {expenses.map((expense) => (
                          <tr key={expense.id} className="border-b last:border-b-0 hover:bg-muted/30">
                            <td className="px-3 py-2 text-sm">{expense.name}</td>
                            <td className="px-3 py-2 text-sm text-right font-medium">{expense.amount.toFixed(0)} DA/mois</td>
                            <td className="px-2 py-2 text-right w-10">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeExpense(expense.id)}
                                className="h-6 w-6 p-0 text-red-500 hover:bg-red-100 hover:text-red-600"
                              >
                                ✕
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="px-3 py-3 bg-muted/20 border-t flex justify-between items-center">
                    <span className="font-medium">Total des dépenses:</span>
                    <span className="font-bold">{totalExpenses.toFixed(0)} DA/mois</span>
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