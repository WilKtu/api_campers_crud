# API REST de Campers

API REST desarrollada con **Node.js** y **Express** para administrar campers mediante operaciones CRUD. El proyecto utiliza módulos ECMAScript (ESM), middlewares propios y un arreglo en memoria como almacenamiento temporal.

## Objetivo

Practicar la creación de una API REST, el manejo de rutas HTTP, la validación de datos recibidos y el uso de respuestas JSON con códigos de estado adecuados.

## Tecnologías utilizadas

- Node.js
- Express 5
- JavaScript con módulos ECMAScript (ESM)
- JSON para el intercambio de datos

## Funcionalidades

- Listar todos los campers registrados.
- Consultar un camper por su identificador.
- Registrar un nuevo camper.
- Actualizar los datos de un camper existente.
- Eliminar un camper.
- Validar los datos enviados en las solicitudes de creación y actualización.
- Registrar las solicitudes en consola mediante un middleware.
- Gestionar rutas inexistentes y errores mediante respuestas JSON.

## Estructura del proyecto

```text
api_campers_crud/
├── scr/
│   ├── data/
│   │   └── campers.db.js
│   ├── middlewares/
│   │   ├── errorHandles.js
│   │   ├── logger.js
│   │   └── validator.js
│   ├── routes/
│   │   └── campers.routes.js
│   └── app.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

> Nota: la carpeta se llama `scr` en el proyecto actual. Si se cambia a `src`, hay que actualizar también las rutas de los scripts de `package.json`.

## Requisitos

- Node.js instalado.
- npm, incluido con Node.js.
- Una herramienta para realizar solicitudes HTTP, por ejemplo Postman, Insomnia o `curl`.

## Instalación

Clona el repositorio y entra en su directorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd api_campers_crud
```

Instala las dependencias:

```bash
npm install
```

## Ejecución

En la configuración actual, `package.json` define los scripts `start` y `dev` apuntando a `src/app.js`, pero el archivo de la aplicación está ubicado en `scr/app.js`. Actualiza los scripts para que apunten a la ruta existente:

```json
"scripts": {
  "start": "node scr/app.js",
  "dev": "node --watch scr/app.js"
}
```

Además, para que el servidor se inicie al ejecutar la aplicación normalmente, reemplaza la condición de escucha en `scr/app.js` por:

```js
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
```

Después de aplicar estos ajustes, inicia el servidor:

```bash
npm run dev
```

La API estará disponible en:

```text
http://localhost:3000
```

## Endpoints

La ruta base de los recursos es `/api/campers`.

| Método   | Endpoint           | Descripción                            |
| -------- | ------------------ | -------------------------------------- |
| `GET`    | `/`                | Muestra información general de la API. |
| `GET`    | `/api/campers`     | Devuelve la lista completa de campers. |
| `GET`    | `/api/campers/:id` | Busca un camper por ID.                |
| `POST`   | `/api/campers`     | Registra un camper nuevo.              |
| `PUT`    | `/api/campers/:id` | Actualiza los datos de un camper.      |
| `DELETE` | `/api/campers/:id` | Elimina un camper por ID.              |

### Ejemplo de datos

Los endpoints `POST` y `PUT` esperan un cuerpo JSON con los campos `nombre`, `modulo` y `nivel`:

```json
{
  "nombre": "Wilder",
  "modulo": "Node.js",
  "nivel": "Intermedio"
}
```

Envía el encabezado:

```text
Content-Type: application/json
```

### Ejemplos con curl

Listar campers:

```bash
curl http://localhost:3000/api/campers
```

Consultar por ID:

```bash
curl http://localhost:3000/api/campers/1
```

Crear un camper:

```bash
curl -X POST http://localhost:3000/api/campers \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Wilder","modulo":"Node.js","nivel":"Intermedio"}'
```

Actualizar un camper:

```bash
curl -X PUT http://localhost:3000/api/campers/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Wilder","modulo":"Express","nivel":"Avanzado"}'
```

Eliminar un camper:

```bash
curl -X DELETE http://localhost:3000/api/campers/1
```

## Validaciones y respuestas

- Los campos `nombre`, `modulo` y `nivel` son obligatorios y deben contener texto no vacío.
- El ID debe ser un entero positivo.
- Si el camper no existe, la API responde con estado `404`.
- Si los datos enviados no son válidos, responde con estado `400`.
- Cuando se crea un camper correctamente, responde con estado `201`.
- Las consultas, actualizaciones y eliminaciones exitosas responden con estado `200`.
- Las rutas que no existen responden con estado `404`.

## Middlewares

- **`logger.js`**: registra en la consola la fecha, el método HTTP y la URL de cada solicitud.
- **`validator.js`**: valida el cuerpo de las solicitudes de creación y actualización.
- **`errorHandles.js`**: centraliza la respuesta ante errores de la aplicación.

## Almacenamiento

Los campers se guardan en un arreglo de JavaScript en memoria. Por lo tanto, los cambios realizados mediante la API no se conservan cuando se reinicia el proceso. Este proyecto no utiliza una base de datos.

## Alcance del proyecto

Este ejercicio tiene fines educativos y permite practicar los fundamentos de una API REST con Express. No incluye autenticación, autorización ni persistencia en una base de datos.

