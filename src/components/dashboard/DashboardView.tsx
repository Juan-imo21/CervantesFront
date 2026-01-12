import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Package, Users, AlertTriangle, Clock } from "lucide-react";
import { Badge } from "../ui/badge";

const salesData = [
  { month: "Ene", ventas: 245000 },
  { month: "Feb", ventas: 298000 },
  { month: "Mar", ventas: 312000 },
  { month: "Abr", ventas: 278000 },
  { month: "May", ventas: 356000 },
  { month: "Jun", ventas: 402000 },
];

const stockDistribution = [
  { name: "Cerveza", value: 45, color: "#0055A4" },
  { name: "Gaseosas", value: 30, color: "#3b82f6" },
  { name: "Aguas", value: 15, color: "#60a5fa" },
  { name: "Jugos", value: 10, color: "#93c5fd" },
];

const lowStockProducts = [
  { producto: "Cerveza Andes Roja", stock: 5, minimo: 20 },
  { producto: "Coca Cola 2.25L", stock: 8, minimo: 15 },
  { producto: "Agua Villavicencio 500ml", stock: 12, minimo: 30 },
];

export function DashboardView() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Panel Principal</h1>
        <p className="text-muted-foreground">Visión general del sistema</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Ventas del Mes</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#10b981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">$402,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-[#10b981]">+12.5%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Stock Total</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">1,248</div>
            <p className="text-xs text-muted-foreground">Unidades disponibles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Clientes Activos</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">89</div>
            <p className="text-xs text-muted-foreground">142 totales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Empleados Presentes</CardTitle>
            <Clock className="h-4 w-4 text-[#10b981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">8/10</div>
            <p className="text-xs text-muted-foreground">Asistencia de hoy</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ventas Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ventas" fill="#0055A4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución de Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stockDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stockDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      <Card className="border-[#f59e0b] bg-[#fffbeb]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-[#f59e0b]" />
            Productos con Stock Bajo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {lowStockProducts.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <p className="font-medium">{item.producto}</p>
                  <p className="text-sm text-muted-foreground">Stock mínimo: {item.minimo} unidades</p>
                </div>
                <Badge variant="destructive">{item.stock} unidades</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
