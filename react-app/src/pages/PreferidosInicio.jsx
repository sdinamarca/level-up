import React, { useState, useRef, useEffect } from "react";

export default function PreferidosInicio() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [codigoReferido, setCodigoReferido] = useState("");
  const [mensaje, setMensaje] = useState(null); // { text, tipo }
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function generarCodigo(nombre) {
    const base = (nombre || "").substring(0, 3).toUpperCase();
    return base + Math.floor(Math.random() * 1000);
  }

  function mostrarMensaje(texto, tipo = "success") {
    setMensaje({ text: texto, tipo });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setMensaje(null), 5000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const n = nombre.trim();
    const c = correo.trim();
    const p = password;
    const codigo = codigoReferido.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.some((u) => u.correo === c)) {
      mostrarMensaje("Este correo ya está registrado.", "danger");
      return;
    }

    const nuevoUsuario = {
      nombre: n,
      correo: c,
      contraseña: p,
      puntos: 0,
      codigo: generarCodigo(n),
      historialCompras: [],
      referidos: [],
    };

    if (codigo) {
      const usuarioQueRefiere = usuarios.find((u) => u.codigo === codigo);
      if (usuarioQueRefiere) {
        const puntosPorReferido = 100;
        const bonusDuocuc = c.endsWith("@duocuc.cl") ? 50 : 0;
        usuarioQueRefiere.puntos =
          (usuarioQueRefiere.puntos || 0) + puntosPorReferido + bonusDuocuc;
        usuarioQueRefiere.referidos = usuarioQueRefiere.referidos || [];
        usuarioQueRefiere.referidos.push(nuevoUsuario.codigo);
        mostrarMensaje(
          `¡Registro exitoso! ${usuarioQueRefiere.nombre} ganó ${
            puntosPorReferido + bonusDuocuc
          } puntos LevelUp`,
          "success"
        );
      } else {
        mostrarMensaje(
          "Código de referido no válido, pero registro exitoso.",
          "warning"
        );
      }
    } else {
      mostrarMensaje("Registro exitoso.", "success");
    }

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // reset form
    setNombre("");
    setCorreo("");
    setPassword("");
    setCodigoReferido("");
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Registro LevelUp</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="justify-content-center" style={{ display: "flex" }}>
              Crear Cuenta
            </h2>
            <p className="subtitulo">
              Completa los datos para crear tu cuenta LevelUp
            </p>

            <form id="formRegistro" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    placeholder="Nombre completo"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="correo">Correo Electrónico</label>
                  <input
                    type="email"
                    id="correo"
                    placeholder="Correo electrónico"
                    required
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Contraseña"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="codigoReferido">
                  Código de referido (opcional)
                </label>
                <input
                  type="text"
                  id="codigoReferido"
                  placeholder="Código de referido (opcional)"
                  value={codigoReferido}
                  onChange={(e) => setCodigoReferido(e.target.value)}
                />
              </div>

              <div className="botones">
                <button type="submit" className="boton-guardar">
                  Crear Cuenta
                </button>
              </div>
            </form>

            <a href="/login" className="link-login">
              O iniciar sesión
            </a>

            <div
              id="mensaje"
              className={`alert ${
                mensaje ? `alert-${mensaje.tipo}` : "d-none"
              }`}
              role="alert"
              style={{ marginTop: 12 }}
            >
              {mensaje ? mensaje.text : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
