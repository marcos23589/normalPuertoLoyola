const mongoose = require ('mongoose');

const personajeSchema = mongoose.Schema({
    nombre: String,
    apellido: String,
    correo: String,
    revista: String,
    dni: {type: Number, required: true, unique: true}
});

const modeloPersonaje = mongoose.model('Personaje', personajeSchema);

modeloPersonaje.on('index', (error)=>{
    console.log("error ->", error)
})

module.exports = modeloPersonaje;