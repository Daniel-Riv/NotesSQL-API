const sequelize = require("../database/database-connection");
const {DataTypes} = require("sequelize");

const categoryModel = sequelize.define("category", 
    {
        idCategory:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique:true
        },
        nameCategory: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
);

module.exports = categoryModel;