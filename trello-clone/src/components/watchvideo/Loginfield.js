import React from "react";
import "./Loginfield.css";
//import white from '../../images/white.svg'

const Loginfield = () => {
  return (
    <div className="body"> 
    <div className="main-container">
      <div className="textcontainer">
        <h1 className="h1">Trello brings all your<br></br> tasks, teammates, and <br></br>tools together</h1>
        <h3 className="h4">Keep everything in the same place—even if your team isn’t.</h3>
        <form>
          <div className="from-components">
            <div >
              <input className="input"
                type="email" 
                id="email" 
                name="email" 
                placeholder="Email" 
                required 
              />
            </div>
            <div >
              <button type="submit"className="signlink">Sign up - it’s free!</button>
            </div>
          </div>
        </form>
        <ul>
          <li className="video-field">
            watch video <span className="video-icon"></span>
          </li>
        </ul>
      </div>
      <div>
        <div className="imgdiv">
          <img
            src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=540"
            alt="Trello UI collage"
          />
        </div>
      
      </div>
    </div>
    </div>
  );
};

export default Loginfield;
