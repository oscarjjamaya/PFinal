const express = require("express");
const cors = require("cors");
const conectarBD = require('../config/db');


//creamops el servidor
const app = express();
//vamos a conectar la base de datos
conectarBD();
//habilitar cors
app.use(cors());
//habilitar json
app.use(express.json());


const port = process.env.PORT || 7000;



//rutas de los modulos
app.use("/api/usuarios", require("../routes/usuarios"));
app.use("/api/auth", require("../routes/auth"));
app.use('/api/clientes', require ('../routes/rutasCliente'));
app.use("/api/proveedor", require("../routes/rutasProv"));




app.listen(port, () => {
    console.log("Servidor en linea puerto 7000");
});
