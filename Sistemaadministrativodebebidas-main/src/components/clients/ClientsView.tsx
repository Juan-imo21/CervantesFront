import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus, Search, Edit, Trash2, Building2, User } from "lucide-react";
import { Textarea } from "../ui/textarea";

const clientsData = [
  { id: 1, nombre: "Distribuidora La Estrella S.A.", tipo: "formal", cuit: "30-71234567-8", telefono: "351-4567890", ultimaCompra: "2025-10-15", estado: "activo" },
  { id: 2, nombre: "Kiosco El Rápido", tipo: "informal", telefono: "351-7891234", zona: "Centro", ultimaCompra: "2025-10-18", estado: "activo" },
  { id: 3, nombre: "Supermercado Norte S.R.L.", tipo: "formal", cuit: "33-78945612-9", telefono: "351-9876543", ultimaCompra: "2025-10-12", estado: "activo" },
  { id: 4, nombre: "Bar Los Amigos", tipo: "informal", telefono: "351-5554321", zona: "Nueva Córdoba", ultimaCompra: "2025-09-28", estado: "inactivo" },
  { id: 5, nombre: "Almacén Don Pedro", tipo: "informal", telefono: "351-2223344", zona: "Alberdi", ultimaCompra: "2025-10-19", estado: "activo" },
];

export function ClientsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredClients = clientsData.filter(client => {
    const matchesSearch = client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.telefono.includes(searchTerm);
    const matchesType = filterType === "all" || client.tipo === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Gestión de Clientes</h1>
          <p className="text-muted-foreground">Administración de clientes formales e informales</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Cliente</DialogTitle>
              <DialogDescription>
                Complete los datos para registrar un nuevo cliente
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="formal" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="formal">
                  <Building2 className="mr-2 h-4 w-4" />
                  Cliente Formal
                </TabsTrigger>
                <TabsTrigger value="informal">
                  <User className="mr-2 h-4 w-4" />
                  Cliente Informal
                </TabsTrigger>
              </TabsList>
              <TabsContent value="formal" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="razonSocial">Razón Social</Label>
                    <Input id="razonSocial" placeholder="Distribuidora Ejemplo S.A." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cuit">CUIT</Label>
                    <Input id="cuit" placeholder="30-12345678-9" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="iva">Condición IVA</Label>
                    <Select>
                      <SelectTrigger id="iva">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="responsable">Responsable Inscripto</SelectItem>
                        <SelectItem value="monotributo">Monotributo</SelectItem>
                        <SelectItem value="exento">Exento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="contacto@ejemplo.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input id="telefono" placeholder="351-1234567" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input id="direccion" placeholder="Calle 123, Ciudad" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="listaPrecio">Lista de Precios</Label>
                    <Select>
                      <SelectTrigger id="listaPrecio">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mayorista">Mayorista</SelectItem>
                        <SelectItem value="distribuidor">Distribuidor</SelectItem>
                        <SelectItem value="minorista">Minorista</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="informal" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="nombreInformal">Nombre del Cliente</Label>
                    <Input id="nombreInformal" placeholder="Kiosco El Rápido" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefonoInformal">Teléfono</Label>
                    <Input id="telefonoInformal" placeholder="351-7891234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zona">Zona</Label>
                    <Input id="zona" placeholder="Centro, Nueva Córdoba, etc." />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="observaciones">Observaciones</Label>
                    <Textarea id="observaciones" placeholder="Notas adicionales sobre el cliente..." />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline">Cancelar</Button>
              <Button>Guardar Cliente</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o teléfono..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Tipo de cliente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="formal">Formales</SelectItem>
                <SelectItem value="informal">Informales</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>CUIT / Zona</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Última Compra</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {client.tipo === "formal" ? (
                        <Building2 className="h-4 w-4 text-primary" />
                      ) : (
                        <User className="h-4 w-4 text-muted-foreground" />
                      )}
                      {client.nombre}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={client.tipo === "formal" ? "default" : "secondary"}>
                      {client.tipo === "formal" ? "Formal" : "Informal"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {client.tipo === "formal" ? client.cuit : client.zona}
                  </TableCell>
                  <TableCell>{client.telefono}</TableCell>
                  <TableCell>{new Date(client.ultimaCompra).toLocaleDateString('es-AR')}</TableCell>
                  <TableCell>
                    <Badge className={client.estado === "activo" ? "bg-[#10b981] text-white hover:bg-[#10b981]/90" : "bg-muted text-muted-foreground"}>
                      {client.estado === "activo" ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
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
