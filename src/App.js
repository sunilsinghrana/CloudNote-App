import React, { useState } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
// import { Container } from "@mui/material";
import NoteState from "./context/notes/NoteState";
import Alertmsg from "./components/Alertmsg";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [notify, setNotify] = useState({isOpen: false,msg: '', type: 'info'});

  return (
    <NoteState>
        <Navbar />
        <Alertmsg notify={notify} setNotify={setNotify} />
        <Routes>
          <Route path="/" element={<Home setNotify={setNotify}/>} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login setNotify={setNotify}/>} />
          <Route path="/Signup" element={<Signup setNotify={setNotify}/>} />
        </Routes>
    </NoteState>
  );
}

export default App;
