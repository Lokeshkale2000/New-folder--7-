import React from "react";
import "./Footer.css"; // Import the CSS for styling

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-section">
        <h4>About Trello</h4>
        <p>What’s behind the boards.</p>
      </div>
      <div className="footer-section">
        <h4>Trello Jobs</h4>
        <p>Learn about open roles on the Trello team.</p>
      </div>
      <div className="footer-section">
        <h4>App</h4>
        <p>Download the Trello App for your Desktop or Mobile devices.</p>
      </div>
      <div className="footer-section">
        <h4>Contact Us</h4>
        <p>Need anything? Get in touch and we can help.</p>
      </div>

      <hr />
    </div>
  );
}

export default Footer;
