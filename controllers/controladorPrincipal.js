const { Error } = require('mongoose');
const Personaje = require('../models/personajes');
const helpers = require('../lib/helpers');

exports.paramGet = (req, res) => {    
    const {mivariable, otravariable} = req.params;
    return res.send(`Las variables son ${mivariable} y ${otravariable}`);
}

exports.paginaHome = (req, res) =>{    
    return res.render('home',{nombrePagina:'Home ceroUno'});
};


exports.registrarDB = (req, res) =>{
    return res.send('Registro en DB')
}

exports.crearPersonajeGet = (req,res) => {
    return res.render('alumnos/add',{nombrePagina:'Home ceroUno'});
}

exports.crearPersonaje = async (req,res)=>{
    
    const persona = Personaje(req.body);

    try {        
        await persona.save();        
        req.flash('info', 'Ingreso exitoso!');
    } catch (error) {        
        console.log("ERROR! ->",error);
        if(error.code == 11000){
            req.flash('alerta', 'Documento ya registrado!');
            return res.redirect('list');
        }
    }    
    return res.redirect('list');    
}

exports.listarPersonajes = async (req,res)=>{
    const resultado = await Personaje.find();
    
    for(let i=0; i<resultado.length; i++){
        let fecha = helpers.fechaNacimiento(resultado[i].nacimiento);
        //se crea otra variable dentro del objeto para mostrarla
        resultado[i].fecha = fecha;        
    }
    
    return res.render('alumnos/list', {resultado, nombrePagina:'Lista de agentes'})
}

exports.eliminarPersonajes = async (req, res) =>{            
    await Personaje.findByIdAndDelete(req.params._id);
    req.flash('alerta', 'Registro eliminado!');
    return res.redirect('/list')
}

exports.editarPersonaje = async (req, res) =>{
    const idEdicion = req.params._id;
    const edicion = await Personaje.findById(idEdicion);    
    let fecha = helpers.fechaNacimientoBacks(edicion.nacimiento);
        
    return res.render('alumnos/edit',{edicion, fecha, nombrePagina:'Home ceroUno'})
}

exports.postPersonaje = async (req, res)=>{    
    const personajeId = req.params._id   
    const editado = req.body;

    await Personaje.findByIdAndUpdate(personajeId,{
        nombre: editado.nombre,
        apellido: editado.apellido, 
        documento: editado.documento, 
        nacimiento: editado.nacimiento
    });
    req.flash('info', 'Edición exitosa!');
    return res.redirect('/list')
}

exports.verPersonaje = async (req,res) =>{
    const idVista = req.params._id;
    const vista = await Personaje.findById(idVista)
    const fechaNac = helpers.fechaNacimiento(vista.nacimiento)
    console.log("idvista ->",vista);
    return res.render('alumnos/view', {vista, fechaNac, nombrePagina:'Home ceroUno'})
}
