import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { addItem } = useCart();
  useEffect(() => {
    // Ported page scripts: filters, search, ordering and add-to-cart
    const checkboxes = Array.from(
      document.querySelectorAll(".filtros input[type=checkbox]")
    );
    const productos = Array.from(document.querySelectorAll(".producto"));
    const ordenar = document.getElementById("ordenar");
    const buscador = document.getElementById("buscador");

    function filtrarProductos() {
      const seleccionadas = checkboxes
        .filter((c) => c.checked)
        .map((c) => c.value);
      const texto = (
        buscador && buscador.value ? buscador.value : ""
      ).toLowerCase();

      productos.forEach((prod) => {
        const categoria = prod.dataset.categoria;
        const nombre = (prod.dataset.nombre || "").toLowerCase();
        const coincideCategoria =
          seleccionadas.length === 0 || seleccionadas.includes(categoria);
        const coincideTexto = nombre.includes(texto);
        prod.style.display =
          coincideCategoria && coincideTexto ? "block" : "none";
      });
    }

    checkboxes.forEach((cb) => cb.addEventListener("change", filtrarProductos));
    if (buscador) buscador.addEventListener("input", filtrarProductos);

    const ordenarHandler = () => {
      const contenedor = document.querySelector(".productos");
      if (!contenedor) return;
      const items = Array.from(contenedor.children);
      items.sort((a, b) => {
        switch (ordenar.value) {
          case "precio-asc":
            return parseInt(a.dataset.precio) - parseInt(b.dataset.precio);
          case "precio-desc":
            return parseInt(b.dataset.precio) - parseInt(a.dataset.precio);
          case "nombre":
            return a.dataset.nombre.localeCompare(b.dataset.nombre);
          default:
            return 0;
        }
      });
      items.forEach((i) => contenedor.appendChild(i));
    };
    if (ordenar) ordenar.addEventListener("change", ordenarHandler);

    // ProductCard components handle their own add-to-cart click via React.

    filtrarProductos();

    return () => {
      checkboxes.forEach((cb) =>
        cb.removeEventListener("change", filtrarProductos)
      );
      if (buscador) buscador.removeEventListener("input", filtrarProductos);
      if (ordenar) ordenar.removeEventListener("change", ordenarHandler);
    };
  }, []);

  return (
    <div>
      <div className="main-container">
        <section className="hero-section">
          <h1 className="hero-title">¡Sube de Nivel!</h1>
          <p className="hero-subtitle">
            Descubre los mejores productos gaming y lleva tu experiencia al
            siguiente nivel
          </p>
        </section>

        <div className="catalogo">
          <aside className="filtros">
            <h3>🎮 Categorías</h3>
            <ul>
              <li>
                <input type="checkbox" id="juegos" value="juegos" />
                <label htmlFor="juegos">Juegos de mesa</label>
              </li>
              <li>
                <input type="checkbox" id="accesorios" value="accesorios" />
                <label htmlFor="accesorios">Accesorios</label>
              </li>
              <li>
                <input type="checkbox" id="consolas" value="consolas" />
                <label htmlFor="consolas">Consolas</label>
              </li>
            </ul>

            <h3>📊 Ordenar por</h3>
            <select id="ordenar">
              <option value="default">Más Populares</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
              <option value="nombre">Nombre A-Z</option>
            </select>

            <h3>🔍 Buscar</h3>
            <input type="text" id="buscador" placeholder="Buscar producto..." />
          </aside>

          <section className="productos">
            {/* Use ProductCard component with props; images taken from public/assets */}
            {/* PlayStation 5 */}
            <ProductCard
              id="playstation-5"
              nombre="PlayStation 5"
              precio={450000}
              categoria="Consolas"
              img="/assets/ps5pro.jpg"
              descripcion="Consola next-gen con gráficos mejorados y SSD ultra rápido."
              stock={12}
              sku="PS5-STD-001"
              marca="Sony"
              rating={4.8}
            />

            {/* Logitech G Pro X (example image 'descarga.jpg' as generic mouse) */}
            <ProductCard
              id="logitech-g-pro-x"
              nombre="Logitech G Pro X"
              precio={85000}
              categoria="Mouse Gaming"
              img="/assets/descarga.jpg"
              descripcion="Mouse gaming profesional con sensor HERO y switches GX."
              stock={28}
              sku="LG-PRO-X-001"
              marca="Logitech"
              rating={4.5}
            />
            {/* Catan - Juego de Mesa */}
            <ProductCard
              id="catan"
              nombre="Catan - Juego de Mesa"
              precio={69990}
              categoria="Juegos de Mesa"
              img="/assets/catan.jpg"
              descripcion="Un juego de mesa estratégico para 3-4 jugadores."
              stock={15}
              sku="CATAN-001"
              marca="Catan Studio"
              rating={4.7}
            />
            {/* Audífonos Inalámbricos Sony Pulse Elite Playstation 5 */}
            <ProductCard
              id="auricularesps5"
              nombre="Audífonos Inalámbricos Sony Pulse Elite"
              precio={159990}
              categoria="Accesorios"
              img="/assets/audifonos.jpg"
              descripcion="Audífonos inalámbricos diseñados para la PlayStation 5."
              stock={10}
              sku="AUD-PS5-001"
              marca="Sony"
              rating={4.9}
            />
            {/* Razer BlackShark V2 Pro */}
            <ProductCard
              id="pc-alto-rendimiento"
              nombre="PC ALTO RENDIMIENTO"
              precio={1999990}
              categoria="Accesorios"
              img="/assets/pc.jpg"
              descripcion="Pc de alto rendimiento"
              stock={5}
              sku="PC-ALTO-001"
              marca="Genérica"
              rating={4.8}
            />
            <ProductCard
              id="polera-gaming"
              nombre="Polera Gaming"
              precio={29990}
              categoria="Ropa"
              img="/assets/polera.jpg"
              descripcion="Polera cómoda y estilizada para gamers."
              stock={20}
              sku="POL-GAMING-001"
              marca="Genérica"
              rating={4.5}
            />
          </section>
        </div>
      </div>

      <footer>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1614.3218665764903!2d-70.6846115622053!3d-33.5988123187725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d97348990efd%3A0xce94f054c9e23bbf!2sCarlos%20Condell%2C%20San%20Bernardo%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1757420353991!5m2!1ses-419!2scl"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </footer>
    </div>
  );
}
