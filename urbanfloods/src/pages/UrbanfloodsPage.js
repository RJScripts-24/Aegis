// src/pages/UrbanfloodsPage.js

import React from 'react';
import Scrollytelling from '../components/Scrollytelling'; // Import the reusable component
import urbanfloodsVideo from '../assets/urbanfloods-animation.mp4'; // Import your NEW video asset

// 1. Define the "chapters" for the urban floods story.
// Adjust time (in seconds) to match your video.
const chapters = [
  {
    time: 0,
    title: 'The Concrete Jungle',
    description: 'Urban floods occur when rainfall overwhelms a city\'s drainage system. Unlike in nature, water can\'t be absorbed by concrete and asphalt surfaces.'
  },
  {
    time: 7, // Example: at 7 seconds
    title: 'Overwhelmed Systems',
    description: 'Drains and sewers, often clogged or outdated, quickly reach their maximum capacity. This forces excess water back onto the streets, causing rapid flooding.'
  },
  {
    time: 14, // Example: at 14 seconds
    title: 'The Ripple Effect',
    description: 'This flash flooding damages property, disrupts transportation, and creates significant public health risks as floodwaters mix with sewage.'
  }
];

/**
 * This page component "drives" the scrollytelling experience.
 * It passes the specific urban floods video and chapter data
 * into your reusable Scrollytelling component.
 */
function UrbanfloodsPage() {
  return (
    <div className="urbanfloods-story-container">
      <Scrollytelling
        videoSrc={urbanfloodsVideo}
        chapters={chapters}
      />
    </div>
  );
}

export default UrbanfloodsPage;
