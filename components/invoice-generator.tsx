"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InvoiceGeneratorProps {
  generateInvoice: (name: string) => void;
}

export default function InvoiceGenerator({
  generateInvoice,
}: InvoiceGeneratorProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      generateInvoice(name);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Invoice</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="client-name">Your Name</Label>
            <Input
              id="client-name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Generate PDF Invoice
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 