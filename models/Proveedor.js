const mongoose = require ('mongoose');

//el modelo que se cree aca debe ser igual a la base de datos
const proveedorSchema = mongoose.Schema({

    empresa: {
        type: String,
        required: true
    },
    
    nit: {
        type: Number,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    direccion: {
        type: String,
        required: true
    }

},{versionkey:false});

module.exports = mongoose.model('proveedor', proveedorSchema);