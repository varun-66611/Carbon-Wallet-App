import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Car, 
  Utensils, 
  Zap, 
  ShoppingBag,
  Calculator,
  X
} from "lucide-react";

interface EmissionEntry {
  category: string;
  type: string;
  quantity: number;
  emissions: number;
  description?: string;
  date: string;
}

interface EmissionTrackerProps {
  category: string;
  onClose: () => void;
  onAddEntry: (entry: EmissionEntry) => void;
}

// Emission factors (kg CO2 per unit)
const EMISSION_FACTORS = {
  transport: {
    'gasoline-car': { factor: 0.192, unit: 'km', label: 'Gasoline Car' },
    'electric-car': { factor: 0.05, unit: 'km', label: 'Electric Car' },
    'bus': { factor: 0.105, unit: 'km', label: 'Bus' },
    'train': { factor: 0.041, unit: 'km', label: 'Train' },
    'flight-domestic': { factor: 0.255, unit: 'km', label: 'Domestic Flight' },
    'flight-international': { factor: 0.285, unit: 'km', label: 'International Flight' },
    'motorcycle': { factor: 0.084, unit: 'km', label: 'Motorcycle' },
  },
  food: {
    'beef': { factor: 27, unit: 'kg', label: 'Beef' },
    'chicken': { factor: 6.9, unit: 'kg', label: 'Chicken' },
    'pork': { factor: 12.1, unit: 'kg', label: 'Pork' },
    'fish': { factor: 6.1, unit: 'kg', label: 'Fish' },
    'dairy': { factor: 3.2, unit: 'kg', label: 'Dairy Products' },
    'vegetables': { factor: 2.0, unit: 'kg', label: 'Vegetables' },
    'fruits': { factor: 1.1, unit: 'kg', label: 'Fruits' },
    'grains': { factor: 2.5, unit: 'kg', label: 'Grains/Rice' },
    'lentils': { factor: 0.9, unit: 'kg', label: 'Lentils/Beans' },
    'restaurant': { factor: 8.5, unit: 'meal', label: 'Restaurant Meal' },
  },
  energy: {
    'electricity': { factor: 0.5, unit: 'kWh', label: 'Electricity' },
    'natural-gas': { factor: 2.3, unit: 'm³', label: 'Natural Gas' },
    'lpg': { factor: 3.0, unit: 'kg', label: 'LPG' },
    'coal': { factor: 2.4, unit: 'kg', label: 'Coal' },
    'heating-oil': { factor: 2.7, unit: 'L', label: 'Heating Oil' },
  },
  shopping: {
    'clothing': { factor: 15, unit: 'item', label: 'Clothing Item' },
    'electronics': { factor: 150, unit: 'item', label: 'Electronic Device' },
    'furniture': { factor: 85, unit: 'item', label: 'Furniture' },
    'books': { factor: 2.7, unit: 'item', label: 'Book' },
    'plastic-products': { factor: 6, unit: 'kg', label: 'Plastic Products' },
    'paper-products': { factor: 3.3, unit: 'kg', label: 'Paper Products' },
  },
};

export const EmissionTracker = ({ category, onClose, onAddEntry }: EmissionTrackerProps) => {
  const [selectedType, setSelectedType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const categoryData = EMISSION_FACTORS[category as keyof typeof EMISSION_FACTORS];
  const selectedEmissionData = selectedType ? categoryData[selectedType as keyof typeof categoryData] : null;
  
  const calculatedEmissions = selectedEmissionData && quantity 
    ? parseFloat(quantity) * selectedEmissionData.factor 
    : 0;

  const getCategoryIcon = () => {
    switch (category) {
      case 'transport': return Car;
      case 'food': return Utensils;
      case 'energy': return Zap;
      case 'shopping': return ShoppingBag;
      default: return Calculator;
    }
  };

  const CategoryIcon = getCategoryIcon();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedType || !quantity) {
      toast({
        title: "Missing Information",
        description: "Please select a type and enter quantity.",
        variant: "destructive",
      });
      return;
    }

    const entry: EmissionEntry = {
      category,
      type: selectedType,
      quantity: parseFloat(quantity),
      emissions: calculatedEmissions,
      description: description || undefined,
      date: new Date().toISOString(),
    };

    onAddEntry(entry);
    
    toast({
      title: "Emission Added",
      description: `Added ${calculatedEmissions.toFixed(2)} kg CO₂ to ${category}`,
    });

    onClose();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 capitalize">
          <CategoryIcon className="h-5 w-5" />
          Track {category}
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${category} type`} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categoryData).map(([key, data]) => (
                  <SelectItem key={key} value={key}>
                    {data.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">
              Quantity {selectedEmissionData && `(${selectedEmissionData.unit})`}
            </Label>
            <Input
              id="quantity"
              type="number"
              step="0.1"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes about this emission..."
              rows={2}
            />
          </div>

          {calculatedEmissions > 0 && (
            <div className="p-3 bg-accent rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Calculator className="h-4 w-4" />
                <span className="font-medium">
                  Calculated Emissions: {calculatedEmissions.toFixed(2)} kg CO₂
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Emission
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};