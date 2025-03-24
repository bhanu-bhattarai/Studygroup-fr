import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
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
import ViewComments from "./pages/tasks/ViewComments";

function PrivateRoute({ element: Element, isAuthenticated, ...rest }) {
  const token = localStorage.getItem("token");
  isAuthenticated = !!token;
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication state (e.g., token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      {<Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/upload"
          element={<PrivateRoute element={FileUpload} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/home"
          element={<PrivateRoute element={Home} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/projects"
          element={<PrivateRoute element={ProjectListing} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/create"
          element={<PrivateRoute element={CreateProject} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/tasks"
          element={<PrivateRoute element={ViewTask} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/tasks/create"
          element={<PrivateRoute element={CreateTask} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/tasks/comments"
          element={<PrivateRoute element={ViewComments} isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
