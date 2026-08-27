import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Gift, 
  Star,
  Trophy,
  Sparkles,
  ShoppingBag,
  Leaf,
  Zap,
  Crown,
  Coins
} from "lucide-react";

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'discount' | 'voucher' | 'badge' | 'donation';
  company?: string;
  value?: string;
  gradient: string;
  shadow: string;
  available: boolean;
}

interface UserRewards {
  totalPoints: number;
  level: number;
  nextLevelPoints: number;
  unlockedRewards: string[];
}

const Rewards = () => {
  const [userRewards, setUserRewards] = useState<UserRewards>({
    totalPoints: 1250,
    level: 3,
    nextLevelPoints: 1500,
    unlockedRewards: ['eco-hero', 'plant-lover', 'energy-saver']
  });

  const rewards: Reward[] = [
    {
      id: 'coffee-discount',
      title: '20% Off Coffee',
      description: 'Discount at local sustainable cafes',
      points: 200,
      type: 'discount',
      company: 'EcoCafe',
      value: '20%',
      gradient: 'bg-gradient-sunset',
      shadow: 'shadow-sunset',
      available: true
    },
    {
      id: 'transport-voucher',
      title: 'Free Bus Pass',
      description: '1 day free public transport',
      points: 300,
      type: 'voucher',
      company: 'CityBus',
      value: '$5',
      gradient: 'bg-gradient-ocean',
      shadow: 'shadow-ocean',
      available: true
    },
    {
      id: 'plant-seeds',
      title: 'Plant Seeds Kit',
      description: 'Grow your own herbs at home',
      points: 400,
      type: 'voucher',
      company: 'GreenThumb',
      value: '$15',
      gradient: 'bg-gradient-spring',
      shadow: 'shadow-eco',
      available: true
    },
    {
      id: 'carbon-offset',
      title: 'Tree Planting',
      description: 'Plant 5 trees in your name',
      points: 500,
      type: 'donation',
      company: 'EcoForest',
      value: '5 trees',
      gradient: 'bg-gradient-eco',
      shadow: 'shadow-eco',
      available: true
    },
    {
      id: 'premium-upgrade',
      title: 'Premium Features',
      description: '3 months of premium analytics',
      points: 800,
      type: 'voucher',
      value: '3 months',
      gradient: 'bg-gradient-aurora',
      shadow: 'shadow-aurora',
      available: false
    },
    {
      id: 'eco-shopping',
      title: 'Sustainable Store',
      description: '30% off eco-friendly products',
      points: 600,
      type: 'discount',
      company: 'EcoMart',
      value: '30%',
      gradient: 'bg-gradient-sunset',
      shadow: 'shadow-sunset',
      available: false
    }
  ];

  const badges = [
    { 
      title: 'Eco Hero', 
      description: 'First month under budget',
      gradient: 'bg-gradient-eco',
      icon: Leaf,
      unlocked: true
    },
    { 
      title: 'Plant Lover', 
      description: '10 meat-free days',
      gradient: 'bg-gradient-spring',
      icon: Sparkles,
      unlocked: true
    },
    { 
      title: 'Energy Saver', 
      description: 'Reduced home energy 20%',
      gradient: 'bg-gradient-sunset',
      icon: Zap,
      unlocked: true
    },
    { 
      title: 'Transport Champion', 
      description: 'Used public transport 15 days',
      gradient: 'bg-gradient-ocean',
      icon: Star,
      unlocked: false
    },
    { 
      title: 'Carbon Master', 
      description: 'Saved 1000kg CO₂',
      gradient: 'bg-gradient-aurora',
      icon: Crown,
      unlocked: false
    }
  ];

  const currentLevelProgress = (userRewards.totalPoints / userRewards.nextLevelPoints) * 100;

  const claimReward = (rewardId: string, points: number) => {
    if (userRewards.totalPoints >= points) {
      setUserRewards(prev => ({
        ...prev,
        totalPoints: prev.totalPoints - points,
        unlockedRewards: [...prev.unlockedRewards, rewardId]
      }));
    }
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'discount': return ShoppingBag;
      case 'voucher': return Gift;
      case 'badge': return Trophy;
      case 'donation': return Leaf;
      default: return Star;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-aurora rounded-full shadow-aurora">
              <Gift className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Eco Rewards</h1>
          </div>
          <p className="text-xl text-muted-foreground">Earn points for green choices</p>
        </div>

        {/* Points & Level */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-aurora text-white shadow-aurora border-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white">
                <Coins className="h-5 w-5" />
                Total Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{userRewards.totalPoints}</div>
              <p className="text-sm opacity-90">Eco Points earned</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-sunset text-white shadow-sunset border-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white">
                <Crown className="h-5 w-5" />
                Level {userRewards.level}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={currentLevelProgress} className="bg-white/20 mb-2" />
              <p className="text-sm opacity-90">
                {userRewards.nextLevelPoints - userRewards.totalPoints} points to next level
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-eco text-white shadow-eco border-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white">
                <Trophy className="h-5 w-5" />
                Badges Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{badges.filter(b => b.unlocked).length}</div>
              <p className="text-sm opacity-90">of {badges.length} badges</p>
            </CardContent>
          </Card>
        </div>

        {/* Available Rewards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Available Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.filter(reward => reward.available).map((reward) => {
                const RewardIcon = getRewardIcon(reward.type);
                const canClaim = userRewards.totalPoints >= reward.points;
                const alreadyClaimed = userRewards.unlockedRewards.includes(reward.id);

                return (
                  <Card key={reward.id} className={`${reward.gradient} ${reward.shadow} text-white border-0 transition-transform hover:scale-105`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <RewardIcon className="h-8 w-8" />
                        <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                          {reward.points} pts
                        </Badge>
                      </div>
                      
                      <h3 className="font-bold text-lg mb-2">{reward.title}</h3>
                      <p className="text-sm opacity-90 mb-4">{reward.description}</p>
                      
                      {reward.company && (
                        <p className="text-xs opacity-75 mb-4">Partner: {reward.company}</p>
                      )}

                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                        disabled={!canClaim || alreadyClaimed}
                        onClick={() => claimReward(reward.id, reward.points)}
                      >
                        {alreadyClaimed ? 'Claimed' : canClaim ? 'Claim Reward' : 'Not Enough Points'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Badges Collection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Achievement Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {badges.map((badge, index) => {
                const BadgeIcon = badge.icon;
                
                return (
                  <Card 
                    key={index} 
                    className={`${badge.gradient} text-white border-0 transition-all duration-300 ${
                      badge.unlocked 
                        ? 'shadow-lg transform hover:scale-105' 
                        : 'opacity-50 grayscale'
                    }`}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="mb-3">
                        <BadgeIcon className="h-8 w-8 mx-auto" />
                      </div>
                      <h3 className="font-bold text-sm mb-1">{badge.title}</h3>
                      <p className="text-xs opacity-90">{badge.description}</p>
                      {badge.unlocked && (
                        <Badge variant="secondary" className="mt-2 text-xs bg-white/20 text-white">
                          Earned
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Coming Soon */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Coming Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rewards.filter(reward => !reward.available).map((reward) => {
                const RewardIcon = getRewardIcon(reward.type);

                return (
                  <Card key={reward.id} className="border-2 border-dashed border-muted-foreground/30 bg-muted/30">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4 opacity-60">
                        <RewardIcon className="h-8 w-8" />
                        <Badge variant="outline" className="text-xs">
                          {reward.points} pts
                        </Badge>
                      </div>
                      
                      <h3 className="font-bold text-lg mb-2 opacity-60">{reward.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                      
                      <Badge variant="secondary" className="text-xs">
                        Coming Soon
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Rewards;