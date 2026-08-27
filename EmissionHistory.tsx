import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Car, 
  Utensils, 
  Zap, 
  ShoppingBag,
  Calendar
} from "lucide-react";

interface EmissionEntry {
  category: string;
  type: string;
  quantity: number;
  emissions: number;
  description?: string;
  date: string;
}

interface EmissionHistoryProps {
  entries: EmissionEntry[];
}

export const EmissionHistory = ({ entries }: EmissionHistoryProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transport': return Car;
      case 'food': return Utensils;
      case 'energy': return Zap;
      case 'shopping': return ShoppingBag;
      default: return Calendar;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transport': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'food': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'energy': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'shopping': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No emissions tracked yet.</p>
            <p className="text-sm">Start tracking your carbon footprint by adding entries above.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {sortedEntries.map((entry, index) => {
              const CategoryIcon = getCategoryIcon(entry.category);
              const categoryColor = getCategoryColor(entry.category);
              
              return (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow">
                  <div className={`p-2 rounded-full ${categoryColor}`}>
                    <CategoryIcon className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium capitalize">{entry.category}</span>
                      <Badge variant="secondary" className="text-xs">
                        {entry.emissions.toFixed(2)} kg CO₂
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-1">
                      {entry.type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} 
                      • {entry.quantity} {entry.category === 'transport' ? 'km' : 
                          entry.category === 'food' ? (entry.type === 'restaurant' ? 'meal' : 'kg') :
                          entry.category === 'energy' ? 'kWh' : 'item'}
                    </div>
                    
                    {entry.description && (
                      <div className="text-sm text-muted-foreground italic">
                        "{entry.description}"
                      </div>
                    )}
                    
                    <div className="text-xs text-muted-foreground mt-2">
                      {formatDate(entry.date)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};