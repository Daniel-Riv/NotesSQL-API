const categoryModel = require('./Category')
const noteModel = require('./Note');
const notecategory= require('./notecategory')
noteModel.belongsToMany(categoryModel, { through: 'notecategory' });
categoryModel.belongsToMany(noteModel, { through: 'notecategory' }); 