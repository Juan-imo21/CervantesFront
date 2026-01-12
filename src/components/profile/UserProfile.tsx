import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { User, Mail, Calendar, Shield, Edit, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
  userRole: string;
  userSince: string;
}

export function UserProfile({ 
  isOpen, 
  onClose, 
  userName, 
  userEmail, 
  userRole,
  userSince 
}: UserProfileProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Mi Perfil</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4 pb-6 border-b">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" alt={userName} />
              <AvatarFallback className="bg-gradient-to-br from-[#0A74DA] to-[#0055A4] text-white text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-foreground">{userName}</h2>
              <Badge 
                className={
                  userRole === "admin" 
                    ? "bg-[#0A74DA] mt-2" 
                    : "bg-green-500 mt-2"
                }
              >
                {userRole === "admin" ? "Administrador" : "Usuario"}
              </Badge>
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F3F6FA]">
              <Mail className="h-5 w-5 text-[#0A74DA]" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Correo electrónico</p>
                <p className="text-foreground truncate">{userEmail}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F3F6FA]">
              <Shield className="h-5 w-5 text-[#0A74DA]" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Rol</p>
                <p className="text-foreground">
                  {userRole === "admin" ? "Administrador" : "Usuario Común"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F3F6FA]">
              <Calendar className="h-5 w-5 text-[#0A74DA]" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Fecha de alta</p>
                <p className="text-foreground">{userSince}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Preferences */}
          <div className="space-y-4">
            <h3 className="text-foreground">Preferencias</h3>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#F3F6FA]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-[#0A74DA]/10 flex items-center justify-center">
                  <span className="text-xl">����</span>
                </div>
                <div>
                  <p className="text-foreground">Modo oscuro</p>
                  <p className="text-sm text-muted-foreground">Activar tema oscuro</p>
                </div>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="space-y-3">
            <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar datos personales
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar Datos Personales</DialogTitle>
                  <DialogDescription>
                    Actualice su información personal
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" defaultValue={userName} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input id="email" type="email" defaultValue={userEmail} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" placeholder="Ej: +54 9 351 123-4567" className="mt-1.5" />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button 
                      className="flex-1 bg-[#0A74DA] hover:bg-[#0055A4]"
                      onClick={() => setIsEditingProfile(false)}
                    >
                      Guardar cambios
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsEditingProfile(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isChangingPassword} onOpenChange={setIsChangingPassword}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Cambiar contraseña
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cambiar Contraseña</DialogTitle>
                  <DialogDescription>
                    Ingrese su contraseña actual y la nueva contraseña
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="current-password">Contraseña actual</Label>
                    <Input id="current-password" type="password" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="new-password">Nueva contraseña</Label>
                    <Input id="new-password" type="password" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                    <Input id="confirm-password" type="password" className="mt-1.5" />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button 
                      className="flex-1 bg-[#0A74DA] hover:bg-[#0055A4]"
                      onClick={() => setIsChangingPassword(false)}
                    >
                      Cambiar contraseña
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsChangingPassword(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
