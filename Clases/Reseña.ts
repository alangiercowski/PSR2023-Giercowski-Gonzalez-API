export class Reseña{
    mailUsuario: String
    contenido: String
    fecha: Date
    estrellas: Number

    constructor(mailUsuario: String, contenido: String, fecha: Date, Estrellas: Number){
        this.mailUsuario = mailUsuario
        this.contenido = contenido
        this.fecha = fecha
        this.estrellas = Estrellas
    }
}