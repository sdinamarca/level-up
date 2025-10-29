import React, { useState } from "react";

export default function Registro() {
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("Registro simulado (migrado)");
  };

  return (
    <div className="card">
      <h2>Crear Cuenta</h2>

      <form id="formRegistro" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" required />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <input type="text" id="apellido" required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" required />
        </div>

        <div className="form-group">
          <label htmlFor="confirm_password">Confirmar Contraseña</label>
          <input type="password" id="confirm_password" required />
        </div>

        <div style={{ margin: "10px 0" }}>
          <input type="checkbox" id="terminos" required />
          <label htmlFor="terminos" style={{ marginLeft: 8 }}>
            Acepto los términos y condiciones
          </label>
        </div>

        <button type="submit">Crear Cuenta</button>
      </form>

      <br />
      <a href="/">&lt;- Volver al inicio</a>

      {mensaje && (
        <div
          id="mensaje"
          className="alert"
          role="alert"
          style={{ marginTop: 12 }}
        >
          {mensaje}
        </div>
      )}
    </div>
  );
}
