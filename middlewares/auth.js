const jwt = require('jsonwebtoken');
require("dotenv").config();

const verifyJwt = (req, res, next) =>{
    try {
        const token = req.header('Authorization');
        if(!token) return res.status(401).json({message: "Token no encontrado, usuario no Autorizado", tipoerror: "error", tipoerror:"tokenno"});
        jwt.verify(token, process.env.SECRET_WORD);
        next();
    } catch (error) {
        if(!token) return res.status(401).json({message: "Token expirado, por favor logearse nuevamente", icon: "error", tipoerror:"tokenexp"});
    }
}

const decoToken = (req, res, next) =>{
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ message: 'Token no encontrado' , icon:"error", tipoerror:"tokenno"})
        const { user } = jwt.verify(token, process.env.SECRET_WORD);
        req.userId = user.id;
        next();
    } catch (error) {
        if (error.message === 'jwt expired') return res.status(401).json({ message: 'Token expirado, por favor Logearse nuevamente', icon:"error", tipoerror:"tokenexp" });
    }
}

module.exports ={
    verifyJwt,
    decoToken
}