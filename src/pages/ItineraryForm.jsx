import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ItineraryForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activities, setActivities] = useState([{ day: '', time: '', description: '', image: null }]); // Added image state
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const storedItineraries = JSON.parse(localStorage.getItem('itineraries')) || [];
      const itineraryToEdit = storedItineraries.find(item => item.id.toString() === id);
      if (itineraryToEdit) {
        setDestination(itineraryToEdit.destination);
        setStartDate(itineraryToEdit.startDate);
        setEndDate(itineraryToEdit.endDate);
        setActivities(
          itineraryToEdit.activities && itineraryToEdit.activities.length > 0 
            ? itineraryToEdit.activities.map(a => ({ ...a, image: a.image || null })) // Ensure image is null if not present
            : [{ day: '', time: '', description: '', image: null }]
        );
        setNotes(itineraryToEdit.notes);
      } else {
        alert('Itinerary not found for editing!');
        navigate('/itineraries');
      }
    }
  }, [id, isEditMode, navigate]);

  const handleActivityChange = (index, event) => {
    const { name, value, files } = event.target;
    const newActivities = activities.map((activity, i) => {
      if (index === i) {
        if (name === 'image' && files && files[0]) {
          const reader = new FileReader();
          reader.onloadend = () => {
            // Directly update the specific activity's image in a new activities array
            setActivities(prevActivities => 
              prevActivities.map((act, idx) => 
                idx === index ? { ...act, image: reader.result } : act
              )
            );
          };
          reader.readAsDataURL(files[0]);
          return { ...activity }; // Return current activity, image will be updated by onloadend
        } else {
          return { ...activity, [name]: value };
        }
      }
      return activity;
    });
    // Only set activities if not an image change, as image change sets it in onloadend
    if (name !== 'image') {
        setActivities(newActivities);
    }
  };

  const addActivity = () => {
    setActivities([...activities, { day: '', time: '', description: '', image: null }]);
  };

  const removeActivity = (index) => {
    const newActivities = activities.filter((_, i) => i !== index);
    setActivities(newActivities);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!destination || !startDate || !endDate) {
      alert('Please fill in destination, start date, and end date.');
      return;
    }

    // Ensure activities are correctly structured before saving
    const processedActivities = activities.map(activity => ({
      day: activity.day,
      time: activity.time,
      description: activity.description,
      image: activity.image || null // Ensure image is null if not set
    }));

    const itineraryData = {
      destination,
      startDate,
      endDate,
      activities: processedActivities, // Use processed activities
      notes,
    };

    const existingItineraries = JSON.parse(localStorage.getItem('itineraries')) || [];

    if (isEditMode) {
      const updatedItineraries = existingItineraries.map(item =>
        item.id.toString() === id ? { ...item, ...itineraryData } : item
      );
      localStorage.setItem('itineraries', JSON.stringify(updatedItineraries));
      alert('Itinerary Updated Successfully!');
      navigate(`/itinerary/${id}`); // Navigate to the detail page of the updated itinerary
    } else {
      const newItinerary = {
        ...itineraryData,
        id: Date.now(), // Generate new ID only for new itineraries
      };
      localStorage.setItem('itineraries', JSON.stringify([...existingItineraries, newItinerary]));
      alert('Itinerary Created and Saved to LocalStorage!');
      navigate('/itineraries'); // Navigate to the list after creation
    }

    // Reset form fields only if not in edit mode or if you want to clear after edit too
    if (!isEditMode) {
        setDestination('');
        setStartDate('');
        setEndDate('');
        setActivities([{ day: '', time: '', description: '', image: null }]);
        setNotes('');
    } else {
      // Optionally, you might want to refetch or just clear if edit was successful
      // For now, we navigate away, so clearing might not be strictly needed here
    }
  };

  return (
    <div className="card">
      <h2>{isEditMode ? 'Edit Itinerary' : 'Create New Itinerary'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        <h3>Activities</h3>
        {activities.map((activity, index) => (
          <div key={index} style={{ border: '1px solid #eee', padding: '1rem', marginBottom: '1rem', borderRadius: '4px', background: '#f9f9f9' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 150px' }}> {/* Adjusted flex basis */}
                <label htmlFor={`activityDay-${index}`}>Day:</label>
                <input
                  type="text"
                  id={`activityDay-${index}`}
                  name="day"
                  placeholder="e.g., Day 1"
                  value={activity.day}
                  onChange={(e) => handleActivityChange(index, e)}
                />
              </div>
              <div style={{ flex: '1 1 120px' }}> {/* Adjusted flex basis */}
                <label htmlFor={`activityTime-${index}`}>Time:</label>
                <input
                  type="time"
                  id={`activityTime-${index}`}
                  name="time"
                  value={activity.time}
                  onChange={(e) => handleActivityChange(index, e)}
                />
              </div>
              <div style={{ flex: '2 1 200px' }}> {/* Adjusted flex basis */}
                <label htmlFor={`activityDescription-${index}`}>Description:</label>
                <input
                  type="text"
                  id={`activityDescription-${index}`}
                  name="description"
                  value={activity.description}
                  onChange={(e) => handleActivityChange(index, e)}
                />
              </div>
             <div style={{ flex: '2 1 200px', marginTop: '0.5rem' }}>
                <label htmlFor={`activityImage-${index}`}>Image:</label>
                <input
                  type="file"
                  id={`activityImage-${index}`}
                  name="image"
                  accept="image/*"
                  onChange={(e) => handleActivityChange(index, e)}
                  style={{ display: 'block', marginTop: '0.25rem' }}
                />
                {activity.image && (
                  <img src={activity.image} alt="Activity preview" style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '0.5rem', objectFit: 'cover' }} />
                )}
              </div>
              {activities.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => removeActivity(index)} 
                  style={{ backgroundColor: '#dc3545', color: 'white', height: 'fit-content', padding: '0.75rem', alignSelf: 'flex-end', marginLeft: 'auto' }} // Added marginLeft auto
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
        <button type="button" onClick={addActivity} style={{ backgroundColor: '#17a2b8', color: 'white', alignSelf: 'flex-start' }}>
          Add Activity
        </button>

        <div>
          <label htmlFor="notes">Personal Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="4"
          />
        </div>

        <button type="submit" style={{ backgroundColor: isEditMode ? '#ffc107' : '#28a745', color: isEditMode? 'black' : 'white', padding: '0.75rem 1.5rem', fontSize: '1.1rem', marginTop: '1rem' }}>
          {isEditMode ? 'Update Itinerary' : 'Create Itinerary'}
        </button>
      </form>
    </div>
  );
};

export default ItineraryForm;