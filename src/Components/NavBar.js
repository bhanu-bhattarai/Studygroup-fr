import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import logo from '../Icons/icon.png';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <img src={logo} alt="Botree" style={{ height: '180px' }} />
        </Typography>
        <Button color="inherit" component={Link}
          to="/projects" style={{ margin: '0 auto' }}>Projects</Button>
        <Button color="inherit" component={Link}
          to="/home" style={{ margin: '0 auto' }}>Direct Template</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
