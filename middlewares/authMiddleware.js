const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {

    //leer el token en el header
    const token = req.header("x-auth-token");

    //revisar si hay un token 
    if (!token) {
        return res.status(401).json({ msg: "No hay token, no se puede continuar" });
    }

    //validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario; 
        next();
        
    } catch (error) {
        res.status(401).json({ msg: "Token no valido" });
    }
}





