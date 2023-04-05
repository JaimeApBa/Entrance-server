const { response } = require('express');
const { validationResult } = require('express-validator');

const validators = async ( req, res = response, next ) => {

    // manejo errores validacion
    const errorsValidation = validationResult( req );

    if(!errorsValidation.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errorsValidation.mapped()
        })
    }

    next();
}

module.exports = {
    validators
}