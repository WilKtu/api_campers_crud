export function validarCamper(req, res, next) {
  const { nombre, modulo, nivel } = req.body ?? {};

  // Validar que el cuerpo de la petición sea un objeto JSON válido.
  if (
    !req.body ||
    typeof req.body !== "object" ||
    Array.isArray(req.body)
  ) {
    return res.status(400).json({
      error: "Se requiere un cuerpo JSON válido en la petición."
    });
  }

  // Validar el campo nombre.
  if (
    typeof nombre !== "string" ||
    nombre.trim().length === 0
  ) {
    return res.status(400).json({
      error: "El campo nombre es obligatorio y debe ser una cadena de texto no vacía."
    });
  }

  // Validar el campo modulo.
  if (
    typeof modulo !== "string" ||
    modulo.trim().length === 0
  ) {
    return res.status(400).json({
      error: "El campo modulo es obligatorio y debe ser una cadena de texto no vacía."
    });
  }

  // Validar el campo nivel.
  if (
    typeof nivel !== "string" ||
    nivel.trim().length === 0
  ) {
    return res.status(400).json({
      error: "El campo nivel es obligatorio y debe ser una cadena de texto no vacía."
    });
  }

  // Los datos son válidos; continuar con la siguiente función.
  next();
}