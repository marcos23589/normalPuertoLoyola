const { Error } = require('mongoose');
const Personaje = require('../models/personajes');

exports.paramGet = (req, res) => {    
    const {mivariable, otravariable} = req.params;
    return res.send(`Las variables son ${mivariable} y ${otravariable}`);
}

exports.paginaHome = (req, res) =>{    
    return res.render('home',{nombrePagina:'Home ceroUno'});
};

exports.about = (req, res)=>{
    return res.render('nosotros', {nombrePagina: 'Nosotros'})
}

exports.ingreso = (req, res)=>{
    return res.render('ingreso', {nombrePagina: 'Formulario de ingreso'})
}

exports.registrarDB = (req, res) =>{
    return res.send('Registro en DB')
}

exports.crearPersonajeGet = (req,res) => {
    return res.render('crearPersonaje',{nombrePagina:'Home ceroUno'});
}

exports.crearPersonaje = async (req,res)=>{

    try {
        await Personaje.create(req.body);       
    } catch (error) {        
        console.log("ERROR! ->",error.code);
        if(error.code == 11000){
            req.flash('alerta', 'Documento ya registrado!');
            return res.redirect('listarpersonajes');
        }        
    }

    req.flash('info', 'Ingreso exitoso!');
    return res.redirect('listarpersonajes');    
    
}

exports.listarPersonajes = async (req,res)=>{
    const resultado = await Personaje.find();
    console.log('resultado ->',resultado)
    return res.render('listarpersonajes', {resultado, nombrePagina:'Lista de agentes'})
}

exports.eliminarPersonajes = async (req, res) =>{            
    await Personaje.findByIdAndDelete(req.params._id);
    req.flash('alerta', 'Registro eliminado!');
    return res.redirect('/listarpersonajes')
}

exports.editarPersonaje = async (req, res) =>{
    const idEdicion = req.params._id;
    const edicion = await Personaje.findById(idEdicion);    
    return res.render('edit',{edicion, nombrePagina:'Home ceroUno'})
}

exports.postPersonaje = async (req, res)=>{    
    const personajeId = req.params._id   
    const editado = req.body;

    await Personaje.findByIdAndUpdate(personajeId,{
        nombre: editado.nombre,
        apellido: editado.apellido, 
        correo: editado.correo, 
        revista: editado.revista,
        dni: editado.dni
    });
    req.flash('info', 'Edición exitosa!');
    return res.redirect('/listarpersonajes')
}

exports.verPersonaje = async (req,res) =>{
    const idVista = req.params._id;
    const vista = await Personaje.findById(idVista)
    return res.render('view', {vista, nombrePagina:'Home ceroUno'})
}

exports.paginaNormal = (req,res) =>{
    return res.render('normal', {nombrePagina:'Normal ceroUno'})
}