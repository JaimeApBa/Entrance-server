const { Schema, model } = require('mongoose');

const IncidentSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    type: {
        type: String,
        require: true,
    },
    description: {
        type: String
    },
    status: {
        type: Boolean
    }
});

module.exports = model('Incident', IncidentSchema);