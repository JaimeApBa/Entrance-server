const { response } = require('express');
const CalendarCompany = require('../models/CalendarCompany');

const getCalendarCompany = async ( req, res = response ) => {
    
    const { companyId } = req.params;
    
    try {
        
        const calendarCompany = await CalendarCompany.findOne({ companyId });
        
        if( !calendarCompany ) {
            
            return res.status(200).json({
                ok: false,
                msg: 'Aun no hay datos actualizados de esta compañía.'
            });
        }
        
        return res.status(200).json({
            ok: true,
            calendarCompany
        })

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Servicio no disponible. Por favor, intentelo más tarde.'
        });
    }
}

const setCalendarCompany = async ( req, res = response ) => {

    const { 
            companyId,
            year,
            totalDaysOfHolidays, 
            bankHolidays, 
            workingHours, 
            annualWorkingHours, 
            weeklyWorkingHours 
        } = req.body;
    
    try {
        
        const calendarCompany = await CalendarCompany.findOne({ companyId });
        
        if( calendarCompany ) {
            return res.status(404).json({
                ok: false,
                msg: 'Esta compañía ya existe.'
            });
        }
        const newCalendar = new CalendarCompany(req.body);

        await newCalendar.save()
        
        return res.status(200).json({
            ok: true,
            companyId,
            year,
            totalDaysOfHolidays,
            bankHolidays,
            workingHours,
            annualWorkingHours,
            weeklyWorkingHours
        })

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Servicio no disponible. Por favor, intentelo más tarde.'
        });
    }
}

const updateCalendarCompany = async( req, res = response ) => {

    const { 
        companyId,
        year,
        totalDaysOfHolidays, 
        bankHolidays, 
        workingHours, 
        annualWorkingHours, 
        weeklyWorkingHours 
    } = req.body;

try {
    
    const calendarCompany = await CalendarCompany.findOne({ companyId });
    
    if( !calendarCompany ) {
        return res.status(404).json({
            ok: false,
            msg: 'Esta compañía no existe.'
        });
    }
    

    await CalendarCompany.findOneAndUpdate(req.body)
    
    return res.status(200).json({
        ok: true,
        companyId,
        year,
        totalDaysOfHolidays,
        bankHolidays,
        workingHours,
        annualWorkingHours,
        weeklyWorkingHours
    })

} catch (error) {

    console.log(error);

    return res.status(500).json({
        ok: false,
        msg: 'Servicio no disponible. Por favor, intentelo más tarde.'
    });
}
}

const deleteCalendarCompany = ( req, res = response ) => {

}

module.exports = {
    getCalendarCompany,
    setCalendarCompany,
    updateCalendarCompany,
    deleteCalendarCompany
}