import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import FileUpload from "./pages/Upload/Upload";
import Home from "./pages/home";
import Navbar from "./Components/NavBar";
import ProjectListing from "./pages/projects/ProjectList";
import CreateProject from "./pages/Create/Create";
import ProjectDisplay from "./pages/viewprojects/ViewProject";
import ViewTask from "./pages/tasks/View";
import CreateTask from "./pages/tasks/Create";



function App() {

  return (
    <Router>
      {<Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<ProjectListing />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/tasks" element={<ViewTask />} />
        <Route path="/tasks/create" element={< CreateTask />} />

      </Routes>
    </Router>
  );
}
export default App;
