const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./src/database/database-connection');


const app = express();

//set the port
app.set('port', process.env.PORT || 3000);


//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/notes', require('./src/routes/notes'));


app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});