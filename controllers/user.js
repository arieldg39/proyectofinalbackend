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
            password: encryptePass
        }  
        
        const newUser = new User(payload);        
        await newUser.save();
        res.status(200).json({ message: 'Usuario Registrado Correctamente!!!', tipoerror: 'success' });
    } catch (error) {
        res.status(error.code || 500).json({message: error.message});
    }
}

const authUser =  async(req, res) =>{
    try {
        const {email, password} = req.body;

        const userFound = await User.findOne({email}).select('-__V');
        if(!userFound) return res.status(400).json({message: "Email incorrecto", tipoerror: "error"});

        const logInSucced = await bcryptjs.compare(password, userFound?.password);
        if(!logInSucced) return res.status(400).json({message: "Password incorrecto", tipoerror: "error"});

        const userLogged = {
            name: userFound.name,
            emeail: userFound.email
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
            return res.status(200).json({message: "Usuario Logeado", tipoerror: "success",  dataUser: userLogged, token});
        });


    } catch (error) {
        return res.status(400).json({message: error});
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
        jwt.sign(payload, process.env.SECRET_WORD, {expiresIn: '1h'}, (error, token)=>{
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
            // Definir la información del correo electrónico
            let mailOptions = {
                from: 'E-Commer Administacion',
                to: userFound.email,
                subject: 'Recuperación de contraseña',
                text: 'Hola,'+ userFound.name+' Para recuperar tu contraseña tiene 10 minutos, haz clic en el siguiente enlace: \nhttp://localhost:3000/EditPassword#'+token+'\n\nSaludos,\nEl equipo de E-coomer'
            };            
            // Enviar el correo electrónico
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return res.status(400).json({message: "El Email fue enviado correctamente!!!" + error, tipoerror: "success" });
                    console.log(error);
                } else {
                    return res.status(200).json({message: "El Email fue enviado correctamente!!!", tipoerror: "success" });
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
        console.log(user);


        const salt = await bcryptjs.genSalt(10);
        const encryptePass = await bcryptjs.hash(password, salt);

        const UserUpdate= await User.findByIdAndUpdate(user.id, {password: encryptePass}, {new: true} ).select('-password');

        console.log(UserUpdate);

        return res.status(200).json({ message: 'Clave del Usuario '+ UserUpdate.name +' Modficada Correctamente!!!' })

    } catch (error) {
        if (error.message === 'jwt expired') return res.status(401).json({ message: 'Token expirado, por favor logearse nuevamente' });
    }
}

module.exports = {
    addUser,
    authUser,
    sendEmailPassword,
    editPassword
}