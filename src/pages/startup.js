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

            color: 'inherit',
            textDecoration: 'none',
            paddingLeft:"12px",
          }}
        >
          EXPENSIFY
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

            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          EXPENSIFY
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
      <span data-text="Sweet">Expensify</span>
    </h1>
   
    <span class="bottom-title">A revolutionary app designed to simplify and streamline your expense management process. Say goodbye to tedious spreadsheets and piles of receipts. With Expesify, tracking your expenses becomes effortless, efficient, and even enjoyable!</span>
    <span class="bottom-title"><Button variant="outlined" component={Link} to={'/auth'} sx={{color:"#64CCC5", borderColor: "#64CCC5",
    '&:hover': {
      borderColor: "#64CCC5"}}} disableElevation
  disableRipple>Get in!</Button></span>
    </div>
</section>
        </div>
        
        
    )
}