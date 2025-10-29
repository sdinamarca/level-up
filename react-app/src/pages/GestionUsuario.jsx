import React, { useState } from "react";

export default function GestionUsuario() {
  const [active, setActive] = useState("personal");

  return (
    <div className="container">
      <h1 className="titular">Gestión de Usuarios</h1>
      <h3>Administra tu informacion personal y preferencia de compra</h3>

      <div className="perfil-usuario">
        <div className="info-perfil">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/professional-woman-avatar-7trcFTykT3i8qO9R2s1IaS8p0LMsLt.png"
            alt="avatar"
          />
          <div className="info-usuario">
            <h1>Fabian Briones</h1>
            <h3>fabian.briones@example.com</h3>
            <div>
              <p>Hardware</p>
              <p>Aventura</p>
              <p>RPG</p>
            </div>
          </div>
        </div>
        <button>Cambiar Foto</button>
      </div>

      <div className="menu-usuario">
        <ul>
          <li>
            <a
              href="#"
              className={active === "personal" ? "activo" : ""}
              onClick={(e) => {
                e.preventDefault();
                setActive("personal");
              }}
            >
              Personal
            </a>
          </li>
          <li>
            <a
              href="#"
              className={active === "compras" ? "activo" : ""}
              onClick={(e) => {
                e.preventDefault();
                setActive("compras");
              }}
            >
              Compras
            </a>
          </li>
          <li>
            <a
              href="#"
              className={active === "preferencias" ? "activo" : ""}
              onClick={(e) => {
                e.preventDefault();
                setActive("preferencias");
              }}
            >
              Preferencias
            </a>
          </li>
          <li>
            <a
              href="#"
              className={active === "seguridad" ? "activo" : ""}
              onClick={(e) => {
                e.preventDefault();
                setActive("seguridad");
              }}
            >
              Seguridad
            </a>
          </li>
        </ul>
      </div>

      <div
        id="personal"
        className={`contenido ${active === "personal" ? "activo" : ""}`}
      >
        <div className="card">
          <h2>Información Personal</h2>
          <p className="subtitulo">Actualiza tus datos básicos</p>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" placeholder="Ingresa tu nombre" />
            </div>
            <div className="form-group">
              <label htmlFor="correo">Correo electrónico</label>
              <input
                type="email"
                id="correo"
                placeholder="ejemplo@correo.com"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input type="tel" id="telefono" placeholder="+56 9 1234 5678" />
            </div>
            <div className="form-group">
              <label htmlFor="nacimiento">Fecha de nacimiento</label>
              <input type="date" id="nacimiento" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="bio">Biografía</label>
            <textarea
              id="bio"
              placeholder="Escribe algo sobre ti..."
            ></textarea>
          </div>
          <div className="botones">
            <button className="btn-secundario">Cancelar</button>
            <button className="btn-primario boton-guardar">Guardar</button>
          </div>
        </div>
      </div>

      <div
        className={`contenido ${active === "compras" ? "activo" : ""}`}
        id="compras"
      >
        <section className="card">
          <h2 className="titulo-seccion">Historial de Compras</h2>
          <p>revisa y administra tus compras anteriores</p>
          <form>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pago">Método de Pago Preferido</label>
                <select id="pago">
                  <option>Tarjeta de Crédito</option>
                  <option>PayPal</option>
                  <option>Transferencia Bancaria</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="presupuesto">Rango de Presupuesto</label>
                <select id="presupuesto">
                  <option>€100 - €500</option>
                  <option>€500 - €1000</option>
                  <option>€1000 - €5000</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="direccion">Dirección de Envío</label>
              <textarea
                id="direccion"
                rows="3"
                placeholder="Calle Principal 123, Madrid, España"
              ></textarea>
            </div>
          </form>
        </section>
      </div>

      <section
        className={`contenido ${active === "preferencias" ? "activo" : ""}`}
        id="preferencias"
      >
        <div className="card">
          <h2>Preferencias Generales</h2>
          <p className="subtitulo">
            Personaliza tu experiencia en la plataforma
          </p>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="idioma">Idioma</label>
              <select id="idioma">
                <option>Español</option>
                <option>Inglés</option>
                <option>Francés</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="moneda">Moneda</label>
              <select id="moneda">
                <option>EUR (€)</option>
                <option>USD ($)</option>
                <option>CLP ($)</option>
              </select>
            </div>
          </div>
          <hr />
          <h2>Notificaciones</h2>
          <div className="notificacion">
            <div>
              <strong>Notificaciones Push</strong>
              <p>Recibir notificaciones sobre pedidos y ofertas</p>
            </div>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>
          <div className="notificacion">
            <div>
              <strong>Newsletter</strong>
              <p>Recibir noticias y promociones por email</p>
            </div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </section>

      <section
        className={`contenido ${active === "seguridad" ? "activo" : ""}`}
        id="seguridad"
      >
        <div className="card">
          <h2>Seguridad de la Cuenta</h2>
          <p className="subtitulo">
            Gestiona la seguridad y privacidad de tu cuenta
          </p>
          <div className="opcion">
            <div>
              <strong>🔒 Autenticación de Dos Factores</strong>
              <p>Activada</p>
            </div>
            <button className="btn-secundario">Configurar</button>
          </div>
          <div className="opcion">
            <div>
              <strong>💳 Métodos de Pago</strong>
              <p>2 tarjetas guardadas</p>
            </div>
            <button className="btn-secundario">Gestionar</button>
          </div>
          <hr />
          <h2>Cambiar Contraseña</h2>
          <form>
            <div className="form-group">
              <label htmlFor="actual">Contraseña Actual</label>
              <input type="password" id="actual" />
            </div>
            <div className="form-group">
              <label htmlFor="nueva">Nueva Contraseña</label>
              <input type="password" id="nueva" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmar">Confirmar Nueva Contraseña</label>
              <input type="password" id="confirmar" />
            </div>
            <button type="submit" className="btn-primario">
              Actualizar Contraseña
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
