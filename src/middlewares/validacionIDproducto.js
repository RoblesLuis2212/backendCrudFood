import { param } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionidProducto = [
  param("id")
    .isMongoId()
    .withMessage("El ID no corresponde con el formato de mongo DB"),
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionidProducto;
