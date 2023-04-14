const { response } = require('express');
const bcrypt = require('bcrypt');
const Credentials = require('../models/Credentials');
const Company = require('../models/Company');
const User = require('../models/User');
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
    
    const { email, companyName, password, name, lastname, position } = req.body;

    try {

        let credentials = await Credentials.findOne({ email });
        const company = await Credentials.findOne({ companyName });
        const user = await User.findOne({ email });


        if( company || credentials || user ) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre de la compañía o del usuario ya esta registrado.'
            });
            
        }

        
        credentials = new Credentials( { email, companyName, password, isAdmin: true } );

        const salt = bcrypt.genSaltSync();

        credentials.password = bcrypt.hashSync( password, salt );
        
        const newCompany = new Company( { 
                    name: companyName, 
                    address: { 
                        street: null,
                        number: null,
                        floor: null,
                        door: null,
                        postalcode: null,
                        city: null
                    }, 
                    image: null } );

        const newUser = new User( { name, lastname, position, photo: null, email } );
        
        
        await credentials.save();
        await newCompany.save();
        await newUser.save();

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

const updateAdmin = async ( req, res = response ) => {
    const { email, isAdmin } = req.body;
    try {
        
        const credentials = await Credentials.findOne( { email } );

        if( !credentials ) {
            return res.status(404).json({
                ok: false,
                msg: 'Este usuario no existe.'
            });
        }

        await Credentials.findOneAndUpdate( { email }, { isAdmin } );
        const dataUpdated = await Credentials.findOne( { email } );
        console.log(dataUpdated);
        return res.status(200).json({
            ok: true,
            msg: 'Datos actualizados correctamente',
            dataUpdated
        })
        
    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Servicio no disponible. Por favor, intentelo más tarde.'
        });

    }
}

module.exports = {
    login,
    signUp,
    renewToken,
    updateAdmin
}