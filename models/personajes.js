const mongoose = require ('mongoose');

const personajeSchema = mongoose.Schema({
    nombre: String,
    apellido: String,        
    documento: {type: Number, required: true, unique: true},
    nacimiento: Date
});

const modeloPersonaje = mongoose.model('Personaje', personajeSchema);

modeloPersonaje.on('index', (error)=>{
    console.log("error ->", error)
})

module.exports = modeloPersonaje;