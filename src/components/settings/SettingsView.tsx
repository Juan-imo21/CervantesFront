import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Settings, Users, Bell, Database, Shield } from "lucide-react";
import { Badge } from "../ui/badge";

export function SettingsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Configuración del Sistema</h1>
        <p className="text-muted-foreground">Ajustes y preferencias</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="roles">
            <Users className="mr-2 h-4 w-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="alertas">
            <Bell className="mr-2 h-4 w-4" />
            Alertas
          </TabsTrigger>
          <TabsTrigger value="integraciones">
            <Database className="mr-2 h-4 w-4" />
            Integraciones
          </TabsTrigger>
          <TabsTrigger value="seguridad">
            <Shield className="mr-2 h-4 w-4" />
            Seguridad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Empresa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombreEmpresa">Nombre de la Empresa</Label>
                  <Input id="nombreEmpresa" defaultValue="Distribuidora Mayorista" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cuitEmpresa">CUIT</Label>
                  <Input id="cuitEmpresa" defaultValue="30-71234567-8" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input id="direccion" defaultValue="Av. Principal 1234" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" defaultValue="351-4567890" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="email">Email de Contacto</Label>
                  <Input id="email" type="email" defaultValue="contacto@distribuidora.com" />
                </div>
              </div>
              <Button>Guardar Cambios</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferencias del Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo Oscuro</Label>
                  <p className="text-sm text-muted-foreground">Activa el tema oscuro del sistema</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones de Escritorio</Label>
                  <p className="text-sm text-muted-foreground">Recibir notificaciones en el navegador</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="moneda">Moneda</Label>
                <Select defaultValue="ars">
                  <SelectTrigger id="moneda">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ars">Peso Argentino (ARS)</SelectItem>
                    <SelectItem value="usd">Dólar (USD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Roles y Permisos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4>Administrador</h4>
                      <p className="text-sm text-muted-foreground">Acceso total al sistema</p>
                    </div>
                    <Badge className="bg-[#10b981] text-white">Activo</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked disabled />
                      <span>Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked disabled />
                      <span>Stock</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked disabled />
                      <span>Ventas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked disabled />
                      <span>Clientes</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4>Caja</h4>
                      <p className="text-sm text-muted-foreground">Gestión de ventas y facturación</p>
                    </div>
                    <Badge>Activo</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span>Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch />
                      <span>Stock</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span>Ventas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span>Clientes</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4>Depósito</h4>
                      <p className="text-sm text-muted-foreground">Control de stock y preparación</p>
                    </div>
                    <Badge>Activo</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Switch />
                      <span>Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span>Stock</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span>Ventas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch />
                      <span>Clientes</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4>Gerente</h4>
                      <p className="text-sm text-muted-foreground">Acceso a reportes y análisis</p>
                    </div>
                    <Badge>Activo</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span>Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span>Stock</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span>Ventas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span>Clientes</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alertas" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Alertas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stockMinimo">Stock Mínimo (Alerta Automática)</Label>
                <Input id="stockMinimo" type="number" defaultValue="20" />
                <p className="text-sm text-muted-foreground">Cantidad mínima antes de generar alerta</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diasVencimiento">Días antes de Vencimiento</Label>
                <Input id="diasVencimiento" type="number" defaultValue="7" />
                <p className="text-sm text-muted-foreground">Días previos para alertar sobre productos próximos a vencer</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertas de Asistencia</Label>
                  <p className="text-sm text-muted-foreground">Notificar ausencias de empleados</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertas de Pedidos Atrasados</Label>
                  <p className="text-sm text-muted-foreground">Revisar pedidos pendientes cada 24h</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertas de Pagos Vencidos</Label>
                  <p className="text-sm text-muted-foreground">Notificar facturas impagas</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button>Guardar Configuración</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integraciones" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Integraciones Externas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4>Power BI</h4>
                    <p className="text-sm text-muted-foreground">Dashboards y análisis avanzado</p>
                  </div>
                  <Badge variant="secondary">No Conectado</Badge>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="powerbiKey">API Key</Label>
                  <Input id="powerbiKey" type="password" placeholder="Ingresa tu API Key" />
                </div>
                <Button className="mt-3">Conectar Power BI</Button>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4>WhatsApp Business</h4>
                    <p className="text-sm text-muted-foreground">Mensajería con clientes</p>
                  </div>
                  <Badge className="bg-[#10b981] text-white">Conectado</Badge>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsappToken">Token de Acceso</Label>
                  <Input id="whatsappToken" type="password" placeholder="••••••••••••" disabled />
                </div>
                <Button variant="outline" className="mt-3">Desconectar</Button>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4>Sistema de Facturación</h4>
                    <p className="text-sm text-muted-foreground">AFIP y facturación electrónica</p>
                  </div>
                  <Badge variant="secondary">No Conectado</Badge>
                </div>
                <Button className="mt-3">Configurar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad y Privacidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autenticación de Dos Factores</Label>
                  <p className="text-sm text-muted-foreground">Mayor seguridad en el inicio de sesión</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Registro de Actividad</Label>
                  <p className="text-sm text-muted-foreground">Guardar historial de acciones de usuarios</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Tiempo de Sesión (minutos)</Label>
                <Input id="sessionTimeout" type="number" defaultValue="30" />
                <p className="text-sm text-muted-foreground">Cerrar sesión automáticamente después de inactividad</p>
              </div>

              <div className="pt-4 border-t">
                <Button variant="destructive">Cambiar Contraseña</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
