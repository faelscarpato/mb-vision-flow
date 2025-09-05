import { useState } from "react";
import { Search, Filter, Plus, Wrench, Calendar, User, Clock, Camera } from "lucide-react";
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

interface OSItem {
  id: string;
  numero: string;
  data: string;
  origem: "producao" | "qualidade" | "manutencao";
  solicitante: string;
  maquina: string;
  molde: string;
  problema: string;
  prioridade: "baixa" | "media" | "alta" | "urgente";
  status: "aberta" | "em_andamento" | "concluida";
  responsavel: string;
  prazo: string;
  interacoes: number;
}

const mockOS: OSItem[] = [
  {
    id: "1",
    numero: "OS-2025-0234",
    data: "2025-01-15",
    origem: "producao",
    solicitante: "Carlos Silva",
    maquina: "MAQ-05",
    molde: "MOL-143",
    problema: "Problema no sistema de refrigeração",
    prioridade: "alta",
    status: "em_andamento",
    responsavel: "João Ferramenteiro",
    prazo: "2025-01-16",
    interacoes: 3,
  },
  {
    id: "2",
    numero: "OS-2025-0235",
    data: "2025-01-15",
    origem: "qualidade",
    solicitante: "Ana Costa",
    maquina: "MAQ-03",
    molde: "MOL-087",
    problema: "Ajuste de cavidade - dimensional fora",
    prioridade: "urgente",
    status: "aberta",
    responsavel: "Pedro Mecânico",
    prazo: "2025-01-15",
    interacoes: 1,
  },
  {
    id: "3",
    numero: "OS-2025-0233",
    data: "2025-01-14",
    origem: "manutencao",
    solicitante: "Roberto Dias",
    maquina: "MAQ-01",
    molde: "MOL-056",
    problema: "Manutenção preventiva programada",
    prioridade: "media",
    status: "concluida",
    responsavel: "Carlos Técnico",
    prazo: "2025-01-14",
    interacoes: 5,
  },
];

const getPrioridadeColor = (prioridade: OSItem["prioridade"]) => {
  switch (prioridade) {
    case "urgente":
      return "bg-priority-urgent text-white";
    case "alta":
      return "bg-priority-high text-white";
    case "media":
      return "bg-priority-medium text-white";
    case "baixa":
      return "bg-priority-low text-white";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const getStatusColor = (status: OSItem["status"]) => {
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

const getOrigemLabel = (origem: OSItem["origem"]) => {
  switch (origem) {
    case "producao":
      return "Produção";
    case "qualidade":
      return "Qualidade";
    case "manutencao":
      return "Manutenção";
    default:
      return origem;
  }
};

export default function OS() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPrioridade, setFilterPrioridade] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredOS = mockOS.filter((os) => {
    const matchesSearch = 
      os.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.problema.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.maquina.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.responsavel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      os.solicitante.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrioridade = !filterPrioridade || filterPrioridade === "todas" || os.prioridade === filterPrioridade;
    const matchesStatus = !filterStatus || filterStatus === "todos" || os.status === filterStatus;
    
    return matchesSearch && matchesPrioridade && matchesStatus;
  });

  const statusCounts = {
    aberta: mockOS.filter(o => o.status === "aberta").length,
    em_andamento: mockOS.filter(o => o.status === "em_andamento").length,
    concluida: mockOS.filter(o => o.status === "concluida").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ordens de Serviço</h1>
          <p className="text-muted-foreground">Ferramentaria e manutenção</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Camera className="h-4 w-4" />
            OCR
          </Button>
          <Button asChild>
            <Link to="/os/nova">
              <Plus className="h-4 w-4" />
              Nova OS
            </Link>
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-destructive/20 bg-destructive-light">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <Clock className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-destructive">{statusCounts.aberta}</p>
                <p className="text-sm text-muted-foreground">Abertas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/20 bg-warning-light">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Wrench className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">{statusCounts.em_andamento}</p>
                <p className="text-sm text-muted-foreground">Em Andamento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-success/20 bg-success-light">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <User className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{statusCounts.concluida}</p>
                <p className="text-sm text-muted-foreground">Concluídas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por número, problema ou responsável..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterPrioridade} onValueChange={setFilterPrioridade}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="urgente">Urgente</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Média</SelectItem>
                <SelectItem value="baixa">Baixa</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="aberta">Aberta</SelectItem>
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

      {/* OS List */}
      <div className="space-y-4">
        {filteredOS.map((os) => (
          <Card key={os.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-card-foreground">
                        {os.numero}
                      </h3>
                      <Badge className={getPrioridadeColor(os.prioridade)}>
                        {os.prioridade.toUpperCase()}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(os.status)}
                      >
                        {os.status.replace("_", " ").toUpperCase()}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {getOrigemLabel(os.origem)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {os.data}
                      </span>
                      <span>Prazo: {os.prazo}</span>
                    </div>
                  </div>
                  <Wrench className="h-5 w-5 text-muted-foreground" />
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Máquina/Molde:</span>
                      <p className="font-medium">{os.maquina} - {os.molde}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Solicitante:</span>
                      <p className="font-medium">{os.solicitante}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Responsável:</span>
                      <p className="font-medium">{os.responsavel}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Interações:</span>
                      <p className="font-medium">{os.interacoes}</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground text-sm">Problema:</span>
                    <p className="font-medium">{os.problema}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    {os.prioridade === "urgente" && os.status === "aberta" && (
                      <Badge variant="destructive" className="text-xs animate-bounce-subtle">
                        ATENÇÃO: URGENTE
                      </Badge>
                    )}
                    {os.status === "aberta" && new Date(os.prazo) < new Date() && (
                      <Badge variant="destructive" className="text-xs">
                        Em Atraso
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOS.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">
              Nenhuma OS encontrada
            </h3>
            <p className="text-muted-foreground mb-4">
              Não há ordens de serviço que correspondam aos filtros selecionados.
            </p>
            <Button asChild>
              <Link to="/os/nova">
                <Plus className="h-4 w-4" />
                Criar Nova OS
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}