import { useState } from "react";
import { Brain, Upload, Camera, Download, FileText, Image as ImageIcon, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalysisResult {
  id: string;
  type: "compare" | "analyze";
  timestamp: string;
  result: string;
  confidence: number;
  context?: {
    maquina?: string;
    molde?: string;
    inspetor?: string;
  };
}

const mockResults: AnalysisResult[] = [
  {
    id: "1",
    type: "compare",
    timestamp: "2025-01-15T14:23:00Z",
    result: "Análise comparativa concluída:\n\n✅ CONFORMIDADE GERAL: 85%\n\n🔍 DEFEITOS IDENTIFICADOS:\n• Dimensional: Variação de 0.2mm na altura (tolerância: ±0.1mm)\n• Superficial: Pequena marca de ejetor na lateral\n\n💡 POSSÍVEIS CAUSAS:\n• Desgaste dos pinos ejetores\n• Temperatura de injeção elevada\n• Pressão de recalque insuficiente\n\n⚡ AÇÕES IMEDIATAS:\n• Verificar e substituir pinos ejetores\n• Ajustar temperatura para 245°C\n• Aumentar pressão de recalque em 10%",
    confidence: 92,
    context: {
      maquina: "MAQ-05",
      molde: "MOL-143",
      inspetor: "João Silva",
    },
  },
  {
    id: "2",
    type: "analyze",
    timestamp: "2025-01-15T13:15:00Z",
    result: "Análise individual concluída:\n\n✅ STATUS: CONFORME\n\n🔍 OBSERVAÇÕES:\n• Superfície lisa e uniforme\n• Dimensões dentro da tolerância\n• Ausência de defeitos visuais\n\n💡 RECOMENDAÇÕES:\n• Manter parâmetros atuais de processo\n• Monitorar desgaste do molde",
    confidence: 96,
  },
];

const formatTimestamp = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function IA() {
  const [activeTab, setActiveTab] = useState("compare");
  const [results, setResults] = useState(mockResults);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [standardImage, setStandardImage] = useState<File | null>(null);
  const [producedImage, setProducedImage] = useState<File | null>(null);
  const [singleImage, setSingleImage] = useState<File | null>(null);
  const [context, setContext] = useState({
    maquina: "",
    molde: "",
    inspetor: "",
  });

  const handleCompareAnalysis = async () => {
    if (!standardImage || !producedImage) return;
    
    setIsAnalyzing(true);
    
    // Simular análise da IA
    setTimeout(() => {
      const newResult: AnalysisResult = {
        id: Date.now().toString(),
        type: "compare",
        timestamp: new Date().toISOString(),
        result: "Análise comparativa em andamento...\n\nProcessando imagens com IA...",
        confidence: 94,
        context,
      };
      
      setResults([newResult, ...results]);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleSingleAnalysis = async () => {
    if (!singleImage) return;
    
    setIsAnalyzing(true);
    
    // Simular análise da IA
    setTimeout(() => {
      const newResult: AnalysisResult = {
        id: Date.now().toString(),
        type: "analyze",
        timestamp: new Date().toISOString(),
        result: "Análise individual em andamento...\n\nProcessando imagem com IA...",
        confidence: 91,
      };
      
      setResults([newResult, ...results]);
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            Análise com IA
          </h1>
          <p className="text-muted-foreground">Inteligência artificial para controle de qualidade</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-success-light border border-success/20">
          <div className="h-2 w-2 bg-success rounded-full animate-bounce-subtle" />
          <span className="text-sm font-medium text-success">IA Online</span>
        </div>
      </div>

      {/* Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="compare" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Comparar Peças
          </TabsTrigger>
          <TabsTrigger value="analyze" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Análise Individual
          </TabsTrigger>
        </TabsList>

        {/* Compare Parts Tab */}
        <TabsContent value="compare" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Comparação Peça Padrão vs Produzida
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Context Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="maquina">Máquina</Label>
                  <Input
                    id="maquina"
                    value={context.maquina}
                    onChange={(e) => setContext({...context, maquina: e.target.value})}
                    placeholder="Ex: MAQ-05"
                  />
                </div>
                <div>
                  <Label htmlFor="molde">Molde</Label>
                  <Input
                    id="molde"
                    value={context.molde}
                    onChange={(e) => setContext({...context, molde: e.target.value})}
                    placeholder="Ex: MOL-143"
                  />
                </div>
                <div>
                  <Label htmlFor="inspetor">Inspetor</Label>
                  <Input
                    id="inspetor"
                    value={context.inspetor}
                    onChange={(e) => setContext({...context, inspetor: e.target.value})}
                    placeholder="Ex: João Silva"
                  />
                </div>
              </div>

              {/* Image Upload Areas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Standard Image */}
                <div className="space-y-3">
                  <Label>Peça Padrão (Referência)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    {standardImage ? (
                      <div className="space-y-2">
                        <ImageIcon className="h-8 w-8 text-success mx-auto" />
                        <p className="text-sm font-medium text-success">{standardImage.name}</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setStandardImage(null)}
                        >
                          Remover
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                        <p className="text-sm text-muted-foreground">
                          Clique para enviar ou arraste a imagem
                        </p>
                        <Button variant="outline" size="sm">
                          <Camera className="h-4 w-4 mr-2" />
                          Escolher Arquivo
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Produced Image */}
                <div className="space-y-3">
                  <Label>Peça Produzida</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    {producedImage ? (
                      <div className="space-y-2">
                        <ImageIcon className="h-8 w-8 text-success mx-auto" />
                        <p className="text-sm font-medium text-success">{producedImage.name}</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setProducedImage(null)}
                        >
                          Remover
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                        <p className="text-sm text-muted-foreground">
                          Clique para enviar ou arraste a imagem
                        </p>
                        <Button variant="outline" size="sm">
                          <Camera className="h-4 w-4 mr-2" />
                          Escolher Arquivo
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Analyze Button */}
              <Button 
                onClick={handleCompareAnalysis}
                disabled={!standardImage || !producedImage || isAnalyzing}
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="h-4 w-4 mr-2 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Comparar com IA
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analyze Single Tab */}
        <TabsContent value="analyze" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Análise Individual de Peça
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Single Image Upload */}
              <div className="space-y-3">
                <Label>Imagem da Peça</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  {singleImage ? (
                    <div className="space-y-2">
                      <ImageIcon className="h-12 w-12 text-success mx-auto" />
                      <p className="text-sm font-medium text-success">{singleImage.name}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSingleImage(null)}
                      >
                        Remover
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Clique para enviar ou arraste a imagem da peça
                        </p>
                        <Button variant="outline">
                          <Camera className="h-4 w-4 mr-2" />
                          Escolher Arquivo
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Analyze Button */}
              <Button 
                onClick={handleSingleAnalysis}
                disabled={!singleImage || isAnalyzing}
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="h-4 w-4 mr-2 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Analisar com IA
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Results Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Histórico de Análises
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {results.map((result) => (
            <div key={result.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={result.type === "compare" ? "default" : "secondary"}>
                      {result.type === "compare" ? "Comparação" : "Análise Individual"}
                    </Badge>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      {result.confidence}% confiança
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatTimestamp(result.timestamp)}
                  </p>
                  {result.context && (
                    <div className="flex gap-2 text-xs">
                      {result.context.maquina && (
                        <Badge variant="outline">{result.context.maquina}</Badge>
                      )}
                      {result.context.molde && (
                        <Badge variant="outline">{result.context.molde}</Badge>
                      )}
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-3">
                <pre className="text-sm whitespace-pre-wrap font-mono">
                  {result.result}
                </pre>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}