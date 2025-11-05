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
import validacionidProducto from "../middlewares/validacionIDproducto.js";
import verificarJWT from "../middlewares/verificarToken.js";
/*GET - POST - PATH O PUT - DELETE */

const router = Router();

router.route("/test").get(prueba);
router
  .route("/")
  .post(verificarJWT, validacionProducto, crearProducto)
  .get(listarProductos);
router
  .route("/:id")
  .get(validacionidProducto, obtenerProductoID)
  .delete(eliminarProducto)
  .put([validacionidProducto, validacionProducto], editarProducto);

export default router;
