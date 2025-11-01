import { useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  stock: number;
}

const mockClients = [
  { id: "1", name: "Almacén El Progreso" },
  { id: "2", name: "Kiosco San Martín" },
  { id: "3", name: "Mayorista Central" },
  { id: "4", name: "Despensa Norte" },
  { id: "5", name: "Tienda La Esquina" },
];

const mockProducts = [
  { id: "1", name: "Coca Cola 2.5L", price: 450, stock: 120 },
  { id: "2", name: "Fanta 2L", price: 380, stock: 8 },
  { id: "3", name: "Sprite 2.5L", price: 450, stock: 95 },
  { id: "4", name: "Pepsi 2.25L", price: 420, stock: 2 },
  { id: "5", name: "Seven Up 2L", price: 380, stock: 45 },
  { id: "6", name: "Agua Mineral 2L", price: 250, stock: 200 },
];

export function NewOrderModal({ isOpen, onClose }: NewOrderModalProps) {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const handleAddProduct = () => {
    if (!selectedProduct) return;

    const product = mockProducts.find((p) => p.id === selectedProduct);
    if (!product) return;

    // Check if product already exists in order
    const existingItem = orderItems.find((item) => item.productId === product.id);
    if (existingItem) {
      setOrderItems(
        orderItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setOrderItems([
        ...orderItems,
        {
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: 1,
          stock: product.stock,
        },
      ]);
    }
    setSelectedProduct("");
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setOrderItems(
      orderItems
        .map((item) => {
          if (item.productId === productId) {
            const newQuantity = item.quantity + delta;
            return { ...item, quantity: Math.max(0, Math.min(newQuantity, item.stock)) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setOrderItems(orderItems.filter((item) => item.productId !== productId));
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleConfirmOrder = () => {
    if (!selectedClient || orderItems.length === 0) {
      alert("Por favor seleccione un cliente y agregue productos");
      return;
    }

    // Simulate order creation
    alert(`Pedido creado exitosamente para ${mockClients.find(c => c.id === selectedClient)?.name}\nTotal: $${calculateTotal().toLocaleString()}`);
    
    // Reset form
    setSelectedClient("");
    setOrderItems([]);
    onClose();
  };

  const handleClose = () => {
    setSelectedClient("");
    setSelectedProduct("");
    setOrderItems([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#0A74DA]">Nuevo Pedido</DialogTitle>
          <DialogDescription>
            Seleccione el cliente y los productos para crear un nuevo pedido
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Client Selection */}
          <div className="space-y-2">
            <Label htmlFor="client">Seleccionar Cliente</Label>
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger id="client" className="h-11">
                <SelectValue placeholder="Elegir cliente..." />
              </SelectTrigger>
              <SelectContent>
                {mockClients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Product Selection */}
          <div className="space-y-2">
            <Label htmlFor="product">Agregar Producto</Label>
            <div className="flex gap-2">
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger id="product" className="h-11 flex-1">
                  <SelectValue placeholder="Elegir producto..." />
                </SelectTrigger>
                <SelectContent>
                  {mockProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{product.name}</span>
                        <span className="text-muted-foreground text-sm ml-4">
                          ${product.price} - Stock: {product.stock}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleAddProduct}
                disabled={!selectedProduct}
                className="bg-[#0A74DA] hover:bg-[#0055A4]"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Order Items List */}
          {orderItems.length > 0 && (
            <div className="space-y-3">
              <Label>Productos en el pedido</Label>
              <div className="border rounded-lg p-3 space-y-3 bg-[#F3F6FA]">
                {orderItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm"
                  >
                    <div className="flex-1">
                      <p className="text-sm">{item.productName}</p>
                      <p className="text-xs text-muted-foreground">
                        ${item.price} × {item.quantity} = ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item.productId, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQty = parseInt(e.target.value) || 0;
                          handleUpdateQuantity(item.productId, newQty - item.quantity);
                        }}
                        className="w-16 h-8 text-center"
                        min="0"
                        max={item.stock}
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item.productId, 1)}
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveItem(item.productId)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-foreground">Total del Pedido</span>
                  <span className="text-[#0A74DA]">
                    ${calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmOrder}
            disabled={!selectedClient || orderItems.length === 0}
            className="bg-gradient-to-r from-[#0A74DA] to-[#0055A4] hover:from-[#0055A4] hover:to-[#003d7a]"
          >
            Confirmar Venta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
