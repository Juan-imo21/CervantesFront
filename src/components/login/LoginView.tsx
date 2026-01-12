import { useState } from "react";
// (sacamos Wine porque no se usa)
// import { Wine } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import logoImage from "../../assets/logo.png";
import api from "../../api/api"; // ← cliente axios con baseURL + token (si lo tenés creado)

interface User {
  name: string;
  role: "admin" | "common" | "flete";
}

interface LoginViewProps {
  onLogin: (user: User) => void;
}

const mockUsers = [
  { email: "admin@daddybebidas.com", password: "admin123", name: "Admin", role: "admin" as const },
  { email: "usuario@daddybebidas.com", password: "user123", name: "Carlos García", role: "common" as const },
  { email: "flete@daddybebidas.com", password: "flete123", name: "Juan Pérez", role: "flete" as const },
];

// mapea el rol del back a tus roles
function mapRole(rolApi?: string): "admin" | "common" | "flete" {
  const r = (rolApi || "").toLowerCase();
  if (r.includes("admin")) return "admin";
  if (r.includes("chofer") || r.includes("repart") || r.includes("flete")) return "flete";
  return "common";
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // 1) Acceso rápido por rol (demo)
    if (selectedUserType) {
      const user = mockUsers.find(u => u.role === (selectedUserType as any));
      if (user) {
        // guardamos una "sesión fake" para que App hidrate
        localStorage.setItem("token", "demo-token");
        localStorage.setItem("rol", user.role);
        localStorage.setItem("nombre", user.name);
        onLogin({ name: user.name, role: user.role });
        return;
      }
    }

    // 2) Intentar login contra el backend
    try {
      const { data } = await api.post("/auth/login", {
        aliasLogin: email,       // ajustá si tu back usa otro campo
        contrasena: password,
      });
      // se espera: { token, nombre, rol, email }
      if (rememberMe) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("rol", data.rol);
        localStorage.setItem("nombre", data.nombre);
      } else {
        // si no querés persistir, podés usar sessionStorage:
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("rol", data.rol);
        sessionStorage.setItem("nombre", data.nombre);
        // y opcionalmente copiarlos a localStorage para que App los lea:
        localStorage.setItem("token", data.token);
        localStorage.setItem("rol", data.rol);
        localStorage.setItem("nombre", data.nombre);
      }
      onLogin({ name: data.nombre, role: mapRole(data.rol) });
      return;
    } catch {
      // 3) Fallback a mocks si el back falla
      const user = mockUsers.find(u => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem("token", "demo-token");
        localStorage.setItem("rol", user.role);
        localStorage.setItem("nombre", user.name);
        onLogin({ name: user.name, role: user.role });
        return;
      }
      alert(
        "Credenciales incorrectas.\n" +
        "Prueba (demo):\n" +
        "Admin: admin@daddybebidas.com / admin123\n" +
        "Usuario: usuario@daddybebidas.com / user123\n" +
        "Flete: flete@daddybebidas.com / flete123"
      );
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(135deg, #0A74DA 0%, #D4E9FF 100%)" }}
      />

      {/* Login Container */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10 animate-in fade-in zoom-in duration-500">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logoImage} alt="Daddy Bebidas" className="h-20 w-20 rounded-full shadow-lg object-cover" />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-[#0055A4] mb-2">Daddy Bebidas</h1>
          <p className="text-muted-foreground">Rancagua 2771 - Sistema de Gestión</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Quick Access */}
          <div className="space-y-2">
            <Label htmlFor="userType">Acceso Rápido (Demo)</Label>
            <Select value={selectedUserType} onValueChange={setSelectedUserType}>
              <SelectTrigger id="userType" className="h-12">
                <SelectValue placeholder="Seleccionar tipo de usuario..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="common">Usuario Común</SelectItem>
                <SelectItem value="flete">Chofer/Flete</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">O ingresa con credenciales</span>
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico / Usuario</Label>
            <Input
              id="email"
              type="text"
              placeholder="ejemplo@correo.com o usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-gray-200 focus:border-[#0A74DA] focus:ring-[#0A74DA] transition-colors"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 border-gray-200 focus:border-[#0A74DA] focus:ring-[#0A74DA] transition-colors"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
              className="data-[state=checked]:bg-[#0A74DA] data-[state=checked]:border-[#0A74DA]"
            />
            <label htmlFor="remember" className="text-sm text-foreground cursor-pointer select-none">
              Recordarme
            </label>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-[#0A74DA] to-[#0055A4] hover:from-[#0055A4] hover:to-[#003d7a] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Ingresar
          </Button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <a
              href="#"
              className="text-sm text-[#0A74DA] hover:text-[#0055A4] hover:underline transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="mb-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-[#0055A4] text-center mb-2">Credenciales de prueba:</p>
            <p className="text-xs text-muted-foreground text-center">Admin: admin@daddybebidas.com / admin123</p>
            <p className="text-xs text-muted-foreground text-center">Usuario: usuario@daddybebidas.com / user123</p>
            <p className="text-xs text-muted-foreground text-center">Flete: flete@daddybebidas.com / flete123</p>
          </div>
          <p className="text-center text-xs text-muted-foreground">© 2025 Daddy Bebidas - Rancagua 2771</p>
        </div>
      </div>
    </div>
  );
}
