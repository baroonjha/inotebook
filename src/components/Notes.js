import React, { useContext,useEffect } from "react";

import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";


const Notes = () => {
    const context = useContext(noteContext);
  const { notes,getNotes} = context;
  useEffect(() => {
    getNotes()
  }, [])
  
  return (
    <div>
      <AddNote />
        <div className="row my-3">
        <h1>Your notes</h1>
        {notes.map((notes)=>{
          return <NoteItem key={notes._id} notes={notes}/>
        })}
      </div>
    </div>
  )
}

export default Notes