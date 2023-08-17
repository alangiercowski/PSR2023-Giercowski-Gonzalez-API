import { Collection, Db } from "mongodb";
import { Usuario } from "../Clases/Usuario";
const { createHash } = require('crypto');

export class AccesoUsuario{
    url: String;
    database: Db;
    collection: Collection;

    constructor(url: String, database: Db, collection: Collection){
        this.url = url;
        this.database = database;
        this.collection = collection;
    }

    public async getUsuario(correo: string) {
        const filtro = { correo: correo };
        const usuario = await this.collection.findOne(filtro);
        return usuario;
    }

    public async subirUsuario(usuario: Usuario){
        this.collection.insertOne(JSON.parse(JSON.stringify(usuario)));
    }

    public async login(correo: string, contraseña: string){
        const v = await this.getUsuario(correo);

        if(v != undefined){
            if(v.contraseña == hash(contraseña)){
                
                return true;
            }
            else{
                console.log(v.contraseña)
                console.log(hash(contraseña))
                return "contraseña incorrecta";
            }
        }
        else{
            return "Correo no registrado";
        }
    }
}

function hash(string: String) {
    return createHash('sha256').update(string).digest('hex');
}