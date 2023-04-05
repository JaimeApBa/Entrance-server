const { Schema, model } = require('mongoose');

const CalendarUserSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User',
        require: true
    },
    holidays: [{
        type: Date
    }],
    justifiedDays: [{
        type: Date
    }],
    notJustifiedDays: [{
        type: Date
    }],
    sickDays: [{
        type: Date
    }],
    workingCalendar: [{
        date: {
            type: Date
        },
        totalHoursDay: {
            type: Number
        },
        checkIn: [{
            type: Number
        }],
        checkOut: [{
            type: Number
        }],
        isWorking: {
            type: Boolean
        }
    }]
});

module.exports = model('CalendarUser', CalendarUserSchema);