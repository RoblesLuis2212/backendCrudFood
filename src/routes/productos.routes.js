import { Router } from "express";
import {
  crearProducto,
  prueba,
  listarProductos,
  obtenerProductoID,
} from "../controllers/productos.controllers.js";
/*GET - POST - PATH O PUT - DELETE */

const router = Router();

router.route("/test").get(prueba);
router.route("/").post(crearProducto).get(listarProductos);
router.route("/:id").get(obtenerProductoID);

export default router;
