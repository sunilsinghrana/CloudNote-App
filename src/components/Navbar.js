import React from "react";
import {
  AppBar,
  Button,
  Divider,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/Login');
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar
          sx={{
            backgroundColor: "#126E82",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <nav style={{display: 'flex', alignItems: 'center'}}>  
          <Typography variant="h4" sx={{
            mx: 2,
            fontFamily: 'serif',
            cursor: 'pointer'
            }}>
            CloudNote
          </Typography>
          <Link
              href="/"
              variant="body1"
              color='inherit'
              underline="none"
              sx={{ cursor: "pointer", mx: 1, fontFamily: 'sans-serif' }}
              >
              {"Home"}
            </Link>
          <Link
              href="/About"
              variant="body1"
              color='inherit'
              underline="none"
              sx={{ cursor: "pointer", mx: 1, fontFamily: 'sans-serif' }}
              >
              {"About"}
            </Link>
            </nav>

            {!localStorage.getItem('token')?
            <nav>
          <Button href="/Login" variant="outlined"color="inherit" sx={{ color: "white", mx: 1, fontFamily: 'monospace' }}>Login</Button>
            
            <Button
            href="/Signup"
              variant="outlined"
              color="inherit"
              sx={{ color: "white", mx: 1, fontFamily: 'monospace' }}
            >
              Sign up
            </Button>
            </nav>
            : <Button
              onClick={handleLogout}
              variant="outlined"
              color="inherit"
              sx={{ color: "white", mx: 1, fontFamily: 'monospace' }}
              >
              Log out
            </Button>
          }
        </Toolbar>
      </AppBar>

      <Divider />
    </>
  );
};

export default Navbar;
