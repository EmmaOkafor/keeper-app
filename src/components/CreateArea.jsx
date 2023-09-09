import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";
import { Fab } from "@mui/material";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Load existing notes from localStorage when the component mounts
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      props.onLoadNotes(storedNotes);
    }
  }, [props]);

  // Function to handle changes in input fields
  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });

    // Clear error message when the user starts typing
    setErrorMessage("");
  }

  // Function to submit a new note
  function submitNote(event) {
    // Check if both title and content are not empty
    if (note.title.trim() !== "" && note.content.trim() !== "") {
      props.onAdd(note);
      setNote({
        title: "",
        content: ""
      });
    } else {
      // Display a single error message for both fields
      setErrorMessage("All fields are required, kindly fill them");
    }
    event.preventDefault();
  }

  // Function to expand the note input area
  function expand() {
    setIsExpanded(true);
  }

  return (
    <div className="create-area">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="create-note">
        {isExpanded ? (
          <div>
            <input
              onChange={handleChange}
              name="title"
              placeholder="Title"
              value={note.title}
            />
          </div>
        ) : null}
        <textarea
          onChange={handleChange}
          name="content"
          onClick={expand}
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
          value={note.content}
        />
        <Zoom in={isExpanded ? true : false}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
