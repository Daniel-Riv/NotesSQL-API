const {Router}= require('express');
const {check} = require('express-validator');
const{createNote,getAllNotes,getNoteById,deleteNote,updateNote, filterNotesByCategory}= require('../controller/notes')
const {notesArchived,notesUnarchived,getNotesArchived} = require('../controller/isArchived')
const router = Router();

router.get('/',getAllNotes);
router.get('/:idNote',getNoteById);
router.post('/createNote',[check('title').not().isEmpty(),check('desc').not().isEmpty()],createNote);
router.patch('/updateNote/:idNote',[check('title').not().isEmpty(),check('desc').not().isEmpty()],updateNote);
router.delete('/deleteNote/:idNote',deleteNote);

router.patch('/archived/:idNote',notesArchived);
router.patch('/unarchived/:idNote',notesUnarchived);
router.get('/archived/getArchived',getNotesArchived);

router.get('/categories/filter/:idCategory',filterNotesByCategory);




module.exports = router;