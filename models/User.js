const { model, Schema, default: mongoose } = require('mongoose');

const UserSchema = new Schema({
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
/*     ubicacion:{
        provincia: String,
        localidad: String,
        codigopostal:Number,
        direccion: String,
        numeracion: Number,       
    }, */
    email: {
        type: String
    },
    password: {
        type: String
    },
/*     deleted: {
        type: Boolean,
        default: false,
    },
    type :{
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    }, */
},{
    versionKey: false
})

const Users = model('user', UserSchema);

module.exports = Users;
