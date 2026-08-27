import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  BarChart3, 
  Gift, 
  User,
  Menu,
  X,
  Leaf,
  Plus
} from "lucide-react";

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/progress', label: 'Progress', icon: BarChart3 },
    { path: '/rewards', label: 'Rewards', icon: Gift },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-eco rounded-full">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-bold">Carbon Wallet</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-gradient-eco text-white shadow-eco">
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="border-t bg-background/95 backdrop-blur-sm">
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      isActive(item.path)
                        ? 'bg-gradient-eco text-white shadow-eco'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-background/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-eco rounded-full">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Carbon Wallet</h1>
                <p className="text-sm text-muted-foreground">Track your environmental impact</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive(item.path) ? "default" : "ghost"}
                      className={isActive(item.path) 
                        ? "bg-gradient-eco text-white shadow-eco hover:shadow-glow transition-all" 
                        : "hover:bg-muted"
                      }
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            <Button className="bg-gradient-eco text-primary-foreground shadow-eco hover:shadow-glow transition-all">
              <Plus className="h-4 w-4 mr-2" />
              Add Emission
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};