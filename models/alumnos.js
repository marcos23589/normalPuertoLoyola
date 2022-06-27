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
    numeroLibro: {
      type: Number,
      min: [1, "Dato no válido"],
    },
    folioLibro: {
      type: Number,
      min: [1, "Dato no válido"],
    },
  },
  legajo: {
    numeroLegajo: {
      type: Number,
      min: [1, "Dato no válido"],
    },
    anioLegajo: {
      type: Number,
      min: [00, "Año no válido"],
    },
  },
  trayectoria: new Array({
    curso: String,
    anioCurso: {
      type: Number,
      min: [1900, "Año no válido"],
    },
  }),
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
