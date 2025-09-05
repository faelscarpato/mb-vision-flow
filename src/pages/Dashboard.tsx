import { 
  ClipboardList, 
  AlertTriangle, 
  Wrench, 
  Brain,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { useAuth } from "@/hooks/useAuth";
import { useInspecoes, useRNCs, useOSFerramentaria } from "@/hooks/useSupabase";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: inspecoes } = useInspecoes();
  const { data: rncs } = useRNCs();
  const { data: osFerramentaria } = useOSFerramentaria();

  const getUserName = () => {
    if (!user) return "Usuário";
    const firstName = user.user_metadata?.first_name;
    const lastName = user.user_metadata?.last_name;
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    return user.email?.split('@')[0] || "Usuário";
  };

  // Calcular KPIs reais
  const inspecoesHoje = inspecoes?.filter(i => 
    new Date(i.created_at).toDateString() === new Date().toDateString()
  ).length || 0;

  const rncAbertas = rncs?.filter(r => r.status === 'Aberta').length || 0;
  const rncCriticas = rncs?.filter(r => r.severidade === 'Alta' && r.status === 'Aberta').length || 0;
  
  const osPendentes = osFerramentaria?.filter(os => os.status === 'Aberta').length || 0;
  const osUrgentes = osFerramentaria?.filter(os => os.prioridade === 'Urgente' && os.status === 'Aberta').length || 0;
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Bem-vindo, {getUserName()}
        </h2>
        <p className="text-muted-foreground">
          Acompanhe a qualidade em tempo real
        </p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Inspeções Hoje"
          value={inspecoesHoje.toString()}
          description="Meta: 30"
          icon={ClipboardList}
          trend={{
            value: 8,
            label: "vs ontem",
            type: "up",
          }}
          variant="success"
        />
        
        <KPICard
          title="RNC Abertas"
          value={rncAbertas.toString()}
          description={`${rncCriticas} críticas`}
          icon={AlertTriangle}
          trend={{
            value: 12,
            label: "vs semana",
            type: "down",
          }}
          variant="destructive"
        />
        
        <KPICard
          title="OS Pendentes"
          value={osPendentes.toString()}
          description={`${osUrgentes} urgentes`}
          icon={Wrench}
          trend={{
            value: 5,
            label: "vs ontem",
            type: "up",
          }}
          variant="warning"
        />
        
        <KPICard
          title="Análises IA"
          value="156"
          description="Este mês"
          icon={Brain}
          trend={{
            value: 23,
            label: "vs mês anterior",
            type: "up",
          }}
        />
      </div>

      {/* Performance Overview */}
      <div className="grid lg:grid-cols-3 gap-4">
        <KPICard
          title="Conformidade"
          value="94.2%"
          description="Meta: 95%"
          icon={TrendingUp}
          trend={{
            value: 2.1,
            label: "últimos 30 dias",
            type: "up",
          }}
          className="lg:col-span-1"
        />
        
        <KPICard
          title="Turno Ativo"
          value="Turno 2"
          description="8 operadores"
          icon={Users}
          className="lg:col-span-1"
        />
        
        <KPICard
          title="Última Análise IA"
          value="14:23"
          description="Peça conforme"
          icon={Clock}
          variant="success"
          className="lg:col-span-1"
        />
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  );
}