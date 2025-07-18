import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    setError("");
    setSuccess(false);

    if (username.length < 3 || password.length < 6) {
      setError("Usuario o contraseña demasiado cortos.");
      return;
    }

    if (
      (username === "admin" && password === "admin123") ||
      (username === "empleado" && password === "empleado123")
    ) {
      setSuccess(true);
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="bg-zinc-900 text-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold">Daddy</div>
            <div className="text-xl font-light">bebidas</div>
          </div>

          <input
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={20}
            className="text-black w-full px-4 py-2 rounded-md"
          />

          <input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={20}
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

          <a href="#" className="text-xs text-yellow-400 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  );
}
