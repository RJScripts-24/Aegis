// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EarthquakePage from './pages/EarthquakePage'; // <-- Import the new page

function App() {
  return (
    <Router>
      <Routes>
        {/* Set up the route for the new Earthquake story */}
        <Route path="/earthquake" element={<EarthquakePage />} />
        
        {/* You could add other routes here, like a homepage */}
        {/* <Route path="/" element={<HomePage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;