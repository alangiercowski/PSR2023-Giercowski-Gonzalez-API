import { Reseña } from "./Reseña"
import { Tipo } from "./Tipo"
import { Comentario } from "./Comentario"

export class Publicacion{
    id: Number
    reseñas: Array<Reseña>
    fotos: Array<String>
    precio: Number
    tipo: Tipo
    descripcion: String
    caracteristicas: Map<String, String>
    titulo: String
    mailUsuario: String
    ubicacion: String
    comentarios: Array<Comentario>

    constructor(id: Number, fotos: Array<String>, precio: Number, descripcion: String, caracteristicas: Map<String, String>, titulo: String, mailUsuario: String, ubicacion: String){
        this.id = id
        this.reseñas = []
        this.fotos = fotos
        this.precio = precio
        this.descripcion = descripcion
        this.caracteristicas = caracteristicas
        this.titulo = titulo
        this.mailUsuario = mailUsuario
        this.ubicacion = ubicacion
        this.comentarios = []
        this.tipo = Tipo.venta
    }
}