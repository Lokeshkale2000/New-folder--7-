
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./WorkspaceNavbar.css";

const WorkspaceNavbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="workspace-navbar">
      <div className="navbar-left">
        <h2>TRELLO</h2>
        <h4 className="logo">Workspaces</h4>
        <ul className="nav-links">
          <li><Link to="/">Recent</Link></li>
          <li><Link to="/starred">Starred</Link></li>
          <li><Link to="/templates">Templates</Link></li>
          <li><Link to="/create">Create</Link></li>
        </ul>
     
      </div>

      <div className="navbar-right">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
           
           <button className="Logout-btn"> Logout</button>
      </div>
    </nav>
  );
};

export default WorkspaceNavbar;
