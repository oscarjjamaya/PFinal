const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');


//estas son las rutas de nuestro crud 


//Cliente
router.post('/', clienteController.agregarClientes);
router.get('/', clienteController.buscarClientes);
router.get('/:id', clienteController.buscarCliente);
router.delete('/:id', clienteController.eliminarCliente);
router.put('/:id', clienteController.actualizarCliente);


module.exports = router;