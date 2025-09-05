import { Home, ClipboardList, AlertTriangle, Wrench, MessageCircle, Brain } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const navItems = [
  {
    name: "Início",
    href: "/",
    icon: Home,
  },
  {
    name: "Inspeções",
    href: "/inspecoes",
    icon: ClipboardList,
  },
  {
    name: "RNC",
    href: "/rnc",
    icon: AlertTriangle,
    badge: 5,
  },
  {
    name: "OS",
    href: "/os",
    icon: Wrench,
    badge: 12,
  },
  {
    name: "Chat",
    href: "/chat",
    icon: MessageCircle,
    badge: 2,
  },
  {
    name: "IA",
    href: "/ia",
    icon: Brain,
  },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border">
      <div className="grid grid-cols-6 h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 relative transition-colors hover:bg-accent/50",
                isActive
                  ? "text-primary bg-primary-light"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 text-xs bg-destructive text-destructive-foreground">
                    {item.badge > 9 ? "9+" : item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">{item.name}</span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}