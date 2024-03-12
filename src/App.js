import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import Login from "./pages/Login/Login";
import FileUpload from "./pages/Upload/Upload";
import Home from "./pages/home";



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
export default App;
