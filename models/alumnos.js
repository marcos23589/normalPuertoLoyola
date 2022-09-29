const mongoose = require("mongoose");

const personajeSchema = mongoose.Schema({
  nombre: String,
  apellido: String,
  documento: {
    type: Number,
    min: [1000000, "Documento no válido"],
    required: true,
    unique: true,
  },
  nacimiento: Date,
  lugarNacimiento: String,
  
  libroMatriz: {
    type: String,
    unique: true,
  },
  legajo: {
    type: String,
    unique: true,
  },  
  curso: Number,
  division: String,  
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
