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



    const note = {
      _id: "63a01be0323ab33283ca226b",
      user: "6391c3ac21213aa728e4f467",
      title: title,
      description: description,
      tag: tag,
      date: "2022-12-19T08:08:00.005Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
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
      return note._id != id;
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.   eyJ1c2VyIjp7ImlkIjoiNjM5MWMzYWMyMTIxM2FhNzI4ZTRmNDY3In0sImlhdCI6MTY3MDkxOTA0M30.yNC2dGYkwlMMegJKLqiUXFH7l0af8PP2k_KWxpfDm_4",
      },
      body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
    });

    // Logic to edit client..
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
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
