// Board.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WorkspaceNavbar from '../workspacenavbar/WorkspaceNavbar';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Board.css';

const Board = () => {
  const { _id } = useParams(); // Extract the board ID from the route parameters
  const [board, setBoard] = useState({ lists: [] }); // Initialize board with empty lists
  const [loading, setLoading] = useState(true);
  const [newListTitle, setNewListTitle] = useState("");

  // Fetch board data from the backend
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/workboards/${_id}`);
        if (response.ok) {
          const data = await response.json();
          setBoard({ ...data, lists: data.lists || [] }); // Ensure lists is always an array
        } else {
          console.error('Failed to fetch board');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBoard();
  }, [_id]);

  // Handle adding a new list
  const handleAddList = async () => {
    if (!newListTitle.trim()) return;
    try {
      const response = await fetch(`http://localhost:8080/auth/api/boards/${_id}/lists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newListTitle }),
      });
      if (response.ok) {
        const updatedBoard = await response.json();
        setBoard(updatedBoard); // Update the board state
        setNewListTitle(""); // Clear input
      } else {
        console.error('Failed to add list');
      }
    } catch (error) {
      console.error('Error adding list:', error);
    }
  };

  // Handle drag-and-drop for cards within and between lists
  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return; // If dropped outside, do nothing

    const sourceList = board.lists[source.droppableId];
    const [movedCard] = sourceList.cards.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same list
      sourceList.cards.splice(destination.index, 0, movedCard);
    } else {
      // Moving to a different list
      const destinationList = board.lists[destination.droppableId];
      destinationList.cards.splice(destination.index, 0, movedCard);
    }

    setBoard({ ...board });

    // Save updated board to backend (optional for now)
    try {
      await fetch(`http://localhost:8080/auth/api/boards/${_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(board),
      });
    } catch (error) {
      console.error('Error updating board:', error);
    }
  };

  // Loading and error handling
  if (loading) return <p>Loading...</p>;
  if (!board) return <p>Board not found.</p>;
  if (!board.lists) return <p>No lists available.</p>;

  return (
    <div>
      <WorkspaceNavbar />
      <h2>Your Board: {board.title}</h2>

      <div>
        <input
          type="text"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          placeholder="Add new list"
        />
        <button onClick={handleAddList}>Add List</button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', gap: '16px' }}>
          {board.lists.map((list, listIndex) => (
            <Droppable key={listIndex} droppableId={String(listIndex)}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: '#f4f5f7',
                    padding: '8px',
                    borderRadius: '4px',
                    width: '250px',
                  }}
                >
                  <h3>{list.title}</h3>

                  {list.cards && list.cards.map((card, cardIndex) => (
                    <Draggable
                      key={card._id}
                      draggableId={card._id}
                      index={cardIndex}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: '8px',
                            margin: '4px 0',
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                            ...provided.draggableProps.style,
                          }}
                        >
                          {card.content}
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
