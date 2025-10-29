import React, { useState } from "react";
import "../assets/style.css";

export default function Resenia() {
  const [reseñas, setReseñas] = useState([]);
  const [comentario, setComentario] = useState("");
  const [estrellas, setEstrellas] = useState(5);

  const mostrarReseñas = () => reseñas;

  const agregarReseña = () => {
    if (!comentario) return alert("Escribe algo");
    setReseñas((r) => [
      {
        usuario: "Tú",
        estrellas: parseInt(estrellas, 10),
        comentario,
      },
      ...r,
    ]);
    setComentario("");
    setEstrellas(5);
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Reseñas</h1>
      <div id="reseñasExistentes" className="mb-4">
        {mostrarReseñas().map((r, idx) => (
          <div key={idx} className="reseña-card" style={{ marginBottom: 12 }}>
            <div>
              <strong>{r.usuario}</strong> - {"⭐".repeat(r.estrellas)}
              <p>{r.comentario}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="card p-3">
        <h3>Deja tu reseña</h3>
        <textarea
          id="comentarioReseña"
          className="form-control mb-2"
          placeholder="Escribe tu reseña"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
        <label htmlFor="estrellasReseña">Calificación:</label>
        <select
          id="estrellasReseña"
          className="form-select mb-2"
          style={{ width: 100 }}
          value={estrellas}
          onChange={(e) => setEstrellas(e.target.value)}
        >
          <option value="1">1 ⭐</option>
          <option value="2">2 ⭐</option>
          <option value="3">3 ⭐</option>
          <option value="4">4 ⭐</option>
          <option value="5">5 ⭐</option>
        </select>
        <button className="btn btn-primary" onClick={agregarReseña}>
          Agregar Reseña
        </button>
      </div>
    </div>
  );
}
