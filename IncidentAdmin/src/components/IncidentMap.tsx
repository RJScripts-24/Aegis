import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

export function IncidentMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Dynamically import Leaflet
    const loadMap = async () => {
      const L = (await import('leaflet')).default;
      
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      // Initialize map centered on a demo location (San Francisco)
      const map = L.map(mapContainerRef.current, {
        center: [37.7749, -122.4194],
        zoom: 14,
        zoomControl: false,
      });

      // Add dark theme tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      // Create custom red marker icon
      const redIcon = L.divIcon({
        className: 'custom-incident-marker',
        html: `
          <div style="position: relative;">
            <div style="
              width: 40px;
              height: 40px;
              background: rgba(239, 68, 68, 0.3);
              border-radius: 50%;
              position: absolute;
              top: -20px;
              left: -20px;
              animation: pulse 2s infinite;
            "></div>
            <div style="
              width: 24px;
              height: 24px;
              background: #ef4444;
              border: 3px solid white;
              border-radius: 50%;
              position: absolute;
              top: -12px;
              left: -12px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            "></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      // Add marker for incident location
      L.marker([37.7749, -122.4194], { icon: redIcon })
        .addTo(map)
        .bindPopup(`
          <div style="background: #1a1a1a; color: white; padding: 8px; border-radius: 4px; border: 1px solid #3a3a3a;">
            <strong>Fire Incident</strong><br/>
            Reported 2m ago<br/>
            Status: Pending
          </div>
        `);

      mapInstanceRef.current = map;
      setIsLoaded(true);

      // Add pulse animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.3;
          }
        }
        .leaflet-popup-content-wrapper {
          background: #1a1a1a !important;
          color: white !important;
          border: 1px solid #3a3a3a !important;
        }
        .leaflet-popup-tip {
          background: #1a1a1a !important;
        }
      `;
      document.head.appendChild(style);
    };

    loadMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  return (
    <div className="relative w-full h-full bg-[#1a1a1a]">
      <link 
        rel="stylesheet" 
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      
      <div 
        ref={mapContainerRef} 
        className="w-full h-full rounded-xl"
        // Match the image card height from the design (approx 234px)
        style={{ minHeight: '234px' }}
      />
      
      {/* Map controls overlay */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-[1000]">
        <button 
          onClick={handleZoomIn}
          className="bg-[#2a2a2a] border border-[#3a3a3a] text-white w-8 h-8 rounded flex items-center justify-center hover:bg-[#333333] transition-colors"
        >
          +
        </button>
        <button 
          onClick={handleZoomOut}
          className="bg-[#2a2a2a] border border-[#3a3a3a] text-white w-8 h-8 rounded flex items-center justify-center hover:bg-[#333333] transition-colors"
        >
          −
        </button>
      </div>

      {/* Incident marker label */}
      <div className="absolute bottom-3 left-3 bg-[#2a2a2a]/90 border border-[#3a3a3a] rounded-lg px-3 py-2 flex items-center gap-2 backdrop-blur-sm z-[1000]">
        <MapPin className="w-4 h-4 text-red-500" />
        <span className="text-white">Incident Location</span>
      </div>
    </div>
  );
}
