import React from "react";
import "./Navbar.css"; // Import the CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo"><div className="iconcontainer"><span><img src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Trello-512.png" alt="mmm" className="icon"></img></span>Trello</div>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="/">Feature</a>
        </li>
        <li>
          <a href="/about">Solution</a>
        </li>
        <li>
          <a href="/services">Plain</a>
        </li>
        <li>
          <a href="/contact">Pricing</a>
        </li>
        <li>
          <a href="/contact">Resources</a>
        </li>
      </ul>
      <ul className="link">
        <li>
          <a href="/login" className="loginheader">Log in</a>
        </li>
        
      </ul>
      <ul className="link"><li>
          <a href="/login" className="Get">Get Trello for free</a>
        </li></ul>
      
    </nav>
  );
};

export default Navbar;
