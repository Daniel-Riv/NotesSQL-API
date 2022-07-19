const noteModel = require("../model/Note");

const notesArchived = async (req, res) => {
    try {
        const { idNote } = req.params;
        const [update] = await noteModel.update({
            isArchived: true,
        }, {
            where: {
                idNote: idNote,
            },
        });
        if(update !== 0){
            return res.status(200).json({
                success: true,
                message: "Note archived successfully",
            })
        }
        return res.status(404).json({
            success: false,
            message: "Note not found",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const notesUnarchived = async (req, res) => {
    try {
        const { idNote } = req.params;
        const [update] = await noteModel.update({
            isArchived: false,
        }, {
            where: {
                idNote: idNote,
            },
        });
        if(update !== 0){
            return res.status(200).json({
                success: true,
                message: "Note unarchived successfully",
            })
        }
        return res.status(404).json({
            success: false,
            message: "Note not found",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const getNotesArchived = async (req, res) => {
    try {
        const notes = await noteModel.findAll({
            where: {
                isArchived: true,
            },
        });
        if (notes.length !== 0) {
            return res.status(200).json({
                success: true,
                data: notes,
                message: "Notes archived successfully",
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
    notesArchived,
    notesUnarchived,
    getNotesArchived,
}