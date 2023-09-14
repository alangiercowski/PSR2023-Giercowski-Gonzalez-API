import { Publicacion } from "../Clases/Publicacion";
import { AccesoPublicacion } from "../Accesos/AccesoPublicacion";
import { MongoClient } from "mongodb";
import { usuarioDB } from "./ControladorUsuario";
const Router = require("express")
const jwt = require("jsonwebtoken");

const url = "mongodb://localhost:27017/PetMatch";
const client = new MongoClient(url);
const database = client.db("PetMatch");

var publicacionDB: AccesoPublicacion = new AccesoPublicacion(
    url,
    database,
    database.collection("Publicaciones"),
    usuarioDB
);

export const routerPublicacion = Router();

routerPublicacion.post("/publicaciones", async (_req: any, _res: any) => {
    var id = await publicacionDB.getIdMasAlto()
    let publicacionAsubir: Publicacion = new Publicacion(
        Number(id) + 1,
        _req.body.fotos,
        _req.body.precio,
        _req.body.tipo,
        _req.body.descripcion,
        _req.body.caracteristicas,
        _req.body.titulo,
        _req.body.mailUsuario,
        _req.body.ubicacion
    );
    publicacionDB.subirPublicacion(publicacionAsubir).then((u) => {
        _res.send(204);
    });
});