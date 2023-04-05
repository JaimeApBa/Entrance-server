const { Schema, model } = require('mongoose');

const CalendarCompanySchema = Schema({
    companyId: {
        type: Schema.Types.ObjectId,
        ref:'Company',
        require: true
    },
    year: {
        type: Number
    },
    totalDaysOfHolidays: {
        type: Number
    },
    bankHolidays: [{
        type: Date
    }],
    workingHours: [],
    annualWorkingHours: {
        type: Number
    },
    weeklyWorkingHours: {
        type: Number
    },
});

module.exports = model('CalendarCompany', CalendarCompanySchema);