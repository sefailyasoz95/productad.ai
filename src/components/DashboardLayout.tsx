
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ImageIcon, 
  Video, 
  Mic, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut,
  Menu
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import HelpDialog from './HelpDialog';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: ImageIcon, label: 'Images', path: '/generate/image' },
    { icon: Video, label: 'Videos', path: '/generate/video' },
    { icon: Mic, label: 'Voice', path: '/generate/voice' },
    { icon: Users, label: 'Influencers', path: '/influencers' },
  ];
  
  const renderNavItems = () => (
    <div className="space-y-1">
      {navItems.map((item) => (
        <Button
          key={item.path}
          variant={location.pathname === item.path ? "secondary" : "ghost"}
          className={`w-full justify-start ${location.pathname === item.path ? 'bg-secondary' : ''}`}
          asChild
        >
          <Link to={item.path}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Link>
        </Button>
      ))}
    </div>
  );
  
  return (
    <div className="min-h-screen flex">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <div className="p-4 border-b border-border">
              <Link to="/" className="flex items-center gap-2">
                <span className="font-bold text-2xl gradient-text">Genfluence</span>
              </Link>
            </div>
            
            <div className="flex-1 flex flex-col justify-between py-4">
              {renderNavItems()}
              
              <div className="space-y-1 px-3 mt-auto">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
                <HelpDialog>
                  <Button variant="ghost" className="w-full justify-start">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help
                  </Button>
                </HelpDialog>
                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" asChild>
                  <Link to="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Desktop Sidebar */}
      <div className="w-64 bg-muted/30 border-r border-border hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl gradient-text">Genfluence</span>
          </Link>
        </div>
        
        <div className="flex-1 flex flex-col justify-between py-4">
          <div className="space-y-1 px-3">
            {renderNavItems()}
          </div>
          
          <div className="space-y-1 px-3 mt-auto">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
            <HelpDialog>
              <Button variant="ghost" className="w-full justify-start">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help
              </Button>
            </HelpDialog>
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" asChild>
              <Link to="/">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
