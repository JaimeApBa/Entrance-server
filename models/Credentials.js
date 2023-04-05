const { Schema, model } = require('mongoose');

const CredentialsSchema = Schema({
    
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    companyName: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        require: true,
    },
});

module.exports = model('Credentials', CredentialsSchema);