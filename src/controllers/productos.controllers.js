import { json } from "express";
import Producto from "../models/producto.js";

export const prueba = (req, res) => {
  console.log("Desde el controlador de prueba");
  res.send("Prueba desde el controlador");
};

export const crearProducto = async (req, res) => {
  try {
    //1- verificar que llegan los datos validados
    //2- pedir al modelo producto crear el objeto en la base de datos
    // console.log(req.body);
    const productoNuevo = new Producto(req.body);
    await productoNuevo.save();
    res.status(201).json({ mensaje: "Producto creado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Ocurrio un error al crear el producto" });
  }
};

export const listarProductos = async (req, res) => {
  try {
    //1- Buscar la coleccion de productos
    const productos = await Producto.find();
    //2- enviar la respuesta al front
    res.status(200).json(productos);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al obtener los productos" });
  }
};

export const obtenerProductoID = async (req, res) => {
  try {
    console.log(req.params.id);
    const productoBuscado = await Producto.findById(req.params.id);
    if (!productoBuscado) {
      return json
        .status(404)
        .json({ mensaje: "No se encontro el producto buscado" });
    }
    res.status(200).json(productoBuscado);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al obtener el producto" });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const productoBuscado = await Producto.findByIdAndDelete(req.params.id);
    console.log(productoBuscado);
    if (!productoBuscado) {
      return res
        .status(404)
        .json({ mensaje: "No se encontro el producto buscado" });
    }
    res.status(200).json({ mensaje: "Producto eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al eliminar el producto" });
  }
};

export const editarProducto = async (req, res) => {
  try {
    const productoBuscado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!productoBuscado) {
      return res
        .status(404)
        .json({ mensaje: "No se encontro el producto buscado" });
    }
    res.status(200).json({ mensaje: "Producto actualizado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Ocurrio un error al editar el producto" });
  }
};
