import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
import Producto from "../models/producto.js";

const validacionProducto = [
  body("nombreProducto")
    .notEmpty()
    .withMessage("El nombre del producto es un dato obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage(
      "El nombre del producto debe contener entre 2 y 100 caracteres"
    )
    .custom(async (valor, { req }) => {
      const productoExistente = await Producto.findOne({
        nombreProducto: valor,
      });
      //pregunto si no encontramos un producto con el nombre del valor
      if (!productoExistente) {
        return true;
      }
      if (
        req.params?.id &&
        productoExistente._id.toString() === req.params.id
      ) {
        return true;
      }
      //enviar un mensaje de error
      throw new Error("Ya existe un producto con ese nombre");
    }),
  body("precio")
    .notEmpty()
    .withMessage("El precio del producto es un dato obligatorio")
    .isNumeric()
    .isFloat({ min: 100, max: 1000000 })
    .withMessage(
      "El precio debe estar entre 100 y 1000000 de pesos argentinos"
    ),
  body("descripcion_breve")
    .notEmpty()
    .withMessage("la descripcion breve es un dato obligatorio")
    .isLength({ min: 5, max: 250 })
    .withMessage("La descripcion breve debe tener entre 5 y 100 caracteres"),
  body("descripcion_amplia")
    .notEmpty()
    .withMessage("la descripcion amplia es un dato obligatorio")
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripcion amplia debe tener entre 10 y 500 caracteres"),
  body("categoria")
    .notEmpty()
    .withMessage("La categoria es un dato obligatorio")
    .isIn([
      "Acompañamientos",
      "Bebidas",
      "Ensaladas",
      "Hamburguesas",
      "Postres",
      "Pizzas",
      "Sandwiches y Wraps",
      "Veganos",
    ])
    .withMessage(`La categoria debe ser una de las siguiente: "Acompañamientos"
      "Bebidas",
      "Ensaladas",
      "Hamburguesas",
      "Postres",
      "Pizzas",
      "Sandwiches y Wraps",
      "Veganos"`),
  body("imagen")
    .notEmpty()
    .withMessage("La imagen es un dato obligatorio")
    .matches(
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\.(jpg|jpeg|png|webp))$/
    )
    .withMessage(
      "La imagen debe cumplir con el formato de url de imagen con los siguientes formatos: jpg, jpeg, png, webp"
    ),
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionProducto;
