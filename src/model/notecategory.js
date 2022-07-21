const { DataTypes } = require("sequelize");
const sequelize = require("../database/database-connection");

const notecategory = sequelize.define("notecategory", {
    noteIdNote: {
        type: DataTypes.INTEGER,
        references:{
            model: 'notes',
            key: 'idNote'
        },
    },
    categoryIdCategory: {
        type: DataTypes.INTEGER,
        references:{
            model: 'categories',
            key: 'idCategory'
        },
    }

});

module.exports = notecategory;
