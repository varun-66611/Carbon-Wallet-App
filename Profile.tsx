import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Settings, 
  Target,
  Leaf,
  Trophy,
  Calendar,
  MapPin,
  Mail,
  Edit3,
  Save,
  Camera
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  location: string;
  joinDate: string;
  avatar: string;
  carbonGoal: number;
  streak: number;
  totalSaved: number;
  level: number;
  badges: number;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Alex Green",
    email: "alex.green@email.com",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    avatar: "",
    carbonGoal: 150,
    streak: 12,
    totalSaved: 2450,
    level: 3,
    badges: 3
  });

  const [editForm, setEditForm] = useState(profile);

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const stats = [
    {
      label: "Current Streak",
      value: profile.streak,
      unit: "days",
      gradient: "bg-gradient-eco",
      icon: Leaf
    },
    {
      label: "CO₂ Saved",
      value: profile.totalSaved,
      unit: "kg",
      gradient: "bg-gradient-ocean",
      icon: Target
    },
    {
      label: "Current Level",
      value: profile.level,
      unit: "",
      gradient: "bg-gradient-sunset",
      icon: Trophy
    },
    {
      label: "Badges Earned",
      value: profile.badges,
      unit: "",
      gradient: "bg-gradient-aurora",
      icon: Trophy
    }
  ];

  const achievements = [
    {
      title: "Eco Warrior",
      description: "Completed first month under budget",
      date: "2 weeks ago",
      gradient: "bg-gradient-eco"
    },
    {
      title: "Plant Based Hero",
      description: "10 consecutive meat-free days",
      date: "1 week ago",
      gradient: "bg-gradient-spring"
    },
    {
      title: "Energy Saver",
      description: "Reduced home energy by 25%",
      date: "3 days ago",
      gradient: "bg-gradient-sunset"
    }
  ];

  const recentActivity = [
    { action: "Logged bike commute", emissions: "-2.5 kg CO₂", time: "2 hours ago" },
    { action: "Added plant-based lunch", emissions: "-1.2 kg CO₂", time: "4 hours ago" },
    { action: "Used public transport", emissions: "-3.1 kg CO₂", time: "Yesterday" },
    { action: "Reduced home electricity", emissions: "-0.8 kg CO₂", time: "2 days ago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-eco rounded-full shadow-eco">
              <User className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">My Profile</h1>
          </div>
          <p className="text-xl text-muted-foreground">Your eco journey dashboard</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="bg-gradient-eco text-white shadow-eco border-0">
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-white/20">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="text-2xl bg-white/20 text-white">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    className="absolute bottom-0 right-1/2 translate-x-6 bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                {isEditing ? (
                  <div className="space-y-3">
                    <Input 
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    />
                    <Input 
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    />
                    <Input 
                      value={editForm.location}
                      onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSave}
                        size="sm"
                        variant="secondary"
                        className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button 
                        onClick={handleCancel}
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent border-white/30 text-white hover:bg-white/10"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <div className="flex items-center justify-center gap-1 text-sm opacity-90">
                      <Mail className="h-4 w-4" />
                      {profile.email}
                    </div>
                    <div className="flex items-center justify-center gap-1 text-sm opacity-90">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </div>
                    <div className="flex items-center justify-center gap-1 text-sm opacity-90">
                      <Calendar className="h-4 w-4" />
                      Joined {profile.joinDate}
                    </div>
                    <Button 
                      onClick={() => setIsEditing(true)}
                      size="sm"
                      variant="secondary"
                      className="mt-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Settings Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="carbonGoal">Monthly Carbon Goal (kg CO₂)</Label>
                  {isEditing ? (
                    <Input 
                      id="carbonGoal"
                      type="number"
                      value={editForm.carbonGoal}
                      onChange={(e) => setEditForm({...editForm, carbonGoal: parseInt(e.target.value)})}
                    />
                  ) : (
                    <div className="p-2 bg-muted rounded-md">
                      {profile.carbonGoal} kg CO₂
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Notifications</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Daily reminders</span>
                      <Badge variant="secondary">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Weekly reports</span>
                      <Badge variant="secondary">Enabled</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <Card key={index} className={`${stat.gradient} text-white shadow-eco border-0`}>
                    <CardContent className="p-4 text-center">
                      <StatIcon className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs opacity-90">{stat.label}</div>
                      {stat.unit && <div className="text-xs opacity-75">{stat.unit}</div>}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`p-4 rounded-lg ${achievement.gradient} text-white flex items-center gap-4`}>
                      <Trophy className="h-8 w-8" />
                      <div className="flex-1">
                        <h3 className="font-bold">{achievement.title}</h3>
                        <p className="text-sm opacity-90">{achievement.description}</p>
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {achievement.date}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-eco rounded-full">
                          <Leaf className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{activity.action}</div>
                          <div className="text-sm text-muted-foreground">{activity.time}</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-emerald/10 text-emerald">
                        {activity.emissions}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;