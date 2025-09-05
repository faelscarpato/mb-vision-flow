import { useState, useEffect } from "react";
import { Search, Filter, Plus, Calendar, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useInspecoes } from "@/hooks/useSupabase";
import { Skeleton } from "@/components/ui/skeleton";

interface Inspecao {
  id: string;
  data: string;
  hora: string;
  turno: string;
  maquina: string;
  molde: string;
  operador: string;
  inspetor: string;
  status: "em_andamento" | "concluida" | "pendente";
  totalItens: number;
  conformes: number;
  naoConformes: number;
}

const mockInspecoes: Inspecao[] = [
  {
    id: "1",
    data: "2025-01-15",
    hora: "14:30",
    turno: "2",
    maquina: "MAQ-05",
    molde: "MOL-143",
    operador: "Carlos Silva",
    inspetor: "João Silva",
    status: "concluida",
    totalItens: 20,
    conformes: 18,
    naoConformes: 2,
  },
  {
    id: "2",
    data: "2025-01-15",
    hora: "13:45",
    turno: "2",
    maquina: "MAQ-03",
    molde: "MOL-087",
    operador: "Maria Santos",
    inspetor: "Ana Costa",
    status: "em_andamento",
    totalItens: 15,
    conformes: 12,
    naoConformes: 0,
  },
  {
    id: "3",
    data: "2025-01-15",
    hora: "12:00",
    turno: "1",
    maquina: "MAQ-01",
    molde: "MOL-056",
    operador: "Pedro Lima",
    inspetor: "Roberto Dias",
    status: "pendente",
    totalItens: 25,
    conformes: 0,
    naoConformes: 0,
  },
];

const getStatusColor = (status: Inspecao["status"]) => {
  switch (status) {
    case "concluida":
      return "bg-success text-success-foreground";
    case "em_andamento":
      return "bg-warning text-warning-foreground";
    case "pendente":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const getStatusLabel = (status: Inspecao["status"]) => {
  switch (status) {
    case "concluida":
      return "Concluída";
    case "em_andamento":
      return "Em Andamento";
    case "pendente":
      return "Pendente";
    default:
      return "Desconhecido";
  }
};

export default function Inspecoes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMaquina, setFilterMaquina] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  
  const { data: inspecoes, isLoading, error } = useInspecoes();

  const filteredInspecoes = inspecoes?.filter((inspecao) => {
    const matchesSearch = 
      inspecao.maquina.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspecao.molde.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspecao.operador?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspecao.inspetor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMaquina = !filterMaquina || filterMaquina === "todas" || inspecao.maquina === filterMaquina;
    const matchesStatus = !filterStatus || filterStatus === "todos" || getInspecaoStatus(inspecao) === filterStatus;
    
    return matchesSearch && matchesMaquina && matchesStatus;
  }) || [];

  // Função para determinar status da inspeção baseado nos itens
  const getInspecaoStatus = (inspecao: any) => {
    if (!inspecao.inspecao_itens || inspecao.inspecao_itens.length === 0) {
      return "pendente";
    }
    
    const totalItens = inspecao.inspecao_itens.length;
    const itensPreenchidos = inspecao.inspecao_itens.filter((item: any) => item.status).length;
    
    if (itensPreenchidos === 0) return "pendente";
    if (itensPreenchidos === totalItens) return "concluida";
    return "em_andamento";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluida":
        return "bg-success text-success-foreground";
      case "em_andamento":
        return "bg-warning text-warning-foreground";
      case "pendente":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "concluida":
        return "Concluída";
      case "em_andamento":
        return "Em Andamento";
      case "pendente":
        return "Pendente";
      default:
        return "Desconhecido";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Inspeções</h1>
            <p className="text-muted-foreground">Controle de qualidade em produção</p>
          </div>
          <Button disabled>
            <Plus className="h-4 w-4" />
            Nova Inspeção
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in">
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-medium text-card-foreground mb-2">
              Erro ao carregar inspeções
            </h3>
            <p className="text-muted-foreground mb-4">
              {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inspeções</h1>
          <p className="text-muted-foreground">Controle de qualidade em produção</p>
        </div>
        <Button asChild>
          <Link to="/inspecoes/nova">
            <Plus className="h-4 w-4" />
            Nova Inspeção
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por máquina, molde ou operador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterMaquina} onValueChange={setFilterMaquina}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Máquina" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="MAQ-01">MAQ-01</SelectItem>
                <SelectItem value="MAQ-03">MAQ-03</SelectItem>
                <SelectItem value="MAQ-05">MAQ-05</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluida">Concluída</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inspeções List */}
      <div className="space-y-4">
        {filteredInspecoes.map((inspecao) => {
          const status = getInspecaoStatus(inspecao);
          const totalItens = inspecao.inspecao_itens?.length || 0;
          const itensPreenchidos = inspecao.inspecao_itens?.filter((item: any) => item.status).length || 0;
          const naoConformes = inspecao.inspecao_itens?.filter((item: any) => item.status === 'NC').length || 0;
          
          return (
            <Card key={inspecao.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-card-foreground">
                          {inspecao.maquina} - {inspecao.molde}
                        </h3>
                        <Badge className={getStatusColor(status)}>
                          {getStatusLabel(status)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(inspecao.data).toLocaleDateString('pt-BR')} às {inspecao.hora}
                        </span>
                        <span>Turno {inspecao.turno}</span>
                      </div>
                    </div>
                    <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Operador:</span>
                      <p className="font-medium">{inspecao.operador || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Inspetor:</span>
                      <p className="font-medium">{inspecao.inspetor}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  {status !== "pendente" && totalItens > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progresso:</span>
                        <span className="font-medium">
                          {itensPreenchidos}/{totalItens} itens
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ 
                            width: `${(itensPreenchidos / totalItens) * 100}%` 
                          }}
                        />
                      </div>
                      {naoConformes > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">Não conformes:</span>
                          <Badge variant="destructive" className="text-xs">
                            {naoConformes}
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredInspecoes.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <ClipboardCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">
              Nenhuma inspeção encontrada
            </h3>
            <p className="text-muted-foreground mb-4">
              Não há inspeções que correspondam aos filtros selecionados.
            </p>
            <Button asChild>
              <Link to="/inspecoes/nova">
                <Plus className="h-4 w-4" />
                Criar Nova Inspeção
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}