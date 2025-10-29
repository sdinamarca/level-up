import React from "react";
import { useCart } from "../context/CartContext";

// Reusable product card — props-driven. Includes data-attributes so existing CSS/JS selectors keep working.
// Props (>=8): id, nombre, precio, categoria, img, descripcion, stock, sku, marca, rating
export default function ProductCard({
  id,
  nombre,
  precio,
  categoria,
  img,
  descripcion = "",
  stock = null,
  sku = "",
  marca = "",
  rating = null,
}) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({ id, nombre, precio, img, qty: 1 });
  };

  return (
    <div
      className="producto"
      data-categoria={categoria}
      data-precio={precio}
      data-nombre={nombre}
    >
      <img src={img} alt={nombre} />
      <div className="categoria">{categoria}</div>
      <h4>{nombre}</h4>
      <div className="precio">${precio.toLocaleString("es-CL")}</div>
      {/* optional extra info shown if provided */}
      {marca && <div className="marca">{marca}</div>}
      {descripcion && <p className="descripcion">{descripcion}</p>}
      {rating != null && <div className="rating">⭐ {rating}</div>}
      {stock != null && (
        <div className="stock">
          {stock > 0 ? `Stock: ${stock}` : "Sin stock"}
        </div>
      )}

      <button className="add-to-cart" onClick={handleAdd}>
        Agregar al Carrito
      </button>
    </div>
  );
}
