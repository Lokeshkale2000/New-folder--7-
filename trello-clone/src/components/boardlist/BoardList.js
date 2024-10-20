import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './BoardList.css'; // Import your CSS file for styles

const BoardList = () => {
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState("");
  const [cardContents, setCardContents] = useState({}); // Map to store card content for each list
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch lists from the backend
  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true); // Set loading to true while fetching
      try {
        const response = await fetch("http://localhost:8080/api/lists");
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setLists(data);
      } catch (error) {
        console.error('Error fetching lists:', error);
        setError('Failed to fetch lists. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchLists();
  }, []);

  const handleAddList = async () => {
    if (newListTitle.trim()) {
      try {
        const response = await fetch("http://localhost:8080/api/lists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: newListTitle }),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const newList = await response.json();
        setLists((prevLists) => [...prevLists, newList]);
        setNewListTitle("");
      } catch (error) {
        console.error('Error adding list:', error);
        setError('Failed to add list. Please try again.');
      }
    }
  };

  const handleAddCard = async (listIndex) => {
    const content = cardContents[listIndex];
    if (content && content.trim()) {
      const listId = lists[listIndex]._id;
      try {
        const response = await fetch(`http://localhost:8080/api/lists/${listId}/cards`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const updatedList = await response.json();
        setLists((prevLists) =>
          prevLists.map((list, index) => (index === listIndex ? updatedList : list))
        );
        setCardContents((prev) => ({ ...prev, [listIndex]: "" })); // Clear input after adding card
      } catch (error) {
        console.error('Error adding card:', error);
        setError('Failed to add card. Please try again.');
      }
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceListIndex = Number(source.droppableId);
    const destinationListIndex = Number(destination.droppableId);

    const sourceList = lists[sourceListIndex];
    const destinationList = lists[destinationListIndex];

    const [movedCard] = sourceList.cards.splice(source.index, 1);

    // If moving to the same list
    if (sourceListIndex === destinationListIndex) {
      sourceList.cards.splice(destination.index, 0, movedCard);
    } else {
      destinationList.cards.splice(destination.index, 0, movedCard);
    }

    const updatedLists = [...lists];
    updatedLists[sourceListIndex] = { ...sourceList };
    updatedLists[destinationListIndex] = { ...destinationList };

    // Update state locally
    setLists(updatedLists);

    // Send updated lists to the backend
    try {
      const response = await fetch("http://localhost:8080/api/lists/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLists),
      });
      if (!response.ok) throw new Error('Network response was not ok');
    } catch (error) {
      console.error('Error updating lists on the backend:', error);
      setError('Failed to update lists. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  return (
    <div>
      <h2>Board Lists</h2>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          placeholder="Add new list"
        />
        <button onClick={handleAddList}>Add List</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} style={{ display: 'flex', gap: '16px' }}>
              {lists.map((list, listIndex) => (
                <Droppable key={list._id} droppableId={String(listIndex)}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="list-card">
                      <h4>{list.title}</h4>
                      <input
                        type="text"
                        value={cardContents[listIndex] || ""}
                        onChange={(e) => setCardContents((prev) => ({ ...prev, [listIndex]: e.target.value }))}
                        placeholder="Add a card"
                      />
                      <button onClick={() => handleAddCard(listIndex)}>Add Card</button>
                      {list.cards.map((card, cardIndex) => (
                        <Draggable key={card._id} draggableId={card._id} index={cardIndex}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="card-item"
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
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default BoardList;
