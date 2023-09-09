import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {
  // Function to handle note deletion when the delete button is clicked
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note-container">
      <div className="note">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        {/* Button to delete the note */}
        <button onClick={handleClick}><DeleteIcon /> </button>
      </div>
    </div>
  );
}

export default Note;
