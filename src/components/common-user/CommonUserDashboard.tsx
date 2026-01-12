import { Home, ShoppingCart, Package, LogOut, Plus, Users, MessageSquare, Bell, BarChart3, User } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NewOrderModal } from "./NewOrderModal";
import { StockView as AdminStockView } from "../stock/StockView";
import { SalesView as AdminSalesView } from "../sales/SalesView";
import { ClientsView as AdminClientsView } from "../clients/ClientsView";
import { UserProfile } from "../profile/UserProfile";
import logoImage from "../../assets/logo.png";

interface CommonUserDashboardProps {
  userName: string;
  onLogout: () => void;
}

type ViewType = "home" | "orders" | "products" | "clients" | "stock" | "communication" | "alerts" | "sales";

export function CommonUserDashboard({ userName, onLogout }: CommonUserDashboardProps) {
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const menuItems = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "sales", label: "Ventas", icon: BarChart3 },
    { id: "orders", label: "Pedidos", icon: ShoppingCart },
    { id: "clients", label: "Clientes", icon: Users },
    { id: "stock", label: "Stock", icon: Package },
    { id: "communication", label: "Mensajes", icon: MessageSquare, badge: 3 },
    { id: "alerts", label: "Alertas", icon: Bell, badge: 5 },
  ];

  return (
    <div className="min-h-screen bg-[#F3F6FA]">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Daddy Bebidas" className="h-10 w-10 rounded-full" />
            <span className="text-[#0A74DA]">Daddy Bebidas</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt={userName} />
                <AvatarFallback className="bg-gradient-to-br from-[#0A74DA] to-[#0055A4] text-white text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm text-foreground">{userName}</span>
            </button>
            <Button
              onClick={onLogout}
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex lg:w-64 bg-white border-r border-gray-200 flex-col">
          <button
            onClick={() => setIsProfileOpen(true)}
            className="p-6 hover:bg-gray-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="" alt={userName} />
                <AvatarFallback className="bg-gradient-to-br from-[#0A74DA] to-[#0055A4] text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-[#0A74DA]">{userName}</h3>
                <p className="text-sm text-muted-foreground">Usuario</p>
              </div>
            </div>
          </button>

          <nav className="flex-1 px-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setCurrentView(item.id as ViewType)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
                        isActive
                          ? "bg-[#0A74DA] text-white shadow-md"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && !isActive && (
                        <Badge variant="destructive" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-6">
          <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            {/* Welcome Section - Mobile */}
            <div className="lg:hidden mb-6">
              <h2 className="text-[#0A74DA]">Hola, {userName}</h2>
              <p className="text-muted-foreground">Bienvenido al sistema</p>
            </div>

            {currentView === "home" && <HomeView />}
            {currentView === "sales" && <AdminSalesView />}
            {currentView === "orders" && <OrdersView />}
            {currentView === "clients" && <AdminClientsView />}
            {currentView === "stock" && <AdminStockView />}
            {currentView === "communication" && <CommunicationView />}
            {currentView === "alerts" && <AlertsView />}
            {currentView === "products" && <ProductsView />}
          </div>
        </main>

        {/* Bottom Navigation - Mobile */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
          <ul className="flex justify-around items-center h-16 overflow-x-auto">
            {menuItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <li key={item.id} className="flex-shrink-0">
                  <button
                    onClick={() => setCurrentView(item.id as ViewType)}
                    className={`flex flex-col items-center gap-1 px-2 py-2 transition-colors relative ${
                      isActive ? "text-[#0A74DA]" : "text-gray-500"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs">{item.label}</span>
                    {item.badge && !isActive && (
                      <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOrderModalOpen(true)}
        className="fixed bottom-20 lg:bottom-8 right-4 lg:right-8 h-14 w-14 lg:h-16 lg:w-16 rounded-full bg-gradient-to-br from-[#0A74DA] to-[#0055A4] text-white shadow-2xl hover:shadow-3xl transition-all hover:scale-110 flex items-center justify-center z-30"
        aria-label="Nuevo pedido"
      >
        <Plus className="h-7 w-7 lg:h-8 lg:w-8" />
      </button>

      {/* New Order Modal */}
      <NewOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />

      {/* User Profile Sheet */}
      <UserProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userName={userName}
        userEmail={`${userName.toLowerCase().replace(/\s+/g, '.')}@distribuidora.com`}
        userRole="common"
        userSince="10 de Marzo, 2024"
      />
    </div>
  );
}

function HomeView() {
  const metrics = [
    {
      title: "Pedidos del día",
      value: "12",
      icon: ShoppingCart,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Stock bajo",
      value: "5",
      icon: Package,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      title: "Clientes registrados",
      value: "48",
      icon: Home,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-foreground mb-2">Panel de Control</h2>
        <p className="text-muted-foreground">Resumen de actividad del día</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card
              key={metric.title}
              className="border-0 shadow-md hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-muted-foreground text-sm mb-2">
                      {metric.title}
                    </p>
                    <p className={`text-4xl ${metric.textColor}`}>
                      {metric.value}
                    </p>
                  </div>
                  <div
                    className={`h-14 w-14 rounded-xl ${metric.bgColor} flex items-center justify-center`}
                  >
                    <Icon className={`h-7 w-7 ${metric.textColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="mt-6 border-0 shadow-md">
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { client: "Almacén El Progreso", product: "Coca Cola 2.5L", qty: 24, time: "Hace 15 min" },
              { client: "Kiosco San Martín", product: "Fanta 2L", qty: 12, time: "Hace 1 hora" },
              { client: "Mayorista Central", product: "Sprite 2.5L", qty: 48, time: "Hace 2 horas" },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-3 border-b last:border-0 border-gray-100"
              >
                <div className="flex-1">
                  <p className="text-foreground">{activity.client}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.product} × {activity.qty}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {activity.time}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function OrdersView() {
  const orders = [
    { id: "001", client: "Almacén El Progreso", total: "$12,500", status: "Completado", date: "2025-10-23" },
    { id: "002", client: "Kiosco San Martín", total: "$8,200", status: "Pendiente", date: "2025-10-23" },
    { id: "003", client: "Mayorista Central", total: "$25,000", status: "En proceso", date: "2025-10-22" },
    { id: "004", client: "Despensa Norte", total: "$6,500", status: "Completado", date: "2025-10-22" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-foreground mb-2">Mis Pedidos</h2>
        <p className="text-muted-foreground">Historial de ventas realizadas</p>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-foreground">#{order.id} - {order.client}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <Badge
                  variant={
                    order.status === "Completado"
                      ? "default"
                      : order.status === "Pendiente"
                      ? "secondary"
                      : "outline"
                  }
                  className={
                    order.status === "Completado"
                      ? "bg-green-500"
                      : order.status === "Pendiente"
                      ? "bg-orange-500"
                      : "bg-blue-500"
                  }
                >
                  {order.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[#0A74DA]">{order.total}</p>
                <Button variant="ghost" size="sm" className="text-[#0A74DA]">
                  Ver detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProductsView() {
  const products = [
    { name: "Coca Cola 2.5L", stock: 120, price: "$450", status: "En stock" },
    { name: "Fanta 2L", stock: 8, price: "$380", status: "Stock bajo" },
    { name: "Sprite 2.5L", stock: 95, price: "$450", status: "En stock" },
    { name: "Pepsi 2.25L", stock: 2, price: "$420", status: "Stock crítico" },
    { name: "Seven Up 2L", stock: 45, price: "$380", status: "En stock" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-foreground mb-2">Catálogo de Productos</h2>
        <p className="text-muted-foreground">Productos disponibles para venta</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <Card
            key={product.name}
            className="border-0 shadow-md hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-foreground mb-1">{product.name}</p>
                  <p className="text-muted-foreground text-sm">
                    Stock: {product.stock} unidades
                  </p>
                </div>
                <Badge
                  variant={
                    product.status === "En stock"
                      ? "default"
                      : product.status === "Stock bajo"
                      ? "secondary"
                      : "destructive"
                  }
                  className={
                    product.status === "En stock"
                      ? "bg-green-500"
                      : product.status === "Stock bajo"
                      ? "bg-orange-500"
                      : ""
                  }
                >
                  {product.status}
                </Badge>
              </div>
              <p className="text-[#0A74DA]">{product.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CommunicationView() {
  const conversations = [
    { id: 1, client: "Almacén El Progreso", lastMessage: "¿Tienen stock de Coca Cola?", time: "10:45 AM", unread: 2 },
    { id: 2, client: "Kiosco San Martín", lastMessage: "Gracias por la entrega", time: "Ayer", unread: 0 },
    { id: 3, client: "Mayorista Central", lastMessage: "Necesito hacer un pedido urgente", time: "Ayer", unread: 1 },
    { id: 4, client: "Despensa Norte", lastMessage: "Confirmado el pedido", time: "2 días", unread: 0 },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-foreground mb-2">Mensajes</h2>
        <p className="text-muted-foreground">Comunicación con clientes</p>
      </div>

      <div className="grid gap-3">
        {conversations.map((conv) => (
          <Card
            key={conv.id}
            className={`border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer ${
              conv.unread > 0 ? "bg-blue-50" : ""
            }`}
          >
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#0A74DA] to-[#0055A4] flex items-center justify-center text-white flex-shrink-0">
                  {conv.client.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-foreground truncate">{conv.client}</p>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{conv.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="h-6 w-6 rounded-full bg-[#0A74DA] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-white">{conv.unread}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-md mt-6">
        <CardContent className="p-5">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Buscar conversación..."
              className="flex-1 h-11 px-4 rounded-lg border border-gray-200 focus:border-[#0A74DA] focus:outline-none focus:ring-2 focus:ring-[#0A74DA]/20"
            />
            <Button className="bg-[#0A74DA] hover:bg-[#0055A4]">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AlertsView() {
  const alerts = [
    { id: 1, type: "stock", title: "Stock bajo: Fanta 2L", message: "Solo quedan 8 unidades", time: "Hace 30 min", priority: "high" },
    { id: 2, type: "stock", title: "Stock crítico: Pepsi 2.25L", message: "Solo quedan 2 unidades", time: "Hace 1 hora", priority: "critical" },
    { id: 3, type: "order", title: "Nuevo pedido", message: "Mayorista Central realizó un pedido", time: "Hace 2 horas", priority: "normal" },
    { id: 4, type: "payment", title: "Pago pendiente", message: "Kiosco San Martín tiene pago pendiente", time: "Hace 3 horas", priority: "high" },
    { id: 5, type: "delivery", title: "Entrega completada", message: "Pedido #045 entregado exitosamente", time: "Hace 4 horas", priority: "normal" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      default: return "bg-blue-500";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "stock": return Package;
      case "order": return ShoppingCart;
      case "payment": return BarChart3;
      case "delivery": return Home;
      default: return Bell;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-foreground mb-2">Alertas y Notificaciones</h2>
        <p className="text-muted-foreground">Centro de notificaciones del sistema</p>
      </div>

      <div className="grid gap-4">
        {alerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          return (
            <Card key={alert.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-lg ${getPriorityColor(alert.priority)} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-foreground">{alert.title}</p>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{alert.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-[#0A74DA] h-8">
                        Ver detalles
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 h-8">
                        Marcar como leída
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
