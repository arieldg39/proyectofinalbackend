const { model, Schema, default: mongoose } = require('mongoose');

const UserSchema = new Schema({
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    direccion: {
        calle: String,
        nro: Number,
        dpto: String,
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
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    versionKey: false
})

const Users = model('user', UserSchema);

module.exports = Users;
