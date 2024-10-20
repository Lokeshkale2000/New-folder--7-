import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WorkspaceNavbar from '../workspacenavbar/WorkspaceNavbar';
import './Board.css';
import BoardList from '../boardlist/BoardList';

const Board = () => {
  const { _id } = useParams(); // Extract the board ID from the route parameters
  const [loading, setLoading] = useState(true);
  const [boardId, setBoardId] = useState(null); // Initialize boardId state

  // Fetch board ID from the backend
  useEffect(() => {
    const fetchBoardId = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/workboards/${_id}`);
        if (response.ok) {
          const data = await response.json();
          setBoardId(data._id); // Set the fetched board ID
        } else {
          console.error('Failed to fetch board');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBoardId();
  }, [_id]);

  // Loading and error handling
  if (loading) return <p>Loading...</p>;
  if (!boardId) return <p>Board not found.</p>;

  return (
    <div>
      <WorkspaceNavbar />
      <h2>Your Board ID: {boardId}</h2>
      < BoardList/>

    </div>
  );
};

export default Board;
