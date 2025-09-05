import { Clock, AlertTriangle, Wrench, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "inspecao" | "rnc" | "os";
  title: string;
  description: string;
  time: string;
  status: "aberta" | "em_andamento" | "concluida";
  priority?: "baixa" | "media" | "alta" | "urgente";
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "rnc",
    title: "RNC-202501-001",
    description: "Defeito dimensional - Molde 143",
    time: "há 2h",
    status: "aberta",
    priority: "alta",
  },
  {
    id: "2",
    type: "os",
    title: "OS-2025-0234",
    description: "Manutenção preventiva - Máquina 05",
    time: "há 4h",
    status: "em_andamento",
    priority: "media",
  },
  {
    id: "3",
    type: "inspecao",
    title: "Inspeção Lote L240115",
    description: "Peças conformes - Turno 1",
    time: "há 6h",
    status: "concluida",
  },
];

const getActivityIcon = (type: ActivityItem["type"]) => {
  switch (type) {
    case "rnc":
      return AlertTriangle;
    case "os":
      return Wrench;
    case "inspecao":
      return CheckCircle;
    default:
      return Clock;
  }
};

const getStatusColor = (status: ActivityItem["status"]) => {
  switch (status) {
    case "aberta":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "em_andamento":
      return "bg-warning/10 text-warning border-warning/20";
    case "concluida":
      return "bg-success/10 text-success border-success/20";
    default:
      return "bg-secondary/10 text-secondary border-secondary/20";
  }
};

const getPriorityColor = (priority?: ActivityItem["priority"]) => {
  if (!priority) return "";
  
  switch (priority) {
    case "urgente":
      return "bg-priority-urgent text-white";
    case "alta":
      return "bg-priority-high text-white";
    case "media":
      return "bg-priority-medium text-white";
    case "baixa":
      return "bg-priority-low text-white";
    default:
      return "";
  }
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Atividade Recente
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockActivities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className="rounded-full p-2 bg-accent">
                <Icon className="h-4 w-4 text-accent-foreground" />
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm text-card-foreground">
                    {activity.title}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", getStatusColor(activity.status))}
                  >
                    {activity.status.replace("_", " ")}
                  </Badge>
                  
                  {activity.priority && (
                    <Badge 
                      variant="secondary" 
                      className={cn("text-xs", getPriorityColor(activity.priority))}
                    >
                      {activity.priority}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="text-center pt-2">
          <button className="text-sm text-primary hover:underline">
            Ver todas as atividades
          </button>
        </div>
      </CardContent>
    </Card>
  );
}