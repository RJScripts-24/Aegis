import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ImmersiveMap } from './components/ImmersiveMap';
import { LayersPanel } from './components/LayersPanel';
import { AlertCircle, Camera, Layers, Locate } from 'lucide-react';
import { toast } from 'sonner';

interface Layer {
  id: string;
  label: string;
  icon: React.ReactNode;
  enabled: boolean;
}

export default function App() {
  const [isSafe, setIsSafe] = useState(true);
  const [showLayersPanel, setShowLayersPanel] = useState(false);
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: 'alerts',
      label: 'Alerts',
      icon: <div className="w-4 h-4 rounded-full bg-[#fb2c36]" />,
      enabled: true
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: <div className="w-4 h-4 rounded-full bg-[#ff6900]" />,
      enabled: true
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: <div className="w-4 h-4 rounded-full bg-[#d1d5dc]" />,
      enabled: true
    },
    {
      id: 'shelters',
      label: 'Shelters',
      icon: <div className="w-4 h-4 rounded-full bg-[#3be096]" />,
      enabled: true
    },
    {
      id: 'time',
      label: 'Filter by Time',
      icon: <div className="w-4 h-4 rounded-full bg-[#5126d2]" />,
      enabled: true
    }
  ]);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // San Francisco coordinates - using real lat/lng
  const mapCenter: [number, number] = [37.7749, -122.4194];

  const markers = [
    {
      id: '1',
      type: 'alert' as const,
      lat: 37.7849,
      lng: -122.4294,
      title: 'Critical Alert',
      description: 'Severe weather warning in effect.',
      time: '15 minutes ago',
      location: 'Downtown District'
    },
    {
      id: '2',
      type: 'alert' as const,
      lat: 37.7949,
      lng: -122.4094,
      title: 'Emergency Alert',
      description: 'Flooding reported in low-lying areas.',
      time: '32 minutes ago',
      location: 'Riverside Area'
    },
    {
      id: '3',
      type: 'alert' as const,
      lat: 37.7649,
      lng: -122.4394,
      title: 'Safety Alert',
      description: 'Power outage affecting multiple neighborhoods.',
      time: '45 minutes ago',
      location: 'South District'
    },
    {
      id: '4',
      type: 'report' as const,
      lat: 37.7749,
      lng: -122.4094,
      title: 'Incident Report',
      description: 'Traffic disruption due to road closure.',
      time: '1 hour ago',
      location: 'Central Highway'
    },
    {
      id: '5',
      type: 'report' as const,
      lat: 37.7549,
      lng: -122.4194,
      title: 'Status Report',
      description: 'Medical emergency response in progress.',
      time: '2 hours ago',
      location: 'Medical Center Zone'
    },
    {
      id: 'location',
      type: 'location' as const,
      lat: 37.7749,
      lng: -122.4194,
      title: 'Your Location',
      description: 'You are currently here',
      time: 'Now',
      location: 'Current Position'
    }
  ];

  const filteredMarkers = markers.filter(marker => {
    if (marker.type === 'location') return true;
    // If user is in danger mode, show all alerts
    if (!isSafe) return true;
    // Otherwise filter by layer settings
    if (marker.type === 'alert' && layers.find(l => l.id === 'alerts')?.enabled) return true;
    if (marker.type === 'report' && layers.find(l => l.id === 'reports')?.enabled) return true;
    return false;
  });

  const handleLayerToggle = (id: string) => {
    setLayers(prev =>
      prev.map(layer =>
        layer.id === id ? { ...layer, enabled: !layer.enabled } : layer
      )
    );
  };

  const handleMarkSafe = () => {
    setIsSafe(!isSafe);
    if (isSafe) {
      toast.error('Status changed to: I Am In Danger', {
        description: 'All emergency alerts are now visible. Help is on the way.'
      });
    } else {
      toast.success('Status changed to: I Am Safe', {
        description: 'Your status has been updated and shared with emergency services.'
      });
    }
  };

  const handleReportIncident = () => {
    toast.info('Report Incident', {
      description: 'Opening incident report form...'
    });
  };

  const handleEmergencyContacts = () => {
    toast.info('Emergency Contacts', {
      description: 'Loading emergency contact information...'
    });
  };

  const handleViewGuide = () => {
    toast.info('Safety Guide', {
      description: 'Opening disaster safety guide...'
    });
  };

  const handleLocateMe = () => {
    toast.info('Locating...', {
      description: 'Finding your current location...'
    });
    // You can add actual geolocation logic here later
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AnimatePresence mode="wait">
        {!showLayersPanel ? (
          /* Section 1: Full Screen Map View with Map Layers Button */
          <motion.div 
            key="fullmap"
            className="w-screen h-screen fixed inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
              <ImmersiveMap
                markers={filteredMarkers}
                showControls={true}
                center={mapCenter}
                zoom={13}
              />
              
              {/* Map Layers Button */}
              <motion.button
                onClick={() => setShowLayersPanel(true)}
                className="absolute top-4 left-4 z-[1000] px-4 py-2 rounded-lg backdrop-blur-xl bg-white/90 shadow-lg hover:bg-white transition-all flex items-center gap-2 border border-white/20"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Layers className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">Map Layers</span>
              </motion.button>

              {/* Current Location Button */}
              <motion.button
                onClick={handleLocateMe}
                className="absolute top-4 right-4 z-[1000] w-10 h-10 rounded-lg backdrop-blur-xl bg-white/90 shadow-lg hover:bg-white transition-all flex items-center justify-center border border-white/20"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Locate className="w-5 h-5 text-gray-700" />
              </motion.button>
          </motion.div>
        ) : (
          /* Section 2: Split View - Control Panel + Map with Actions */
          <motion.div 
            key="splitview"
            className="w-screen h-screen fixed inset-0"
            style={{ 
              display: 'grid',
              gridTemplateColumns: '320px 1fr'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
              {/* Left: Control Panel */}
              <motion.div 
                className="h-full bg-[#151010] overflow-y-auto"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1
                }}
              >
                <LayersPanel
                  layers={layers}
                  onLayerToggle={handleLayerToggle}
                  onEmergencyContacts={handleEmergencyContacts}
                  onViewGuide={handleViewGuide}
                />
              </motion.div>

              {/* Right: Map with Action Buttons */}
              <motion.div 
                className="relative h-full"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2
                }}
              >
                <ImmersiveMap
                  markers={filteredMarkers}
                  showControls={true}
                  center={mapCenter}
                  zoom={13}
                />
                
                {/* Close Button */}
                <motion.button
                  onClick={() => setShowLayersPanel(false)}
                  className="absolute top-4 left-4 z-[1000] w-10 h-10 rounded-lg backdrop-blur-xl bg-white/90 shadow-lg hover:bg-white transition-all flex items-center justify-center border border-white/20"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Current Location Button */}
                <motion.button
                  onClick={handleLocateMe}
                  className="absolute top-4 right-4 z-[1000] w-10 h-10 rounded-lg backdrop-blur-xl bg-white/90 shadow-lg hover:bg-white transition-all flex items-center justify-center border border-white/20"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Locate className="w-5 h-5 text-gray-700" />
                </motion.button>
                
                {/* Action Buttons - Positioned at bottom */}
                <motion.div 
                  className="absolute bottom-4 left-4 right-4 flex gap-3 z-[1000]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: 'easeOut',
                    delay: 0.5
                  }}
                >
                  <motion.button
                    onClick={handleReportIncident}
                    className="flex-1 h-12 px-4 rounded-lg bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <Camera className="w-4 h-4" />
                    Report an Incident
                  </motion.button>
                  <motion.button
                    onClick={handleMarkSafe}
                    className="flex-1 h-12 px-4 rounded-lg bg-[#00c950] text-black hover:bg-[#00b548] transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <AlertCircle className="w-4 h-4" />
                    I Am Safe
                  </motion.button>
                </motion.div>
              </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
