import { useState } from 'react';
import { 
  Users as UsersIcon, Plus, Search, Edit, Trash2, 
  Shield, UserCheck, User, Mail, Phone, Calendar
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Switch } from '../ui/switch';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'common' | 'driver';
  status: 'active' | 'inactive';
  createdAt: string;
}

export function UsersView() {
  const [users, setUsers] = useState<UserData[]>([
    { id: '1', name: 'Admin Sistema', email: 'admin@daddybebidas.com', phone: '+54 11 1234-5678', role: 'admin', status: 'active', createdAt: '2024-01-15' },
    { id: '2', name: 'Carlos García', email: 'usuario@daddybebidas.com', phone: '+54 11 2345-6789', role: 'common', status: 'active', createdAt: '2024-02-20' },
    { id: '3', name: 'Juan Pérez', email: 'flete@daddybebidas.com', phone: '+54 11 3456-7890', role: 'driver', status: 'active', createdAt: '2024-03-10' },
    { id: '4', name: 'María González', email: 'maria@daddybebidas.com', phone: '+54 11 4567-8901', role: 'common', status: 'active', createdAt: '2024-03-15' },
    { id: '5', name: 'Ana Martínez', email: 'ana@daddybebidas.com', phone: '+54 11 5678-9012', role: 'driver', status: 'inactive', createdAt: '2024-04-01' },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'common' as 'admin' | 'common' | 'driver',
    status: 'active' as 'active' | 'inactive',
  });

  const roleLabels = {
    admin: 'Administrador',
    common: 'Usuario Común',
    driver: 'Chofer / Flete',
  };

  const roleColors = {
    admin: 'bg-purple-100 text-purple-700',
    common: 'bg-blue-100 text-blue-700',
    driver: 'bg-green-100 text-green-700',
  };

  const handleCreateUser = () => {
    const newUser: UserData = {
      id: `U${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers([newUser, ...users]);
    setShowCreateModal(false);
    resetForm();
  };

  const handleEditUser = () => {
    if (selectedUser) {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u));
      setShowEditModal(false);
      setSelectedUser(null);
      resetForm();
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(u => u.id !== selectedUser.id));
      setShowDeleteDialog(false);
      setSelectedUser(null);
    }
  };

  const openEditModal = (user: UserData) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    });
    setShowEditModal(true);
  };

  const openDeleteDialog = (user: UserData) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'common',
      status: 'active',
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const activeUsers = users.filter(u => u.status === 'active').length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const driverCount = users.filter(u => u.role === 'driver').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Gestión de Usuarios</h1>
        <p className="text-gray-600">Administra los usuarios y roles del sistema</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UsersIcon className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Usuarios</p>
          <p className="text-3xl text-gray-900">{users.length}</p>
        </Card>

        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Usuarios Activos</p>
          <p className="text-3xl text-gray-900">{activeUsers}</p>
        </Card>

        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Administradores</p>
          <p className="text-3xl text-gray-900">{adminCount}</p>
        </Card>

        <Card className="p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <User className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Choferes</p>
          <p className="text-3xl text-gray-900">{driverCount}</p>
        </Card>
      </div>

      {/* Filtros y acciones */}
      <Card className="p-4 bg-white border border-gray-200">
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full md:w-64"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filtrar rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los roles</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="common">Usuario Común</SelectItem>
                <SelectItem value="driver">Chofer / Flete</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Usuario
          </Button>
        </div>
      </Card>

      {/* Tabla de usuarios */}
      <Card className="bg-white border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 text-gray-600">Usuario</th>
                <th className="text-left p-4 text-gray-600">Contacto</th>
                <th className="text-left p-4 text-gray-600">Rol</th>
                <th className="text-left p-4 text-gray-600">Estado</th>
                <th className="text-left p-4 text-gray-600">Fecha Alta</th>
                <th className="text-left p-4 text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-[#0A74DA] to-[#0055A4] text-white">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{user.phone}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={roleColors[user.role]}>
                      {roleLabels[user.role]}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge className={user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                      {user.status === 'active' ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {user.createdAt}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(user)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog(user)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal Crear Usuario */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Usuario</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Juan Pérez"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="usuario@daddybebidas.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+54 11 1234-5678"
              />
            </div>
            <div>
              <Label htmlFor="role">Rol</Label>
              <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="common">Usuario Común</SelectItem>
                  <SelectItem value="driver">Chofer / Flete</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="status">Estado Activo</Label>
              <Switch
                id="status"
                checked={formData.status === 'active'}
                onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? 'active' : 'inactive' })}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateUser}
                disabled={!formData.name || !formData.email}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Crear Usuario
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Editar Usuario */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Nombre completo</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-phone">Teléfono</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-role">Rol</Label>
              <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                <SelectTrigger id="edit-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="common">Usuario Común</SelectItem>
                  <SelectItem value="driver">Chofer / Flete</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="edit-status">Estado Activo</Label>
              <Switch
                id="edit-status"
                checked={formData.status === 'active'}
                onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? 'active' : 'inactive' })}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleEditUser}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Guardar Cambios
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Eliminar Usuario */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              ¿Estás seguro de que deseas eliminar al usuario <strong>{selectedUser?.name}</strong>? 
              Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowDeleteDialog(false);
                  setSelectedUser(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDeleteUser}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Eliminar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
