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
    console.log(json)
    setNotes(json)
  }
    //Add a note
    const addNote = async (title, description, tag) => {
      //API call
      const response = await fetch(`${Host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOTc4ZDFkMjg3MTEyMDAwOWQzODQyIn0sImlhdCI6MTY4ODgyODExM30.pqvbBYi284Wh13wxhu6Csz4u9pDopqGVlPZ94_7h0Mw",
        },
        body: JSON.stringify({ title, description, tag }),
      });

      // const json = response.json()
      //logic
      const note = {
        _id: "64a995950ebed6610c94c50",
        user: "64a978d1d281120009d3842",
        title: title,
        description: description,
        tag: tag,
        date: "2023-07-08T16:57:57.901Z",
        __v: 0,
      };
      setNotes(notes.concat(note));
    };
    //delete note
    const deleteNote = (id) => {
      console.log("Deleting note" + id);
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
    };
    //edit note
    const editNote = async (id, title, description, tag) => {
      //API call
      const response = await fetch(`${Host}/api/notes/updatenote/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOTc4ZDFkMjg3MTEyMDAwOWQzODQyIn0sImlhdCI6MTY4ODgyODExM30.pqvbBYi284Wh13wxhu6Csz4u9pDopqGVlPZ94_7h0Mw",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      // const json = response.json()
      //logic to edit
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id === id) {
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
      }
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
