import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus, Search, Edit, Trash2, QrCode, AlertCircle } from "lucide-react";

const stockData = [
  { codigo: "BEB001", producto: "Cerveza Andes Roja Lata 473ml", categoria: "Cerveza", cantidad: 5, unidad: "Unidad", vencimiento: "2025-12-15", deposito: "Depósito 1", estado: "bajo" },
  { codigo: "BEB002", producto: "Coca Cola 2.25L", categoria: "Gaseosa", cantidad: 8, unidad: "Unidad", vencimiento: "2026-03-20", deposito: "Depósito 1", estado: "bajo" },
  { codigo: "BEB003", producto: "Sprite 2L", categoria: "Gaseosa", cantidad: 45, unidad: "Unidad", vencimiento: "2026-02-10", deposito: "Depósito 2", estado: "ok" },
  { codigo: "BEB004", producto: "Agua Villavicencio 500ml", categoria: "Agua", cantidad: 12, unidad: "Paquete", vencimiento: "2026-08-05", deposito: "Depósito 1", estado: "medio" },
  { codigo: "BEB005", producto: "Quilmes Clásica 1L", categoria: "Cerveza", cantidad: 78, unidad: "Unidad", vencimiento: "2025-11-30", deposito: "Depósito 2", estado: "ok" },
  { codigo: "BEB006", producto: "Fanta Naranja 2.25L", categoria: "Gaseosa", cantidad: 34, unidad: "Unidad", vencimiento: "2026-01-15", deposito: "Depósito 1", estado: "ok" },
  { codigo: "BEB007", producto: "Cerveza Brahma Lata 473ml", categoria: "Cerveza", cantidad: 56, unidad: "Unidad", vencimiento: "2025-10-22", deposito: "Depósito 2", estado: "proximo" },
];

export function StockView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredStock = stockData.filter(item => {
    const matchesSearch = item.producto.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || item.categoria === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockBadge = (estado: string) => {
    switch (estado) {
      case "bajo":
        return <Badge variant="destructive">Stock Bajo</Badge>;
      case "medio":
        return <Badge className="bg-[#f59e0b] text-white hover:bg-[#f59e0b]/90">Stock Medio</Badge>;
      case "proximo":
        return <Badge className="bg-[#f59e0b] text-white hover:bg-[#f59e0b]/90">Prox. Vencer</Badge>;
      default:
        return <Badge className="bg-[#10b981] text-white hover:bg-[#10b981]/90">OK</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Gestión de Stock</h1>
          <p className="text-muted-foreground">Control de inventario y productos</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nuevo Producto</DialogTitle>
              <DialogDescription>
                Agregue un nuevo producto al inventario
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="codigo">Código</Label>
                <Input id="codigo" placeholder="BEB001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="producto">Producto</Label>
                <Input id="producto" placeholder="Nombre del producto" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría</Label>
                <Select>
                  <SelectTrigger id="categoria">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cerveza">Cerveza</SelectItem>
                    <SelectItem value="gaseosa">Gaseosa</SelectItem>
                    <SelectItem value="agua">Agua</SelectItem>
                    <SelectItem value="jugo">Jugo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cantidad">Cantidad</Label>
                <Input id="cantidad" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unidad">Unidad</Label>
                <Select>
                  <SelectTrigger id="unidad">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unidad">Unidad</SelectItem>
                    <SelectItem value="paquete">Paquete</SelectItem>
                    <SelectItem value="caja">Caja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vencimiento">Fecha de Vencimiento</Label>
                <Input id="vencimiento" type="date" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="deposito">Depósito</Label>
                <Select>
                  <SelectTrigger id="deposito">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deposito1">Depósito 1</SelectItem>
                    <SelectItem value="deposito2">Depósito 2</SelectItem>
                    <SelectItem value="deposito3">Depósito 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Guardar Producto</Button>
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
                placeholder="Buscar por código o producto..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="Cerveza">Cerveza</SelectItem>
                <SelectItem value="Gaseosa">Gaseosa</SelectItem>
                <SelectItem value="Agua">Agua</SelectItem>
                <SelectItem value="Jugo">Jugo</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <QrCode className="mr-2 h-4 w-4" />
              Escanear QR
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Depósito</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStock.map((item) => (
                <TableRow key={item.codigo}>
                  <TableCell>{item.codigo}</TableCell>
                  <TableCell>{item.producto}</TableCell>
                  <TableCell>{item.categoria}</TableCell>
                  <TableCell>{item.cantidad} {item.unidad}</TableCell>
                  <TableCell>{new Date(item.vencimiento).toLocaleDateString('es-AR')}</TableCell>
                  <TableCell>{item.deposito}</TableCell>
                  <TableCell>{getStockBadge(item.estado)}</TableCell>
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
