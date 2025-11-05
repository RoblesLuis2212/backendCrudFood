import jwt from "jsonwebtoken";

const generarJWT = (usuario, email) => {
  try {
    const payload = { usuario, email };
    const token = jwt.sign(payload, process.env.SECRETJWT, { expiresIn: "2h" });
    return token;
  } catch (err) {
    console.error(err);
    throw new Error("Error al generar el token");
  }
};

export default generarJWT;
