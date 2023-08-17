import { Publicacion } from "./Publicacion"
export class Usuario{

    correo: string
    nombre: String
    contraseña: String
    publicaciones: Array<Publicacion>
    foto: String
    direccion: String

    constructor(correo: string, nombre: String, constraseña: String, foto: String, direccion: String){
        this.correo = correo
        this.nombre = nombre
        this.contraseña = constraseña
        this.publicaciones = []
        this.foto = foto
        this.direccion = direccion
    }
}