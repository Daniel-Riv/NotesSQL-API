const Sequelize = require('sequelize');

const sequelize = new Sequelize('notes', 'root', '', {
    host: 'localhost',
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