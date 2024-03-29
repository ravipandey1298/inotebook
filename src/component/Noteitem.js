import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
  const { note , updateNote} = props;
  return (
    // Cards to show notes
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-item-center">
            <h5 className="card-title">{note.title}</h5>
            {/* Delete icon form fontawsome.com */}
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);
            props.showAlert("Deleted Successfully!", "success")}}></i>
            {/* Edit icon form fontawsome.com */}
            <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updateNote(note)}}></i>
          </div>
            <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
