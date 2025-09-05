import { useState } from "react";
import { Send, Image, AlertTriangle, Camera, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChatMessage {
  id: string;
  autor: string;
  texto: string;
  prioridade: "normal" | "alta" | "urgente";
  foto_url?: string;
  created_at: string;
  avatar?: string;
}

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    autor: "João Silva",
    texto: "Galera, a máquina 05 está com problema no sistema de refrigeração. Já abri a OS-2025-0234.",
    prioridade: "alta",
    created_at: "2025-01-15T14:30:00Z",
    avatar: "JS",
  },
  {
    id: "2",
    autor: "Ana Costa",
    texto: "Recebi João! Vou dar uma olhada na OS. O molde 143 mesmo?",
    prioridade: "normal",
    created_at: "2025-01-15T14:32:00Z",
    avatar: "AC",
  },
  {
    id: "3",
    autor: "Carlos Oliveira",
    texto: "Pessoal, URGENTE! Lote L240115 com defeito dimensional crítico. Parando a produção da MAQ-05 imediatamente.",
    prioridade: "urgente",
    created_at: "2025-01-15T14:35:00Z",
    avatar: "CO",
  },
  {
    id: "4",
    autor: "Pedro Lima",
    texto: "Carlos, pode ser relacionado ao problema que o João relatou. Vou verificar o molde.",
    prioridade: "alta",
    created_at: "2025-01-15T14:37:00Z",
    avatar: "PL",
  },
  {
    id: "5",
    autor: "Maria Santos",
    texto: "Pessoal, consegui algumas fotos do defeito. Vou enviar para análise.",
    prioridade: "normal",
    created_at: "2025-01-15T14:40:00Z",
    avatar: "MS",
    foto_url: "/placeholder-image.jpg",
  },
];

const getPrioridadeColor = (prioridade: ChatMessage["prioridade"]) => {
  switch (prioridade) {
    case "urgente":
      return "bg-priority-urgent text-white";
    case "alta":
      return "bg-priority-high text-white";
    case "normal":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const getPrioridadeIcon = (prioridade: ChatMessage["prioridade"]) => {
  switch (prioridade) {
    case "urgente":
      return <AlertTriangle className="h-3 w-3" />;
    case "alta":
      return <AlertTriangle className="h-3 w-3" />;
    default:
      return null;
  }
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("pt-BR", { 
    hour: "2-digit", 
    minute: "2-digit" 
  });
};

export default function Chat() {
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<"normal" | "alta" | "urgente">("normal");
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      autor: "João Silva", // User atual
      texto: message,
      prioridade: priority,
      created_at: new Date().toISOString(),
      avatar: "JS",
    };

    setMessages([...messages, newMessage]);
    setMessage("");
    setPriority("normal");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-fade-in">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-foreground">Chat da Equipe</h1>
        <p className="text-muted-foreground">Comunicação em tempo real</p>
      </div>

      {/* Messages Container */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Canal Geral - Produção</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 bg-success rounded-full animate-bounce-subtle" />
            <span>8 membros online</span>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 space-y-4 overflow-y-auto mb-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.avatar} />
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    {msg.avatar}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-card-foreground">
                      {msg.autor}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(msg.created_at)}
                    </span>
                    {msg.prioridade !== "normal" && (
                      <Badge className={`text-xs ${getPrioridadeColor(msg.prioridade)}`}>
                        {getPrioridadeIcon(msg.prioridade)}
                        {msg.prioridade.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-sm text-card-foreground">
                    {msg.texto}
                  </div>
                  
                  {msg.foto_url && (
                    <div className="mt-2">
                      <img 
                        src={msg.foto_url} 
                        alt="Anexo" 
                        className="max-w-64 rounded-lg border border-border cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="space-y-3 border-t border-border pt-4">
            {/* Priority Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Prioridade:</span>
              <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="pr-20"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Camera className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Paperclip className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}