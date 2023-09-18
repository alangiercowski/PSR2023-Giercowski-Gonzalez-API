import { Publicacion } from "../Clases/Publicacion";
import { AccesoPublicacion } from "../Accesos/AccesoPublicacion";
import { MongoClient } from "mongodb";
import { usuarioDB } from "./ControladorUsuario";
import { Tipo } from "../Clases/Tipo";
const Router = require("express")
const jwt = require("jsonwebtoken");

const url = "mongodb://localhost:27017/PetMatch";
const client = new MongoClient(url);
const database = client.db("PetMatch");

export var publicacionDB: AccesoPublicacion = new AccesoPublicacion(
    url,
    database,
    database.collection("Publicaciones"),
    usuarioDB
);

export const routerPublicacion = Router();

routerPublicacion.get("/publicaciones/:id", async (_req: any, _res: any) => {
    _res.send(await publicacionDB.getPublicacion(_req.params.id))
})

routerPublicacion.get("/publicaciones", async (_req: any, _res: any) => {
    _res.send(await publicacionDB.getPublicaciones())
})

routerPublicacion.post("/publicaciones", async (_req: any, _res: any) => {
    var id = await publicacionDB.getIdMasAlto()
    let publicacionAsubir: Publicacion = new Publicacion(
        Number(id) + 1,
        _req.body.fotos,
        _req.body.precio,
        _req.body.descripcion,
        _req.body.caracteristicas,
        _req.body.titulo,
        _req.body.mailUsuario,
        _req.body.ubicacion
    );
    if (_req.body.tipo == "Venta") {
        publicacionAsubir.tipo = Tipo.venta
    }   
    else if (_req.body.tipo == "Adopcion") {
        publicacionAsubir.tipo = Tipo.adopcion
    }
    else if (_req.body.tipo == "Extravio") {
        publicacionAsubir.tipo = Tipo.extravio
    }
    publicacionDB.subirPublicacion(publicacionAsubir).then((u) => {
        _res.send(204);
    });
});

routerPublicacion.delete("/publicaciones", async (_req: any, _res: any) => {
    publicacionDB.borrarPublicacion(_req.body.id).then((u) => {
        _res.send(204)
    })
})