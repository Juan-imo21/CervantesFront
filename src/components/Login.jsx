import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/Logo.jpg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Recuperación de contraseña
  const [modalCorreo, setModalCorreo] = useState(false);
  const [modalCodigo, setModalCodigo] = useState(false);
  const [modalNuevaPass, setModalNuevaPass] = useState(false);
  const [emailRecuperacion, setEmailRecuperacion] = useState("");
  const [codigoIngresado, setCodigoIngresado] = useState("");
  const [nuevaPass, setNuevaPass] = useState("");
  const [confirmarPass, setConfirmarPass] = useState("");
  const [errorRecuperacion, setErrorRecuperacion] = useState("");

  const handleLogin = async () => {
    setError("");
    setSuccess(false);

    if (username.length < 3 || password.length < 6) {
      setError("Usuario o contraseña demasiado cortos.");
      return;
    }

    try {
      const response = await fetch("https://localhost:44367/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aliasLogin: username, contrasena: password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        setError(data.mensaje || "Error en el inicio de sesión.");
      }
    } catch (err) {
      setError("Error del servidor. Intente más tarde.");
    }
  };

  const enviarCodigoRecuperacion = async () => {
    setErrorRecuperacion("");
    try {
      const res = await fetch("https://localhost:44367/api/Auth/recuperar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailRecuperacion }),
      });

      const data = await res.json();
      if (res.ok) {
        setModalCorreo(false);
        setModalCodigo(true);
      } else {
        setErrorRecuperacion(data.mensaje || "Error al enviar código.");
      }
    } catch (error) {
      setErrorRecuperacion("Error del servidor.");
    }
  };

  const verificarCodigo = async () => {
    setErrorRecuperacion("");

    if (codigoIngresado.length !== 6) {
      setErrorRecuperacion("Código inválido.");
      return;
    }

    setModalCodigo(false);
    setModalNuevaPass(true);
  };

  const cambiarContrasena = async () => {
    setErrorRecuperacion("");

    if (nuevaPass !== confirmarPass) {
      setErrorRecuperacion("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await fetch("https://localhost:44367/api/Auth/cambiar-contrasena", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailRecuperacion,
          codigo: codigoIngresado,
          nuevaContrasena: nuevaPass,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setModalNuevaPass(false);
        alert("Contraseña actualizada correctamente. Inicie sesión.");
      } else {
        setErrorRecuperacion(data.mensaje || "No se pudo cambiar la contraseña.");
      }
    } catch (error) {
      setErrorRecuperacion("Error del servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-zinc-900 text-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center mb-4">
  <img src={logo} alt="Logo" style={{ maxHeight: "130px" }} />
</div>

          <input
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-black w-full px-4 py-2 rounded-md"
          />
          <input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black w-full px-4 py-2 rounded-md"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">Inicio de sesión exitoso.</p>}

          <button
            onClick={handleLogin}
            className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-300"
          >
            Iniciar sesión
          </button>

          <button
            onClick={() => setModalCorreo(true)}
            className="text-xs text-yellow-400 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>

      {/* MODAL 1: Ingresar correo */}
      {modalCorreo && (
        <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-sm text-white">
            <h3 className="text-lg mb-4">Recuperar contraseña</h3>
            <input
              type="email"
              placeholder="Ingrese su correo"
              className="w-full mb-3 text-black p-2 rounded"
              value={emailRecuperacion}
              onChange={(e) => setEmailRecuperacion(e.target.value)}
            />
            {errorRecuperacion && <p className="text-red-500 text-sm">{errorRecuperacion}</p>}
            <div className="flex justify-end gap-2">
              <button onClick={() => setModalCorreo(false)} className="bg-gray-500 px-4 py-2 rounded">Cancelar</button>
              <button onClick={enviarCodigoRecuperacion} className="bg-yellow-500 px-4 py-2 rounded">Enviar código</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Verificar código */}
      {modalCodigo && (
        <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-sm text-white">
            <h3 className="text-lg mb-4">Ingrese el código recibido</h3>
            <input
              type="text"
              maxLength={6}
              className="w-full mb-3 text-black p-2 rounded"
              value={codigoIngresado}
              onChange={(e) => setCodigoIngresado(e.target.value)}
            />
            {errorRecuperacion && <p className="text-red-500 text-sm">{errorRecuperacion}</p>}
            <div className="flex justify-end gap-2">
              <button onClick={() => setModalCodigo(false)} className="bg-gray-500 px-4 py-2 rounded">Cancelar</button>
              <button onClick={verificarCodigo} className="bg-green-500 px-4 py-2 rounded">Verificar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Cambiar contraseña */}
      {modalNuevaPass && (
        <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-sm text-white">
            <h3 className="text-lg mb-4">Nueva contraseña</h3>
            <input
              type="password"
              placeholder="Nueva contraseña"
              className="w-full mb-2 text-black p-2 rounded"
              value={nuevaPass}
              onChange={(e) => setNuevaPass(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="w-full mb-3 text-black p-2 rounded"
              value={confirmarPass}
              onChange={(e) => setConfirmarPass(e.target.value)}
            />
            {errorRecuperacion && <p className="text-red-500 text-sm">{errorRecuperacion}</p>}
            <div className="flex justify-end gap-2">
              <button onClick={() => setModalNuevaPass(false)} className="bg-gray-500 px-4 py-2 rounded">Cancelar</button>
              <button onClick={cambiarContrasena} className="bg-blue-500 px-4 py-2 rounded">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}