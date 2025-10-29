import { Router } from "express";
import {
  crearProducto,
  prueba,
  listarProductos,
  obtenerProductoID,
  eliminarProducto,
  editarProducto,
} from "../controllers/productos.controllers.js";
import validacionProducto from "../middlewares/validacionProducto.js";
/*GET - POST - PATH O PUT - DELETE */

const router = Router();

router.route("/test").get(prueba);
router.route("/").post(validacionProducto, crearProducto).get(listarProductos);
router
  .route("/:id")
  .get(obtenerProductoID)
  .delete(eliminarProducto)
  .put(validacionProducto, editarProducto);

export default router;
