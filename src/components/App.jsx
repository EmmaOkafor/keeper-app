import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  // Initialize notes state with an empty array
  const [notes, setNotes] = useState([]);

  // Load existing notes from localStorage when the component mounts
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  // Function to add a new note
  function addNote(note) {
    setNotes((prevNotes) => {
      const newNotes = [...prevNotes, note];
      // Save updated notes to localStorage
      localStorage.setItem("notes", JSON.stringify(newNotes));
      return newNotes;
    });
  }

  // Function to delete a note
  function deleteNote(id) {
    setNotes((prevNotes) => {
      const newNotes = prevNotes.filter((note, index) => {
        return index !== id;
      });
      // Save updated notes to localStorage
      localStorage.setItem("notes", JSON.stringify(newNotes));
      return newNotes;
    });
  }

  // Function to load notes from CreateArea component
  function loadNotes(data) {
    setNotes(data);
  }
  
  return (
    <div>
      <CssBaseline />
      <Header />
      {/* Pass the addNote and loadNotes functions as props */}
      <CreateArea onAdd={addNote} onLoadNotes={loadNotes} />

      {/* Render each note */}
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
