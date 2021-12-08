const mongoose = require('mongoose')
require('./config/db');
const express = require('express'); //para crear el servidor
const router = require('./routes'); //acá están las rutas
const layouts = require('express-ejs-layouts'); //para renderizar las vistas
const path = require('path');   //para unir rutas con directorios
const morgan = require('morgan'); //para ver las peticiones en consola
const flash = require('connect-flash');
const session = require('express-session');

const PORT = 3000;
const app = express();

//inicializa la conexion con la base de datos


//app.METODO(PARAMETRO, VALOR);

//motores
app.use(layouts);

//MIDDLEWARES
app.use(morgan('dev'));
app.use(flash());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    //store: new MySQLStore(database)
  }))

/* se usa como renderizador ejs que es el motor de renderizado
renderiza lo que se encuentra en el archivo layout.ejs, 
dentro de <%- body %>  */

app.set('view engine', 'ejs');
//cuando se pida renderizado, 
//se le indica la ruta de los archivos dinámicos
app.set('views', path.join(__dirname, './views'));

//archivos estaticos están aca
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}))

//VARIABLES GLOBALES
app.use((req,res,next)=>{
    app.locals.alertas = req.flash('alerta');
    app.locals.informacion = req.flash('info');
    next();
})


//que debe hacer cuando reciba un GET, POST, ETC...
app.use('/', router());

app.listen(PORT, ()=> {
    //ejecuta
    console.log("Servidor listo en puerto",PORT); 
})