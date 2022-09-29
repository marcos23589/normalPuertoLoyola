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
  const {
    nombre,
    apellido,
    lugarNacimiento,
    documento,
    nacimiento,
    curso,
    division,
    libroMatriz,
    legajo,
    colegioOrigen,
    ingreso,
    colegioDestino,
    fechaSalida,
    situacion,
    fechaEgreso,
    observaciones,
  } = req.body;
  
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

  console.log("crear ->", persona);
  
  try {
    await Personaje(persona).save();
    req.flash("info", "Ingreso exitoso!");
  } catch (error) {
    console.log("ERROR! ->", error);
    if (error.code == 11000) {
      req.flash("alerta", "Documento ya registrado!");
    } else {
      req.flash("alerta", "datos ingresados no válidos");
    }
  }
  return res.redirect("list");
};

/* LISTAR REGISTROS */
exports.listarPersonajes = async (req, res) => {
  const resultado = await Personaje.find();
  for (const element of resultado) {
    let fecha = helpers.fechaNacimiento(element.nacimiento);
    //se crea otra variable dentro del objeto para mostrarla
    element.fecha = fecha;
  }

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

    
  const legajo = edicion.legajo

  const historial = {
    colegioOrigen: edicion.historial.colegioOrigen,
    ingreso: helpers.fechaNacimientoBacks(edicion.historial.ingreso),
    colegioDestino: edicion.historial.colegioDestino,
    fechaSalida: helpers.fechaNacimientoBacks(edicion.historial.fechaSalida),
    situacion: edicion.historial.situacion,
    fechaEgreso: helpers.fechaNacimientoBacks(edicion.historial.fechaEgreso),
    observaciones: edicion.historial.observaciones
  }


  console.log("EDICION --->", edicion)
  return res.render("alumnos/edit", {
    edicion,
    datos,
    libroMatriz,
    legajo,
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
    libroMatriz: {
      numeroLibro: editado.numeroLibro,
      folioLibro: editado.folioLibro
    },
    legajo: {
      numeroLegajo: editado.numeroLegajo,
      anioLegajo: editado.anioLegajo,
      curso: editado.curso,
      division: editado.division
    },
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

/* PARA VER LOS DATOS DEL REGISTRO */
exports.verPersonaje = async (req, res) => {
  const idVista = req.params._id;
  const vista = await Personaje.findById(idVista);
  const fechaNac = helpers.fechaNacimiento(vista.nacimiento);
  const fechaIngreso = helpers.fechaNacimiento(vista.historial.ingreso);
  const fechaSalida = helpers.fechaNacimiento(vista.historial.fechaSalida);
  const fechaEgreso = helpers.fechaNacimiento(vista.historial.fechaEgreso);
  const historial = vista.historial;  
  const legajo = vista.legajo;

  console.log("idvista ->", fechaNac);
  console.log("idvista2 ->", fechaIngreso);
  console.log("cuerpo -->", vista);
  return res.render("alumnos/view", {
    vista,
    fechaNac,
    fechaIngreso,
    fechaEgreso,
    fechaSalida,
    historial,
    legajo,
    nombrePagina: "Vista",
  });
};
