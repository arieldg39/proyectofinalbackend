const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String
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
