const jwt = require('jsonwebtoken');

const generateJWT = ( uid, email, companyName, isAdmin ) => {

    return new Promise( ( resolve, reject ) => {
        
        const payload = { uid, email, companyName, isAdmin };

        jwt.sign( payload, process.env.PRIVATE_KEY, {
            expiresIn: '2h'
        }, ( err, token ) => {

            if(err) {
                console.log(err);
                reject( 'No se puede generar el token' );
            }
            resolve(token);
        } );

    })
}

module.exports = {
    generateJWT
}