import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  Utensils, 
  Zap, 
  ShoppingBag, 
  TrendingDown, 
  TrendingUp,
  Target,
  Leaf
} from "lucide-react";

interface EmissionData {
  transport: number;
  food: number;
  energy: number;
  shopping: number;
}

interface CarbonDashboardProps {
  emissions: EmissionData;
  monthlyBudget: number;
  onAddEmission: (category: keyof EmissionData) => void;
}

export const CarbonDashboard = ({ emissions, monthlyBudget, onAddEmission }: CarbonDashboardProps) => {
  const totalEmissions = Object.values(emissions).reduce((sum, value) => sum + value, 0);
  const budgetProgress = (totalEmissions / monthlyBudget) * 100;
  
  const getEcoScore = (emissions: number, budget: number) => {
    const percentage = (emissions / budget) * 100;
    if (percentage <= 50) return { score: "Excellent", color: "eco-excellent", icon: Leaf };
    if (percentage <= 70) return { score: "Good", color: "eco-good", icon: TrendingDown };
    if (percentage <= 90) return { score: "Fair", color: "eco-fair", icon: Target };
    if (percentage <= 110) return { score: "Poor", color: "eco-poor", icon: TrendingUp };
    return { score: "Critical", color: "eco-critical", icon: TrendingUp };
  };

  const ecoScore = getEcoScore(totalEmissions, monthlyBudget);
  const ScoreIcon = ecoScore.icon;

  const categories = [
    { key: 'transport' as keyof EmissionData, label: 'Transport', icon: Car, color: 'bg-blue-100 text-blue-700' },
    { key: 'food' as keyof EmissionData, label: 'Food', icon: Utensils, color: 'bg-orange-100 text-orange-700' },
    { key: 'energy' as keyof EmissionData, label: 'Energy', icon: Zap, color: 'bg-yellow-100 text-yellow-700' },
    { key: 'shopping' as keyof EmissionData, label: 'Shopping', icon: ShoppingBag, color: 'bg-purple-100 text-purple-700' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-eco text-primary-foreground shadow-eco">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ScoreIcon className="h-4 w-4" />
              Eco Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ecoScore.score}</div>
            <p className="text-xs opacity-90">
              {totalEmissions.toFixed(1)} kg CO₂ this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyBudget} kg</div>
            <Progress value={budgetProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {budgetProgress.toFixed(0)}% used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {Math.max(0, monthlyBudget - totalEmissions).toFixed(1)} kg
            </div>
            <p className="text-xs text-muted-foreground">
              CO₂ budget left
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Emission Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const percentage = totalEmissions > 0 ? (emissions[category.key] / totalEmissions) * 100 : 0;
              
              return (
                <div key={category.key} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${category.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{category.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {emissions[category.key].toFixed(1)} kg CO₂
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-2">
                      {percentage.toFixed(0)}%
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onAddEmission(category.key)}
                      className="block"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};