import React, { useState } from 'react';
import { 
  MapPin, Package, CheckCircle, Navigation, Clock, 
  User, Truck, Camera, FileText, Phone, AlertCircle
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';

interface Stop {
  id: string;
  number: number;
  client: string;
  address: string;
  phone: string;
  products: string[];
  bultos: number;
  status: 'pending' | 'delivered' | 'current';
  estimatedTime: string;
  distance: string;
}

export function DriverRouteView() {
  const [stops, setStops] = useState<Stop[]>([
    { id: '1', number: 1, client: 'Bar El Refugio', address: 'Av. Libertador 1234', phone: '+54 11 1234-5678', products: ['Cerveza x50', 'Gaseosas x30'], bultos: 8, status: 'delivered', estimatedTime: '09:00', distance: '2.5 km' },
    { id: '2', number: 2, client: 'Resto La Esquina', address: 'Calle Corrientes 5678', phone: '+54 11 2345-6789', products: ['Vino x20', 'Agua x40'], bultos: 6, status: 'delivered', estimatedTime: '09:30', distance: '1.8 km' },
    { id: '3', number: 3, client: 'Kiosco Central', address: 'San Martín 890', phone: '+54 11 3456-7890', products: ['Cerveza x30', 'Energizantes x20'], bultos: 5, status: 'current', estimatedTime: '10:00', distance: '3.2 km' },
    { id: '4', number: 4, client: 'Supermercado Avenida', address: 'Av. Cabildo 2345', phone: '+54 11 4567-8901', products: ['Gaseosas x100', 'Agua x60'], bultos: 16, status: 'pending', estimatedTime: '10:45', distance: '5.1 km' },
    { id: '5', number: 5, client: 'Bar Deportivo', address: 'Belgrano 456', phone: '+54 11 5678-9012', products: ['Cerveza x40', 'Aperitivos x10'], bultos: 7, status: 'pending', estimatedTime: '11:30', distance: '2.3 km' },
  ]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [photoTaken, setPhotoTaken] = useState(false);

  const totalStops = stops.length;
  const completedStops = stops.filter(s => s.status === 'delivered').length;
  const progressPercentage = (completedStops / totalStops) * 100;

  const handleStartNavigation = (stop: Stop) => {
    // Simula abrir navegación
    alert(`Iniciando navegación a: ${stop.address}`);
  };

  const handleMarkAsDelivered = (stop: Stop) => {
    setSelectedStop(stop);
    setShowConfirmModal(true);
  };

  const confirmDelivery = () => {
    if (selectedStop) {
      setStops(stops.map(s => {
        if (s.id === selectedStop.id) {
          return { ...s, status: 'delivered' as const };
        }
        // Marcar el siguiente como actual
        if (s.number === selectedStop.number + 1) {
          return { ...s, status: 'current' as const };
        }
        return s;
      }));
      setShowConfirmModal(false);
      setSelectedStop(null);
      setDeliveryNotes('');
      setPhotoTaken(false);
    }
  };

  const statusColors = {
    pending: 'bg-gray-100 text-gray-600',
    current: 'bg-blue-100 text-blue-700',
    delivered: 'bg-green-100 text-green-700',
  };

  const statusLabels = {
    pending: 'Pendiente',
    current: 'En camino',
    delivered: 'Entregado',
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header móvil */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm opacity-90">Mi Ruta de Hoy</p>
            <p className="font-semibold">Juan Pérez</p>
          </div>
          <div className="text-right">
            <p className="text-2xl">{completedStops}/{totalStops}</p>
            <p className="text-xs opacity-90">entregas</p>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="space-y-2">
          <Progress value={progressPercentage} className="h-2 bg-blue-500" />
          <div className="flex justify-between text-xs">
            <span>{progressPercentage.toFixed(0)}% completado</span>
            <span>~15.4 km restantes</span>
          </div>
        </div>
      </div>

      {/* Stats rápidos */}
      <div className="grid grid-cols-3 gap-3 p-4">
        <Card className="p-3 bg-white border border-gray-200">
          <div className="flex items-center justify-center mb-1">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-xs text-gray-600 text-center">Tiempo est.</p>
          <p className="text-center text-gray-900">2h 15m</p>
        </Card>
        <Card className="p-3 bg-white border border-gray-200">
          <div className="flex items-center justify-center mb-1">
            <Package className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-xs text-gray-600 text-center">Bultos</p>
          <p className="text-center text-gray-900">42</p>
        </Card>
        <Card className="p-3 bg-white border border-gray-200">
          <div className="flex items-center justify-center mb-1">
            <Truck className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-xs text-gray-600 text-center">Distancia</p>
          <p className="text-center text-gray-900">15.4 km</p>
        </Card>
      </div>

      {/* Alerta IA */}
      <div className="mx-4 mb-4">
        <Card className="p-4 bg-purple-50 border-purple-200">
          <div className="flex gap-3">
            <div className="p-2 bg-purple-100 rounded-lg h-fit">
              <AlertCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-purple-900 mb-1">Recomendación IA</p>
              <p className="text-xs text-purple-700">
                Se sugiere salir antes de las 10:00 para evitar tráfico en Av. Cabildo. 
                Tiempo óptimo: 9:45 AM
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Lista de paradas - Stepper vertical */}
      <div className="px-4 space-y-1">
        {stops.map((stop, index) => (
          <Card 
            key={stop.id} 
            className={`
              relative overflow-hidden
              ${stop.status === 'current' ? 'border-2 border-blue-500 shadow-lg' : 'border border-gray-200'}
              ${stop.status === 'delivered' ? 'opacity-60' : ''}
            `}
          >
            {/* Línea vertical del stepper */}
            {index < stops.length - 1 && (
              <div className={`
                absolute left-[38px] top-[60px] w-0.5 h-full
                ${stop.status === 'delivered' ? 'bg-green-300' : 'bg-gray-200'}
              `} />
            )}

            <div className="p-4 relative">
              <div className="flex gap-3">
                {/* Número de parada */}
                <div className="relative z-10">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${stop.status === 'delivered' ? 'bg-green-500 text-white' : ''}
                    ${stop.status === 'current' ? 'bg-blue-600 text-white' : ''}
                    ${stop.status === 'pending' ? 'bg-gray-200 text-gray-600' : ''}
                  `}>
                    {stop.status === 'delivered' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span>{stop.number}</span>
                    )}
                  </div>
                </div>

                {/* Contenido */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-gray-900">{stop.client}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {stop.address}
                      </p>
                    </div>
                    <Badge className={statusColors[stop.status]}>
                      {statusLabels[stop.status]}
                    </Badge>
                  </div>

                  {/* Info adicional */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      {stop.estimatedTime}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Navigation className="w-3 h-3" />
                      {stop.distance}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Package className="w-3 h-3" />
                      {stop.bultos} bultos
                    </div>
                  </div>

                  {/* Productos */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {stop.products.map((product, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>

                  {/* Botones de acción */}
                  {stop.status !== 'delivered' && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => handleStartNavigation(stop)}
                        className="flex-1"
                      >
                        <Navigation className="w-4 h-4 mr-1" />
                        Navegar
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="px-3"
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      {stop.status === 'current' && (
                        <Button 
                          size="sm"
                          onClick={() => handleMarkAsDelivered(stop)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Entregar
                        </Button>
                      )}
                    </div>
                  )}

                  {stop.status === 'delivered' && (
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span>Entregado correctamente</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal Confirmar Entrega */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Entrega</DialogTitle>
            <DialogDescription>
              Complete los detalles de la entrega antes de confirmar
            </DialogDescription>
          </DialogHeader>
          
          {selectedStop && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-900 mb-1">{selectedStop.client}</p>
                <p className="text-sm text-gray-600">{selectedStop.address}</p>
                <div className="flex gap-2 mt-2">
                  {selectedStop.products.map((product, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Foto comprobante */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Foto de comprobante (opcional)
                </label>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setPhotoTaken(true)}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {photoTaken ? 'Foto capturada ✓' : 'Tomar foto'}
                </Button>
              </div>

              {/* Notas */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Notas adicionales (opcional)
                </label>
                <Textarea 
                  placeholder="Ej: Entregado a recepción, firmado por gerente..."
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Geolocalización */}
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <MapPin className="w-4 h-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm text-green-900">Ubicación confirmada</p>
                  <p className="text-xs text-green-700">-34.595, -58.375</p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>

              {/* Botones */}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setShowConfirmModal(false);
                    setDeliveryNotes('');
                    setPhotoTaken(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={confirmDelivery}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirmar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Navegación inferior móvil */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-around">
        <button className="flex flex-col items-center gap-1">
          <Truck className="w-5 h-5 text-blue-600" />
          <span className="text-xs text-blue-600">Mi Ruta</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <FileText className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-600">Historial</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <User className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-600">Perfil</span>
        </button>
      </div>
    </div>
  );
}
