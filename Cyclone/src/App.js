// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your new page component
import CyclonePage from './pages/CyclonePage';

// You might have other pages, like a Homepage
// import HomePage from './pages/HomePage'; 

// Import your main CSS file
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        {/* A navigation bar is helpful so users can find your page.
          (Optional, but recommended)
          <nav>
            <a href="/">Home</a>
            <a href="/cyclone">Cyclone Story</a>
          </nav> 
        */}

        <Routes>
          {/* This route renders your new CyclonePage */}
          <Route path="/cyclone" element={<CyclonePage />} />
          
          {/* You can make the default route ("/") also show the cyclone page */}
          <Route path="/" element={<CyclonePage />} />
          
          {/* Or, if you have a HomePage component, you could do this:
          <Route path="/" element={<HomePage />} /> 
          */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;