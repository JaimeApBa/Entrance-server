const { response } = require('express');
const bcrypt = require('bcrypt');
const Credentials = require('../models/Credentials');
const User = require('../models/User');

const getAllUsers = async ( req, res = response ) => {

    const { name } = req.body;
    
    try {

        const users = await User.aggregate([
        
            {
                $lookup: {
                    from: 'credentials', 
                    localField: 'email', 
                    foreignField: 'email',
                    pipeline: [
                        { $project: { _id: 0, email: "$email", companyName: "$companyName", isAdmin: "$isAdmin" }}
                    ],
                    as: 'dataUser'
                }
            }, {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$dataUser", 0 ] }, "$$ROOT" ] } }
             }, {
                $project: { dataUser: 0 } 
             }, { $match: { companyName: name } }
        ]);

        return res.status(200).json({
            ok: true,
            users
        })
    
        
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Servicio no disponible. Por favor, intentelo más tarde.'
        });

    }
    
}

const getDataUser = async ( req, res = response ) => {

    const c_id = req.params.credentialsId;
    try {
 
        const credentials = await Credentials.findById(c_id);
        
        const { email, isAdmin, companyName } = credentials;

        let user = await User.findOne( { email } );

        user = { ...user._doc, companyName, isAdmin }
        
        return res.status(200).json({
            ok: true,
            user
        })
    
        
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Servicio no disponible. Por favor, intentelo más tarde.'
        });

    }
    
}

const newUser = async ( req, res = response ) => {

    const { email, companyName, password, isAdmin, name, lastname, position, photo } = req.body;

    try {

        let credentials = await Credentials.findOne({ email });

        if( credentials ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo electrónico ya esta registrado.'
            });
        }

        const newCredentials = {
            email,
            companyName,
            password,
            isAdmin
        }

        credentials = new Credentials( newCredentials );

        const salt = bcrypt.genSaltSync();

        credentials.password = bcrypt.hashSync( password, salt );
        
        const newUser = {
            name,
            lastname,
            position,
            photo,
            email
        }
        
        user = new User(newUser);
        
        await credentials.save();
        await user.save();

        return res.status(201).json({
            ok: true,
            msg: 'Usuario registrado correctamente'
        })
        
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Servicio no disponible. Por favor, intentelo más tarde.'
        });

    }

}

const newUserAdmin = async ( req, res = response ) => {

    const { credentialsId } = req.params;

    try {

        const idCredentials = await User.findOne({ credentialsId });
        
        const credentials = await Credentials.findById(credentialsId)

        if( idCredentials ) {
            return res.status(400).json({
                ok: false,
                msg: 'Esta usuario ya existe.'
            });
        }
        
        user = new User({...req.body, email: credentials.email });

        await user.save();

        return res.status(201).json({
            ok: true,
            msg: 'Usuario registrado correctamente'
        })
        
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Servicio no disponible. Por favor, intentelo más tarde.'
        });

    }

}
const updateUser = async ( req, res = response ) => {

    const { userId } = req.params;

    const { name, lastname, position, photo, email, isAdmin } = req.body;
    console.log(req.body);
    const dataUser = { name, lastname, position, photo, email };
    
    const credentials = { email, isAdmin };

    try {

        const user = await User.findById( userId );

        if( !user ) {
            return res.status(404).json({
                ok: false,
                msg: 'Esta usuario no existe.'
            });
        }

        const userEmail = user.email;
        
        await User.findByIdAndUpdate( userId, dataUser);
        await Credentials.findOneAndUpdate( { email: userEmail }, credentials);

        return res.status(201).json({
            ok: true,
            msg: 'Usuario actualizado correctamente'
        })
        
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Servicio no disponible. Por favor, intentelo más tarde.'
        });

    }


}
const deleteUser = async ( req, res = response ) => {

    const { userId } = req.params;

    try {

        const user = await User.findById( userId );

        if( !user ) {
            return res.status(404).json({
                ok: false,
                msg: 'Esta usuario no existe.'
            });
        }

        const { email } = user;

        await User.findByIdAndDelete(userId);
        await Credentials.findOneAndDelete( { email } );

        return res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado correctamente'
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Servicio no disponible. Por favor, intentelo más tarde.'
        });
    }

}


module.exports= {
    getAllUsers,
    getDataUser,
    newUser,
    newUserAdmin,
    updateUser,
    deleteUser
}