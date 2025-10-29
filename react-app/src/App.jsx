import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useCart } from "./context/CartContext";
import Home from "./pages/Home";
import Carrito from "./pages/Carrito";
import GestionUsuario from "./pages/GestionUsuario";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import PreferidosInicio from "./pages/PreferidosInicio";
import PreferidosPerfil from "./pages/PreferidosPerfil";
import Resenia from "./pages/Resenia";
import "./assets/style.css";

export default function App() {
  const { cart } = useCart();

  return (
    <>
      <header>
        <div className="header-content">
          <Link to="/" className="logo">
            LEVEL-UP
          </Link>
          <div className="nav-buttons">
            <Link to="/login" className="btn btn-primary">
              Iniciar Sesión
            </Link>
            <Link to="/registro" className="btn btn-secondary">
              Registrarse
            </Link>
            <Link
              to="/carrito"
              className="btn"
              style={{ background: "transparent", color: "#fff" }}
            >
              🛒 Carrito ({cart.length})
            </Link>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/gestion-usuario" element={<GestionUsuario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/preferidos/inicio" element={<PreferidosInicio />} />
        <Route path="/preferidos/perfil" element={<PreferidosPerfil />} />
        <Route path="/resenia" element={<Resenia />} />
      </Routes>

      <a
        href="https://wa.me/56945002960"
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat en WhatsApp"
      >
        <i className="fa-brands fa-whatsapp whatsapp-icon" />
      </a>
    </>
  );
}
