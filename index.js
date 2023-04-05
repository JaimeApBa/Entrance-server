const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

// database
dbConnection();

app.use( express.json() );
 
// ==================================
//  Routes
// ==================================
const router = require('./routes/routes');
app.use('/api', router);

// ==================================
// Server listening
// ==================================
app.listen(PORT, () => {
    console.log('Server started on port 4000...');
});