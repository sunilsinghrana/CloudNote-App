import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import noteContext from "../context/notes/NoteContext" 
import EditIcon from "@mui/icons-material/Edit";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  // const {chooseColor, index} = props;

  // const mycolors = ['#97D2EC','#F3E0B5','#89CFFD','#D2DAFF','#FFF6BF','#FFF38C','#FFFAE7','#EBC7E8','#FDEEDC','#FFF5E4','#F1A661','#A084CA','#B1D7B4']
  // const randomItem = mycolors[Math.floor(Math.random()*mycolors.length)];

  const { note, handleOpen } = props;
  return (
    <>
      <Box
        sx={{
          padding: "0.5rem",
          width: "25%",
          borderRadius: '5px',
          backgroundColor: 'grey',
        }}
        >
            <Card
            sx={{
              // boxShadow: '5px 5px grey',
              boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              bgcolor: props.mycolors
              // bgcolor: '#FDEEDC'
            }}>
        
          <CardContent>
            <Typography
              sx={{
                fontSize: 26,
                textAlign: 'center',
                fontFamily: 'serif'
              }}
              color="inherit"
              gutterBottom
            >
              {note.title}  
            </Typography>
            <Typography variant="body1">{note.description}</Typography>
            {/* <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary"> */}
              {/* {note.tag} */}
              <Chip label={note.tag} size="small" />
            {/* </Typography> */}
            <Typography sx={{display:'flex', justifyContent:'end'}}>
                <Tooltip title='Delete'>
                    <IconButton  onClick={()=>{deleteNote(note._id);props.setNotify({
        isOpen: true,
        msg: 'Note Deleted successfully',
        type: 'error'
      });}}>
            <DeleteIcon fontSize="small" sx={{ cursor: "pointer", margin:'0.5rem 5px 0 0'}} />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Edit'>
                <IconButton  onClick={()=>handleOpen(note)}>
            <EditIcon fontSize="small" sx={{ cursor: "pointer", margin:'0.5rem 5px 0 0'}} />
                </IconButton>
                </Tooltip>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Noteitem;
