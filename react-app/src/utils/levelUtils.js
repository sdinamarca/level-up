function nivelDesdePuntos(puntos) {
  const p = Number(puntos) || 0;
  return Math.floor(p / 500) + 1;
}

module.exports = { nivelDesdePuntos };
