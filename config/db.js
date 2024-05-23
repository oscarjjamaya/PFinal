const mongoose = require('mongoose');
require('dotenv').config({path:"variable.env"});

//conexion con mongodb
const conectarBD = () => {

    mongoose
    .connect(process.env.DB_MONGO)
    .then(() => console.log('estas conectado a MongoDB'))
    .catch((err) => console.log(err));
}

module.exports = conectarBD;