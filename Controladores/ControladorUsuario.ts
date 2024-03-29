import { Usuario } from "../Clases/Usuario";
import { AccesoUsuario } from "../Accesos/AccesoUsuario";
import { MongoClient } from "mongodb";
import { publicacionDB } from "./ControladorPublicacion";
const Router = require("express")
const { createHash } = require("crypto");
const jwt = require("jsonwebtoken");
import { SECRET_KEY, verifyToken } from "../JWT/key";
const claveSecureta = SECRET_KEY;

const url = "mongodb://localhost:27017/PetMatch";
const client = new MongoClient(url);
const database = client.db("PetMatch");

export var usuarioDB: AccesoUsuario = new AccesoUsuario(
  url,
  database,
  database.collection("Usuarios")
);

export const routerUsuario = Router();

function hash(string: string) {
  return createHash("sha256").update(string).digest("hex");
}


routerUsuario.post("/usuarios/registro", async (_req: any, _res: any) => {
  let usuarioAsubir: Usuario = new Usuario(
    _req.body.correo,
    _req.body.nombre,
    await hash(String(_req.body.contraseña)),
    _req.body.direccion
  );
  if(await usuarioDB.getUsuario(usuarioAsubir.correo) != undefined){
    _res.send("El mail ya esta en uso");
    return;
  }
  usuarioDB.subirUsuario(usuarioAsubir).then((u) => {
    _res.send(204);
  });
});

routerUsuario.post("/usuarios/login", async (_req: any, _res: any) => {
      usuarioDB.login(_req.body.correo, _req.body.contraseña).then((v) => {    
         if (v == true) {
            let data = {
                correo: _req.body.correo,
              };
            let tokenJWT = jwt.sign(data, claveSecureta, { expiresIn: "2h" });
            _res.json(tokenJWT )
          } else {
            _res.send(v);
          }
      })
    });

routerUsuario.delete("/usuarios", async (_req: any, _res: any) => {

  let usuarioTemp = JSON.parse(JSON.stringify(await usuarioDB.getUsuario(_req.body.correo)))
  console.log(usuarioTemp)
  usuarioTemp = usuarioTemp.publicaciones
  for (let i=0; i < usuarioTemp.length; i++){
    publicacionDB.borrarPublicacion(i)
  }
  usuarioDB.deleteUsuario(_req.body.correo)
  console.log(usuarioTemp)
  _res.send(204)
})