import { routerUsuario } from "./Controladores/ControladorUsuario";
import cors from "cors";
const express = require('express')

const app = express();

app.get("/", (req: any, res: any) => {
  res.send("Bienvenido a mi API")
});

app.use(express.json());
app.use(cors(),routerUsuario);

app.listen(3000, () => {
    console.log("Api corriendo");
  });