const { response } = require('express');
const Company = require('../models/Company');


const getAllCompanys = async ( req, res = response ) => {

    try {

        const companies = await Company.find();

        return res.status(200).json({
            ok: true,
            companies
        })
    
        
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Servicio no disponible. Por favor, intentelo más tarde.'
        });

    }
}

const getCompany = async ( req, res = response ) => {

    const { companyName:name } = req.body;
    
    try {

        const company = await Company.findOne( { name } );

        if( !company ) {
            return res.status(404).json({
                ok: false,
                msg: 'Esta compañía no existe.'
            });
        }
        
        return res.status(200).json({
            ok: true,
            company
        })
    
        
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Servicio no disponible. Por favor, intentelo más tarde.'
        });

    }

}

const updateCompany = async ( req, res = response ) => {

    const { companyId } = req.params;
    
    try {

        const company = await Company.findById( companyId );

        if( !company ) {
            return res.status(404).json({
                ok: false,
                msg: 'Esta compañía no existe.'
            });
        }

        await Company.findByIdAndUpdate( companyId, req.body );
        const dataUpdated = await Company.findById(companyId);
        
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

const deleteCompany = async ( req, res = response ) => {

    const { companyId } = req.params;

    try {

        const company = await Company.findById( companyId );

        if( !company ) {
            return res.status(404).json({
                ok: false,
                msg: 'Esta compañía no existe.'
            });
        }

        await Company.findByIdAndDelete( companyId );

        
        return res.status(200).json({
            ok: true,
            msg: 'Compañía eliminada correctamente'
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
    getAllCompanys,
    getCompany,
    updateCompany,
    deleteCompany
}