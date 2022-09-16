import {
  Button,
  Container,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const mycolors = ['#97D2EC','#F3E0B5','#89CFFD','#D2DAFF','#FFF6BF','#FFF38C','#FFFAE7','#EBC7E8','#FDEEDC','#FFF5E4','#F1A661','#A084CA','#B1D7B4']
  // const chooseColor =(index)=>{
  //   color = mycolors[index]
  //   return color
  // }
  // const randomItem = mycolors[Math.floor(Math.random()*mycolors.length)];

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = (cvalue) => {
    setOpen(true);
    setNote({
      id: cvalue._id,
      etitle: cvalue.title,
      edescription: cvalue.description,
      etag: cvalue.tag,
    });
  };
  const handleClose = () => setOpen(false);
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
      // eslint-disable-next-line
    }else{
      navigate('/Login')
    }
  }, );

  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.setNotify({
      isOpen: true,
      msg: 'Note updated successfully',
      type: 'success'
    });
    setOpen(false);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value });
  };

  return (
    <>
      <AddNote setNotify={props.setNotify} />
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          p={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "2px solid #bdbdbd",
            width: "75%",
            margin: "auto",
            bgcolor: "#e0e0e0",
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Edit Your Note
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: "12%",
              top: "1%",
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          <TextField
            sx={{ bgcolor: "white", borderRadius: "12px" }}
            id="etitle"
            required
            fullWidth
            multiline
            label="title"
            variant="outlined"
            margin="normal"
            defaultValue={note.etitle}
            autoFocus
            onChange={onChange}
          />
          <TextField
            sx={{ bgcolor: "white", outline: "none" }}
            id="edescription"
            required
            defaultValue={note.edescription}
            fullWidth
            label="description"
            multiline
            rows={4}
            variant="outlined"
            onChange={onChange}
            margin="normal"
          />
          <TextField
            sx={{ bgcolor: "white", outline: "none" }}
            id="etag"
            required
            defaultValue={note.etag}
            fullWidth
            label="tag"
            multiline
            variant="outlined"
            onChange={onChange}
            margin="normal"
          />
          <Button variant="contained" fullWidth onClick={handleClick}>
            Update Note
          </Button>
        </Box>
      </Modal>

      <Container>
        <Box
          p={5}
          sx={{
            width: "75%",
            margin: "auto",
          }}
        >
          <Typography variant="h3" sx={{ margin: "1rem", alignSelf: "center" }}>
            Your Notes
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {notes.map((notes, index) => {
              // console.log(index)
              return (
                <Noteitem
                mycolors={mycolors[index]}
                  setNotify={props.setNotify}
                  key={notes._id}
                  note={notes}
                  handleOpen={handleOpen}
                  />
                  );
                })}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Notes;
