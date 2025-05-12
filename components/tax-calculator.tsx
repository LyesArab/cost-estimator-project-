"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface TaxCalculatorProps {
  taxRate: number;
  setTaxRate: (rate: number) => void;
}

export default function TaxCalculator({ taxRate, setTaxRate }: TaxCalculatorProps) {
  const [localTaxRate, setLocalTaxRate] = useState(taxRate * 100);

  const handleTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLocalTaxRate(value);
  };

  const applyTaxRate = () => {
    const rate = localTaxRate / 100;
    setTaxRate(rate);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax Calculation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="tax-rate">Tax Rate (%)</Label>
            <div className="flex gap-2">
              <Input
                id="tax-rate"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={localTaxRate}
                onChange={handleTaxRateChange}
              />
              <Button onClick={applyTaxRate}>Apply</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Current tax rate: {(taxRate * 100).toFixed(1)}%
            </p>
          </div>

          <div>
            <p className="text-sm">
              For self-employed individuals, tax rates typically include income tax and
              self-employment tax. Adjust the rate based on your specific situation.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 