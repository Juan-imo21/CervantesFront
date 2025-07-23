import React, { useState, useEffect } from "react";
import CustomNavbar from "./CustomNavbar";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
const [clienteAEliminar, setClienteAEliminar] = useState(null);
  const [clienteActual, setClienteActual] = useState({
     iD_CLIENTES: null, razonSocial: "", cuit: "", direccion: "", telefono: "", email: "", nombre: ""
  });

  const API_URL = "https://localhost:44367/api/Cliente"; // Cambiar si tu API está en otro puerto o dominio
const [errores, setErrores] = useState({});
  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setClientes(data);
  };

  const handleInputChange = (e) => {
    setClienteActual({ ...clienteActual, [e.target.name]: e.target.value });
  };

  const abrirModalNuevo = () => {
    setModoEdicion(false);
    setErrores({}); 
    setClienteActual({ iD_CLIENTES: null, razonSocial: "", cuit: "", direccion: "", telefono: "", email: "", nombre: "" });
    setModalVisible(true);
  };

  const abrirModalEditar = (cliente) => {
    setModoEdicion(true);
    setErrores({});
    setClienteActual(cliente);
    setModalVisible(true);
  };

  const guardarCliente = async () => {
  const campos = ["razonSocial", "cuit", "direccion", "telefono", "email", "nombre"];
  const nuevosErrores = {};

  campos.forEach((campo) => {
    if (!clienteActual[campo]?.trim()) {
      nuevosErrores[campo] = `El campo "${campo}" es obligatorio.`;
    }
  });

  if (Object.keys(nuevosErrores).length > 0) {
    setErrores(nuevosErrores);
    return;
  }

  setErrores({}); // ✔️ No hay errores, continuar

  const metodo = modoEdicion ? "PUT" : "POST";
  const url = modoEdicion ? `${API_URL}/${clienteActual.iD_CLIENTES}` : API_URL;
  if (!modoEdicion) delete clienteActual.iD_CLIENTES;
  const res = await fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clienteActual),
  });

  if (res.ok) {
    fetchClientes();
    setModalVisible(false);
  }
};
const confirmarEliminar = (cliente) => {
  setClienteAEliminar(cliente);
  setModalEliminarVisible(true);
};
const eliminarCliente = async () => {
  if (!clienteAEliminar) return;

  const res = await fetch(`${API_URL}/${clienteAEliminar.iD_CLIENTES}`, { method: "DELETE" });
  if (res.ok) {
    fetchClientes();
    setModalEliminarVisible(false);
    setClienteAEliminar(null);
  }
};

  const filtrarClientes = clientes.filter(c =>
    Object.values(c).some(val =>
      String(val).toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen text-white flex flex-col overflow-hidden">
      <CustomNavbar />
      <div className="container mx-auto px-4 py-6 mt-24">
        {/* Encabezado y botón */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center items-start gap-2 mb-4">
          <h2 className="text-2xl font-bold">Clientes</h2>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-4 rounded" onClick={abrirModalNuevo}>
            Agregar Cliente
          </button>
        </div>

        {/* Input búsqueda */}
        <input
          type="text"
          placeholder="Buscar cliente..."
          className="w-full mb-4 p-2 text-black rounded"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {/* Tabla */}
        <div className="w-full max-w-5xl mx-auto overflow-x-auto rounded-lg bg-transparent">
          <table className="min-w-[700px] bg-zinc-900 text-white rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="px-4 py-2">Razón Social</th>
                <th className="px-4 py-2">CUIT</th>
                <th className="px-4 py-2">Dirección</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrarClientes.map((cliente) => (
                <tr key={cliente. iD_CLIENTES} className="text-center border-t border-zinc-700">
                  <td className="px-4 py-2">{cliente.razonSocial}</td>
                  <td className="px-4 py-2">{cliente.cuit}</td>
                  <td className="px-4 py-2">{cliente.direccion}</td>
                  <td className="px-4 py-2">{cliente.telefono}</td>
                  <td className="px-4 py-2">{cliente.email}</td>
                  <td className="px-4 py-2">{cliente.nombre}</td>
                  <td className="px-4 py-2 space-x-2">
  <button
    onClick={() => abrirModalEditar(cliente)}
    className="bg-blue-500 text-white px-2 py-1 rounded"
    title="Editar"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="inline h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.364-6.364a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-2.828 1.172H7v-2a4 4 0 011.172-2.828z" />
    </svg>
  </button>
  <button
    onClick={() => confirmarEliminar(cliente)}
    className="bg-red-600 text-white px-2 py-1 rounded"
    title="Eliminar"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="inline h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  </button>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0  bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-md text-white">
            <h2 className="text-xl mb-4">{modoEdicion ? "Editar Cliente" : "Agregar Cliente"}</h2>
            {["razonSocial", "cuit", "direccion", "telefono", "email", "nombre"].map((campo) => (
  <div key={campo} className="mb-3">
    <label className="block text-sm mb-1 capitalize">{campo}</label>
    <input
      type={campo === "email" ? "email" : "text"}
      name={campo}
      value={clienteActual[campo]}
      onChange={handleInputChange}
      className={`w-full px-3 py-2 text-black rounded ${errores[campo] ? "border border-red-500" : ""}`}
    />
    {errores[campo] && (
      <p className="text-red-400 text-sm mt-1">{errores[campo]}</p>
    )}
  </div>
))}
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={() => setModalVisible(false)} className="px-4 py-2 bg-gray-400 text-black rounded">Cancelar</button>
              <button onClick={guardarCliente} className="px-4 py-2 bg-green-500 text-white rounded">Guardar</button>
            </div>
          </div>
        </div>
      )}
      {modalEliminarVisible && (
  <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-sm text-white">
      <h2 className="text-xl mb-4">Confirmar Eliminación</h2>
      <p>¿Estás seguro de que deseas eliminar al cliente <strong>{clienteAEliminar?.razonSocial}</strong>?</p>
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={() => setModalEliminarVisible(false)}
          className="px-4 py-2 bg-gray-400 text-black rounded"
        >
          Cancelar
        </button>
        <button
          onClick={eliminarCliente}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}