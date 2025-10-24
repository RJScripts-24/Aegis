import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TsunamiPage from './pages/tsunamiPage.jsx';

function HomePage() {
    return (
        <div style={{ padding: '50px' }}>
            <h1>Disaster Management Hub</h1>
            <nav>
                <Link to="/tsunami">Learn about Tsunamis</Link>
                <br />
                {/* <Link to="/earthquake">Learn about Earthquakes</Link> */}
            </nav>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/tsunami" element={<TsunamiPage />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
