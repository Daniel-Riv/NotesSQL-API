const {Router}= require('express');
const{createCategory,getAllCategories,deleteCategory} = require('../controller/category')
const router = Router();

router.get('/',getAllCategories);
router.post('/createCategory',createCategory);
router.delete('/deleteCategory/:idCategory',deleteCategory);

module.exports = router;