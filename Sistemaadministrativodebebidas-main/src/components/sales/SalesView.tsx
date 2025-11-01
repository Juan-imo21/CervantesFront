import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Checkbox } from "../ui/checkbox";
import { Plus, Search, Eye, Receipt, Clock, CheckCircle, Truck, Route, Users, Package, MapPin, Map, Edit, RefreshCw, Filter } from "lucide-react";

const ordersData = [
  { id: "PED001", cliente: "Distribuidora La Estrella S.A.", fecha: "2025-10-20", total: 45600, estado: "pendiente", items: 12 },
  { id: "PED002", cliente: "Kiosco El Rápido", fecha: "2025-10-20", total: 8900, estado: "preparacion", items: 5 },
  { id: "PED003", cliente: "Supermercado Norte S.R.L.", fecha: "2025-10-19", total: 78300, estado: "entregado", items: 24 },
  { id: "PED004", cliente: "Almacén Don Pedro", fecha: "2025-10-19", total: 12500, estado: "entregado", items: 8 },
  { id: "PED005", cliente: "Bar Los Amigos", fecha: "2025-10-18", total: 15200, estado: "preparacion", items: 6 },
];

const productsList = [
  { id: 1, nombre: "Cerveza Andes Roja Lata 473ml", precio: 850 },
  { id: 2, nombre: "Coca Cola 2.25L", precio: 1200 },
  { id: 3, nombre: "Sprite 2L", precio: 1100 },
  { id: 4, nombre: "Agua Villavicencio 500ml", precio: 400 },
  { id: 5, nombre: "Quilmes Clásica 1L", precio: 920 },
];

interface Order {
  id: string;
  client: string;
  address: string;
  products: string[];
  bultos: number;
  lat: number;
  lng: number;
}

interface RouteData {
  id: string;
  name: string;
  date: string;
  driver: string;
  stops: number;
  status: 'planned' | 'in-progress' | 'completed';
}

