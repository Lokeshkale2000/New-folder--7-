import React from 'react';
import './Trello101.css'

const Trello101 = () => {
  return (
    <div className='Trello-body'>
      <div className='Trello-header-main'>
      <h3 >Trello 101</h3>
      <h1>A productivity powerhouse</h1>
      <p  className='Trello101-header'>Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done. Learn more in our guide for getting started.</p>
      </div>
      <div className='trello-container'>
        <div className='trello-text-box'>
          <div className='trello-text-box-1'>
            <h3>Board</h3>
            <p>Trello boards keep tasks organized and work moving forward. In a glance, see everything from “things to do" to "aww yeah, we did it!"</p>
          </div>
          <div className='trello-text-box-1'>
            <h3>Lists</h3>
            <p>The different stages of a task. Start as simple as To Do, Doing or Done-or build a workflow custom fit to your team's needs. There's no wrong way to Trello.</p>
          </div>
          <div className='trello-text-box-1'>
            <h3>Cards</h3>
            <p>Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.</p>
          </div>
        </div>
        <div>
          <img src='https://images.ctfassets.net/rz1oowkt5gyp/3N2U3C71rApm61cGFxnc2E/970b010002488a09a420282df5e7b43a/Carousel_Image_Boards_2x.png?w=1140&fm=webp' alt='hhsh' className='Trello-img'></img>
        </div>
      </div>
    </div>
  );
}

export default Trello101;
