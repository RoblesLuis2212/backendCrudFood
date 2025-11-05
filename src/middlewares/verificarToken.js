import jwt from "jsonwebtoken";

const verificarJWT = (req, res, next) => {
  try {
    const token = req.header("x-token");
    if (!token) {
      return res
        .status(401)
        .json({ mensaje: "No hay un token en la peticion" });
    }
    const payload = jwt.verify(token, process.env.SECRETJWT);
    //se puede extraer informacion del payload
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ mensaje: "Token no valido" });
  }
};

export default verificarJWT;
