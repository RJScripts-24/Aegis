import React from 'react';
import Scrollytelling from '../components/scrollytelling.jsx';
import TsunamiVideo from '../assets/tsunami-animation.mp4';

const video = TsunamiVideo;

const tsunamiChapters = [
    {
        id: 'story-1',
        title: 'The Silent Trigger',
        text: 'A tsunami is a series of giant waves, most often caused by a powerful underwater earthquake. When tectonic plates suddenly shift, the seafloor jerks upwards, displacing a massive volume of water. These waves travel at jet speeds (800+ km/h) in the deep ocean. As they approach shallow land, they slow down, compress, and build into a devastatingly high wall of water.',
        range: [0.1, 0.35]
    },
    {
        id: 'story-2',
        title: 'Catastrophic Events ',
        text: ' 2004 Indian Ocean Tsunami: December 26, 2004, 7:58 AM (local time) / 00:58 UTC 2011 Tōhoku (Japan) Tsunami: March 11, 2011, 2:46 PM (local time) / 05:46 UTC 1960 Valdivia (Chile) Tsunami: May 22, 1960, 3:11 PM (local time) / 19:11 UTC   ',
        range: [0.4, 0.65]
    },
    {
        id: 'story-3',
        title: ' Measures ',
        text: 'Listen for official warnings; if you feel a strong quake, see the sea recede, or hear a roar, evacuate to high ground immediately and wait for the "all clear."',
        range: [0.7, 0.9]
    }
];

function TsunamiPage() {
    return (
        <div className="tsunami-page">
            <Scrollytelling videoSrc={video} chapters={tsunamiChapters} />
            <div className="content-after-scroll">
                <h2>Understanding Tsunami Preparedness</h2>
                <p>Here you can add all the rest of your information about tsunamis...</p>
                <p>Safety procedures, warning signs, and more.</p>
                <p>This content appears *after* the animation is finished.</p>
            </div>
        </div>
    );
}

const styles = `
.content-after-scroll {
    padding: 50px;
    background-color: #f4f4f4;
    height: 100vh;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default TsunamiPage;
