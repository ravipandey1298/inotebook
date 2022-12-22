import NoteContext from "./noteContext";
import {useState} from "react";    

const NoteState = (props)=>{
   const notesInitial = [
      {
        "_id": "639842d7bd866cbc64216db5",
        "user": "6391c3ac21213aa728e4f467",
        "title": "My Title updated ",
        "description": "My Title updated ",
        "tag": "My Title updated ",
        "date": "2022-12-13T09:16:07.641Z",
        "__v": 0
      },
      {
        "_id": "63a01bde323ab33283ca2267",
        "user": "6391c3ac21213aa728e4f467",
        "title": "My Title",
        "description": "Here is the descrption.",
        "tag": "personal",
        "date": "2022-12-19T08:07:58.694Z",
        "__v": 0
      },
      {
        "_id": "63a01bdf323ab33283ca2269",
        "user": "6391c3ac21213aa728e4f467",
        "title": "My Title",
        "description": "Here is the descrption.",
        "tag": "personal",
        "date": "2022-12-19T08:07:59.446Z",
        "__v": 0
      },
      {
        "_id": "63a01be0323ab33283ca226b",
        "user": "6391c3ac21213aa728e4f467",
        "title": "My Title",
        "description": "Here is the descrption.",
        "tag": "personal",
        "date": "2022-12-19T08:08:00.005Z",
        "__v": 0
      }
  ]
  
  const [notes, setNotes] = useState(notesInitial);
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;