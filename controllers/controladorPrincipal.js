const { Error } = require('mongoose');
const Personaje = require('../models/personajes');
const date_fns = require('date-fns');
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
    
    try {
        await Personaje.insertMany(req.body);
    } catch (error) {        
        console.log("ERROR! ->",error.code);
        if(error.code == 11000){
            req.flash('alerta', 'Documento ya registrado!');
            return res.redirect('list');
        }        
    }
    console.log("add ->", req.body);
    req.flash('info', 'Ingreso exitoso!');
    return res.redirect('list');    
    
}

exports.listarPersonajes = async (req,res)=>{
    const resultado = await Personaje.find();
    
    console.log('resultado ->',resultado[0].nacimiento)

    const fechaNac = helpers.fechaNacimiento(resultado[0].nacimiento)    
        
    return res.render('alumnos/list', {resultado, fechaNac, nombrePagina:'Lista de agentes'})
}

exports.eliminarPersonajes = async (req, res) =>{            
    await Personaje.findByIdAndDelete(req.params._id);
    req.flash('alerta', 'Registro eliminado!');
    return res.redirect('/alumnos/list')
}

exports.editarPersonaje = async (req, res) =>{
    const idEdicion = req.params._id;
    const edicion = await Personaje.findById(idEdicion);    
    return res.render('alumnos/edit',{edicion, nombrePagina:'Home ceroUno'})
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
    return res.redirect('list')
}

exports.verPersonaje = async (req,res) =>{
    const idVista = req.params._id;
    const vista = await Personaje.findById(idVista)
    const fechaNac = helpers.fechaNacimiento(vista.nacimiento)
    console.log("idvista ->",vista);
    return res.render('alumnos/view', {vista, fechaNac, nombrePagina:'Home ceroUno'})
}
