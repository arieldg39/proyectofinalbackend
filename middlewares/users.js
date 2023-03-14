const User = require("../models/User");

const createUsersValidations = async (req, res, next) => {
    try {
        const { password, email, nombre, apellido, direccion, repPassword } = req.body;
        if (!password || !email || !nombre || !apellido || !direccion)
            return res.status(400).json({ message: "Por favor complete todos los campos", tipoerror: "error" });
        if (password != repPassword) {
            return res.status(400).json({ message: "Las claves ingresadas no coinciden", tipoerror: "error" });
        }
        const userFond = await User.findOne({ email });
        if (userFond) {
            return res.status(400).json({ message: "El email ingresado ya se encuentra en uso", tipoerror: "error" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const validateEmailUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        const userFond = await User.findOne({ email });
        if (!userFond) {
            return res.status(400).json({ message: "El email ingresado no se encuentra registrado en nuestra base de datos", tipoerror: "error" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createUsersValidations,
    validateEmailUser,
}
