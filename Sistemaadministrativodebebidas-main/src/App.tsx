import { useState } from "react";
import { Home, Package, Users, ShoppingCart, BarChart3, Clock, Bell, MessageSquare, Settings as SettingsIcon, LogOut, FileText, User, Truck, UserCog } from "lucide-react";
import { DashboardView } from "./components/dashboard/DashboardView";
import { StockView } from "./components/stock/StockView";
import { ClientsView } from "./components/clients/ClientsView";
import { SalesView } from "./components/sales/SalesView";
import { AttendanceView } from "./components/attendance/AttendanceView";
import { ReportsView } from "./components/reports/ReportsView";
import { AlertsView } from "./components/alerts/AlertsView";
import { CommunicationView } from "./components/communication/CommunicationView";
import { SettingsView } from "./components/settings/SettingsView";
import { AuditView } from "./components/audit/AuditView";
import { LoginView } from "./components/login/LoginView";
import { CommonUserDashboard } from "./components/common-user/CommonUserDashboard";
import { UserProfile } from "./components/profile/UserProfile";
import { RoutePlanningView } from "./components/logistics/RoutePlanningView";
import { DriverRouteView } from "./components/logistics/DriverRouteView";
import { UsersView } from "./components/users/UsersView";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import logoImage from "figma:asset/746173341fd757b60eeadec8b0385a0ed002f0fb.png";

type ViewType = "dashboard" | "stock" | "clients" | "sales" | "attendance" | "reports" | "alerts" | "communication" | "settings" | "audit" | "logistics" | "users";
type UserRole = "admin" | "common" | "flete";

interface User {
  name: string;
  role: UserRole;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogin = (user: User) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentView("dashboard");
  };

  // Si no está autenticado, mostrar pantalla de login
  if (!isAuthenticated || !currentUser) {
    return <LoginView onLogin={handleLogin} />;
  }

  // Si es usuario común, mostrar dashboard simplificado
  if (currentUser.role === "common") {
    return (
      <CommonUserDashboard
        userName={currentUser.name}
        onLogout={handleLogout}
      />
    );
  }

  // Si es chofer/flete, mostrar vista de ruta
  if (currentUser.role === "flete") {
    return (
      <div className="min-h-screen bg-[#F3F6FA]">
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 sm:px-6 h-16">
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="Daddy Bebidas" className="h-10 w-10 rounded-full" />
              <div>
                <span className="text-[#0A74DA]">Daddy Bebidas</span>
                <p className="text-xs text-muted-foreground">Sistema de Rutas</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt={currentUser.name} />
                <AvatarFallback className="bg-gradient-to-br from-[#0A74DA] to-[#0055A4] text-white text-xs">
                  {currentUser.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <Button
                onClick={handleLogout}
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
        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
          <DriverRouteView />
        </main>
      </div>
    );
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "stock", label: "Stock", icon: Package },
    { id: "clients", label: "Clientes", icon: Users },
    { id: "sales", label: "Ventas", icon: ShoppingCart },
    { id: "logistics", label: "Logística/Rutas", icon: Truck },
    { id: "users", label: "Usuarios", icon: UserCog },
    { id: "attendance", label: "Asistencia", icon: Clock },
    { id: "reports", label: "Reportes", icon: BarChart3 },
    { id: "audit", label: "Auditoría", icon: FileText },
    { id: "alerts", label: "Alertas", icon: Bell, badge: 3 },
    { id: "communication", label: "Comunicación", icon: MessageSquare, badge: 2 },
    { id: "settings", label: "Configuración", icon: SettingsIcon },
  ];

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView />;
      case "stock":
        return <StockView />;
      case "clients":
        return <ClientsView />;
      case "sales":
        return <SalesView />;
      case "logistics":
        return <RoutePlanningView />;
      case "users":
        return <UsersView />;
      case "attendance":
        return <AttendanceView />;
      case "reports":
        return <ReportsView />;
      case "audit":
        return <AuditView />;
      case "alerts":
        return <AlertsView />;
      case "communication":
        return <CommunicationView />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border flex items-center gap-3">
          <img src={logoImage} alt="Daddy Bebidas" className="h-12 w-12 rounded-full" />
          <div>
            <h2 className="text-primary">Daddy Bebidas</h2>
            <p className="text-xs text-muted-foreground mt-1">Rancagua 2771</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentView(item.id as ViewType)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-foreground"
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

        {/* User Info */}
        <div className="p-4 border-t border-border">
          <button 
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center gap-3 mb-3 w-full p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src="" alt={currentUser.name} />
              <AvatarFallback className="bg-gradient-to-br from-[#0A74DA] to-[#0055A4] text-white">
                {currentUser.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <p className="text-sm">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground">Administrador</p>
            </div>
          </button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          {renderView()}
        </div>
      </main>

      {/* User Profile Sheet */}
      <UserProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userName={currentUser.name}
        userEmail="admin@distribuidora.com"
        userRole={currentUser.role}
        userSince="15 de Enero, 2024"
      />
    </div>
  );
}
