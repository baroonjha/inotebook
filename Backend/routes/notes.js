const express = require('express');
const fetchuser = require('./middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note')
const { body, validationResult } = require("express-validator");

//Route 1 : Get all the notes using get: '/api/notes/fetchallnotes. Login required
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    const notes= await Note.find({user: req.user.id})
    res.json(notes)
})
//Route 2 : Add a new  notes using post: '/api/notes/addnotes. Login required
router.post('/addnotes',fetchuser,[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 character").isLength({min:5})
  ],async(req,res)=>{
    try {
    
    const {title,description,tag} = req.body;
    //if there is error ,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
        title,description,tag,user:req.user.id
    })
    const saveNote = await note.save()
    res.json(saveNote)
        
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured") 
}
})

//Route3 : update an existing notes post "/api/notes/updatenote"
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag}  =req.body
    try {
      
    
    //create new note object
    const newNote = {};
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    //find the note to be updated and update it
    let note =await Note.findById(req.params.id);
    //chcek wheather note is available or not
    if(!note){return res.status(401).send("Not found")}

    //check if the user is one who is editing his own note not other note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    // if not is availabe and the user is correct 
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured") 
  }
  })

  //Route 4 : delete an existing notes delte "/api/notes/deletenote"
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
  try {
    
  
  //find the note to be updated and delete it
  let note =await Note.findById(req.params.id);
  //chcek wheather note is available or not
  if(!note){return res.status(401).send("Not found")}

  //check if the user is one who is created this note can only delete it
  if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed")
  }

  // if note is availabe and the user is correct 
  note = await Note.findByIdAndDelete(req.params.id)
  res.json({"Success":"Note has been deleted",note:note})
} catch (error) {
  console.error(error.message);
  res.status(500).send("Some error occured") 
}
})

module.exports = router