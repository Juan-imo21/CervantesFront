import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { AlertTriangle, AlertCircle, Clock, CheckCircle, X } from "lucide-react";

const alertsData = [
  { id: 1, tipo: "stock", titulo: "Stock bajo: Cerveza Andes Roja", descripcion: "Solo quedan 5 unidades disponibles", prioridad: "alta", fecha: "2025-10-20 14:30" },
  { id: 2, tipo: "pedido", titulo: "Cliente mayorista con pedido atrasado", descripcion: "Distribuidora La Estrella S.A. - Pedido #PED001 pendiente", prioridad: "alta", fecha: "2025-10-20 12:15" },
  { id: 3, tipo: "asistencia", titulo: "Asistencia no registrada: Depósito 2", descripcion: "Luis Fernández no marcó entrada hoy", prioridad: "media", fecha: "2025-10-20 10:00" },
  { id: 4, tipo: "stock", titulo: "Próximo a vencer: Brahma Lata", descripcion: "Vence en 2 días - 56 unidades", prioridad: "media", fecha: "2025-10-20 09:00" },
  { id: 5, tipo: "pago", titulo: "Pago pendiente", descripcion: "Bar Los Amigos - Factura vencida hace 5 días", prioridad: "alta", fecha: "2025-10-19 16:45" },
  { id: 6, tipo: "stock", titulo: "Stock medio: Agua Villavicencio", descripcion: "12 paquetes restantes", prioridad: "baja", fecha: "2025-10-19 14:20" },
];

export function AlertsView() {
  const getPriorityBadge = (prioridad: string) => {
    switch (prioridad) {
      case "alta":
        return <Badge variant="destructive">Alta</Badge>;
      case "media":
        return <Badge className="bg-[#f59e0b] text-white hover:bg-[#f59e0b]/90">Media</Badge>;
      case "baja":
        return <Badge variant="secondary">Baja</Badge>;
      default:
        return <Badge>{prioridad}</Badge>;
    }
  };

  const getAlertIcon = (tipo: string, prioridad: string) => {
    const iconClass = prioridad === "alta" ? "text-destructive" : prioridad === "media" ? "text-[#f59e0b]" : "text-muted-foreground";
    
    switch (tipo) {
      case "stock":
        return <AlertTriangle className={`h-5 w-5 ${iconClass}`} />;
      case "pedido":
        return <Clock className={`h-5 w-5 ${iconClass}`} />;
      case "asistencia":
        return <AlertCircle className={`h-5 w-5 ${iconClass}`} />;
      case "pago":
        return <AlertTriangle className={`h-5 w-5 ${iconClass}`} />;
      default:
        return <AlertCircle className={`h-5 w-5 ${iconClass}`} />;
    }
  };

  const alertasAlta = alertsData.filter(a => a.prioridad === "alta").length;
  const alertasMedia = alertsData.filter(a => a.prioridad === "media").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Alertas y Notificaciones</h1>
          <p className="text-muted-foreground">Centro de alertas del sistema</p>
        </div>
        <Button variant="outline">
          <CheckCircle className="mr-2 h-4 w-4" />
          Marcar Todas como Leídas
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-destructive bg-destructive/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Alertas Críticas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{alertasAlta}</div>
            <p className="text-xs text-muted-foreground">Requieren atención inmediata</p>
          </CardContent>
        </Card>

        <Card className="border-[#f59e0b] bg-[#fffbeb]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Alertas Medias</CardTitle>
            <AlertCircle className="h-4 w-4 text-[#f59e0b]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{alertasMedia}</div>
            <p className="text-xs text-muted-foreground">Para revisar pronto</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Alertas</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{alertsData.length}</div>
            <p className="text-xs text-muted-foreground">Activas en el sistema</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alertsData.map((alert) => (
          <Card key={alert.id} className={alert.prioridad === "alta" ? "border-destructive" : alert.prioridad === "media" ? "border-[#f59e0b]" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getAlertIcon(alert.tipo, alert.prioridad)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4>{alert.titulo}</h4>
                        {getPriorityBadge(alert.prioridad)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.descripcion}</p>
                      <p className="text-xs text-muted-foreground">
                        <Clock className="inline h-3 w-3 mr-1" />
                        {new Date(alert.fecha).toLocaleString('es-AR')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">Resolver</Button>
                      <Button size="sm" variant="ghost">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Automation Settings */}
      <Card className="border-primary">
        <CardHeader className="bg-primary/5">
          <CardTitle>Automatizaciones Configuradas</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p>Alerta de Stock Bajo</p>
                <p className="text-sm text-muted-foreground">Se activa cuando el stock es menor a 20 unidades</p>
              </div>
              <Badge className="bg-[#10b981] text-white">Activo</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p>Notificación de Pedidos Atrasados</p>
                <p className="text-sm text-muted-foreground">Revisa pedidos pendientes cada 24 horas</p>
              </div>
              <Badge className="bg-[#10b981] text-white">Activo</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p>Control de Asistencia</p>
                <p className="text-sm text-muted-foreground">Notifica ausencias a las 10:00 AM</p>
              </div>
              <Badge className="bg-[#10b981] text-white">Activo</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
