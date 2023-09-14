import { Collection, Db } from "mongodb";
import { Publicacion } from "../Clases/Publicacion";
import { AccesoUsuario } from "./AccesoUsuario";

export class AccesoPublicacion{
    url: String;
    database: Db;
    collection: Collection;
    accesoUsuario: AccesoUsuario;

    constructor(url: String, database: Db, collection: Collection, accesoUsuario: AccesoUsuario){
        this.url = url;
        this.database = database;
        this.collection = collection;
        this.accesoUsuario = accesoUsuario;
    }

    public async getPublicacion(id: Number) {
        const filtro = { id: id };
        const publicacion = await this.collection.findOne(filtro);
        return publicacion;
    }
    public async getIdMasAlto(){
        const publicacion = await this.collection.find().sort({id: -1}).limit(1).toArray()
        console.log(publicacion[0].id)
        return publicacion[0].id;
    }

    public async subirPublicacion(publicacion: Publicacion){
        this.collection.insertOne(JSON.parse(JSON.stringify(publicacion)));
        this.accesoUsuario.getUsuario(String(publicacion.mailUsuario)).then((u) => {
            u!.publicaciones.push(publicacion.id);
            this.accesoUsuario.collection.updateOne({correo: u!.correo}, {$set: {publicaciones: u!.publicaciones}})
        });
    }

}
