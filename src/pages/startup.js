import React, { useState } from 'react';

import './startup.css';

import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import LoginIcon from '@mui/icons-material/Login';
import {useNavigate} from 'react-router-dom';


const pages = ['Home'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Startup = () => {
    const navigate = useNavigate();
    const auth = () => {
        navigate("/auth")
      }
      const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

    return(
        <div className='startup-page'>
            <div>
            <AppBar position="static" sx={{backgroundColor:"#001C30"}} >
      <Toolbar disableGutters>
        
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'arial',
            fontWeight: 700,

            color: '#FF69B4',
            textDecoration: 'none',
            paddingLeft:"12px",
          }}
        >
          TRACK-MYSPEND
        </Typography>

        
        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component={Link}
          to=""
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'arial',
            fontWeight: 700,
        
            color: '#FFB6C1',
            textDecoration: 'none',
          }}
        >
          TRACK-MYSPEND
        </Typography>


        
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link}
              to={'/' + page.toLowerCase()}
            >
              
            </Button>
          ))}
        </Box>

        <Box style={{paddingRight:"10px"}} sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
          <Button
              
              sx={{ my: 2, color: 'white',fontWeight:"semi-bold", display: 'block' }}
              component={Link}
              to={'/auth'}
            >
              Login/Register
            </Button>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
                </div>        
                <section class="header">
  <div class="title-wrapper">
    <h1 class="sweet-title">
      <span data-text=""  class="main-title">  TRACK-MYSPEND</span>
    </h1>
   
    <span class="bottom-title">"Ever wonder where your money went? Let our tracker show you...
       so you can laugh, cry, and maybe save a little too!"</span>
    <span class="bottom-title"><Button variant="outlined" component={Link} to={'/auth'} sx={{color:" white", borderColor: "#64CCC5",
    '&:hover': {
      borderColor: "#64CCC5"}}} disableElevation
  disableRipple>Get in!</Button></span>
    </div>
</section>
        </div>
        
        
    )
}