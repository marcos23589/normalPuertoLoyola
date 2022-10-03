const { Error } = require("mongoose");
const Personaje = require("../models/alumnos");
const helpers = require("../lib/helpers");

exports.paramGet = (req, res) => {
  const { mivariable, otravariable } = req.params;
  return res.send(`Las variables son ${mivariable} y ${otravariable}`);
};

exports.paginaHome = (req, res) => {
  return res.render("home", { nombrePagina: "Home" });
};

exports.acerca = (req, res) => {
  return res.render ("about", {nombrePagina:"Acerca de"})
}

exports.registrarDB = (req, res) => {
  return res.send("Registro en DB");
};

/* PAGINA PARA AGREGAR */
exports.crearPersonajeGet = (req, res) => {
  return res.render("alumnos/add", { nombrePagina: "Agregar alumno" });
};

/* SE ENVIAN DATOS A LA BASE PARA AGREGAR */
exports.crearPersonaje = async (req, res) => {
  let {
    nombre,
    apellido,
    lugarNacimiento,
    documento,
    nacimiento,
    curso,
    division,
    numeroLibro,
    folioLibro,
    numeroLegajo,
    anioLegajo,
    colegioOrigen,
    ingreso,
    colegioDestino,
    fechaSalida,
    situacion,
    fechaEgreso,
    observaciones,
  } = req.body;


  if (numeroLibro < 10){
      numeroLibro = "00" + numeroLibro
    }else if (numeroLibro < 99){
      numeroLibro = "0" + numeroLibro
    }

  if (folioLibro < 10){
      folioLibro = "00" + folioLibro
    }else if (folioLibro < 99){
      folioLibro = "0" + folioLibro
    }
  const libroMatriz = numeroLibro+folioLibro

  if (numeroLegajo < 10){
    numeroLegajo = "00" + numeroLegajo
  }else if (numeroLegajo < 100){
    numeroLegajo = "0" + numeroLegajo
  }

  const legajo = numeroLegajo+anioLegajo.slice(-2)
  
  const historial = {
    colegioOrigen,
    ingreso,
    colegioDestino,
    fechaSalida,
    situacion,
    fechaEgreso,
    observaciones,
  };

  let persona = {
    nombre,
    apellido,
    documento,
    nacimiento,
    lugarNacimiento,
    libroMatriz,
    legajo,
    curso,
    division,
    historial,
  };

  console.log("crear Persona ->", persona);

  /* SE REVISA QUE LEGAJO, FOLIO EN LIBRO MATRIZ 
  Y DNI NO SEAN DUPLICADOS */
  try {
    await Personaje(persona).save();
    req.flash("info", "Ingreso exitoso!");
  } catch (error) {
    //console.log("ERROR! ->", error);
    //console.log("ERROR 2! ->", error.keyPattern);
    if (error.code == 11000) {
      if (error.keyPattern.documento == 1){
        req.flash("alerta", "Documento ya registrado!");
      }
      else if (error.keyPattern.legajo == 1) {
        req.flash("alerta", "Legajo ya registrado!");
      } 
      else if (error.keyPattern.libroMatriz == 1) {
        req.flash("alerta", "Folio ya utlizado en Lobr Matriz!");
      }       
    } else {
      req.flash("alerta", "Datos ingresados no son válidos");
    }
  }
  return res.redirect("list");
};

/* LISTAR REGISTROS */
exports.listarPersonajes = async (req, res) => {
  const resultado = await Personaje.find();

  console.log("Listar personajes", resultado)

  for (const element of resultado) {
    let fecha = helpers.fechaNacimiento(element.nacimiento);
    //se crea otra variable dentro del objeto para mostrarla
    element.fecha = fecha;
  }
/* ACA VAN LAS VARIABLES QUE SE PINTAN EN LA VISTA */
  return res.render("alumnos/list", {
    resultado,
    nombrePagina: "Lista de alumnos",
  });
};

/* ELIMINAR REGISTROS */
exports.eliminarPersonajes = async (req, res) => {
  await Personaje.findByIdAndDelete(req.params._id);
  req.flash("alerta", "Registro eliminado!");
  return res.redirect("/list");
};

