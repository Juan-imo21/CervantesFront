import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Clientes from './components/clientes';
import Pedidos from './components/Pedidos'; 
import fondo from "./img/Fondo.png";

function App() {
  return (
    <BrowserRouter>
      <main className="flex justify-center items-center min-h-screen bg-black"style={{
    backgroundImage: `url(${fondo})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
  }}>
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
           <Route path="/clientes" element={<Clientes />} />
           <Route path="/pedidos" element={<Pedidos />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;