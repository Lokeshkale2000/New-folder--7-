import React from 'react'
import './Registration.css'

function Registration() {
  return (
    <div>
      <form  class="registration-form">
 

  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="Enter your email" required/>
  </div>

  <div>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" placeholder="Enter your password" required/>
  </div>

  <div>
    <label for="confirmPassword">Confirm Password:</label>
    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Re-enter your password" required/>
  </div>
  <button type="submit">Register</button>
  
</form>

    </div>
  )
}

export default Registration
