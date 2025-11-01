import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download, TrendingUp, DollarSign, Target, Activity } from "lucide-react";

const salesTrendData = [
  { mes: "Ene", ventas: 245000, costo: 180000, margen: 65000 },
  { mes: "Feb", ventas: 298000, costo: 220000, margen: 78000 },
  { mes: "Mar", ventas: 312000, costo: 230000, margen: 82000 },
  { mes: "Abr", ventas: 278000, costo: 205000, margen: 73000 },
  { mes: "May", ventas: 356000, costo: 262000, margen: 94000 },
  { mes: "Jun", ventas: 402000, costo: 295000, margen: 107000 },
];

const categoryPerformance = [
  { categoria: "Cerveza", ventas: 180000, margen: 26.5 },
  { categoria: "Gaseosas", ventas: 125000, margen: 22.3 },
  { categoria: "Aguas", ventas: 65000, margen: 18.7 },
  { categoria: "Jugos", ventas: 32000, margen: 21.5 },
];

export function ReportsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Reportes y Análisis</h1>
          <p className="text-muted-foreground">Dashboards y métricas de negocio</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exportar Reporte
        </Button>
      </div>

      {/* Date Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="fechaDesde">Fecha Desde</Label>
              <Input id="fechaDesde" type="date" defaultValue="2025-01-01" />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="fechaHasta">Fecha Hasta</Label>
              <Input id="fechaHasta" type="date" defaultValue="2025-06-30" />
            </div>
            <Button>Aplicar Filtro</Button>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Ventas Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">$1,891,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-[#10b981]">+15.2%</span> vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Margen Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#10b981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">23.8%</div>
            <p className="text-xs text-muted-foreground">Rentabilidad general</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Ticket Promedio</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">$28,350</div>
            <p className="text-xs text-muted-foreground">Por pedido</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Proyección Mensual</CardTitle>
            <Activity className="h-4 w-4 text-[#f59e0b]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">$425,000</div>
            <p className="text-xs text-muted-foreground">Estimado julio</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Análisis de Ventas y Márgenes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ventas" stroke="#0055A4" strokeWidth={2} name="Ventas" />
                <Line type="monotone" dataKey="costo" stroke="#94a3b8" strokeWidth={2} name="Costos" />
                <Line type="monotone" dataKey="margen" stroke="#10b981" strokeWidth={2} name="Margen" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rendimiento por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="categoria" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ventas" fill="#0055A4" radius={[8, 8, 0, 0]} name="Ventas ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Power BI Simulation */}
      <Card className="border-primary">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Integración Power BI
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categoryPerformance.map((cat, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">{cat.categoria}</p>
                <p className="text-2xl mt-1">${cat.ventas.toLocaleString('es-AR')}</p>
                <p className="text-sm mt-1">
                  Margen: <span className="text-[#10b981]">{cat.margen}%</span>
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Conecta tu cuenta de Power BI para visualizaciones avanzadas
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
