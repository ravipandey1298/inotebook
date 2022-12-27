import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);
  const getNotes = async ()=> {
    // ApiCall
    const url = host + "api/notes/fetchallnotes";
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5MWMzYWMyMTIxM2FhNzI4ZTRmNDY3In0sImlhdCI6MTY3MDkxOTA0M30.yNC2dGYkwlMMegJKLqiUXFH7l0af8PP2k_KWxpfDm_4"
      }
    });
    const json = await response.json();
    // console.log(json)
    setNotes(json)
  }
  
  // Add Note
  const addNote = async (title, description, tag) => {
    //TODO : API call
    // ApiCall
    const url = host + "api/notes/addnote";
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5MWMzYWMyMTIxM2FhNzI4ZTRmNDY3In0sImlhdCI6MTY3MDkxOTA0M30.yNC2dGYkwlMMegJKLqiUXFH7l0af8PP2k_KWxpfDm_4"
      },
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    setNotes(notes.concat(json))
  };

  // Delete Note
  const deleteNote = async (id) => {
    // ApiCall
    const url = host + "api/notes/deletenote/" + id;
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5MWMzYWMyMTIxM2FhNzI4ZTRmNDY3In0sImlhdCI6MTY3MDkxOTA0M30.yNC2dGYkwlMMegJKLqiUXFH7l0af8PP2k_KWxpfDm_4"
      }
    });
    // console.log("The note id is : " + id)
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    // ApiCall
    const url = host + "api/notes/updatenote/" + id;
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5MWMzYWMyMTIxM2FhNzI4ZTRmNDY3In0sImlhdCI6MTY3MDkxOTA0M30.yNC2dGYkwlMMegJKLqiUXFH7l0af8PP2k_KWxpfDm_4"
      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });

    const json = await response.json();
    console.log(json);

    // Logic to edit client..
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
