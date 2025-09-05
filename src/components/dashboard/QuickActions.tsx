import { Plus, ClipboardList, AlertTriangle, Wrench, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const quickActions = [
  {
    title: "Nova Inspeção",
    description: "Iniciar checklist",
    icon: ClipboardList,
    href: "/inspecoes/nova",
    variant: "primary" as const,
  },
  {
    title: "Abrir RNC",
    description: "Relatório não conformidade",
    icon: AlertTriangle,
    href: "/rnc/nova",
    variant: "destructive" as const,
  },
  {
    title: "Abrir OS",
    description: "Ordem de serviço",
    icon: Wrench,
    href: "/os/nova",
    variant: "warning" as const,
  },
  {
    title: "Mensagem Equipe",
    description: "Chat interno",
    icon: MessageSquarePlus,
    href: "/chat",
    variant: "secondary" as const,
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Ações Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          
          return (
            <Button
              key={action.title}
              variant={action.variant}
              size="lg"
              className="h-auto p-4 flex flex-col items-center gap-2 text-center"
              asChild
            >
              <Link to={action.href}>
                <Icon className="h-6 w-6" />
                <div>
                  <div className="font-semibold text-sm">{action.title}</div>
                  <div className="text-xs opacity-80">{action.description}</div>
                </div>
              </Link>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}