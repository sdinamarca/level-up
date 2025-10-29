// Utility used by registration logic
function generarCodigo(nombre) {
  const base = (nombre || "").substring(0, 3).toUpperCase();
  return base + Math.floor(Math.random() * 1000);
}

module.exports = { generarCodigo };
