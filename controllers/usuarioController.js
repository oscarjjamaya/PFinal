const Usuarios = require("../models/Usuarios");
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

//funcion para autenticar el usuario
exports.crearUsuario = async (req, res) => {


    //verificar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { email, password } = req.body;

    try {

        //verificar si el usuario existe
        let usuario = await Usuarios.findOne({ email });
        //si el usuario existe retornar un error
        if (usuario) {
            return res.status(400).json({msg: "El usuario ya existe"});
        }

        //crear un nuevo usuario
        usuario = new Usuarios(req.body);

        usuario.password = await bcryptjs.hash(password, 12);

        //guardar el usuario en la base de datos
        await usuario.save();

        //crear y firmar el JWT
        const payload = {
            usuario: { id: usuario.id }
        };

        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: 3600,
            },

            (error, token) => {
                if (error) throw error;

                //mensaje de confirmacion
                res.json({ token });
            }
        );


    } catch (error) {
        console.log("hay un error")
        console.log(error);
        res.status(400).send("Hubo un error");
    }
}