const Usuarios = require("../models/Usuarios");
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

//funcion para autenticar el usuario
exports.autenticarUsuario = async (req, res) => {


    //verificar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { email, password } = req.body;

    try {

        //verificar si el usuario existe
        let usuario = await Usuarios.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: "El usuario no existe" });
        }

        //verificar si la contraseña esta registrada o es correcta
        let passCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({ msg: "La contraseña es incorrecta" });
        }


        //crear y firmar el token si es correcto
        const payload = {
            usuario: { id: usuario.id },
        };

        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: 43200,
            },

            (error, token) => {
                if (error) throw error;

                //mensaje de confirmacion
                res.json({ token });
            }
        );

    } catch {
        console.log("hay un error")
        console.log(error);
        res.status(400).send("Hubo un error");
    }


}

exports.usuarioAutenticado = async (req, res) => {
    try {
        let usuario = await Usuarios.findById(req.usuario.id);
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }

}