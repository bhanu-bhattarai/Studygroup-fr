/**
 * import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';

function home() {
  return (
    
    <>
    <center><h1>Botree Inc.</h1></center>
    
    <div>
    <Nav justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="../upload">upload</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">view</Nav.Link>
      </Nav.Item>
    </Nav>
    </div>


    </>
  );
};

export default home;
**/