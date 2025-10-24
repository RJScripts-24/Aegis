import { MapPin, X } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      {/* Location Permission Modal */}
      <Card className="bg-card border-border rounded-xl p-8 max-w-md w-full relative shadow-2xl">
        <button
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Location Icon */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-8 shadow-xl">
            <MapPin className="w-12 h-12 text-white" />
          </div>

          {/* Main Text */}
          <h3 className="text-xl mb-2 text-card-foreground">
            To see alerts near you,
          </h3>
          <p className="text-card-foreground mb-1">
            please allow location access
          </p>

          {/* Subtext */}
          <p className="text-sm text-muted-foreground mb-8 mt-4 leading-relaxed max-w-sm">
            We'll use your location to show you relevant alerts and updates in your area
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg py-6 gap-2 transition-all duration-200"
            >
              <MapPin className="w-4 h-4" />
              Allow Location
            </Button>
            <Button 
              variant="ghost"
              className="flex-1 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg py-6 transition-all duration-200"
            >
              Not now
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
