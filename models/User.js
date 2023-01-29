const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    direccion: {
        calle: String,        
        nro: String,        
        dpto: String,        
        barrio: String,        
    },
    ubicacion:{
        provincia: String,
        localidad: String,
        codigopostal: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    type :{
        type: String,
    },
    walletBalance: {
        type: Number,
        default: 0,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
},{
    versionKey: false
})

const Users = model('user', UserSchema);

module.exports = Users;
