const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = ( req, res = response, next ) => {

    // x-token headers
    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'El usuario no esta validado'
        });
    }

    try {

        const { uid, email, companyName, isAdmin } = jwt.verify( token, process.env.PRIVATE_KEY);
        
        req.uid = uid;
        req.email = email;
        req.companyName = companyName;
        req.isAdmin = isAdmin;
        
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            ok: false,
            msg: 'Sesión no válida'
        });
    }

    next();

}

module.exports = {
    validateJWT
}