/* PARA PINTAR EN LA PANTALLA DE EDICION */
exports.editarPersonaje = async (req, res) => {
  const idEdicion = req.params._id;
  const edicion = await Personaje.findById(idEdicion);
  
  const datos = {
    fecha : helpers.fechaNacimientoBacks(edicion.nacimiento),    
    curso :  edicion.curso,
    division : edicion.division
  }
  
  const libroMatriz = edicion.libroMatriz
  const numeroLibro = libroMatriz.substr(0,3)
  const folioLibro = libroMatriz.substr(3,6)
    
  const legajo = edicion.legajo
  const numeroLegajo = legajo.substr(0,3)
  const anioLegajo = legajo.substr(3,5)

  const historial = {
    colegioOrigen: edicion.historial.colegioOrigen,
    ingreso: helpers.fechaNacimientoBacks(edicion.historial.ingreso),
    colegioDestino: edicion.historial.colegioDestino,
    fechaSalida: helpers.fechaNacimientoBacks(edicion.historial.fechaSalida),
    situacion: edicion.historial.situacion,
    fechaEgreso: helpers.fechaNacimientoBacks(edicion.historial.fechaEgreso),
    observaciones: edicion.historial.observaciones
  }

/* ACA VAN LAS VARIABLES QUE SE PINTAN EN LA VISTA */
  console.log("EDICION --->", edicion)
  return res.render("alumnos/edit", {
    edicion,
    datos,
    numeroLibro,
    folioLibro,
    numeroLegajo,
    anioLegajo,
    historial,
    nombrePagina: "Home",
  });
  
};

/* SE ENVIAN DATOS DESPUES DE EDITAR DATOS */
exports.postPersonaje = async (req, res) => {
  const personajeId = req.params._id;
  const editado = req.body;
  
  console.log("EDITADO --->", editado)
  await Personaje.findByIdAndUpdate(personajeId, {
    nombre: editado.nombre,
    apellido: editado.apellido,
    documento: editado.documento,
    nacimiento: editado.nacimiento,
    libroMatriz: editado.numeroLibro + editado.folioLibro,

    legajo: editado.numeroLegajo+editado.anioLegajo.slice(-2),
    curso: editado.curso,
    division: editado.division,
    
    historial: {
      colegioOrigen: editado.colegioOrigen,
      ingreso: editado.ingreso,
      colegioDestino: editado.colegioDestino,
      fechaSalida: editado.fechaSalida,
      situacion: editado.situacion,
      observaciones: editado.observaciones,
      fechaEgreso: editado.fechaEgreso
    }

  });
  
  req.flash("info", "Edición exitosa!");
  return res.redirect("/list"); 
  
};

/* PARA PINTAR EN LA PANTALLA DE VER ALUMNO */
exports.verPersonaje = async (req, res) => {
  const idVista = req.params._id;
  const vista = await Personaje.findById(idVista);
  const fechaNac = helpers.fechaNacimiento(vista.nacimiento);
  const fechaIngreso = helpers.fechaNacimiento(vista.historial.ingreso);
  const fechaSalida = helpers.fechaNacimiento(vista.historial.fechaSalida);
  const fechaEgreso = helpers.fechaNacimiento(vista.historial.fechaEgreso);
  const historial = vista.historial

  console.log("VISTA -->", vista);

  const numeroLibro = vista.libroMatriz.substr(0,3)
  const folioLibro = vista.libroMatriz.substr(3,6)  
  const libroMatriz = `${numeroLibro}/${folioLibro}`

  const numeroLegajo = vista.legajo.substr(0,3)
  const anioLegajo = vista.legajo.substr(3,5)
  const legajo = `${numeroLegajo}/${anioLegajo}`
  const curso = `${vista.curso + vista.division}`
  
  /* ACA VAN LAS VARIABLES QUE SE PINTAN EN LA VISTA */
  return res.render("alumnos/view", {
    vista,
    fechaNac,
    fechaIngreso,
    fechaEgreso,
    fechaSalida,
    libroMatriz,
    historial,
    legajo,
    curso,
    nombrePagina: "Vista",
  });
};
