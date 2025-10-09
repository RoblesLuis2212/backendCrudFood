import mongoose from "mongoose";

try {
  mongoose.connect(process.env.MONGODB).then(() => {
    console.info("Conexion con BD exitosa");
  });
} catch (error) {
  console.error(error);
}

export default mongoose;
