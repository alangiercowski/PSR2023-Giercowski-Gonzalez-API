export class Comentario{
    mailUsuario: String
    contenido: String
    fecha: Date

    constructor(mailUsuario: String, contenido: String, fecha: Date){
        this.mailUsuario = mailUsuario
        this.contenido = contenido
        this.fecha = fecha
    }
}