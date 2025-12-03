import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  BarChart3,
  Trophy,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Brain,
  LineChart,
  Layers,
  Activity,
  MessageSquare,
} from "lucide-react";

const navigation = [
  { name: "Főoldal", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Predikciók", href: "/predictions", icon: Brain },
  { name: "Mérkőzések", href: "/matches", icon: Trophy },
  { name: "Csapatok", href: "/teams", icon: Users },
  { name: "Ligák", href: "/leagues", icon: Layers },
  { name: "Analytics", href: "/analytics", icon: LineChart },
  { name: "Monitoring", href: "/monitoring", icon: Activity },
  { name: "AI Chat", href: "/ai-chat", icon: MessageSquare },
];

const adminNavigation = [
  { name: "Admin", href: "/admin", icon: Settings },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300",
          collapsed ? "lg:w-20" : "lg:w-64"
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card border-r border-border px-4 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center justify-between">
            {!collapsed && (
              <span className="text-xl font-bold text-primary">WinMix</span>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="h-8 w-8"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1">
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={cn(
                          "group flex gap-x-3 rounded-md p-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span>{item.name}</span>}
                      </NavLink>
                    </li>
                  );
                })}

                {/* Admin Section */}
                <li className="mt-4 pt-4 border-t border-border">
                  {adminNavigation.map((item) => {
                    const isActive = location.pathname.startsWith(item.href);
                    return (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={cn(
                          "group flex gap-x-3 rounded-md p-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span>{item.name}</span>}
                      </NavLink>
                    );
                  })}
                </li>
              </ul>
            </nav>
          </ScrollArea>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
