import React, { useContext, useEffect, useState, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

// A note component to show all the notes on UI
const Notes = () => {
  // Taking the value from contest using useContext hook.
  const context = useContext(noteContext);
  // Destructring the value of notes and setNotes from context.
  const { notes, getNotes } = context;
  const [note, setNote] = useState({etitle : "", edescription : "", etag : ""})

  useEffect(() => {
    getNotes();
  }, []);

  const ref = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
  };

  const handelclick = (e) => {
    console.log("note is  updated ..." + note)
    // use to prevent reloading the page.
    e.preventDefault();
}

// handels when some text is change in text boxes
const onChange = (e) =>{
    setNote({...note, [e.target.name] : e.target.value});
}

  return (
    <>
      <AddNote />

      <button
        type="button"
        ref= {ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form className="my-3">
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            value = {note.etitle}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
          Description
          </label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            value = {note.edescription}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">
          Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="etag"
            name="etag"
            value = {note.etag}
            onChange={onChange}
          />
        </div>      
      </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handelclick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-2">
        <h2>Your Note : </h2>
        {/* iterating the note from all the notes. */}
        {notes.map((note) => {
          return (
            <Noteitem note={note} key={note._id} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
