
const User = require("../models/User");

const createUsersValidations = async(req, res, next)=>{
    try {        
        const {password, repipassword, email,  nombre, apellido} = req.body;    
        if(!password || !repipassword || !email || !nombre || !apellido)
        return res.status(400).json({message: "Por favor completar todos los campos", tipoerror: "error"});
        
        if(password!=repipassword){        
            return res.status(400).json({message: "Las contraseñas ingresadas no coinciden", tipoerror: "error"});
        }
    
        const userFond = await User.findOne({email});
        if(userFond){
            return res.status(400).json({message: "El email ingresado ya esta en uso", tipoerror: "error"});
        }
        next();
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const validateEmailUser = async(req, res, next) => {
    try {
        const { email } = req.body;
        const userFond = await User.findOne({email});
        if(!userFond){
            return res.status(400).json({message: "El email ingresado no se encuentra registrado en nuestra base de datos", tipoerror: "error"});
        }
        next();
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports ={
    createUsersValidations,
    validateEmailUser,
}
