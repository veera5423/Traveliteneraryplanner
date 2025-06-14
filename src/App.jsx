import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ItineraryForm from './pages/ItineraryForm'; 
import ItineraryList from './pages/ItineraryList';
import ItineraryDetail from './pages/ItineraryDetail';

// Make sure App.css is imported if you put the background image there, or index.css for global styles
import './index.css'; // Or './App.css' if you prefer

function App() {
  return (
    <>
      <Navbar />
      {/* Use the container class for centering and padding */}
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<ItineraryForm />} />
          <Route path="/itineraries" element={<ItineraryList />} />
          <Route path="/itinerary/:id" element={<ItineraryDetail />} /> {/* Corrected path from /itineraries/:id to /itinerary/:id based on previous implementations */}
          <Route path="/edit-itinerary/:id" element={<ItineraryForm />} /> {/* Added route for editing */}
        </Routes>
      </main>
    </>
  );
}

export default App;
