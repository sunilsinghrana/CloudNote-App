import React, { useState } from 'react'
import { Avatar, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import Image from '../images/coverimg.jpg'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: '',email: '', password: ''})
  const navigate = useNavigate();
  
  const handlesubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password, name: credentials.name }),
    });
    const json = await response.json();
    if(json.success){
      // save auth and redirect to homepage
      localStorage.setItem('token', json.authtoken)
      navigate('/')
      props.showalert('Account Created Successfully', 'success');
    }else{
      props.showalert('Invalid credentials', 'error');
    }
  }

  const onChange =(e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}

  return (
        <Box
          sx={{
            height: '100vh',
            background : `url(${Image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
            <Box
              sx={{
                width: '40%',
                margin: 'auto',
                position: 'relative',
                top: '8rem',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "white",
                borderRadius: '10px'
              }}
            >
              <Avatar sx={{ m: 3, bgcolor: "secondary.main" }}>
                <LockIcon />
              </Avatar>
              <Typography variant="h5">Sign Up</Typography>
              <Box
                p={5}
                component="form"
                onSubmit={handlesubmit}
                noValidate
                sx={{ bgcolor: "white", borderRadius: '10px'}}
              >
                <TextField
                  id="name"
                  required
                  fullWidth
                  label="Usename"
                  value={credentials.name}
                  variant="outlined"
                  margin="normal"
                  name="name"
                  onChange={onChange}
                  autoFocus
                  />
                <TextField
                  id="email"
                  required
                  fullWidth
                  label="Email Address"
                  value={credentials.email}
                  variant="outlined"
                  margin="normal"
                  name="email"
                  onChange={onChange}
                  autoFocus
                  />
                <TextField
                  id="password"
                  required
                  fullWidth
                  label="Password"
                  value={credentials.password}
                  variant="outlined"
                  type='password'
                  name="password"
                  onChange={onChange}
                  margin="normal"
                  autoFocus
                />
                <FormControlLabel
                control={<Checkbox value='remember' />}
                label='Remember me'
                />
                <Button variant="contained" type="submit" fullWidth sx={{mt:3, mb:2}}>
                  Sign Up
                </Button>
              </Box>
            </Box>
            </Box>
  )
}

export default Signup
