import { useState } from "react";
import { Search, Filter, Plus, AlertTriangle, Calendar, User, FileText } from "lucide-react";
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

interface RNCItem {
  id: string;
  numero: string;
  data: string;
  setor: string;
  maquina: string;
  molde: string;
  defeito: string;
  severidade: "baixa" | "media" | "alta";
  status: "aberta" | "em_analise" | "fechada";
  responsavel: string;
  prazo: string;
}

const mockRNCs: RNCItem[] = [
  {
    id: "1",
    numero: "RNC-202501-001",
    data: "2025-01-15",
    setor: "Injeção",
    maquina: "MAQ-05",
    molde: "MOL-143",
    defeito: "Defeito dimensional",
    severidade: "alta",
    status: "aberta",
    responsavel: "Carlos Oliveira",
    prazo: "2025-01-20",
  },
  {
    id: "2",
    numero: "RNC-202501-002",
    data: "2025-01-14",
    setor: "Acabamento",
    maquina: "MAQ-07",
    molde: "MOL-089",
    defeito: "Risco superficial",
    severidade: "media",
    status: "em_analise",
    responsavel: "Ana Santos",
    prazo: "2025-01-18",
  },
  {
    id: "3",
    numero: "RNC-202501-003",
    data: "2025-01-13",
    setor: "Injeção",
    maquina: "MAQ-02",
    molde: "MOL-056",
    defeito: "Bolha interna",
    severidade: "baixa",
    status: "fechada",
    responsavel: "Pedro Lima",
    prazo: "2025-01-16",
  },
];

const getSeveridadeColor = (severidade: RNCItem["severidade"]) => {
  switch (severidade) {
    case "alta":
      return "bg-destructive text-destructive-foreground";
    case "media":
      return "bg-warning text-warning-foreground";
    case "baixa":
      return "bg-success text-success-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const getStatusColor = (status: RNCItem["status"]) => {
  switch (status) {
    case "aberta":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "em_analise":
      return "bg-warning/10 text-warning border-warning/20";
    case "fechada":
      return "bg-success/10 text-success border-success/20";
    default:
      return "bg-secondary/10 text-secondary border-secondary/20";
  }
};

export default function RNC() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeveridade, setFilterSeveridade] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredRNCs = mockRNCs.filter((rnc) => {
    const matchesSearch = 
      rnc.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rnc.defeito.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rnc.maquina.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rnc.responsavel.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeveridade = !filterSeveridade || rnc.severidade === filterSeveridade;
    const matchesStatus = !filterStatus || rnc.status === filterStatus;
    
    return matchesSearch && matchesSeveridade && matchesStatus;
  });

  const statusCounts = {
    aberta: mockRNCs.filter(r => r.status === "aberta").length,
    em_analise: mockRNCs.filter(r => r.status === "em_analise").length,
    fechada: mockRNCs.filter(r => r.status === "fechada").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Relatórios de Não Conformidade</h1>
          <p className="text-muted-foreground">Gestão de não conformidades e ações corretivas</p>
        </div>
        <Button variant="destructive" asChild>
          <Link to="/rnc/nova">
            <Plus className="h-4 w-4" />
            Abrir RNC
          </Link>
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-destructive/20 bg-destructive-light">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" />
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
                <FileText className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">{statusCounts.em_analise}</p>
                <p className="text-sm text-muted-foreground">Em Análise</p>
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
                <p className="text-2xl font-bold text-success">{statusCounts.fechada}</p>
                <p className="text-sm text-muted-foreground">Fechadas</p>
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
                placeholder="Buscar por número, defeito ou responsável..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterSeveridade} onValueChange={setFilterSeveridade}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Severidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas</SelectItem>
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
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="aberta">Aberta</SelectItem>
                <SelectItem value="em_analise">Em Análise</SelectItem>
                <SelectItem value="fechada">Fechada</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* RNC List */}
      <div className="space-y-4">
        {filteredRNCs.map((rnc) => (
          <Card key={rnc.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-card-foreground">
                        {rnc.numero}
                      </h3>
                      <Badge className={getSeveridadeColor(rnc.severidade)}>
                        {rnc.severidade.toUpperCase()}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(rnc.status)}
                      >
                        {rnc.status.replace("_", " ").toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {rnc.data}
                      </span>
                      <span>{rnc.setor}</span>
                    </div>
                  </div>
                  <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Máquina/Molde:</span>
                      <p className="font-medium">{rnc.maquina} - {rnc.molde}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Responsável:</span>
                      <p className="font-medium">{rnc.responsavel}</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground text-sm">Defeito:</span>
                    <p className="font-medium">{rnc.defeito}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Prazo: <span className="font-medium text-card-foreground">{rnc.prazo}</span>
                    </span>
                    {rnc.status === "aberta" && new Date(rnc.prazo) < new Date() && (
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

      {filteredRNCs.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">
              Nenhuma RNC encontrada
            </h3>
            <p className="text-muted-foreground mb-4">
              Não há relatórios que correspondam aos filtros selecionados.
            </p>
            <Button variant="destructive" asChild>
              <Link to="/rnc/nova">
                <Plus className="h-4 w-4" />
                Abrir Nova RNC
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}