const express = require('express');

const app = express();

// ==================================
// Import all API routes
// ==================================
const credentials = require('../services/credentials');
const dataUser = require('../services/dataUser');
const company = require('../services/company');
const calendar_company = require('../services/calendarCompany');


// ==================================
// Using routes
// ==================================
app.use('/auth', credentials);
app.use('/data-user', dataUser);
app.use('/company', company);
app.use('/calendar-company', calendar_company);

module.exports = app;
