import React from "react";

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Inicio de sesión simulado");
  };

  return (
    <div className="card" style={{ maxWidth: 480, margin: "40px auto" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" required />
        </div>
        <a href="#">¿Olvidaste tu contraseña?</a>
        <br />
        <br />
        <button type="submit" className="btn-primario">
          Iniciar sesión
        </button>
      </form>
      <p style={{ marginTop: 12 }}>
        ¿No tienes una cuenta? <a href="/registro">Regístrate</a>
      </p>
      <a href="#">&lt;- Volver al inicio</a>
    </div>
  );
}
