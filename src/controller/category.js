const categoryModel = require("../model/Category");

const createCategory = async (req, res) => {
    try {
        const { nameCategory } = req.body;
        const category = await categoryModel.create({
            nameCategory
        });
        if (category.length !== 0) {
                return res.status(200).json({
                    success: true,
                    message: "Category created successfully",
            })
        }else{
            return res.status(404).json({
                success: false,
                message: "Category not found",
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.findAll({});
        return res.status(200).json({
            success: true,
            data: categories,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { idCategory } = req.params;
        const category = await categoryModel.destroy({
            where: {
                idCategory,
            },
        });
        if (category !== 0) {
            return res.status(200).json({
                success: true,
                message: "Category deleted successfully",
            })
        }
        return res.status(404).json({
            success: false,
            message: "Category not found",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    deleteCategory,
}