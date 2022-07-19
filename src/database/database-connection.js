const Sequelize = require('sequelize');
const {ConnectionString} = require('connection-string')
require('dotenv').config();

const connectionString = new ConnectionString(process.env.DATABASE_URL);
const {name} = connectionString.hosts?.[0];

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: name,
    dialect: 'mysql',
});
sequelize.sync({force:false})
    .then(() => {
        console.log('Connection database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
module.exports = sequelize;