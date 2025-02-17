import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import logo from '../Icons/icon.png';
import { Link } from 'react-router-dom';
import NotificationMenu from './notification/Notification';

const Navbar = () => {
  // State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login (You can update this with your actual login logic)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <img src={logo} alt="Study group" style={{ height: '80px' }} />
        </Typography>
        {isLoggedIn && <NotificationMenu />}
        {isLoggedIn && <Button color="inherit" component={Link} to="/projects" style={{ margin: '0 auto' }}>Projects</Button>}
        {!isLoggedIn && <Button color="inherit" component={Link} to="/login" style={{ margin: '0 auto' }} onClick={handleLogin}>login</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
