import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    backgroundColor: '#343a40', // Darker navbar
    padding: '1rem 2rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };
  const ulStyle = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center'
  };
  // const linkStyle = {
  //   color: '#f8f9fa',
  //   textDecoration: 'none',
  //   fontSize: '1.1rem',
  //   fontWeight: '500'
  // };
  // const activeLinkStyle = {
  //   color:'#17a2b8', // Highlight color for active/hover
  //   textDecoration:'underline'
  // };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li><Link to="/" className='navlink'>Home</Link></li>
        <li><Link to="/create" className='navlink'>Create Itinerary</Link></li>
        <li><Link to="/itineraries" className='navlink'>View Itineraries</Link></li>
      </ul>
    </nav>
  )
};

export default Navbar;