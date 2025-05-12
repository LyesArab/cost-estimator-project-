"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Feature } from "@/contexts/CostEstimatorContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const featureSchema = z.object({
  name: z.string().min(1, "Feature name is required"),
  complexity: z.enum(["low", "medium", "high"], {
    required_error: "Please select a complexity level",
  }),
  hours: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Hours must be a positive number",
  }),
  hourlyRate: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Hourly rate must be a positive number",
  }),
});

type FeatureFormValues = z.infer<typeof featureSchema>;

interface FeatureFormProps {
  addFeature: (feature: Feature) => void;
}

export default function FeatureForm({ addFeature }: FeatureFormProps) {
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
    const newFeature: Feature = {
      id: crypto.randomUUID(),
      name: data.name,
      complexity: data.complexity,
      hours: parseFloat(data.hours),
      hourlyRate: parseFloat(data.hourlyRate),
    };

    addFeature(newFeature);
    
    toast({
      title: "Feature Added",
      description: `${data.name} added to features.`,
    });
    
    reset({ name: "", complexity: "medium", hours: "", hourlyRate: data.hourlyRate });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Project Feature</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid gap-2">
            <Label htmlFor="feature-name">Feature Name</Label>
            <Input
              id="feature-name"
              placeholder="Authentication, Dashboard, etc."
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="feature-complexity">Complexity</Label>
            <select
              id="feature-complexity"
              className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-base text-gray-800 transition-colors focus:border-gray-300 focus:outline-none"
              {...register("complexity")}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.complexity && (
              <p className="text-sm text-red-500 mt-1">{errors.complexity.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="feature-hours">Estimated Hours</Label>
            <Input
              id="feature-hours"
              placeholder="10"
              type="number"
              step="0.5"
              min="0.5"
              {...register("hours")}
            />
            {errors.hours && (
              <p className="text-sm text-red-500 mt-1">{errors.hours.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="feature-rate">Hourly Rate ($)</Label>
            <Input
              id="feature-rate"
              placeholder="50"
              type="number"
              step="0.01"
              min="1"
              {...register("hourlyRate")}
            />
            {errors.hourlyRate && (
              <p className="text-sm text-red-500 mt-1">{errors.hourlyRate.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full mt-2">
            Add Feature
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 