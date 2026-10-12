export function errorHandler(err, req, res, next) {
  console.error("Error global capturado:", err.message || err);

  const codigoEstado = err.status || 500;

  const mensajeRespuesta =
    err.message || "Ocurrió un error interno en el servidor.";

  res.status(codigoEstado).json({
    exito: false,
    mensaje: mensajeRespuesta
  });
}