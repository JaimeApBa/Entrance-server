const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    position: {
        type: String,
        require: true,
    },
    photo: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    }
});

module.exports = model('User', UserSchema);