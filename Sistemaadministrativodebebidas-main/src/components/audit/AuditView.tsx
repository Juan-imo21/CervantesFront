import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar as CalendarIcon, Search, ShoppingCart, Package, Edit, Trash2, UserPlus, Settings, FileText, AlertCircle } from "lucide-react";

interface AuditLog {
  id: string;
  user: string;
  action: string;
  actionType: "create" | "update" | "delete" | "login" | "config";
  details: string;
  timestamp: Date;
}

const auditData: AuditLog[] = [
  {
    id: "1",
    user: "Juan Pérez",
    action: "Creó un nuevo pedido",
    actionType: "create",
    details: "Pedido #PED045 - Cliente: Almacén Don Pedro - Total: $12,500",
    timestamp: new Date(2025, 9, 27, 10, 30),
  },
  {
    id: "2",
    user: "María González",
    action: "Actualizó el stock",
    actionType: "update",
    details: "Pepsi 2.25L - Cantidad: 150 → 180 unidades",
    timestamp: new Date(2025, 9, 27, 9, 15),
  },
  {
    id: "3",
    user: "Carlos Rodríguez",
    action: "Eliminó un producto",
    actionType: "delete",
    details: "Producto: Fanta Lima 2L (descontinuado)",
    timestamp: new Date(2025, 9, 27, 8, 45),
  },
  {
    id: "4",
    user: "Ana Martínez",
    action: "Registró nuevo cliente",
    actionType: "create",
    details: "Cliente: Kiosco San Martín - Tipo: Informal",
    timestamp: new Date(2025, 9, 26, 16, 20),
  },
  {
    id: "5",
    user: "Juan Pérez",
    action: "Modificó configuración",
    actionType: "config",
    details: "Cambió umbral de stock bajo de 10 a 15 unidades",
    timestamp: new Date(2025, 9, 26, 14, 10),
  },
  {
    id: "6",
    user: "Laura Torres",
    action: "Actualizó pedido",
    actionType: "update",
    details: "Pedido #PED042 - Estado: Pendiente → Entregado",
    timestamp: new Date(2025, 9, 26, 11, 30),
  },
  {
    id: "7",
    user: "Carlos Rodríguez",
    action: "Creó nuevo producto",
    actionType: "create",
    details: "Producto: Sprite Zero 2.5L - Categoría: Gaseosas",
    timestamp: new Date(2025, 9, 25, 15, 45),
  },
  {
    id: "8",
    user: "María González",
    action: "Inició sesión",
    actionType: "login",
    details: "Login exitoso desde IP: 192.168.1.45",
    timestamp: new Date(2025, 9, 25, 9, 0),
  },
];

export function AuditView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUser, setFilterUser] = useState("all");
  const [filterAction, setFilterAction] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case "create":
        return <ShoppingCart className="h-5 w-5" />;
      case "update":
        return <Edit className="h-5 w-5" />;
      case "delete":
        return <Trash2 className="h-5 w-5" />;
      case "login":
        return <UserPlus className="h-5 w-5" />;
      case "config":
        return <Settings className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case "create":
        return "bg-green-500";
      case "update":
        return "bg-blue-500";
      case "delete":
        return "bg-red-500";
      case "login":
        return "bg-purple-500";
      case "config":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getActionBadge = (actionType: string) => {
    switch (actionType) {
      case "create":
        return <Badge className="bg-green-500">Creación</Badge>;
      case "update":
        return <Badge className="bg-blue-500">Actualización</Badge>;
      case "delete":
        return <Badge className="bg-red-500">Eliminación</Badge>;
      case "login":
        return <Badge className="bg-purple-500">Acceso</Badge>;
      case "config":
        return <Badge className="bg-orange-500">Configuración</Badge>;
      default:
        return <Badge>Otro</Badge>;
    }
  };

  const filteredLogs = auditData.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUser = filterUser === "all" || log.user === filterUser;
    const matchesAction = filterAction === "all" || log.actionType === filterAction;
    
    let matchesDate = true;
    if (dateFrom && dateTo) {
      matchesDate = log.timestamp >= dateFrom && log.timestamp <= dateTo;
    } else if (dateFrom) {
      matchesDate = log.timestamp >= dateFrom;
    } else if (dateTo) {
      matchesDate = log.timestamp <= dateTo;
    }

    return matchesSearch && matchesUser && matchesAction && matchesDate;
  });

  const uniqueUsers = Array.from(new Set(auditData.map((log) => log.user)));

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDateShort = (date: Date | undefined) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Auditoría del Sistema</h1>
        <p className="text-muted-foreground">Registro de todas las acciones realizadas en el sistema</p>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar en registros..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* User Filter */}
            <Select value={filterUser} onValueChange={setFilterUser}>
              <SelectTrigger>
                <SelectValue placeholder="Usuario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los usuarios</SelectItem>
                {uniqueUsers.map((user) => (
                  <SelectItem key={user} value={user}>
                    {user}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Action Type Filter */}
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de acción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las acciones</SelectItem>
                <SelectItem value="create">Creación</SelectItem>
                <SelectItem value="update">Actualización</SelectItem>
                <SelectItem value="delete">Eliminación</SelectItem>
                <SelectItem value="login">Acceso</SelectItem>
                <SelectItem value="config">Configuración</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Range */}
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex-1">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? formatDateShort(dateFrom) : "Desde"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex-1">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? formatDateShort(dateTo) : "Hasta"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {(searchTerm || filterUser !== "all" || filterAction !== "all" || dateFrom || dateTo) && (
            <div className="mt-4 flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setFilterUser("all");
                  setFilterAction("all");
                  setDateFrom(undefined);
                  setDateTo(undefined);
                }}
              >
                Limpiar filtros
              </Button>
              <Badge variant="secondary">
                {filteredLogs.length} registro{filteredLogs.length !== 1 ? "s" : ""} encontrado{filteredLogs.length !== 1 ? "s" : ""}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          {filteredLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No se encontraron registros</p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

              {/* Timeline Items */}
              <div className="space-y-6">
                {filteredLogs.map((log, index) => (
                  <div key={log.id} className="relative flex gap-4">
                    {/* Icon */}
                    <div className={`relative z-10 flex-shrink-0 h-12 w-12 rounded-full ${getActionColor(log.actionType)} flex items-center justify-center text-white shadow-lg`}>
                      {getActionIcon(log.actionType)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-[#F3F6FA] rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-foreground">{log.user}</p>
                            {getActionBadge(log.actionType)}
                          </div>
                          <p className="text-muted-foreground">{log.action}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm text-muted-foreground">
                            {formatDate(log.timestamp)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatTime(log.timestamp)}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground bg-white rounded px-3 py-2">
                        {log.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
