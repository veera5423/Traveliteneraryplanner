import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ItineraryDetail = () => {
  const { id } = useParams(); // Get the itinerary ID from the URL
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    const storedItineraries = JSON.parse(localStorage.getItem('itineraries')) || [];
    const foundItinerary = storedItineraries.find(item => item.id.toString() === id);
    if (foundItinerary) {
      setItinerary(foundItinerary);
    } else {
      // Handle case where itinerary is not found (e.g., redirect or show error)
      alert('Itinerary not found!');
      navigate('/itineraries'); 
    }
  }, [id, navigate]);

  const handleShare = () => {
    // Basic share functionality (copies a link to the clipboard)
    // In a real app, you might generate a unique shareable link or use browser's Web Share API
    const shareLink = window.location.href; // Current page URL
    navigator.clipboard.writeText(shareLink)
      .then(() => alert('Link copied to clipboard!'))
      .catch(err => console.error('Failed to copy link: ', err));
  };

  const handleExport = () => {
    // Basic export functionality (downloads itinerary as JSON)
    if (!itinerary) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(itinerary, null, 2) // Pretty print JSON
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = `itinerary-${itinerary.destination.replace(/\s+/g, '_')}-${itinerary.id}.json`;
    link.click();
    alert('Itinerary exported as JSON!');
  };


  if (!itinerary) {
    return <div className="card"><p>Loading itinerary details...</p></div>; 
  }

  return (
    <div className="card"> 
      <Link to="/itineraries" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
        &larr; Back to Itineraries
      </Link>
      <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>{itinerary.destination}</h1>
      <p><strong>Dates:</strong> {itinerary.startDate} to {itinerary.endDate}</p>
      
      <h3>Activities:</h3>
      {itinerary.activities && itinerary.activities.length > 0 ? (
        <ul style={{ listStyle: 'none', paddingLeft: '0', marginBottom: '1.5rem' }}> {/* Changed to list-style: none */}
          {itinerary.activities.map((activity, index) => (
            <li key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: '4px', backgroundColor: '#f8f9fa' }}>
              <p><strong>{activity.day ? `${activity.day}, ` : ''}{activity.time || 'Anytime'}:</strong> {activity.description || 'No description'}</p>
              {activity.image && (
                <img 
                  src={activity.image} 
                  alt={`Activity: ${activity.description || 'image'}`}
                  style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '0.75rem', borderRadius: '4px', objectFit: 'cover' }}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No activities planned.</p>
      )}

      {itinerary.notes && (
        <>
          <h3>Personal Notes:</h3>
          <p style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px', border: '1px solid #eee', marginBottom: '1.5rem' }}>{itinerary.notes}</p>
        </>
      )}

      <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #eee', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button onClick={handleShare} style={{ backgroundColor: '#17a2b8', color: 'white' }}>
          Share Itinerary (Copy Link)
        </button>
        <button onClick={handleExport} style={{ backgroundColor: '#28a745', color: 'white' }}>
          Export as JSON
        </button>
        <Link to={`/edit-itinerary/${itinerary.id}`} style={{ textDecoration: 'none' }}>
          <button style={{ backgroundColor: '#ffc107', color: 'black' }}> 
            Edit Itinerary
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ItineraryDetail;