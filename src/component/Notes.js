import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";

// A note component to show all the notes on UI
const Notes = () => {
    // Taking the value from contest using useContext hook.
  const context = useContext(noteContext);
  // Destructring the value of notes and setNotes from context.
  const {notes, setNotes} = context;
  return (
    <div className="row my-2">
      <h2>Your Note : </h2>
      {/* iterating the note from all the notes. */}
      {notes.map((note) => {
        return <Noteitem note ={note} key ={note._id}/>
      })}
    </div>
  );
};

export default Notes;
