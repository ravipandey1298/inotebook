import React from "react";

const Noteitem = (props) => {
  const { note } = props;
  return (
    // Cards to show notes
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-item-center">
            <h5 className="card-title">{note.title}</h5>
            {/* Delete icon form fontawsome.com */}
            <i class="fa-solid fa-trash mx-2"></i>
            {/* Edit icon form fontawsome.com */}
            <i class="fa-solid fa-file-pen mx-2"></i>
          </div>
            <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
