import mongoose from "mongoose";
import Mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema(
  {
    nombreUsuario: {
      type: String,
      minLength: 2,
      maxLength: 50,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      validate: {
        validator: (valor) => {
          return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        },
      },
    },
    password: {
      type: String,
      require: true,
      unique: true,
      validate: {
        validator: (valor) => {
          return /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,64}$/.test(
            valor
          );
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Usuario = mongoose.model("usuario", usuarioSchema);

export default Usuario;
