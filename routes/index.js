const express = require('express');
const router = express.Router();
const controladorPrincipal = require('../controllers/controlador');


/* esta funcion exporta la devolucion de la funcion "router()" en 
app.use('/', router()); en server.js */

module.exports = (req, res) => {
  //en la raiz
  router.get("/", controladorPrincipal.paginaHome);

  router.get(
    "/conparametrosget/:mivariable/:variable2",
    controladorPrincipal.paramGet
  );

  router.get("/about", controladorPrincipal.acerca);
  router.get("/add", controladorPrincipal.crearPersonajeGet);
  router.post("/add", controladorPrincipal.crearPersonaje);
  router.get("/list", controladorPrincipal.listarPersonajes);
  router.get("/delete/:_id", controladorPrincipal.eliminarPersonajes);
  router.get("/edit/:_id", controladorPrincipal.editarPersonaje);
  router.post("/edit/:_id", controladorPrincipal.postPersonaje);
  router.get("/view/:_id", controladorPrincipal.verPersonaje);

  return router;
};