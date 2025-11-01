import React, { useState } from 'react';
import { 
  Truck, MapPin, Package, CheckCircle, Clock, Plus, 
  Route, Users, Map, Edit, RefreshCw, Eye, Search, Filter
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';

interface Order {
  id: string;
  client: string;
  address: string;
  products: string[];
  bultos: number;
  lat: number;
  lng: number;
}

interface Route {
  id: string;
  name: string;
  date: string;
  driver: string;
  stops: number;
  status: 'planned' | 'in-progress' | 'completed';
}

export function RoutePlanningView() {
  const [routes, setRoutes] = useState<Route[]>([
    { id: '1', name: 'Ruta Norte - Mañana', date: '2025-11-01', driver: 'Juan Pérez', stops: 8, status: 'in-progress' },
    { id: '2', name: 'Ruta Centro', date: '2025-11-01', driver: 'María González', stops: 12, status: 'planned' },
    { id: '3', name: 'Ruta Sur - Tarde', date: '2025-10-31', driver: 'Carlos Rodríguez', stops: 10, status: 'completed' },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRouteDetail, setShowRouteDetail] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
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
    const newRoute: Route = {
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

  const handleViewRoute = (route: Route) => {
    setSelectedRoute(route);
    setShowRouteDetail(true);
  };

  const handleCompleteRoute = (routeId: string) => {
    setRoutes(routes.map(r => r.id === routeId ? { ...r, status: 'completed' } : r));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Planificación de Rutas</h1>
        <p className="text-gray-600">Gestiona y optimiza las rutas de reparto</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Route className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Rutas del día</p>
          <p className="text-3xl text-gray-900">4</p>
        </Card>

        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Unidades a entregar</p>
          <p className="text-3xl text-gray-900">42</p>
        </Card>

        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Choferes activos</p>
          <p className="text-3xl text-gray-900">6</p>
        </Card>

        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Entregas completadas</p>
          <p className="text-3xl text-gray-900">85%</p>
        </Card>
      </div>

      {/* Acciones y filtros */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Buscar rutas..." 
              className="pl-10 w-full md:w-64"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Crear Ruta
        </Button>
      </div>

      {/* Tabla de Rutas */}
      <Card className="bg-white border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 text-gray-600">Nombre de Ruta</th>
                <th className="text-left p-4 text-gray-600">Fecha</th>
                <th className="text-left p-4 text-gray-600">Chofer</th>
                <th className="text-left p-4 text-gray-600">Paradas</th>
                <th className="text-left p-4 text-gray-600">Estado</th>
                <th className="text-left p-4 text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr key={route.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 text-gray-900">{route.name}</td>
                  <td className="p-4 text-gray-600">{route.date}</td>
                  <td className="p-4 text-gray-900">{route.driver}</td>
                  <td className="p-4 text-gray-600">{route.stops} paradas</td>
                  <td className="p-4">
                    <Badge className={statusColors[route.status]}>
                      {statusLabels[route.status]}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewRoute(route)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleOptimizeRoute}>
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      {route.status === 'in-progress' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleCompleteRoute(route.id)}
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                <label className="block text-sm text-gray-700 mb-2">Fecha</label>
                <Input 
                  type="date" 
                  value={newRouteData.date}
                  onChange={(e) => setNewRouteData({...newRouteData, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Chofer</label>
                <Select 
                  value={newRouteData.driver} 
                  onValueChange={(value) => setNewRouteData({...newRouteData, driver: value})}
                >
                  <SelectTrigger>
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
              <label className="block text-sm text-gray-700 mb-2">Punto de Salida</label>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-gray-900">{newRouteData.depot}</span>
              </div>
            </div>

            {/* Pedidos pendientes */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Pedidos Pendientes ({selectedOrders.length} seleccionados)
              </label>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {pendingOrders.map((order) => (
                  <div 
                    key={order.id} 
                    className="p-4 border-b border-gray-100 hover:bg-gray-50 flex items-start gap-3"
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
                          <p className="text-gray-900">{order.client}</p>
                          <p className="text-sm text-gray-600">{order.address}</p>
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
                    <Button variant="ghost" size="sm">
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Botón optimizar */}
            {selectedOrders.length > 0 && (
              <Button 
                onClick={handleOptimizeRoute}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Optimizar Ruta Automáticamente
              </Button>
            )}

            {/* Mapa optimizado */}
            {showOptimizedMap && (
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-8 border-2 border-dashed border-gray-300">
                  <Map className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-center text-gray-600">
                    Mapa con ruta optimizada
                  </p>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                    {selectedOrders.map((orderId, idx) => {
                      const order = pendingOrders.find(o => o.id === orderId);
                      return (
                        <div key={orderId} className="bg-white p-2 rounded border border-gray-200">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                              {idx + 1}
                            </div>
                            <span className="text-xs text-gray-900">{order?.client}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tiempo estimado:</p>
                    <p className="text-gray-900">2h 45min</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Route className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Distancia total:</p>
                    <p className="text-gray-900">38.5 km</p>
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
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Guardar Ruta
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Ver Ruta */}
      <Dialog open={showRouteDetail} onOpenChange={setShowRouteDetail}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedRoute?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedRoute && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Fecha</p>
                  <p className="text-gray-900">{selectedRoute.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Chofer</p>
                  <p className="text-gray-900">{selectedRoute.driver}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Paradas</p>
                  <p className="text-gray-900">{selectedRoute.stops}</p>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-8 border-2 border-dashed border-gray-300">
                <Map className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-center text-gray-600">
                  Visualización del mapa de ruta
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-gray-900">Secuencia de paradas:</p>
                {pendingOrders.slice(0, selectedRoute.stops).map((order, idx) => (
                  <div key={order.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{order.client}</p>
                      <p className="text-sm text-gray-600">{order.address}</p>
                    </div>
                    <Badge className={idx < 3 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
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
