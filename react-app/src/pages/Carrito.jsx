import React from "react";
import { useCart } from "../context/CartContext";

const SAMPLE_PRODUCTS = [
  {
    id: "ps5pro",
    nombre: "PlayStation 5 pro",
    precio: 549990,
    img: "/assets/ps5pro.jpg",
  },
  {
    id: "catan",
    nombre: "Catan - Juego de Mesa",
    precio: 69990,
    img: "./assets/catan.jpg",
  },
  {
    id: "auricularesps5",
    nombre: "Audífonos Inalámbricos Sony Pulse Elite Playstation 5",
    precio: 159990,
    img: "./assets/audifonos.jpg",
  },
];

export default function Carrito() {
  const { cart, addItem, removeItem, updateQty, clearCart, total } = useCart();

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">LEVEL-UP</h1>

      <div className="row g-3">
        {SAMPLE_PRODUCTS.map((p) => (
          <div className="col-md-4" key={p.id}>
            <div className="card shadow-sm">
              <img src={p.img} className="card-img-top" alt={p.nombre} />
              <div className="card-body text-center">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text">
                  Precio: ${p.precio.toLocaleString("es-CL")}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    addItem({
                      id: p.id,
                      nombre: p.nombre,
                      precio: p.precio,
                      img: p.img,
                      qty: 1,
                    })
                  }
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-5 shadow">
        <div className="card-body">
          <h2 className="card-title">Carrito de Compras</h2>
          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <style>
                {`
                  td {
                    color: #000000ff;
                  }
                `}
              </style>
              <tbody id="tablaCarrito">
                {cart.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td>${(p.precio || 0).toLocaleString("es-CL")}</td>
                    <td>
                      <input
                        type="number"
                        value={p.qty}
                        min="1"
                        className="form-control w-50 mx-auto"
                        onChange={(e) =>
                          updateQty(
                            p.id,
                            Math.max(1, parseInt(e.target.value || "1", 10))
                          )
                        }
                      />
                    </td>
                    <td>
                      $
                      {((p.precio || 0) * (p.qty || 1)).toLocaleString("es-CL")}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeItem(p.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 id="total" className="text-end mt-3">
            Total: ${total.toLocaleString("es-CL")}
          </h3>
          <div className="text-end">
            <button className="btn btn-danger me-2" onClick={() => clearCart()}>
              Vaciar carrito
            </button>

            <button className="btn btn-success">Finalizar compra</button>
          </div>
        </div>
      </div>
    </div>
  );
}
