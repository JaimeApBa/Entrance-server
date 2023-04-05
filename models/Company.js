const { Schema, model } = require('mongoose');

const CompanySchema = Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    address: {
        street: {
            type: String
        },
        number: {
            type: String
        },
        floor: {
            type: String
        },
        door: {
            type: String,
        },
        postalcode: {
            type: String,
        },
        city: {
            type: String,
        }
    },
    image: {
        type: String
    }
});

module.exports = model('Company', CompanySchema);