const express = require('express');
const router = express.Router();
const provedorController = require("../controllers/ProveedorController");


//estas son las rutas de nuestro crud 

//Provedor
router.post('/', provedorController.agregarProveedor);
router.get('/', provedorController.buscarProveedor);
router.get('/:id', provedorController.buscarProveedor);
router.delete('/:id', provedorController.eliminarProveedor);
router.put('/:id', provedorController.actualizarProveedor);




module.exports = router;