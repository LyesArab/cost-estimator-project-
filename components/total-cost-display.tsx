"use client";

import { Expense, Feature } from "@/app/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TotalCostDisplayProps {
  expenses: Expense[];
  removeExpense: (id: string) => void;
  features: Feature[];
  removeFeature: (id: string) => void;
  subtotal: number;
  taxAmount: number;
  totalCost: number;
}

export default function TotalCostDisplay({
  expenses,
  removeExpense,
  features,
  removeFeature,
  subtotal,
  taxAmount,
  totalCost,
}: TotalCostDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Project Cost</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Expenses section */}
          <div>
            <h3 className="text-lg font-medium mb-2">Expenses</h3>
            {expenses.length === 0 ? (
              <p className="text-sm text-muted-foreground">No expenses added yet.</p>
            ) : (
              <ul className="space-y-2">
                {expenses.map((expense) => (
                  <li key={expense.id} className="flex justify-between items-center">
                    <span>{expense.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">${expense.amount.toFixed(2)}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExpense(expense.id)}
                        className="h-8 w-8 p-0 text-red-500"
                      >
                        ✕
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Features section */}
          <div>
            <h3 className="text-lg font-medium mb-2">Features</h3>
            {features.length === 0 ? (
              <p className="text-sm text-muted-foreground">No features added yet.</p>
            ) : (
              <ul className="space-y-2">
                {features.map((feature) => (
                  <li key={feature.id} className="flex justify-between items-center">
                    <div>
                      <span>{feature.name}</span>
                      <p className="text-xs text-muted-foreground">
                        {feature.hours} hrs × ${feature.hourlyRate}/hr ({feature.complexity} complexity)
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        ${(feature.hours * feature.hourlyRate).toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFeature(feature.id)}
                        className="h-8 w-8 p-0 text-red-500"
                      >
                        ✕
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Total calculation */}
          <div className="pt-4 border-t">
            <div className="flex justify-between py-1">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Tax</span>
              <span className="font-medium">${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 text-lg font-bold">
              <span>Total</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 