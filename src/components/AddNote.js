import React,{useContext,useState} from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
   const [note, setNote] = useState({title:"",description:"",tag:""})
  const onChange =(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  const handleClick =(e)=>{
    e.preventDefault()
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""})
    props.showAlert("Notes added","success")
  }
  return (
    <div>
      <h1>Add your notes</h1>
      <form actipn="/">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label" >
            Titles
          </label>
          <input 
            type="text"
            className="form-control"
            id="title" name="title" onChange={onChange} minLength={5} value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input  value={note.description}
            type="text"
            className="form-control"
            id="description" name="description" onChange={onChange} minLength={5} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tags
          </label>
          <input
            type="text"
            className="form-control"
            id="tag" name="tag" onChange={onChange} value={note.tag}
          />
        </div>
        <button disabled={note.title.length <5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
