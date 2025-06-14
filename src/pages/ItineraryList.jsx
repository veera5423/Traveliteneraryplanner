import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ItineraryList = () => {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    // Load itineraries from localStorage when the component mounts
    const storedItineraries = JSON.parse(localStorage.getItem('itineraries')) || [];
    setItineraries(storedItineraries);
  }, []);

  const handleDelete = (id) => {
    const updatedItineraries = itineraries.filter(itinerary => itinerary.id !== id);
    setItineraries(updatedItineraries);
    localStorage.setItem('itineraries', JSON.stringify(updatedItineraries));
    alert('Itinerary deleted!');
  };

  if (itineraries.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center' }}> {/* Added card class */} 
        <h2>My Itineraries</h2>
        <p>No itineraries found. <Link to="/create">Create one now!</Link></p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>My Itineraries</h2>
      <div> {/* Changed ul to div for more flexible styling if needed */} 
        {itineraries.map((itinerary) => (
          <div key={itinerary.id} className="card"> {/* Added card class */} 
            <h3 style={{ marginTop: 0, color: '#007bff' }}>{itinerary.destination}</h3>
            <p><strong>Dates:</strong> {itinerary.startDate} to {itinerary.endDate}</p>
            <p><strong>Activities:</strong> {itinerary.activities.length}</p>
            {itinerary.notes && <p><strong>Notes:</strong> {itinerary.notes.substring(0,100)}{itinerary.notes.length > 100 ? '...' : ''}</p>}
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee', display: 'flex', gap: '0.5rem' }}>
              <Link 
                to={`/itinerary/${itinerary.id}`} 
                style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}
              >
                View Details
              </Link>
              <button 
                onClick={() => handleDelete(itinerary.id)} 
                style={{ backgroundColor: '#dc3545', color: 'white' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryList;