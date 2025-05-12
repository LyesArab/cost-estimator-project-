"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Expense } from "@/contexts/CostEstimatorContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const expenseSchema = z.object({
  name: z.string().min(1, "Expense name is required"),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
  addExpense: (expense: Expense) => void;
}

export default function ExpenseForm({ addExpense }: ExpenseFormProps) {
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
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      name: data.name,
      amount: parseFloat(data.amount),
    };

    addExpense(newExpense);
    
    toast({
      title: "Expense Added",
      description: `${data.name} added to expenses.`,
    });
    
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Project Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid gap-2">
            <Label htmlFor="expense-name">Expense Name</Label>
            <Input
              id="expense-name"
              placeholder="Server costs, OpenAI subscription, etc."
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="expense-amount">Amount</Label>
            <Input
              id="expense-amount"
              placeholder="0.00"
              type="number"
              step="0.01"
              min="0"
              {...register("amount")}
            />
            {errors.amount && (
              <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full mt-2">
            Add Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 