const {Router}= require('express');
const {check} = require('express-validator');
const{createNote,getAllNotes,getNoteById,deleteNote,updateNote}= require('../controller/notes')
const router = Router();

router.get('/',getAllNotes);
router.get('/:idNote',getNoteById);
router.post('/createNote',[check('title').not().isEmpty(),check('desc').not().isEmpty()],createNote);
router.patch('/updateNote/:idNote',[check('title').not().isEmpty(),check('desc').not().isEmpty()],updateNote);
router.delete('/deleteNote/:idNote',deleteNote);


module.exports = router;