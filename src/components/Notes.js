import React, { useState,useContext,useEffect,useRef } from "react";

import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";


const Notes = () => {
    const context = useContext(noteContext);
  const { notes,getNotes} = context;
  const ref = useRef("")
  const [note, setNote] = useState({title:"",description:"",tag:""})

  useEffect(() => {
    getNotes()
    //eslint-disabled-next-line
  }, [])
  const updateNote=(currentNote)=>{
      ref.current.click();
      setNote(currentNote)
  }
  const onChange =(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  const handleClick =(e)=>{
    console.log("Updating note",{note})
    e.preventDefault()
  }
  return (
    <div>
      <AddNote />
      
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Note title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form actipn="/">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label" >
            Titles
          </label>
          <input
            type="text"
            className="form-control"
            id="title" name="title" value={note.title} onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description" name="description" value={note.description} onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tags
          </label>
          <input
            type="text"
            className="form-control"
            id="tag" name="tag" value={note.tag} onChange={onChange}
          />
        </div>
      </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button"  onClick={handleClick}className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
        <div className="row my-3">
        <h1>Your notes</h1>
        {notes.map((notes)=>{
          return <NoteItem key={notes._id} updateNote={updateNote} notes={notes}/>
        })}
      </div>
    </div>
  )
}

export default Notes