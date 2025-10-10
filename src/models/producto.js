import mongoose from "mongoose";
import Mongoose, { Schema } from "mongoose";

const productoSchema = new Schema(
  {
    nombreProducto: {
      type: String,
      minLength: 2,
      maxLength: 100,
      required: true,
      unique: true,
    },
    precio: {
      type: Number,
      min: 100,
      max: 1000000,
    },
    categoria: {
      type: String,
      required: true,
      enum: [
        "Acompañamientos",
        "Bebidas",
        "Ensaladas",
        "Hamburguesas",
        "Postres",
        "Pizzas",
        "Sandwiches y Wraps",
        "Veganos",
      ],
    },
    descripcion_breve: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 250,
    },
    descripcion_amplia: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 500,
    },
    imagen: {
      type: String,
      required: true,
      validate: {
        validator: (valor) => {
          const recExp =
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\.(jpg|jpeg|png|webp))$/;
          return recExp.test(valor);
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Producto = mongoose.model("producto", productoSchema);

export default Producto;
