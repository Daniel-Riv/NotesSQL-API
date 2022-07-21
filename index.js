const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./src/database/database-connection');
require('./src/model/associantion');


const app = express();

//set the port
app.set('port', process.env.PORT || 5000);


//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/notes', require('./src/routes/notes'));
app.use('/api/categories', require('./src/routes/category'));

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});