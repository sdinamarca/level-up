import React, { useEffect, useState } from "react";

export default function PreferidosPerfil() {
  const [usuario, setUsuario] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  // sample descuentos/productos (images are expected in public/assets)
  const descuentos = [{ nombre: "Descuento $5.000 CLP", puntos: 500 }];
  const productos = [
    {
      nombre: "Juego de mesa: Catan",
      puntos: 2500,
      precio: "$30.000 CLP",
      img: "/assets/catan.jpg",
    },
    {
      nombre: "Mousepad Gaming",
      puntos: 3500,
      precio: "$9.990 CLP",
      img: "/assets/mousepad.jpg",
    },
    {
      nombre: "PS5 Pro (ref.)",
      puntos: 5000,
      precio: "$459.990 CLP",
      img: "/assets/ps5pro.jpg",
    },
  ];

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("usuarios")) || [];
    const u = list[0] || {
      nombre: "UsuarioDemo",
      puntos: 3500,
      historialCompras: [
        { producto: "PS5 Pro", puntosGanados: 1000, fecha: "2025-09-05" },
        { producto: "Control PS5", puntosGanados: 500, fecha: "2025-09-01" },
      ],
    };
    setUsuario(u);
  }, []);

  function nivelDesdePuntos(puntos = 0) {
    return Math.floor(puntos / 500) + 1;
  }

  function mostrarToast(text) {
    setMensaje(text);
    setTimeout(() => setMensaje(null), 3000);
  }

  function canjearProducto(puntosNecesarios, nombreProducto) {
    if (!usuario) return;
    if (usuario.puntos >= puntosNecesarios) {
      const actualizado = {
        ...usuario,
        puntos: usuario.puntos - puntosNecesarios,
      };
      setUsuario(actualizado);
      // persist: replace first usuario in array
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      if (usuarios.length) {
        usuarios[0] = { ...usuarios[0], puntos: actualizado.puntos };
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
      } else {
        localStorage.setItem("usuarios", JSON.stringify([actualizado]));
      }
      mostrarToast(`¡Canjeaste: ${nombreProducto}!`);
    } else {
      mostrarToast("No tienes suficientes puntos para canjear este producto.");
    }
  }

  if (!usuario) return null;

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Perfil LevelUp</h1>

      <div className="card p-4 text-center mb-4">
        <h2>
          Bienvenido, <span>{usuario.nombre}</span>
        </h2>
        <p>
          Tus puntos actuales: <strong>{usuario.puntos} LevelUp</strong>
        </p>
        <p>
          Nivel actual: <strong>{nivelDesdePuntos(usuario.puntos)}</strong>
        </p>
      </div>

      <div className="historial card p-3 mb-4">
        <h3>Historial de Compras</h3>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Producto</th>
                <th>Puntos obtenidos</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(usuario.historialCompras) &&
              usuario.historialCompras.length ? (
                usuario.historialCompras.map((compra, idx) => (
                  <tr key={idx}>
                    <td>{compra.producto}</td>
                    <td>{compra.puntosGanados}</td>
                    <td>{compra.fecha}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-secondary">
                    Sin historial de compras aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="canjes card p-3">
        <h3>Canjear Puntos</h3>

        <div className="mb-4">
          <h5>Descuentos</h5>
          <div className="row g-3">
            {descuentos.map((d, i) => (
              <div className="col-md-4" key={i}>
                <div
                  className="card p-3 text-center"
                  style={{ border: "1px solid #39FF14" }}
                >
                  <p>{d.nombre}</p>
                  <button
                    className="btn btn-success"
                    onClick={() => canjearProducto(d.puntos, d.nombre)}
                  >
                    Canjear por {d.puntos} puntos
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5>Productos</h5>
          <div className="row g-3">
            {productos.map((prod, i) => (
              <div className="col-md-4" key={i}>
                <div
                  className="card p-3 text-center"
                  style={{ border: "1px solid #39FF14" }}
                >
                  <img
                    src={prod.img}
                    className="card-img-top mb-2"
                    alt={prod.nombre}
                  />
                  <p>
                    <strong>{prod.nombre}</strong>
                  </p>
                  <p>Precio referencia: {prod.precio}</p>
                  <button
                    className="btn btn-success"
                    onClick={() => canjearProducto(prod.puntos, prod.nombre)}
                  >
                    Canjear por {prod.puntos} puntos
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {mensaje && (
        <div
          className="alert alert-primary"
          style={{ marginTop: 12 }}
          role="alert"
        >
          {mensaje}
        </div>
      )}
    </div>
  );
}
