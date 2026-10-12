import express from "express";
import { logger } from "./middlewares/logger.js";
import{ errorHandler } from "./middlewares/errorHandles.js";
import campersRoutes from "./routes/campers.routes.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(logger);

app.get("/",(req, res)=>{
  res.status(200).json({
    mensaje: "Bienvenido a Api REST de campres en Express (Campuslands)",
    stacks: "Node.js + Express + ECMAScritp Modules (ESM)",
    almacenamiento: "Areglo en memoria",
    documentacion_endpoints:{
      listar_todo: "GET /api/campers",
      obtener_por_id: "GET /api/campers/:id",
      crear_nuevs: "POST /api/campers"
    }
  });
});

app.use("/api/campers", campersRoutes);

app.use((req,res)=>{
  res.status(404).json({
    error: `Ruta ${req.method} ${req.originalUrl} no escontrada en este  servidor`
  });
});

app.use(errorHandler);

if (process.env.NODE_ENV == "test"){
  app.listen(PORT,()=>{
    console.log('\n==========================================0');
    console.los(`Servidor Expres escuchando en HTTP://localhost:${PORT}`);
    console.log(`Endpoints Crud disponibles en http://localhost:${PORT}/api/campers`);
    console.log(`Preciona CTRL+C para deter el servidor`);
    console.log('========================================\n');
  });
}

export default app;