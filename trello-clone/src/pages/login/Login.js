import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to another page
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token in localStorage
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        
        // Redirect user to the dashboard or home page
        navigate("/workpage"); 
      } else {
        setError(data.message); // Show error message if login fails
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="main-container">
      <h3 className="maintext">Log in to continue</h3>

      <form className="login-form" onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Continue</button>

        {error && <p className="error-text">{error}</p>} {/* Show error if any */}

        <div className="login-links">
          <a href="/forgot-password">Can’t log in?</a>
          <span>•</span>
          <a href="/register">Create an account</a>
        </div>
      </form>

      <hr />
      <h2 className="Atlas">ATLASSIAN</h2>
      <div className="bottom-text">
        <p>One account for Trello, Jira, Confluence, and more.</p>
        <p>
          This site is protected by reCAPTCHA and the Google<br />
          Privacy Policy and Terms of Service apply.
        </p>
      </div>
    </div>
  );
}

export default Login;
