import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Award,
  Zap,
  Leaf,
  BarChart3
} from "lucide-react";

interface ProgressData {
  weeklyGoal: number;
  weeklyActual: number;
  monthlyGoal: number;
  monthlyActual: number;
  yearlyGoal: number;
  yearlyActual: number;
  streak: number;
  totalSaved: number;
}

const Progress = () => {
  const data: ProgressData = {
    weeklyGoal: 35,
    weeklyActual: 28,
    monthlyGoal: 150,
    monthlyActual: 120,
    yearlyGoal: 1800,
    yearlyActual: 1420,
    streak: 12,
    totalSaved: 2450
  };

  const weeklyProgress = (data.weeklyActual / data.weeklyGoal) * 100;
  const monthlyProgress = (data.monthlyActual / data.monthlyGoal) * 100;
  const yearlyProgress = (data.yearlyActual / data.yearlyGoal) * 100;

  const achievements = [
    { 
      title: "First Week Champion", 
      description: "Stayed under carbon budget for 7 days",
      gradient: "bg-gradient-eco",
      shadow: "shadow-eco"
    },
    { 
      title: "Ocean Protector", 
      description: "Reduced transport emissions by 30%",
      gradient: "bg-gradient-ocean",
      shadow: "shadow-ocean"
    },
    { 
      title: "Plant-Based Hero", 
      description: "5 meat-free days in a row",
      gradient: "bg-gradient-spring",
      shadow: "shadow-eco"
    },
    { 
      title: "Energy Saver", 
      description: "Reduced home energy by 25%",
      gradient: "bg-gradient-sunset",
      shadow: "shadow-sunset"
    }
  ];

  const monthlyTrend = [
    { month: "Jan", emissions: 145, goal: 150 },
    { month: "Feb", emissions: 132, goal: 150 },
    { month: "Mar", emissions: 128, goal: 150 },
    { month: "Apr", emissions: 120, goal: 150 },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-aurora rounded-full shadow-aurora">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Your Progress</h1>
          </div>
          <p className="text-xl text-muted-foreground">Track your carbon footprint journey</p>
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Weekly Progress */}
          <Card className="bg-gradient-spring text-white shadow-eco border-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white">
                <Calendar className="h-5 w-5" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Goal: {data.weeklyGoal} kg CO₂</span>
                  <span>Used: {data.weeklyActual} kg</span>
                </div>
                <ProgressBar value={weeklyProgress} className="bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-bold">{weeklyProgress.toFixed(0)}%</div>
                  <div className="text-sm opacity-90">of weekly budget used</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Progress */}
          <Card className="bg-gradient-ocean text-white shadow-ocean border-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white">
                <Target className="h-5 w-5" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Goal: {data.monthlyGoal} kg CO₂</span>
                  <span>Used: {data.monthlyActual} kg</span>
                </div>
                <ProgressBar value={monthlyProgress} className="bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-bold">{monthlyProgress.toFixed(0)}%</div>
                  <div className="text-sm opacity-90">of monthly budget used</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Yearly Progress */}
          <Card className="bg-gradient-sunset text-white shadow-sunset border-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="h-5 w-5" />
                This Year
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Goal: {data.yearlyGoal} kg CO₂</span>
                  <span>Used: {data.yearlyActual} kg</span>
                </div>
                <ProgressBar value={yearlyProgress} className="bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-bold">{yearlyProgress.toFixed(0)}%</div>
                  <div className="text-sm opacity-90">of yearly budget used</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Streak & Savings */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-3 bg-gradient-eco rounded-full">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-emerald">{data.streak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-3 bg-gradient-aurora rounded-full">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-amethyst">{data.totalSaved}</div>
                  <div className="text-sm text-muted-foreground">kg CO₂ Saved</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Monthly Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyTrend.map((month, index) => {
                  const percentage = (month.emissions / month.goal) * 100;
                  const isGood = percentage <= 80;
                  
                  return (
                    <div key={month.month} className="flex items-center gap-4">
                      <div className="w-8 text-sm font-medium">{month.month}</div>
                      <div className="flex-1">
                        <ProgressBar 
                          value={percentage} 
                          className={`h-2 ${isGood ? 'bg-emerald/20' : 'bg-coral/20'}`}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground w-16">
                        {month.emissions}kg
                      </div>
                      <Badge variant={isGood ? "default" : "destructive"} className="text-xs">
                        {percentage.toFixed(0)}%
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className={`${achievement.gradient} ${achievement.shadow} text-white border-0 transition-transform hover:scale-105`}>
                  <CardContent className="p-4 text-center">
                    <div className="mb-3">
                      <Award className="h-8 w-8 mx-auto" />
                    </div>
                    <h3 className="font-bold text-sm mb-2">{achievement.title}</h3>
                    <p className="text-xs opacity-90">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Progress;