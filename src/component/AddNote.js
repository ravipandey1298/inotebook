import React, {useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title : "", description : "", tag : ""})

    const handelclick = (e) => {
        // use to prevent reloading the page.
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({title:'', description:'', tag:''});
        props.showAlert("Added Successfully!", "success")
    }

    // handels when some text is change in text boxes
    const onChange = (e) =>{
        setNote({...note, [e.target.name] : e.target.value});
    }


  return (
    <div className="my-3">
      <h2>Add your note here : </h2>

      {/*  Form for taking notes UI */}
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            min={5}
            required
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
          Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            min={5}
            required
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
          Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            min={5}
            required
            value={note.tag}
          />
        </div>      
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handelclick}>
          Submit
        </button>
      </form>
    </div> 
  );
};

export default AddNote;
