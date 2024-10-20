import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Workspace.css';

const Workspace = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ title: '', visibility: 'public' });
  const [workboards, setWorkboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // State for error messages
  const [creating, setCreating] = useState(false); // Loading state for form submission
  const navigate = useNavigate();

  const togglePopup = () => setShowPopup(!showPopup);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true); // Start form submission loading

    try {
      const response = await fetch('http://localhost:8080/api/workboards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Workboard created successfully!');
        setFormData({ title: '', visibility: 'public' });
        togglePopup();
        fetchWorkboards(); 
      } else {
        const { message } = await response.json();
        setError(message || 'Failed to create workboard'); // Display error from server
      }
    } catch (error) {
      setError('An error occurred while creating the workboard');
      console.error('Error:', error);
    } finally {
      setCreating(false); // Stop form submission loading
    }
  };

  const fetchWorkboards = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch('http://localhost:8080/api/workboards');
      if (response.ok) {
        const data = await response.json();
        setWorkboards(data);
      } else {
        console.error('Failed to fetch workboards');
        setError('Failed to fetch workboards');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching workboards');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchWorkboards();
  }, []);

  const handleViewBoard = (_id) => {
    navigate(`/board/${_id}`); // Navigate to specific workboard
  };

  return (
    <div className="workspace-container">
      <button className="create-workboard-button" onClick={togglePopup}>
        Create Workboard
      </button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={togglePopup}>
              &times;
            </button>
            <h2>Create New Workboard</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Board Title"
                value={formData.title}
                onChange={handleInputChange}
                className="input-field"
                required
              />

              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>

              <button type="submit" className="submit-button" disabled={creating}>
                {creating ? 'Creating...' : 'Submit'}
              </button>
            </form>
            {error && <p className="error-message">{error}</p>} {/* Display form errors */}
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading workboards...</p> // Show loading state
      ) : workboards.length === 0 ? (
        <p>No workboards available</p> // Show message if no workboards exist
      ) : (
        <div className="workboards-container">
          {workboards.map((workboard) => (
            <div className="workboard-card" key={workboard._id}>
              <h3>{workboard.title}</h3>
              <p>Visibility: {workboard.visibility}</p>
              <button className="view-button" onClick={() => handleViewBoard(workboard._id)}>
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workspace;
