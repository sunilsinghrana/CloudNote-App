import { Box } from "@mui/system";
import React from "react";
import Notes from "./Notes";

const Home = (props) => {
 
  return (
    <>
    <Box sx={{bgcolor: '#EEF1FF'}} p={5}>
      <Notes setNotify={props.setNotify}/>
    </Box>
    </>
  );
};

export default Home;
