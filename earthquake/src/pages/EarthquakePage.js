// src/pages/EarthquakePage.js

import React from 'react';
import Scrollytelling from '../componenets/Scrollytelling';
// Note: the assets folder currently has no video file. We avoid a static import
// which would break the bundler when the file is missing. If you add
// 'earthquake-animation.mp4' to src/assets, you can re-add the import and
// pass it as `videoSrc` to Scrollytelling.

// 2. Define the content and timing for the Earthquake story
const earthquakeChapters = [
  {
    title: "The Earth Trembles",
    text: "An **earthquake** is the sudden shaking of the Earth's surface caused by a rapid release of energy in the Earth's lithosphere, creating seismic waves.",
    // Note: Tune these ranges to match your video timing
    range: [0, 15] 
  },
  {
    title: "Tectonic Plates",
    text: "Most earthquakes occur at the boundaries of **tectonic plates**. These massive pieces of the Earth's crust are constantly moving, but they sometimes get stuck.",
    range: [18, 38] 
  },
  {
    title: "Fault Lines and Stress",
    text: "When plates get locked, **stress builds up** along a **fault line**. The longer they are stuck, the more energy is stored, like pulling back a rubber band.",
    range: [42, 62] 
  },
  {
    title: "The Release (The Quake)",
    text: "The moment the stress exceeds the strength of the rocks, the plates suddenly slip. This swift, violent movement releases the stored energy as seismic waves.",
    range: [65, 85] 
  },
  {
    title: "Aftermath & Scale",
    text: "The severity is measured on the **Richter scale**. The primary dangers include collapsing structures, landslides, and sometimes, tsunamis.",
    range: [88, 100] 
  },
];

const EarthquakePage = () => {
  return (
    // 3. Render the generic Scrollytelling component with the specific earthquake data
    // No videoSrc is provided to avoid build errors if the asset is missing.
    <Scrollytelling 
      videoSrc={null}
      chapters={earthquakeChapters}
    />
  );
};

export default EarthquakePage;