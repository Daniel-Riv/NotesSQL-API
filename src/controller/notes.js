const categoryModel = require("../model/Category");
const noteModel = require("../model/Note");
const notecategory= require('../model/notecategory')


const createNote = async (req, res) => { 
    try {
        const { title, desc, category } = req.body;
        const note = await noteModel.create({
            title,
            desc,
        });
        const {idNote} = note;
        if (category !== undefined) {
            for (let i = 0; i < category.length; i++) {
                await notecategory.create({
                    noteIdNote: idNote,
                    categoryIdCategory: category[i]
                });
            }
        }
        return res.status(200).json({
        success: true,
        message: "Note created successfully",
    })
} catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message,
    })
}

}

const getAllNotes = async (req, res) => {
    try {
        const notes = await noteModel.findAll({
            where: {
                isArchived: false
            },include: [{
                model: categoryModel,
                attributes: ['idCategory','nameCategory'],
                through: {
                    attributes: ['noteIdNote', 'categoryIdCategory']
                }
            }] 
        });   
            return res.status(200).json({
                success: true,
                data: notes,
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getNoteById = async (req, res) => {
    try {
        const { idNote } = req.params;
        const note = await noteModel.findByPk(idNote);
        if (note) {
            return res.status(200).json({
                success: true,
                data: note,
            })
        }
        return res.status(404).json({
            success: false,
            message: "Note not found",

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const updateNote = async (req, res) => {
    try {
        const { idNote } = req.params;
        const { title, desc, category } = req.body;
        const note = await noteModel.findByPk(idNote);
        if (note) {
            await note.update({
                title,
                desc,
                category
            });
            return res.status(200).json({
                success: true,
                message: "Note updated successfully",
            })
        }
        return res.status(404).json({
            success: false,
            message: "Note not found",

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const deleteNote = async (req, res) => {
    try {
        const { idNote } = req.params;
        const note = await noteModel.findByPk(idNote);
        if (note) {
            await note.destroy();
            return res.status(200).json({
                success: true,
                message: "Note deleted successfully",
            })
        }
        return res.status(404).json({
            success: false,
            message: "Note not found",

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const filterNotesByCategory = async (req, res) => {
    const { idCategory } = req.params;
    try {
        const filter = await categoryModel.findByPk(idCategory,{
            where: {
                isArchived: false,
            },
            include: [{
                model: noteModel,
                attributes: ['idNote','title','desc','isArchived'],
                through: {
                    attributes: ['noteIdNote', 'categoryIdCategory']
                },
            }],
        });
        if (filter.length !== 0) {
            return res.status(200).json({
                success: true,
                data: filter,
                message: "Notes filtered successfully",
            })
            
        }
        return res.status(404).json({
            success: false,
            message: "Notes not found",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}


module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
    filterNotesByCategory
}