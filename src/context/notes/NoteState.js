import React, { useState } from "react";

import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const initialnote = [];

  const [notes, setnotes] = useState(initialnote);

  // Get all Note
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await response.json();
    setnotes(data);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    setnotes(notes.concat(json));
  };
  
  // Delete a Note
  const deleteNote = async (id) => {
    // API for call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNote);
  };
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API for call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
     
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setnotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
