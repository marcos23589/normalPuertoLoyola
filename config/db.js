const mongoose = require("mongoose");
const uriDataBase = "mongodb://localhost:27017/";
const nombreDatabase = "secundarioDB";

mongoose.set("strictQuery", true);
//establezco la conexion con la base de datos
mongoose.connect(`${uriDataBase}${nombreDatabase}`);

//si se conecta
mongoose.connection.once("open", () => {
  console.log(`Conexion exitosa a ${nombreDatabase}`);
});

//si algo falla
mongoose.connection.on("error", (error) => {
  console.log(`Ha ocurrido el siguiente error: ${error}`);
});
