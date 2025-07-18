import React from "react";
import CustomNavbar from './CustomNavbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar arriba */}
      <CustomNavbar />

      {/* Contenido centrado */}
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
            Bienvenido a Daddy Bebidas
          </h1>
          <p className="text-lg md:text-xl text-white">
            Sistema de gestión de pedidos y clientes
          </p>
        </div>
      </div>
    </div>
  );
}