const mongoose = require("mongoose");

const personajeSchema = mongoose.Schema({
  nombre: String,
  apellido: String,
  documento: { type: Number, required: true, unique: true },
  nacimiento: Date,
  lugarNacimiento: String,
  libroMatriz: { numeroLibro: Number, folioLibro: Number },
  legajo: { numeroLegajo: Number, anioLegajo: Number },
  trayectoria: new Array({ curso: String, anioCurso: Number }),
  historial: {
    colegioOrigen: String,
    ingreso: Date,
    colegioDestino: String,
    fechaSalida: Date,
    situacion: String,
    observaciones: String,
    fechaEgreso: Date,
  },
});

const modeloPersonaje = mongoose.model("Personaje", personajeSchema);

modeloPersonaje.on("index", (error) => {
  console.log("error ->", error);
});

module.exports = modeloPersonaje;
