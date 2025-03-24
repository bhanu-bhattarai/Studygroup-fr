import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import logo from '../Icons/icon.png';
import { Link, useNavigate } from 'react-router-dom';
import NotificationMenu from './notification/Notification';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // To handle navigation

  // Check login status from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // If token exists, set isLoggedIn to true
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    localStorage.removeItem('userId'); // Clear userId from localStorage
    setIsLoggedIn(false); // Update state
    navigate('/login'); // Redirect to login page
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <img src={logo} alt="Study group" style={{ height: '80px' }} />
        </Typography>
        {isLoggedIn && <NotificationMenu />}
        {isLoggedIn && (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/projects"
              style={{ margin: '0 auto' }}
            >
              Projects
            </Button>
            <Button
              color="inherit"
              style={{ margin: '0 auto' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}
        {!isLoggedIn && (
          <Button
            color="inherit"
            component={Link}
            to="/login"
            style={{ margin: '0 auto' }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
