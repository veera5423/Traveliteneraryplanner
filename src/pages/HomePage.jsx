import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const HomePage = () => {
  const homePageStyle = {
    textAlign: 'center',
    padding: '3rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white if using a background image
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    margin: '2rem auto'
  };
  const buttonStyle = {
    display: 'inline-block',
    marginTop: '2rem',
    padding: '0.8rem 1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '1.2rem',
    fontWeight: 'bold'
  }

  return (
    <div style={homePageStyle}>
      <h1>Welcome to the Travel Itinerary Planner!</h1>
      <p style={{ fontSize: '1.2rem', color: '#555' }}>Plan your next adventure with ease. Create, manage, and share your travel plans all in one place.</p>
      <Link to="/create" style={buttonStyle}>
        Get Started - Create an Itinerary
      </Link>
    </div>
  );
};

export default HomePage;