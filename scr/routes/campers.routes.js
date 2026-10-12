import { Router } from "express";
import { campers } from "../data/campers.db.js";
import { validarCamper } from "../middlewares/validator.js";

const router = Router();

// ============================================
// GET: Obtener todos los campers
// ============================================
router.get("/", (req, res) => {
  res.status(200).json({
    total: campers.length,
    datos: campers
  });
});

// ============================================
// GET: Obtener un camper por ID
// ============================================
router.get("/:id", (req, res) => {
  const idBuscado = Number(req.params.id);

  if (!Number.isInteger(idBuscado) || idBuscado <= 0) {
    return res.status(400).json({
      error: "El parámetro ID debe ser un número entero positivo."
    });
  }

  const camperEncontrado = campers.find(
    (c) => c.id === idBuscado
  );

  if (!camperEncontrado) {
    return res.status(404).json({
      error: `No se encontró ningún camper con el ID ${idBuscado}.`
    });
  }

  res.status(200).json({
    mensaje: "Camper encontrado exitosamente.",
    camper: camperEncontrado
  });
});

// ============================================
// POST: Registrar un nuevo camper
// ============================================
router.post("/", validarCamper, (req, res) => {
  const { nombre, modulo, nivel } = req.body;

  const nuevoId =
    campers.length > 0
      ? Math.max(...campers.map((c) => c.id)) + 1
      : 1;

  const nuevoCamper = {
    id: nuevoId,
    nombre: nombre.trim(),
    modulo: modulo.trim(),
    nivel: nivel.trim()
  };

  campers.push(nuevoCamper);

  res.status(201).json({
    mensaje: "Camper registrado exitosamente en memoria.",
    camper: nuevoCamper
  });
});

// ============================================
// PUT: Actualizar un camper existente
// ============================================
router.put("/:id", validarCamper, (req, res) => {
  const idBuscado = Number(req.params.id);

  if (!Number.isInteger(idBuscado) || idBuscado <= 0) {
    return res.status(400).json({
      error: "El parámetro ID debe ser un número entero positivo."
    });
  }

  const indice = campers.findIndex(
    (c) => c.id === idBuscado
  );

  if (indice === -1) {
    return res.status(404).json({
      error: `No es posible actualizar: no existe un camper con el ID ${idBuscado}.`
    });
  }

  const { nombre, modulo, nivel } = req.body;

  campers[indice] = {
    id: idBuscado,
    nombre: nombre.trim(),
    modulo: modulo.trim(),
    nivel: nivel.trim()
  };

  res.status(200).json({
    mensaje: `Camper con ID ${idBuscado} actualizado exitosamente.`,
    camper: campers[indice]
  });
});

// ============================================
// DELETE: Eliminar un camper por ID
// ============================================
router.delete("/:id", (req, res) => {
  const idBuscado = Number(req.params.id);

  if (!Number.isInteger(idBuscado) || idBuscado <= 0) {
    return res.status(400).json({
      error: "No es posible eliminar: el ID debe ser un número entero positivo."
    });
  }

  const indice = campers.findIndex(
    (c) => c.id === idBuscado
  );

  if (indice === -1) {
    return res.status(404).json({
      error: `No es posible eliminar: no existe un camper con el ID ${idBuscado}.`
    });
  }

  const [camperEliminado] = campers.splice(indice, 1);

  res.status(200).json({
    mensaje: `Camper con ID ${idBuscado} eliminado exitosamente.`,
    camper: camperEliminado
  });
});

export default router;