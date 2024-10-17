import React from 'react';
import './Login.css'; // Optional: External CSS

function Login() {
  return (
    <div className="main-container">
      <h3>Log in to continue</h3>

      <form className="login-form">
        <div>
          
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
    
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">Continue</button>

        <div className="login-links">
          <a href="/forgot-password">Can’t log in?</a>
          <span>•</span>
          <a href="/register">Create an account</a>
        </div>
      </form>
      <hr></hr>
    </div>
  );
}

export default Login;
