import React, { useState } from "react";
import noteContext from "./noteContext";
import { json } from "react-router-dom";

const NoteState = (props) => {
  const Host = "http://localhost:5000";
  const initialNote = [];
  const [notes, setNotes] = useState(initialNote);
  //fetchAll notes
  const getNotes = async () => {
    //API call
    const response = await fetch(`${Host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOTc4ZDFkMjg3MTEyMDAwOWQzODQyIn0sImlhdCI6MTY4ODgyODExM30.pqvbBYi284Wh13wxhu6Csz4u9pDopqGVlPZ94_7h0Mw",
      },
    });
    const json =await response.json()
    // console.log(json)
    setNotes(json)
  }
          
      //Add a note
    const addNote = async (title, description, tag) => {
      //API call
      const response = await fetch(`${Host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOTc4ZDFkMjg3MTEyMDAwOWQzODQyIn0sImlhdCI6MTY4ODgyODExM30.pqvbBYi284Wh13wxhu6Csz4u9pDopqGVlPZ94_7h0Mw",
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const note =await response.json()
      setNotes(notes.concat(note));
    };

    //delete note

    const deleteNote =async (id) => {
      console.log("Deleting note" + id);
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
      //Api call
      const response = await fetch(`${Host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOTc4ZDFkMjg3MTEyMDAwOWQzODQyIn0sImlhdCI6MTY4ODgyODExM30.pqvbBYi284Wh13wxhu6Csz4u9pDopqGVlPZ94_7h0Mw",
        }
      });
    };
    //edit note
    const editNote = async (id, title, description, tag) => {
      //API call
      const response = await fetch(`${Host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOTc4ZDFkMjg3MTEyMDAwOWQzODQyIn0sImlhdCI6MTY4ODgyODExM30.pqvbBYi284Wh13wxhu6Csz4u9pDopqGVlPZ94_7h0Mw",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = response.json()
      // console.log(json)
      //making another notes
      let newNotes = JSON.parse(JSON.stringify(notes))
      //logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes)
    };

    return (
      <noteContext.Provider
        value={{ notes, setNotes, addNote, deleteNote, editNote,getNotes }}
      >
        {props.children}
      </noteContext.Provider>
    );
  
};
export default NoteState;