export function SalesView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<Array<{id: number, cantidad: number}>>([]);

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = order.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || order.estado === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return (
          <Badge className="bg-[#f59e0b] text-white hover:bg-[#f59e0b]/90">
            <Clock className="mr-1 h-3 w-3" />
            Pendiente
          </Badge>
        );
      case "preparacion":
        return (
          <Badge className="bg-primary text-white hover:bg-primary/90">
            <Truck className="mr-1 h-3 w-3" />
            En Preparación
          </Badge>
        );
      case "entregado":
        return (
          <Badge className="bg-[#10b981] text-white hover:bg-[#10b981]/90">
            <CheckCircle className="mr-1 h-3 w-3" />
            Entregado
          </Badge>
        );
      default:
        return <Badge>{estado}</Badge>;
    }
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((sum, sp) => {
      const product = productsList.find(p => p.id === sp.id);
      return sum + (product ? product.precio * sp.cantidad : 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Ventas y Logística</h1>
        <p className="text-muted-foreground">Gestión unificada de pedidos, ventas y rutas de entrega</p>
      </div>
      
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Pedidos y Ventas
          </TabsTrigger>
          <TabsTrigger value="logistics" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Logística y Rutas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6 mt-6">
          <SalesTabContent 
            filteredOrders={filteredOrders}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            getStatusBadge={getStatusBadge}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            calculateTotal={calculateTotal}
          />
        </TabsContent>

        <TabsContent value="logistics" className="space-y-6 mt-6">
          <LogisticsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SalesTabContent({ 
  filteredOrders, 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus, 
  getStatusBadge,
  selectedProducts,
  setSelectedProducts,
  calculateTotal
}: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Pedidos y Ventas</h1>
          <p className="text-muted-foreground">Gestión de pedidos y facturación</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Pedido
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Pedido</DialogTitle>
              <DialogDescription>
                Complete los datos para crear un nuevo pedido de venta
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cliente">Cliente</Label>
                  <Select>
                    <SelectTrigger id="cliente">
                      <SelectValue placeholder="Seleccionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Distribuidora La Estrella S.A.</SelectItem>
                      <SelectItem value="2">Kiosco El Rápido</SelectItem>
                      <SelectItem value="3">Supermercado Norte S.R.L.</SelectItem>
                      <SelectItem value="4">Almacén Don Pedro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medioPago">Medio de Pago</Label>
                  <Select>
                    <SelectTrigger id="medioPago">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="efectivo">Efectivo</SelectItem>
                      <SelectItem value="transferencia">Transferencia</SelectItem>
                      <SelectItem value="credito">Cuenta Corriente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Productos</Label>
                <Card className="bg-muted/50">
                  <CardContent className="p-4 space-y-3">
                    {productsList.map(product => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-card rounded-lg">
                        <div className="flex-1">
                          <p>{product.nombre}</p>
                          <p className="text-sm text-muted-foreground">${product.precio.toLocaleString('es-AR')}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="0"
                            className="w-20"
                            min="0"
                            onChange={(e) => {
                              const cantidad = parseInt(e.target.value) || 0;
                              setSelectedProducts(prev => {
                                const existing = prev.find(p => p.id === product.id);
                                if (existing) {
                                  return prev.map(p => p.id === product.id ? {...p, cantidad} : p);
                                }
                                return [...prev, {id: product.id, cantidad}];
                              });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-primary/5 border-primary">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <span>Total del Pedido:</span>
                    <span className="text-2xl">${calculateTotal().toLocaleString('es-AR')}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>
                <Receipt className="mr-2 h-4 w-4" />
                Confirmar y Facturar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Pedidos Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-[#f59e0b]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {ordersData.filter(o => o.estado === "pendiente").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">En Preparación</CardTitle>
            <Truck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {ordersData.filter(o => o.estado === "preparacion").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Entregados Hoy</CardTitle>
            <CheckCircle className="h-4 w-4 text-[#10b981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {ordersData.filter(o => o.estado === "entregado" && o.fecha === "2025-10-20").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por pedido o cliente..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="preparacion">En Preparación</SelectItem>
                <SelectItem value="entregado">Entregado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.cliente}</TableCell>
                  <TableCell>{new Date(order.fecha).toLocaleDateString('es-AR')}</TableCell>
                  <TableCell>{order.items} productos</TableCell>
                  <TableCell>${order.total.toLocaleString('es-AR')}</TableCell>
                  <TableCell>{getStatusBadge(order.estado)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function LogisticsTabContent() {
  const [routes, setRoutes] = useState<RouteData[]>([
    { id: '1', name: 'Ruta Norte - Mañana', date: '2025-11-01', driver: 'Juan Pérez', stops: 8, status: 'in-progress' },
    { id: '2', name: 'Ruta Centro', date: '2025-11-01', driver: 'María González', stops: 12, status: 'planned' },
    { id: '3', name: 'Ruta Sur - Tarde', date: '2025-10-31', driver: 'Carlos Rodríguez', stops: 10, status: 'completed' },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRouteDetail, setShowRouteDetail] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);
  const [showOptimizedMap, setShowOptimizedMap] = useState(false);

  const [pendingOrders] = useState<Order[]>([
    { id: 'P001', client: 'Bar El Refugio', address: 'Av. Libertador 1234', products: ['Cerveza x50', 'Gaseosas x30'], bultos: 8, lat: -34.595, lng: -58.375 },
    { id: 'P002', client: 'Resto La Esquina', address: 'Calle Corrientes 5678', products: ['Vino x20', 'Agua x40'], bultos: 6, lat: -34.603, lng: -58.381 },
    { id: 'P003', client: 'Kiosco Central', address: 'San Martín 890', products: ['Cerveza x30', 'Energizantes x20'], bultos: 5, lat: -34.608, lng: -58.373 },
    { id: 'P004', client: 'Supermercado Avenida', address: 'Av. Cabildo 2345', products: ['Gaseosas x100', 'Agua x60'], bultos: 16, lat: -34.585, lng: -58.450 },
    { id: 'P005', client: 'Bar Deportivo', address: 'Belgrano 456', products: ['Cerveza x40', 'Aperitivos x10'], bultos: 7, lat: -34.598, lng: -58.392 },
  ]);

  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [newRouteData, setNewRouteData] = useState({
    date: '2025-11-01',
    driver: '',
    depot: 'Depósito Central - Rancagua 2771',
  });

  const statusColors = {
    'planned': 'bg-blue-100 text-blue-700',
    'in-progress': 'bg-yellow-100 text-yellow-700',
    'completed': 'bg-green-100 text-green-700',
  };

  const statusLabels = {
    'planned': 'Planificada',
    'in-progress': 'En Curso',
    'completed': 'Completada',
  };

  const handleOptimizeRoute = () => {
    setShowOptimizedMap(true);
  };

  const handleSaveRoute = () => {
    const newRoute: RouteData = {
      id: `R${Date.now()}`,
      name: `Ruta ${newRouteData.driver} - ${newRouteData.date}`,
      date: newRouteData.date,
      driver: newRouteData.driver,
      stops: selectedOrders.length,
      status: 'planned',
    };
    setRoutes([newRoute, ...routes]);
    setShowCreateModal(false);
    setSelectedOrders([]);
    setNewRouteData({ date: '2025-11-01', driver: '', depot: 'Depósito Central - Rancagua 2771' });
    setShowOptimizedMap(false);
  };

  const handleViewRoute = (route: RouteData) => {
    setSelectedRoute(route);
    setShowRouteDetail(true);
  };

  const handleCompleteRoute = (routeId: string) => {
    setRoutes(routes.map(r => r.id === routeId ? { ...r, status: 'completed' } : r));
  };

  return (
    <div className="space-y-6">
      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Rutas del día</CardTitle>
            <Route className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">4</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Unidades a entregar</CardTitle>
            <Package className="h-4 w-4 text-[#10b981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">42</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Choferes activos</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">6</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Entregas completadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-[#f59e0b]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">85%</div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar rutas..." 
              className="pl-10 w-full md:w-64"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Crear Ruta
        </Button>
      </div>

      {/* Tabla de Rutas */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre de Ruta</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Chofer</TableHead>
                <TableHead>Paradas</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell>{route.name}</TableCell>
                  <TableCell>{route.date}</TableCell>
                  <TableCell>{route.driver}</TableCell>
                  <TableCell>{route.stops} paradas</TableCell>
                  <TableCell>
                    <Badge className={statusColors[route.status]}>
                      {statusLabels[route.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewRoute(route)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={handleOptimizeRoute}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      {route.status === 'in-progress' && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleCompleteRoute(route.id)}
                        >
                          <CheckCircle className="h-4 w-4 text-[#10b981]" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal Crear Ruta */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Crear Nueva Ruta</DialogTitle>
            <DialogDescription>
              Configure una nueva ruta de entrega con paradas y productos
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Datos básicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fecha">Fecha</Label>
                <Input 
                  id="fecha"
                  type="date" 
                  value={newRouteData.date}
                  onChange={(e) => setNewRouteData({...newRouteData, date: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="chofer">Chofer</Label>
                <Select 
                  value={newRouteData.driver} 
                  onValueChange={(value) => setNewRouteData({...newRouteData, driver: value})}
                >
                  <SelectTrigger id="chofer">
                    <SelectValue placeholder="Seleccionar chofer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Juan Pérez">Juan Pérez</SelectItem>
                    <SelectItem value="María González">María González</SelectItem>
                    <SelectItem value="Carlos Rodríguez">Carlos Rodríguez</SelectItem>
                    <SelectItem value="Ana Martínez">Ana Martínez</SelectItem>
                    <SelectItem value="Luis Fernández">Luis Fernández</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Punto de salida */}
            <div>
              <Label>Punto de Salida</Label>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg border mt-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{newRouteData.depot}</span>
              </div>
            </div>

            {/* Pedidos pendientes */}
            <div>
              <Label>
                Pedidos Pendientes ({selectedOrders.length} seleccionados)
              </Label>
              <div className="border rounded-lg mt-2 max-h-64 overflow-y-auto">
                {pendingOrders.map((order) => (
                  <div 
                    key={order.id} 
                    className="p-4 border-b last:border-0 hover:bg-muted/50 flex items-start gap-3"
                  >
                    <Checkbox 
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedOrders([...selectedOrders, order.id]);
                        } else {
                          setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                        }
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p>{order.client}</p>
                          <p className="text-sm text-muted-foreground">{order.address}</p>
                        </div>
                        <Badge variant="outline">{order.bultos} bultos</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {order.products.map((product, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botón optimizar */}
            {selectedOrders.length > 0 && (
              <Button 
                onClick={handleOptimizeRoute}
                className="w-full"
                variant="secondary"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Optimizar Ruta Automáticamente
              </Button>
            )}

            {/* Mapa optimizado */}
            {showOptimizedMap && (
              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-8 border-2 border-dashed">
                  <Map className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-center text-muted-foreground">
                    Mapa con ruta optimizada
                  </p>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                    {selectedOrders.map((orderId, idx) => {
                      const order = pendingOrders.find(o => o.id === orderId);
                      return (
                        <div key={orderId} className="bg-card p-2 rounded border">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">
                              {idx + 1}
                            </div>
                            <span className="text-xs truncate">{order?.client}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tiempo estimado:</p>
                    <p>2h 45min</p>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Route className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Distancia total:</p>
                    <p>38.5 km</p>
                  </div>
                </div>
              </div>
            )}

            {/* Acciones */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setShowCreateModal(false);
                  setSelectedOrders([]);
                  setShowOptimizedMap(false);
                }}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSaveRoute}
                disabled={!newRouteData.driver || selectedOrders.length === 0}
                className="flex-1"
              >
                Guardar Ruta
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Ver Ruta */}
      <Dialog open={showRouteDetail} onOpenChange={setShowRouteDetail}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedRoute?.name}</DialogTitle>
            <DialogDescription>
              Detalles y paradas de la ruta de entrega
            </DialogDescription>
          </DialogHeader>
          
          {selectedRoute && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Fecha</p>
                  <p>{selectedRoute.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Chofer</p>
                  <p>{selectedRoute.driver}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Paradas</p>
                  <p>{selectedRoute.stops}</p>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-8 border-2 border-dashed">
                <Map className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">
                  Visualización del mapa de ruta
                </p>
              </div>

              <div className="space-y-2">
                <p>Secuencia de paradas:</p>
                {pendingOrders.slice(0, selectedRoute.stops).map((order, idx) => (
                  <div key={order.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p>{order.client}</p>
                      <p className="text-sm text-muted-foreground">{order.address}</p>
                    </div>
                    <Badge className={idx < 3 ? 'bg-[#10b981] text-white' : 'bg-muted-foreground text-white'}>
                      {idx < 3 ? 'Entregado' : 'Pendiente'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
