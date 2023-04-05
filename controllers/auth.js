const { response } = require('express');
const bcrypt = require('bcrypt');
const Credentials = require('../models/Credentials');
const Company = require('../models/Company');
const { generateJWT } = require('../helpers/jwt');

const  login = async ( req, res = response ) => {

    const { email, password } = req.body;
    
    try {

        const credentials = await Credentials.findOne({ email });
        
        if( !credentials ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo electrónico no existe.'
            });
        }

        const validPassword = bcrypt.compareSync( password, credentials.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es correcta.'
            });
        }

        // Generate token
        const token = await generateJWT( credentials.id, credentials.email ,credentials.companyName, credentials.isAdmin );
        
        return res.status(200).json({
            ok: true,
            uid: credentials.id,
            isAdmin: credentials.isAdmin,
            userEmail: credentials.email,
            company: credentials.companyName,
            token
        });
        
    } catch (error) {

        console.log(error);
        
        return res.status(500).json({
            ok: false,
            msg: 'No se ha podido acceder a la aplicación. Por favor, intentalo más tarde.'
        });
    }
}


const signUp = async ( req, res = response ) => {
    
    const { email, companyName, password, isAdmin } = req.body;

    try {

        let credentials = await Credentials.findOne({ email });
        const company = await Credentials.findOne({ companyName });

        if( credentials ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo electrónico ya esta registrado.'
            });
        }
        if( company ) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre de la compañía ya esta registrado.'
            });
            
        }
        
        credentials = new Credentials( req.body );

        const salt = bcrypt.genSaltSync();

        credentials.password = bcrypt.hashSync( password, salt );
        
        await credentials.save();

        const newCompany = new Company( { name: companyName } );
        
        await newCompany.save();

        // Generate token
        const token = await generateJWT( credentials.id, credentials.email, credentials.companyName, credentials.isAdmin );
        
        return res.status(201).json({
            ok: true,
            msg: 'Te has registrado correctamente',
            uid: credentials.id,
            isAdmin: credentials.isAdmin,
            userEmail: credentials.email,
            company: credentials.companyName,
            token
        });

    
        
    } catch (error) {

        console.log(error);
        
        return res.status(500).json({
            ok: false,
            msg: 'No se ha podido completar el registro. Por favor, intentalo más tarde.'
        });
        
    }

}

const renewToken =  async ( req, res = response ) => {

    const { uid, companyName, email, isAdmin } = req;

    // Generate token
    const token = await generateJWT( uid, companyName, email, isAdmin );

    return res.status(200).json({
        ok: true,
        uid,
        email,
        companyName,
        isAdmin,
        token
    });
}

module.exports = {
    login,
    signUp,
    renewToken
}