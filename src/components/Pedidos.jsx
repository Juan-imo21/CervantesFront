import React, { useState, useEffect } from "react";
import CustomNavbar from "./CustomNavbar";

export default function Pedidos() {
    const API_PEDIDO = "https://localhost:44367/api/Pedido";
    const API_CLIENTE = "https://localhost:44367/api/Cliente";
    const API_PRODUCTO = "https://localhost:44367/api/Producto";

    const [pedidos, setPedidos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
const [erroresPedido, setErroresPedido] = useState({});
const [erroresEditar, setErroresEditar] = useState({});

    const [busqueda, setBusqueda] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
const [pedidoAEliminar, setPedidoAEliminar] = useState(null);

    const [modalProductoVisible, setModalProductoVisible] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);
    const [modalClienteVisible, setModalClienteVisible] = useState(false);
    const [busquedaCliente, setBusquedaCliente] = useState("");
    const [modalEditarVisible, setModalEditarVisible] = useState(false);
const [pedidoEditar, setPedidoEditar] = useState(null);

    const [pedidoActual, setPedidoActual] = useState({
        iD_PEDIDO: null,
        iD_CLIENTE: null,
        FECHA: "",
        Estado: "Pendiente",
        Total: 0,
        Detalle: []
    });

    useEffect(() => {
        fetchPedidos();
        fetchClientes();
        fetchProductos();
    }, []);

    const fetchPedidos = async () => {
        const res = await fetch(API_PEDIDO);
        const data = await res.json();
        setPedidos(data);
    };

    const fetchClientes = async () => {
        const res = await fetch(API_CLIENTE);
        const data = await res.json();
        setClientes(data);
    };

    const fetchProductos = async () => {
        const res = await fetch(API_PRODUCTO);
        const data = await res.json();
        setProductos(data);
    };
const confirmarEliminarPedido = (pedido) => {
    setPedidoAEliminar(pedido);
    setModalEliminarVisible(true);
};
    const abrirModalNuevo = () => {
        setModoEdicion(false);
        setErroresPedido({});
        setPedidoActual({
            iD_PEDIDO: null,
            iD_CLIENTE: null,
            FECHA: new Date().toISOString().substring(0, 10),
            Estado: "Pendiente",
            Total: 0,
            Detalle: []
        });
        setModalVisible(true);
    };

    const abrirModalEditar = async (pedido) => {
    try {
        if (productos.length === 0) {
            const resProd = await fetch(API_PRODUCTO);
            const dataProd = await resProd.json();
            setProductos(dataProd);
        }

        const res = await fetch(`${API_PEDIDO}/conDetalle/${pedido.iD_PEDIDO}`);
        const data = await res.json();

        const productosActuales = productos.length > 0 ? productos : await (await fetch(API_PRODUCTO)).json();

        const productosConInfo = data.detalle.map(d => {
            const productoInfo = productosActuales.find(p => p.iD_PRODUCTO === d.iD_PRODUCTO);
            return {
                iD_PRODUCTO: d.iD_PRODUCTO,
                nombre: productoInfo?.nombre ?? "Producto desconocido",
                precio: d.PrecioUnitario ?? productoInfo?.precio ?? 0, 
                cantidad: d.cantidad
            };
        });

        setPedidoEditar({
            iD_PEDIDO: data.iD_PEDIDO,
            iD_CLIENTE: data.iD_CLIENTE,
            fecha: data.fecha?.substring(0, 10),
            estado: data.estado,
            total: data.total,
            detalle: productosConInfo
        });
setErroresPedido({});
        setModalEditarVisible(true);
    } catch (error) {
        console.error("Error al abrir modal de edición:", error);
    }
};
    const eliminarPedido = async (id) => {
        if (window.confirm("¿Seguro deseas eliminar el pedido?")) {
            const res = await fetch(`${API_PEDIDO}/${id}`, { method: "DELETE" });
            if (res.ok) fetchPedidos();
        }
    };

    const guardarPedido = async () => {
    const nuevosErrores = {};

    if (!pedidoActual.ID_CLIENTE) {
        nuevosErrores.cliente = "Debe seleccionar un cliente.";
    }

    if (!pedidoActual.Detalle || pedidoActual.Detalle.length === 0) {
        nuevosErrores.detalle = "Debe agregar al menos un producto.";
    }

    if (Object.keys(nuevosErrores).length > 0) {
        setErroresPedido(nuevosErrores);
        return;
    }

    setErroresPedido({}); // limpiar errores si todo está ok

    const total = pedidoActual.Detalle.reduce((sum, p) => sum + (p.cantidad * p.precio), 0);
    const body = {
        ID_CLIENTE: pedidoActual.ID_CLIENTE,
        FECHA: pedidoActual.FECHA,
        Estado: pedidoActual.Estado,
        Total: total,
        Detalle: pedidoActual.Detalle.map(p => ({
            ID_PRODUCTO: p.iD_PRODUCTO,
            Cantidad: p.cantidad,
            PrecioUnitario: p.precio
        }))
    };

    const res = await fetch(
        modoEdicion ? `${API_PEDIDO}/${pedidoActual.iD_PEDIDO}` : API_PEDIDO,
        {
            method: modoEdicion ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }
    );

    if (res.ok) {
        setModalVisible(false);
        fetchPedidos();
    }
};
    const agregarProductoADetalle = (producto) => {
        const yaExiste = pedidoActual.Detalle.find(p => p.iD_PRODUCTO === producto.iD_PRODUCTO);
        if (!yaExiste) {
            setPedidoActual(prev => ({
                ...prev,
                Detalle: [...prev.Detalle, { ...producto, cantidad: 1 }]
            }));
        }
    };

    const actualizarCantidad = (idProducto, nuevaCantidad) => {
        setPedidoActual(prev => ({
            ...prev,
            Detalle: prev.Detalle.map(p =>
                p.iD_PRODUCTO === idProducto ? { ...p, cantidad: nuevaCantidad } : p
            )
        }));
    };

    const eliminarProductoDetalle = (idProducto) => {
        setPedidoActual(prev => ({
            ...prev,
            Detalle: prev.Detalle.filter(p => p.iD_PRODUCTO !== idProducto)
        }));
    };

    const filtrarPedidos = pedidos.filter(p =>
        Object.values(p).some(val =>
            String(val).toLowerCase().includes(busqueda.toLowerCase())
        )
    );
    return (
        <div className="min-h-screen text-white flex flex-col">
            <CustomNavbar />
            <div className="container mx-auto px-4 py-6 mt-24">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Pedidos</h2>
                    <button onClick={abrirModalNuevo} className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-4 rounded">
                        + Agregar Pedido
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Buscar pedido..."
                    className="w-full mb-4 p-2 text-black rounded"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />

                <table className="min-w-full bg-zinc-900 text-white rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Cliente</th>
                            <th className="px-4 py-2">Fecha</th>
                            <th className="px-4 py-2">Estado</th>
                            <th className="px-4 py-2">Total</th>
                            <th className="px-4 py-2 w-36">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtrarPedidos.map(p => (
                            <tr key={p.iD_PEDIDO} className="text-center border-t border-zinc-700">
                                <td className="px-4 py-2">{clientes.find(c => c.iD_CLIENTES === p.iD_CLIENTE)?.razonSocial || "Cliente"}</td>
                                <td className="px-4 py-2">{p.fecha?.substring(0, 10)}</td>
                                <td className="px-4 py-2">{p.estado}</td>
                                <td className="px-4 py-2">${p.total}</td>
                                <td className="px-4 py-2 flex gap-2 justify-center">
                                    <button onClick={() => abrirModalEditar(p)} className="bg-blue-500 px-2 py-1 rounded" title="Editar">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.364-6.364a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-2.828 1.172H7v-2a4 4 0 011.172-2.828z" />
                                        </svg>
                                        </button>
                                        <button onClick={() => confirmarEliminarPedido(p)} className="bg-red-600 px-2 py-1 rounded" title="Eliminar">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Modal */}
            {modalVisible && (
                <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-2xl text-white">
                        <h2 className="text-xl mb-4">Agregar Pedido</h2>

                        <label className="block mb-1">Cliente:</label>
                        <div className="flex gap-2 items-center mb-3">
                            <input
                                type="text"
                                className="flex-grow text-black p-2 rounded"
                                value={
                                    clientes.find(c => c.iD_CLIENTES === pedidoActual.ID_CLIENTE)?.razonSocial || ""
                                }
                                readOnly
                                placeholder="Seleccione un cliente..."
                            />
                            <button
                                className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-2 rounded"
                                onClick={() => setModalClienteVisible(true)}
                            >
                                Buscar
                            </button>
                            {erroresPedido.cliente && (
    <p className="text-red-400 text-sm mt-1">{erroresPedido.cliente}</p>
)}
                        </div>

                        <label className="block mb-1">Fecha:</label>
                        <input
                            type="date"
                            className="w-full mb-3 text-black p-2 rounded"
                            value={pedidoActual.FECHA}
                            onChange={e => setPedidoActual({ ...pedidoActual, FECHA: e.target.value })}
                        />

                        <label className="block mb-1">Agregar Productos:</label>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            <button
                                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded mb-4"
                                onClick={() => setModalProductoVisible(true)}
                            >
                                Agregar Producto
                            </button>
                        </div>

                        {/* Detalle Pedido */}
                        {pedidoActual.Detalle.length > 0 && (
                            <>
                                <h3 className="text-lg font-semibold mb-2">Detalle del Pedido:</h3>
                                <table className="w-full text-white mb-4">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Subtotal</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pedidoActual.Detalle.map((p) => (
                                            <tr key={p.iD_PRODUCTO}>
                                                <td>{p.nombre}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="w-16 text-black rounded px-1"
                                                        value={p.cantidad}
                                                        onChange={e => actualizarCantidad(p.iD_PRODUCTO, parseInt(e.target.value))}
                                                    />
                                                </td>
                                                <td>${p.precio}</td>
                                                <td>${p.cantidad * p.precio}</td>
                                                <td>
                                                    <button onClick={() => eliminarProductoDetalle(p.iD_PRODUCTO)} className="text-red-500">x</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="text-right text-lg font-semibold mt-2">
                                    Total: $
                                    {pedidoActual.Detalle.reduce((sum, p) => sum + p.cantidad * p.precio, 0)}
                                </div>
                            </>
                        )}
                        {erroresPedido.detalle && (
    <p className="text-red-400 text-sm mt-2">{erroresPedido.detalle}</p>
)}

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setModalVisible(false)} className="bg-gray-400 text-black px-4 py-2 rounded">Cancelar</button>
                            <button onClick={guardarPedido} className="bg-green-500 text-white px-4 py-2 rounded">Guardar</button>
                        </div>
                    </div>
                </div>
            )}
            {modalProductoVisible && (
                <div
        className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-[70]"style={{ zIndex: 1000 }} >
                    <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-lg text-white">
                        <h3 className="text-lg font-semibold mb-3">Agregar Producto</h3>

                        <label className="block mb-1">Producto:</label>
                        <select
                            className="w-full mb-3 text-black p-2 rounded"
                            value={productoSeleccionado?.iD_PRODUCTO || ""}
                            onChange={e => {
                                const prod = productos.find(p => p.iD_PRODUCTO === parseInt(e.target.value));
                                setProductoSeleccionado(prod);
                            }}
                        >
                            <option value="">-- Seleccione --</option>
                            {productos.map(p => (
                                <option key={p.iD_PRODUCTO} value={p.iD_PRODUCTO}>
                                    {p.nombre} (${p.precio})
                                </option>
                            ))}
                        </select>

                        <label className="block mb-1">Cantidad:</label>
                        <input
                            type="number"
                            className="w-full mb-4 text-black p-2 rounded"
                            min={1}
                            value={cantidadSeleccionada}
                            onChange={e => setCantidadSeleccionada(parseInt(e.target.value))}
                        />

                        <div className="flex justify-end gap-2">
    <button onClick={() => setModalProductoVisible(false)} className="bg-gray-400 text-black px-4 py-2 rounded">
        Cancelar
    </button>
    <button
        onClick={() => {
            if (productoSeleccionado && cantidadSeleccionada > 0) {
                const nuevoProducto = {
                    iD_PRODUCTO: productoSeleccionado.iD_PRODUCTO,
                    nombre: productoSeleccionado.nombre,
                    precio: productoSeleccionado.precio,
                    cantidad: cantidadSeleccionada
                };

                if (modalEditarVisible) {
                    // Modo edición
                    setPedidoEditar(prev => {
                        const yaExiste = prev.detalle.some(p => p.iD_PRODUCTO === productoSeleccionado.iD_PRODUCTO);
                        if (yaExiste) return prev; // Evita duplicados
                        return {
                            ...prev,
                            detalle: [...prev.detalle, nuevoProducto]
                        };
                    });
                } else {
                    // Modo alta
                    const yaExiste = pedidoActual.Detalle.some(p => p.iD_PRODUCTO === productoSeleccionado.iD_PRODUCTO);
                    if (!yaExiste) {
                        setPedidoActual(prev => ({
                            ...prev,
                            Detalle: [...prev.Detalle, nuevoProducto]
                        }));
                    }
                }

                setProductoSeleccionado(null);
                setCantidadSeleccionada(1);
                setModalProductoVisible(false);
            }
        }}
        className="bg-green-500 text-white px-4 py-2 rounded"
    >
        Agregar
    </button>
</div>
                    </div>
                </div>
            )}
            {modalClienteVisible && (
                <div className="fixed inset-0  bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-xl text-white">
                        <h3 className="text-lg font-semibold mb-3">Seleccionar Cliente</h3>
                        <input
                            type="text"
                            placeholder="Buscar por nombre o CUIT..."
                            className="w-full mb-3 text-black p-2 rounded"
                            onChange={e => setBusquedaCliente(e.target.value)}
                        />

                        <table className="w-full text-white mb-4">
                            <thead>
                                <tr>
                                    <th className="text-left">Razón Social</th>
                                    <th className="text-left">CUIT</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes
                                    .filter(c =>
                                        (c.razonSocial + c.cuit)
                                            .toLowerCase()
                                            .includes(busquedaCliente?.toLowerCase() || "")
                                    )
                                    .map(c => (
                                        <tr key={c.iD_CLIENTES} className="border-t border-zinc-600">
                                            <td>{c.razonSocial}</td>
                                            <td>{c.cuit}</td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        setPedidoActual(prev => ({ ...prev, ID_CLIENTE: c.iD_CLIENTES }));
                                                        setModalClienteVisible(false);
                                                    }}
                                                    className="bg-green-500 px-2 py-1 rounded text-white"
                                                >
                                                    Seleccionar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                        <div className="flex justify-end">
                            <button
                                onClick={() => setModalClienteVisible(false)}
                                className="bg-gray-400 text-black px-4 py-2 rounded"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {modalEliminarVisible && pedidoAEliminar && (
    <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-md text-white">
            <h3 className="text-xl font-semibold mb-4">Confirmar eliminación</h3>
            <p>¿Estás seguro que deseas eliminar el pedido del cliente <strong>{clientes.find(c => c.iD_CLIENTES === pedidoAEliminar.iD_CLIENTE)?.razonSocial || 'desconocido'}</strong>?</p>

            <div className="flex justify-end gap-2 mt-6">
                <button
                    className="bg-gray-400 text-black px-4 py-2 rounded"
                    onClick={() => {
                        setModalEliminarVisible(false);
                        setPedidoAEliminar(null);
                    }}
                >
                    Cancelar
                </button>
                <button
                    className="bg-red-600 text-white px-4 py-2 rounded"
                    onClick={async () => {
                        const res = await fetch(`${API_PEDIDO}/${pedidoAEliminar.iD_PEDIDO}`, {
                            method: "DELETE"
                        });
                        if (res.ok) {
                            fetchPedidos();
                        }
                        setModalEliminarVisible(false);
                        setPedidoAEliminar(null);
                    }}
                >
                    Eliminar
                </button>
            </div>
        </div>
    </div>
)}
            {modalEditarVisible && pedidoEditar && (
    <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-2xl text-white">
            <h2 className="text-xl mb-4">Editar Pedido</h2>

            <label className="block mb-1">Cliente:</label>
            <input
                type="text"
                className="w-full text-black mb-3 p-2 rounded"
                value={
                    clientes.find(c => c.iD_CLIENTES === pedidoEditar.iD_CLIENTE)?.razonSocial || ""
                }
                readOnly
            />

            <label className="block mb-1">Fecha:</label>
            <input
                type="date"
                className="w-full text-black mb-3 p-2 rounded"
                value={pedidoEditar.fecha}
                onChange={e =>
                    setPedidoEditar(prev => ({ ...prev, FECHA: e.target.value }))
                }
            />
            <div className="flex justify-between items-center mb-3">
    <h3 className="text-lg font-semibold">Detalle:</h3>
    <button
        className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
        onClick={() => setModalProductoVisible(true)}
    >
        Agregar Producto
    </button>
</div>
            <table className="w-full text-white mb-4">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidoEditar.detalle.map(p => (
                        <tr key={p.iD_PRODUCTO}>
                            <td>{p.nombre}</td>
                            <td>
                                <input
                                    type="number"
                                    className="w-16 text-black rounded px-1"
                                    value={p.cantidad}
                                    onChange={e => {
    const nuevaCantidad = Number(e.target.value);
    if (!isNaN(nuevaCantidad)) {
        setPedidoEditar(prev => {
            const nuevoDetalle = prev.detalle.map(dp =>
                dp.iD_PRODUCTO === p.iD_PRODUCTO
                    ? { ...dp, cantidad: nuevaCantidad }
                    : dp
            );
            return { ...prev, detalle: nuevoDetalle };
        });
    }
}}
                                />
                            </td>
                            <td>${p.precio}</td>
                            <td>${p.precio * p.cantidad}</td>
                            <td>
    <button
        className="text-red-500"
        onClick={() => {
            setPedidoEditar(prev => ({
                ...prev,
                detalle: prev.detalle.filter(dp => dp.iD_PRODUCTO !== p.iD_PRODUCTO)
            }));
        }}
    >
        x
    </button>
</td>
                        </tr>
                    ))}
                </tbody>
            </table>
{erroresEditar.detalle && (
                <p className="text-red-400 text-sm mt-2">{erroresEditar.detalle}</p>
            )}
            <div className="text-right text-lg font-semibold mt-2">
                Total: ${pedidoEditar.detalle.reduce((sum, p) => sum + p.precio * p.cantidad, 0)}
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setModalEditarVisible(false)} className="bg-gray-400 text-black px-4 py-2 rounded">
                    Cancelar
                </button>
                <button
                    onClick={async () => {
        const nuevosErrores = {};
        if (!pedidoEditar.detalle || pedidoEditar.detalle.length === 0) {
            nuevosErrores.detalle = "Debe agregar al menos un producto.";
        }
        if (Object.keys(nuevosErrores).length > 0) {
            setErroresEditar(nuevosErrores);
            return;
        }
        setErroresEditar({});
                        const total = pedidoEditar.detalle.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);
                        const body = {
                            ID_CLIENTE: pedidoEditar.iD_CLIENTE,
                            FECHA: pedidoEditar.fecha,
                            Estado: pedidoEditar.estado,
                            Total: total,
                            Detalle: pedidoEditar.detalle.map(p => ({
                                ID_PRODUCTO: p.iD_PRODUCTO,
                                Cantidad: p.cantidad,
                                PrecioUnitario: p.precio
                            }))
                        };
                        const res = await fetch(`${API_PEDIDO}/${pedidoEditar.iD_PEDIDO}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(body)
                        });
                        if (res.ok) {
                            setModalEditarVisible(false);
                            fetchPedidos();
                        }
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Guardar Cambios
                </button>
            </div>
        </div>
    </div>
)}
        </div>
    );
}