import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Send, MessageSquare, FileText, Clock, CheckCheck } from "lucide-react";

const conversationsData = [
  { id: 1, cliente: "Distribuidora La Estrella S.A.", ultimoMensaje: "Gracias por la lista de precios", fecha: "2025-10-20 15:30", estado: "leido" },
  { id: 2, cliente: "Kiosco El Rápido", ultimoMensaje: "¿Tienen stock de Coca Cola 2.25L?", fecha: "2025-10-20 14:15", estado: "sin-leer" },
  { id: 3, cliente: "Supermercado Norte S.R.L.", ultimoMensaje: "Pedido recibido correctamente", fecha: "2025-10-19 18:45", estado: "leido" },
  { id: 4, cliente: "Almacén Don Pedro", ultimoMensaje: "Necesito actualización de precios", fecha: "2025-10-19 11:20", estado: "sin-leer" },
];

const messagesData = [
  { id: 1, emisor: "cliente", texto: "Hola, necesito actualizar mi pedido", hora: "14:10" },
  { id: 2, emisor: "sistema", texto: "Buenos días, ¿en qué puedo ayudarte?", hora: "14:12" },
  { id: 3, emisor: "cliente", texto: "¿Tienen stock de Coca Cola 2.25L?", hora: "14:15" },
  { id: 4, emisor: "sistema", texto: "Sí, tenemos 45 unidades disponibles", hora: "14:16" },
];

export function CommunicationView() {
  const [selectedConversation, setSelectedConversation] = useState(conversationsData[1]);
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Comunicación con Clientes</h1>
          <p className="text-muted-foreground">Chat y mensajería</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Enviar Lista de Precios
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Conversaciones</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="space-y-1 p-4">
                {conversationsData.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedConversation?.id === conv.id
                        ? "bg-primary/10 border border-primary"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-medium truncate">{conv.cliente}</p>
                      {conv.estado === "sin-leer" && (
                        <Badge variant="destructive" className="ml-2 h-5 px-1.5">
                          <MessageSquare className="h-3 w-3" />
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate mb-1">
                      {conv.ultimoMensaje}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <Clock className="inline h-3 w-3 mr-1" />
                      {new Date(conv.fecha).toLocaleString('es-AR', { 
                        day: '2-digit', 
                        month: '2-digit', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedConversation.cliente}</CardTitle>
                <p className="text-sm text-muted-foreground">Última actividad: {new Date(selectedConversation.fecha).toLocaleString('es-AR')}</p>
              </div>
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Ver Historial
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[450px] p-4">
              <div className="space-y-4">
                {messagesData.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.emisor === "sistema" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.emisor === "sistema"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.texto}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <p className="text-xs opacity-70">{message.hora}</p>
                        {message.emisor === "sistema" && (
                          <CheckCheck className="h-3 w-3 opacity-70" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Escribe un mensaje..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[60px] resize-none"
                />
                <Button size="icon" className="h-[60px] w-[60px]">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-primary">
        <CardHeader className="bg-primary/5">
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4>Enviar Lista de Precios</h4>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Distribuidora La Estrella S.A.</SelectItem>
                  <SelectItem value="2">Kiosco El Rápido</SelectItem>
                  <SelectItem value="3">Supermercado Norte S.R.L.</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Enviar Lista
              </Button>
            </div>

            <div className="space-y-3">
              <h4>Plantillas de Mensajes</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm">
                  "Hola, tu pedido está listo para retiro"
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  "Tenemos nuevos productos disponibles"
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  "Recordatorio de pago pendiente"
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
