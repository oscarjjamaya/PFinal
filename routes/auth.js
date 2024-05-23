const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require("express-validator");
const auth = require('../middlewares/authMiddleware');

// vamos a autenticar el usuario 
//api/usuarios

router.post('/', [
    check('email', 'El email  no es correcto').isEmail(),
    check('password', 'la contraseña debe tener minimo 10 caracteres').isLength({ min: 10, }),
], 
authController.autenticarUsuario);

router.get('/', auth, authController.usuarioAutenticado); 

module.exports = router;
