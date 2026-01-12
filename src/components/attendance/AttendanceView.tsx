import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Clock, CheckCircle, XCircle, QrCode } from "lucide-react";

const attendanceData = [
  { id: 1, empleado: "Juan Pérez", entrada: "08:00", salida: "17:00", horas: 9, estado: "presente" },
  { id: 2, empleado: "María González", entrada: "08:15", salida: "17:10", horas: 8.9, estado: "presente" },
  { id: 3, empleado: "Carlos Rodríguez", entrada: "07:55", salida: "-", horas: 0, estado: "trabajando" },
  { id: 4, empleado: "Ana Martínez", entrada: "08:30", salida: "17:30", horas: 9, estado: "presente" },
  { id: 5, empleado: "Luis Fernández", entrada: "-", salida: "-", horas: 0, estado: "ausente" },
  { id: 6, empleado: "Laura Sánchez", entrada: "08:05", salida: "-", horas: 0, estado: "trabajando" },
  { id: 7, empleado: "Diego Torres", entrada: "08:20", salida: "17:15", horas: 8.9, estado: "presente" },
  { id: 8, empleado: "Sofia Morales", entrada: "08:00", salida: "16:00", horas: 8, estado: "presente" },
];

const weeklyData = [
  { dia: "Lun", asistencia: 9 },
  { dia: "Mar", asistencia: 10 },
  { dia: "Mié", asistencia: 8 },
  { dia: "Jue", asistencia: 9 },
  { dia: "Vie", asistencia: 8 },
];

export function AttendanceView() {
  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "presente":
        return (
          <Badge className="bg-[#10b981] text-white hover:bg-[#10b981]/90">
            <CheckCircle className="mr-1 h-3 w-3" />
            Presente
          </Badge>
        );
      case "trabajando":
        return (
          <Badge className="bg-primary text-white hover:bg-primary/90">
            <Clock className="mr-1 h-3 w-3" />
            Trabajando
          </Badge>
        );
      case "ausente":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            Ausente
          </Badge>
        );
      default:
        return <Badge>{estado}</Badge>;
    }
  };

  const presentes = attendanceData.filter(a => a.estado === "presente" || a.estado === "trabajando").length;
  const totalEmpleados = attendanceData.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Asistencia del Personal</h1>
          <p className="text-muted-foreground">Control de horarios y presencia</p>
        </div>
        <Button>
          <QrCode className="mr-2 h-4 w-4" />
          Marcar Asistencia
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Empleados Presentes</CardTitle>
            <CheckCircle className="h-4 w-4 text-[#10b981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{presentes}/{totalEmpleados}</div>
            <p className="text-xs text-muted-foreground">
              {((presentes / totalEmpleados) * 100).toFixed(0)}% de asistencia
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Trabajando Ahora</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {attendanceData.filter(a => a.estado === "trabajando").length}
            </div>
            <p className="text-xs text-muted-foreground">En turno activo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Ausentes</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {attendanceData.filter(a => a.estado === "ausente").length}
            </div>
            <p className="text-xs text-muted-foreground">Sin registro</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Promedio Horas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">8.8</div>
            <p className="text-xs text-muted-foreground">Horas por empleado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Table */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Registro de Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empleado</TableHead>
                  <TableHead>Entrada</TableHead>
                  <TableHead>Salida</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.empleado}</TableCell>
                    <TableCell>{record.entrada}</TableCell>
                    <TableCell>{record.salida}</TableCell>
                    <TableCell>{getStatusBadge(record.estado)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Weekly Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Asistencia Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="asistencia" fill="#0055A4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
