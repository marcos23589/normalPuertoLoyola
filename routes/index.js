const express = require('express');
const router = express.Router();
const controladorPrincipal = require('../controllers/controladorPrincipal');


/* esta funcion exporta la devolucion de la funcion "router()" en 
app.use('/', router()); en server.js */

module.exports = (req, res) => {

    //en la raiz
    router.get('/', controladorPrincipal.paginaHome);

    router.get('/conparametrosget/:mivariable/:variable2', 
                controladorPrincipal.paramGet);
    
    router.get('/about', controladorPrincipal.about)

    router.get('/ingreso', controladorPrincipal.ingreso)

    router.get('/crearPersonaje', controladorPrincipal.crearPersonajeGet)

    router.post('/crearPersonaje', controladorPrincipal.crearPersonaje)

    router.get('/listarpersonajes', controladorPrincipal.listarPersonajes)

    router.get('/delete/:_id', controladorPrincipal.eliminarPersonajes)

    router.get('/edit/:_id', controladorPrincipal.editarPersonaje)

    router.post('/edit/:_id', controladorPrincipal.postPersonaje)

    router.get('/view/:_id', controladorPrincipal.verPersonaje)

    router.get('/paginanormal', controladorPrincipal.paginaNormal)

    return router;
};