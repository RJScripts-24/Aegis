import { MapPin, X } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Location Permission Modal */}
      <div 
        className="rounded-xl p-8 max-w-md w-full relative shadow-2xl"
        style={{ 
          backgroundColor: '#2a2a2a',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 transition-colors duration-200"
          style={{ color: '#999' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Location Icon */}
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center mb-8 shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
            }}
          >
            <MapPin className="w-16 h-16 text-white" strokeWidth={2.5} />
          </div>

          {/* Main Text */}
          <h3 
            className="text-xl mb-2"
            style={{ 
              color: '#ffffff',
              fontWeight: '400',
              lineHeight: '1.4'
            }}
          >
            To see alerts near you,
          </h3>
          <p 
            className="mb-1"
            style={{ 
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: '400'
            }}
          >
            please allow location access
          </p>

          {/* Subtext */}
          <p 
            className="text-sm mb-8 mt-4 leading-relaxed max-w-sm"
            style={{ 
              color: '#999',
              lineHeight: '1.6'
            }}
          >
            We'll use your location to show you relevant alerts and updates in your area
          </p>

          {/* Buttons */}
          <div className="flex flex-row w-full" style={{ gap: '70px' }}>
            {/* Allow Location Button */}
            <button 
              className="rounded-md gap-2 transition-all duration-200 flex items-center justify-center"
              style={{
                backgroundColor: '#22c55e',
                color: '#ffffff',
                fontWeight: '500',
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                padding: '10px 20px',
                minWidth: '150px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
            >
              <MapPin className="w-4 h-4" />
              Allow Location
            </button>
            
            {/* Not now Button */}
            <button 
              className="rounded-md transition-all duration-200"
              style={{
                backgroundColor: '#5a5a5a',
                color: '#d0d0d0',
                fontWeight: '500',
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                padding: '10px 24px',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#666';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#5a5a5a';
                e.currentTarget.style.color = '#d0d0d0';
              }}
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
