// src/pages/BhopalgasPage.js

import React from 'react';
import Scrollytelling from '../components/Scrollytelling'; // Import the reusable component
import bhopalgasVideo from '../assets/bhopalgas-animation.mp4'; // Import your NEW video asset

// 1. Define the "chapters" for the Bhopal gas tragedy story.
// Adjust time (in seconds) to match your video.
const chapters = [
  {
    time: 0,
    title: 'The Night of the Leak',
    description: 'In December 1984, a gas leak at the Union Carbide pesticide plant in Bhopal, India, released highly toxic methyl isocyanate (MIC) gas into the atmosphere.'
  },
  {
    time: 8, // Example: at 8 seconds
    title: 'The Immediate Aftermath',
    description: 'The toxic cloud spread over the sleeping city, causing thousands of immediate deaths and widespread panic. Hospitals were overwhelmed by the sheer number of affected people.'
  },
  {
    time: 16, // Example: at 16 seconds
    title: 'A Lasting Legacy',
    description: 'The disaster is one of the world\'s worst industrial incidents. Decades later, survivors and their families continue to suffer from chronic health issues and environmental contamination.'
  }
];

/**
 * This page component "drives" the scrollytelling experience.
 * It passes the specific Bhopal gas tragedy video and chapter data
 * into your reusable Scrollytelling component.
 */
function BhopalgasPage() {
  return (
    <div className="bhopalgas-story-container">
      <Scrollytelling
        videoSrc={bhopalgasVideo}
        chapters={chapters}
      />
    </div>
  );
}

export default BhopalgasPage;
