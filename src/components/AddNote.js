import React, { useContext, useState } from 'react'
import { Button, Container,TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import noteContext from "../context/notes/NoteContext" 

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context
    const [note, setNote] = useState({title: '', description: '', tag:''})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({title: '', description: '', tag: ''})
        props.setNotify({
          isOpen: true,
          msg: 'Note Added successfully',
          type: 'success'
        });
    }
    const onChange =(e)=>{
        setNote({...note, [e.target.id]: e.target.value})
    }

  return (
    <Container>
        <Box
          p={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: 'space-between',
            border: "2px solid #bdbdbd",
            borderRadius: '8px',
            width: "75%",
            margin: "auto",
            bgcolor: "#97C4B8",
          }}
        >
          <Typography variant="h3" sx={{ textAlign: "center", fontFamily:'fantasy' }}>
            Take Your Note
          </Typography>
          <TextField
            sx={{ bgcolor: "white", borderRadius: "12px" }}
            id="title"
            required
            fullWidth
            multiline
            label='title'
            variant="outlined"
            value={note.title}
            margin="normal"
            autoFocus
            onChange={onChange}
            />
          <TextField
            sx={{ bgcolor: "white", outline: "none" }}
            id="description"
            required
            value={note.description}
            fullWidth
            label='description'
            multiline
            rows={4}
            variant="outlined"
            onChange={onChange}
            margin="normal"
          />
          <TextField
            sx={{ bgcolor: "white", outline: "none" }}
            id="tag"
            required
            fullWidth
            value={note.tag}
            label='tag'
            multiline
            variant="outlined"
            onChange={onChange}
            margin="normal"
          />
          <Button variant="contained" fullWidth onClick={handleClick} sx={{bgcolor:'#36AE7C', fontSize: '16px'}}>
            Add Note
          </Button>
        </Box>
    </Container>
  )
}

export default AddNote
