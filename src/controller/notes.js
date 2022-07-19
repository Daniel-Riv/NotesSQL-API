const categoryModel = require("../model/Category");
const noteModel = require("../model/Note");


const createNote = async (req, res) => {
    try {
        const { title, desc, category } = req.body;
        const note = await noteModel.create({
            title,
            desc,
            category
        });
        res.status(200).json({
            success: true,
            message: "Note created successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}

const getAllNotes = async (req, res) => {
    try {
        const notes = await noteModel.findAll({});
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
        if(note){
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
        if(note){
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
        if(note){
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

module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
}