const User = require("../models/User");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');

const addUser = async(req, res)=>{
    try {
        const salt = await bcryptjs.genSalt(10);
        const encryptePass = await bcryptjs.hash(req.body.password, salt);
        const payload = {
            ...req.body,
            password: encryptePass,
            direccion: {
                calle: "nada",
                nro: "0",
                dpto: "0",
                provincia: "nada",
                localidad: "nada",
                codigopostal: "0"                
            },            
        }  
        
        const newUser = new User(payload);        
        await newUser.save();
        res.status(200).json({ message: 'Usuario registrado exitosamente', icon: 'success' });
    } catch (error) {
        res.status(error.code || 500).json({message: error.message});
    }
}
const authUser =  async(req, res) =>{
    try {
        const {email, password} = req.body;
        const userFound = await User.findOne({email}).select('-__V');
        if(!userFound) return res.status(400).json({message: "El email ingresado no esta resgistrado en nuestra base de datos", icon: "error", tipoerror:"noregister"});
        const logInSucced = await bcryptjs.compare(password, userFound?.password);
        if(!logInSucced) return res.status(400).json({message: "Los datos ingresados son incorrectos", icon: "error", tipoerror:"datosmal"});
        const userLogged = {
            nombre: userFound.nombre,
            email: userFound.email,
            "type": userFound.type
        }
        const payload ={
            user:{
                id: userFound._id,
            }
        }
        jwt.sign(payload, process.env.SECRET_WORD, {expiresIn: '1h'}, (error, token)=>{
            if(error){
                throw(error);
            }
            return res.status(200).json({message: "Usuario Logeado", icon: "success",  dataUser: userLogged, token});
        });
    } catch (error) {
        return res.status(400).json({message: error});
    }
}
const getUserData = async(req, res) =>{
    try {
        const userFound = await User.findById(req.userId).select('-password');
        res.status(200).json({ message: 'Usuario traido correctamente', user: userFound });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
}
const getUsers = async(req, res) =>{
    try {
        const userFound = await User.find({deleted: false}).select('-password');
        res.status(200).json({ message: 'Usuario traido correctamente', user: userFound });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
}
const updateUser = async(req, res) =>{
    try {        
        console.log(req.body?.calle);
        const userUpdate = {            
            nombre: req.body?.nombre,
            apellido: req.body?.apellido,
            direccion: {
                calle: req.body?.calle ,
                nro: req.body?.nro,
                dpto: req.body?.dpto,
                provincia: req.body?.provincia,
                localidad: req.body?.localidad,
                codigopostal: req.body?.codigopostal                
            }
        }          
        console.log(req.userId);
        const updatedUser = await User.findByIdAndUpdate(req.userId, (userUpdate),{ new: true}).select('-password -deleted');
        res.status(200).json({ message: 'Los cambios fueron realizados exitosamente', user: updatedUser, icon:'success' });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message, icon:"error" });
    }
}
const sendEmailPassword = async(req, res) =>{
    try {
        const {email} = req.body;        
        const userFound = await User.findOne({email}).select('-__V'); 
        console.log(userFound);
        const payload ={
            user:{
                id: userFound._id,
            }
        }
        console.log(payload);
        jwt.sign(payload, process.env.SECRET_WORD, {expiresIn: '5*60'}, (error, token)=>{
            if(error){
                throw(error);
            }            
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'arieldg37@gmail.com',
                    pass: 'vcydtsibhweqyxei'
                }
            });            
            
            let mailOptions = {
                from: 'E-Commer Administacion',
                to: userFound.email,
                subject: 'Recuperación de contraseña',
                text: 'Hola,'+ userFound.name+' Para recuperar tu contraseña tiene 10 minutos, haz clic en el siguiente enlace: \nhttp://localhost:3000/EditPassword#'+token+'\n\nSaludos,\nEl equipo de E-coomer'
            };            
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return res.status(400).json({message: "El Email fue enviado correctamente" + error, icon: "success" });
                    console.log(error);
                } else {
                    return res.status(200).json({message: "El Email fue enviado correctamente", icon: "success" });
                    console.log('Correo enviado: ' + info.response);
                }
            });     
        });                              
    } catch (error) {
        return res.status(400).json({message:'Error ver' + error});
    }
}
const editPassword = async(req, res)=>{    
    try {
        const{password, token}=req.body;
        if (!token) return res.status(401).json({ message: 'Token no encontrado' })
        const { user } = jwt.verify(token, process.env.SECRET_WORD);
        const salt = await bcryptjs.genSalt(10);
        const encryptePass = await bcryptjs.hash(password, salt);
        const UserUpdate= await User.findByIdAndUpdate(user.id, {password: encryptePass}, {new: true} ).select('-password');
        return res.status(200).json({ message: 'La clave del usuario '+ UserUpdate.name +'fue modificada correctamente' })
    } catch (error) {
        if (error.message === 'jwt expired') return res.status(401).json({ message: 'Token expirado, por favor logearse nuevamente' });
    }
}
module.exports = {
    addUser,
    authUser,
    getUsers,
    updateUser,
    sendEmailPassword,
    editPassword,
    getUserData
}