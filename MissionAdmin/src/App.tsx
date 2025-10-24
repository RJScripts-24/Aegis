import svgPaths from "./imports/svg-fxavcettkm";
import imgImageCityMap from "./assets/3cf4bb08d801cdb6a096514ccc6c6dae35dcd4d0.png";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { AlertTriangle, MapPin, Users, Clock, Radio, Send, Bell, Info, ShieldAlert, AlertCircle } from "lucide-react";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Checkbox } from "./components/ui/checkbox";

function Navigation({ onPrioritizeClick, onBroadcastClick }: { onPrioritizeClick: () => void; onBroadcastClick: () => void }) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  
  const menuItems = [
    { id: 'prioritize', label: 'Prioritize' },
    { id: 'broadcast', label: 'Broadcast Alert' },
    { id: 'logout', label: 'Log Out' }
  ];

  return (
    <div className="bg-[#0f0f0f] h-screen relative w-[280px] border-r border-[#2a2a2a]" data-name="Navigation">
      <div className="flex flex-col h-full p-8">
        {/* Logo/Brand Area */}
        <div className="mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="tracking-wider text-white">AEGIS</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(item.id);
                if (item.id === 'prioritize') {
                  onPrioritizeClick();
                } else if (item.id === 'broadcast') {
                  onBroadcastClick();
                }
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                activeItem === item.id
                  ? 'bg-[#2a2a2a] text-white'
                  : 'text-[#a0a0a0] hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer Info */}
        <div className="pt-6 border-t border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2a2a2a] rounded-full flex items-center justify-center">
              <span className="text-[#a0a0a0] text-xs">OP</span>
            </div>
            <div className="flex-1">
              <div className="text-sm text-white">Operator</div>
              <div className="text-xs text-[#666]">Online</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapSection() {
  // Emergency markers with lat/lng coordinates (example coordinates for a city)
  const emergencyMarkers = [
    { id: 1, position: [40.7489, -73.9680] as [number, number], location: 'Main St & Oak Ave', type: 'Fire Emergency', severity: 'critical' },
    { id: 2, position: [40.7505, -73.9734] as [number, number], location: 'Central Station', type: 'Medical Emergency', severity: 'critical' },
    { id: 3, position: [40.7520, -73.9690] as [number, number], location: 'Park Blvd near Elm', type: 'Traffic Accident', severity: 'high' },
    { id: 4, position: [40.7475, -73.9710] as [number, number], location: 'Harbor View District', type: 'Public Safety', severity: 'high' },
    { id: 5, position: [40.7495, -73.9650] as [number, number], location: 'Riverside Park', type: 'Evacuation', severity: 'medium' },
  ];

  // Create custom icon for emergency markers
  const createEmergencyIcon = (severity: string) => {
    const color = severity === 'critical' ? '#ef4444' : severity === 'high' ? '#f59e0b' : '#fbbf24';
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#shadow)">
            <path d="M16 0C9.4 0 4 5.4 4 12c0 8 12 28 12 28s12-20 12-28c0-6.6-5.4-12-12-12z" fill="${color}"/>
            <circle cx="16" cy="12" r="4" fill="white"/>
          </g>
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
            </filter>
          </defs>
        </svg>
      `)}`,
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
    });
  };

  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-[#2a2a2a]">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#2a2a2a]">
        <h2 className="text-[rgb(255,116,116)] tracking-wide">Mission Control Screen</h2>
      </div>

      {/* Interactive Map Container */}
      <div style={{ height: '420px', width: '100%', position: 'relative' }}>
        <MapContainer
          center={[40.7489, -73.9680]}
          zoom={14}
          style={{ height: '420px', width: '100%', backgroundColor: '#0a0a0a' }}
          zoomControl={true}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          {emergencyMarkers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={createEmergencyIcon(marker.severity)}
            >
              <Popup className="custom-popup">
                <div className="bg-[#1a1a1a] p-3 rounded-lg text-white min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className={`w-4 h-4 ${
                      marker.severity === 'critical' ? 'text-[#ef4444]' : 
                      marker.severity === 'high' ? 'text-[#f59e0b]' : 'text-[#fbbf24]'
                    }`} />
                    <span className={`text-xs font-semibold uppercase ${
                      marker.severity === 'critical' ? 'text-[#ef4444]' : 
                      marker.severity === 'high' ? 'text-[#f59e0b]' : 'text-[#fbbf24]'
                    }`}>
                      {marker.severity}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-1">{marker.type}</h3>
                  <p className="text-sm text-[#a0a0a0] flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {marker.location}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

function TriageFeed() {
  const incidents = [
    {
      id: 1,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
          <path d={svgPaths.p2cf60600} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </svg>
      ),
      location: 'Main St & Oak Ave',
      time: '5m ago',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
          <path d={svgPaths.p25397b80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p18406864} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2241fff0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </svg>
      ),
      location: 'Main St & Oak Ave',
      time: '5m ago',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 3,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
          <path d={svgPaths.p270c5f00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 7.5V10.8333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.1667H10.0083" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </svg>
      ),
      location: 'Park Blvd near Elm',
      time: '10m ago',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 4,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
          <path d={svgPaths.p2e0cc000} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </svg>
      ),
      location: '1km ago',
      time: '10m ago',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 5,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
          <path d={svgPaths.p382997c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2ad65a80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M7.5 14.1667H12.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3849af00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </svg>
      ),
      location: 'Riverside Park',
      time: '15m ago',
      status: 'assigned',
      priority: 'low'
    }
  ];

  const getStatusBadge = (status: string, priority: string) => {
    if (status === 'pending') {
      return (
        <span className={`px-3 py-1 rounded-md text-xs tracking-wide ${
          priority === 'high' 
            ? 'bg-[#ef4444]/20 text-[#f87171] border border-[#ef4444]/30' 
            : 'bg-[#f59e0b]/20 text-[#fbbf24] border border-[#f59e0b]/30'
        }`}>
          Pending
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-md text-xs bg-[#3d3d4f] text-[#a0a0a0] border border-[#4a4a5f] tracking-wide">
        Assigned
      </span>
    );
  };

  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-[#2a2a2a]">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#2a2a2a]">
        <h2 className="text-white tracking-wide">Live Triage Feed</h2>
      </div>

      {/* Incidents List */}
      <div className="divide-y divide-[#2a2a2a]">
        {incidents.map((incident) => (
          <div 
            key={incident.id}
            className="px-6 py-4 hover:bg-[#1f1f1f] transition-colors duration-150 cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className={`p-2 rounded-lg ${
                incident.priority === 'high' 
                  ? 'bg-[#ef4444]/10 text-[#f87171]'
                  : incident.priority === 'medium'
                  ? 'bg-[#f59e0b]/10 text-[#fbbf24]'
                  : 'bg-[#3d3d4f] text-[#a0a0a0]'
              }`}>
                {incident.icon}
              </div>

              {/* Location */}
              <div className="flex-1">
                <p className="text-[#e0e0e0] group-hover:text-white transition-colors">
                  {incident.location}
                </p>
              </div>

              {/* Time */}
              <div className="text-sm text-[#666]">
                {incident.time}
              </div>

              {/* Status Badge */}
              <div>
                {getStatusBadge(incident.status, incident.priority)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BroadcastDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [alertType, setAlertType] = useState('emergency');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const alertTypes = [
    {
      id: 'emergency',
      label: 'Emergency',
      icon: ShieldAlert,
      color: 'text-[#ef4444]',
      bgColor: 'bg-[#ef4444]/10',
      borderColor: 'border-[#ef4444]/30',
      description: 'Critical situation requiring immediate action',
      buttonText: 'Send Emergency Alert',
      buttonIcon: Send,
      buttonStyle: 'bg-[#ef4444] hover:bg-[#dc2626]'
    },
    {
      id: 'warning',
      label: 'Warning',
      icon: AlertTriangle,
      color: 'text-[#f59e0b]',
      bgColor: 'bg-[#f59e0b]/10',
      borderColor: 'border-[#f59e0b]/30',
      description: 'Important alert requiring attention',
      buttonText: 'Send Warning Alert',
      buttonIcon: Send,
      buttonStyle: 'bg-[#f59e0b] hover:bg-[#d97706]'
    },
    {
      id: 'info',
      label: 'Information',
      icon: Info,
      color: 'text-[#3b82f6]',
      bgColor: 'bg-[#3b82f6]/10',
      borderColor: 'border-[#3b82f6]/30',
      description: 'General information or updates',
      buttonText: 'Send Info Alert',
      buttonIcon: Send,
      buttonStyle: 'bg-[#3b82f6] hover:bg-[#2563eb]'
    },
    {
      id: 'advisory',
      label: 'Advisory',
      icon: Bell,
      color: 'text-[#8b5cf6]',
      bgColor: 'bg-[#8b5cf6]/10',
      borderColor: 'border-[#8b5cf6]/30',
      description: 'Guidance and recommendations',
      buttonText: 'Send Advisory Alert',
      buttonIcon: Send,
      buttonStyle: 'bg-[#8b5cf6] hover:bg-[#7c3aed]'
    }
  ];

  const handleSendBroadcast = () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setMessage('');
      setAlertType('emergency');
      onOpenChange(false);
    }, 2000);
  };

  const selectedType = alertTypes.find(t => t.id === alertType)!;
  const ButtonIcon = selectedType.buttonIcon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-[#1a1a1a] border-[#2a2a2a] text-white max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <div className="p-2 bg-[#6366f1]/10 rounded-lg">
              <Radio className="w-6 h-6 text-[#6366f1]" />
            </div>
            Broadcast Alert
          </DialogTitle>
          <DialogDescription className="text-[#a0a0a0]">
            Send emergency alerts and messages across all platforms
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto space-y-6 pr-2">
          {/* Alert Type Selection */}
          <div>
            <Label className="text-[#e0e0e0] mb-3 block">Alert Type</Label>
            <RadioGroup value={alertType} onValueChange={setAlertType}>
              <div className="grid grid-cols-2 gap-3">
                {alertTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <label
                      key={type.id}
                      className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        alertType === type.id
                          ? `${type.borderColor} ${type.bgColor}`
                          : 'border-[#2a2a2a] bg-[#0f0f0f] hover:border-[#3a3a3a]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={type.id} id={type.id} className="border-[#3a3a3a]" />
                        <Icon className={`w-5 h-5 ${type.color}`} />
                        <div className="flex-1">
                          <div className={`mb-1 ${alertType === type.id ? type.color : 'text-white'}`}>
                            {type.label}
                          </div>
                          <div className="text-xs text-[#666]">{type.description}</div>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </RadioGroup>
          </div>

          {/* Message Input */}
          <div>
            <Label htmlFor="message" className="text-[#e0e0e0] mb-3 block">
              Alert Message
            </Label>
            <Textarea
              id="message"
              placeholder="Enter your broadcast message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-[#666] focus:border-[#6366f1] resize-none"
            />
            <div className="mt-2 text-xs text-[#666]">
              <span>This message will be displayed on maps, alerts, and notification pages</span>
            </div>
          </div>

          {/* Preview */}
          {message && (
            <div>
              <Label className="text-[#e0e0e0] mb-3 block">Preview</Label>
              <div className={`rounded-lg border-2 ${selectedType.borderColor} ${selectedType.bgColor} p-4`}>
                <div className="flex items-start gap-3">
                  <selectedType.icon className={`w-5 h-5 ${selectedType.color} mt-0.5`} />
                  <div className="flex-1">
                    <div className={`mb-1 font-semibold ${selectedType.color}`}>
                      {selectedType.label}
                    </div>
                    <div className="text-[#e0e0e0]">{message}</div>
                    <div className="mt-2 text-xs text-[#666]">
                      Broadcasting to 7,800 people
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
          <div className="text-sm text-[#a0a0a0]">
            Broadcasting to all zones • 7,800 people
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onOpenChange(false)}
              className="px-6 py-2.5 rounded-lg border border-[#3a3a3a] text-[#a0a0a0] hover:bg-[#1f1f1f] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSendBroadcast}
              disabled={!message.trim() || isSending}
              style={{
                backgroundColor: !message.trim() || isSending
                  ? '#2a2a2a'
                  : alertType === 'emergency'
                  ? '#ef4444'
                  : alertType === 'warning'
                  ? '#f59e0b'
                  : alertType === 'info'
                  ? '#3b82f6'
                  : '#8b5cf6'
              }}
              className={`px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg ${
                !message.trim() || isSending
                  ? 'text-[#666] cursor-not-allowed'
                  : 'text-white'
              }`}
              onMouseEnter={(e) => {
                if (!message.trim() || isSending) return;
                const hoverColor = alertType === 'emergency'
                  ? '#dc2626'
                  : alertType === 'warning'
                  ? '#d97706'
                  : alertType === 'info'
                  ? '#2563eb'
                  : '#7c3aed';
                e.currentTarget.style.backgroundColor = hoverColor;
              }}
              onMouseLeave={(e) => {
                if (!message.trim() || isSending) return;
                const normalColor = alertType === 'emergency'
                  ? '#ef4444'
                  : alertType === 'warning'
                  ? '#f59e0b'
                  : alertType === 'info'
                  ? '#3b82f6'
                  : '#8b5cf6';
                e.currentTarget.style.backgroundColor = normalColor;
              }}
            >
              {isSending ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Broadcasting...
                </>
              ) : (
                <>
                  <ButtonIcon className="w-4 h-4" />
                  {selectedType.buttonText}
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function RedZoneDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [selectedZones, setSelectedZones] = useState<Set<number>>(new Set());
  const [rescueSent, setRescueSent] = useState(false);

  const redZones = [
    {
      id: 1,
      name: 'Downtown Financial District',
      severity: 'Critical',
      affected: 2400,
      address: 'Main St & Oak Ave intersection',
      time: '5m ago',
      type: 'Fire Emergency',
      units: 0
    },
    {
      id: 2,
      name: 'Central Station Area',
      severity: 'Critical',
      affected: 1800,
      address: 'Main St & Oak Ave',
      time: '5m ago',
      type: 'Structural Damage',
      units: 0
    },
    {
      id: 3,
      name: 'Riverside Park Zone',
      severity: 'High',
      affected: 1200,
      address: 'Park Blvd near Elm',
      time: '10m ago',
      type: 'Public Safety Alert',
      units: 2
    },
    {
      id: 4,
      name: 'East Harbor District',
      severity: 'High',
      affected: 950,
      address: 'Harbor View & 5th St',
      time: '10m ago',
      type: 'Evacuation Required',
      units: 1
    },
    {
      id: 5,
      name: 'Westside Residential',
      severity: 'Moderate',
      affected: 650,
      address: 'Riverside Park',
      time: '15m ago',
      type: 'Power Outage',
      units: 1
    }
  ];

  const toggleZone = (id: number) => {
    const newSelected = new Set(selectedZones);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedZones(newSelected);
  };

  const handleSendRescue = () => {
    setRescueSent(true);
    setTimeout(() => {
      setRescueSent(false);
      setSelectedZones(new Set());
    }, 3000);
  };

  const totalAffected = redZones.reduce((sum, zone) => sum + zone.affected, 0);
  const criticalZones = redZones.filter(z => z.severity === 'Critical').length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-[#1a1a1a] border-[#2a2a2a] text-white max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <div className="p-2 bg-[#ef4444]/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-[#ef4444]" />
            </div>
            Priority Red Zones
          </DialogTitle>
          <DialogDescription className="text-[#a0a0a0]">
            Active emergency zones requiring immediate attention
          </DialogDescription>
        </DialogHeader>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="bg-[#0f0f0f] rounded-lg p-4 border border-[#2a2a2a]">
            <div className="flex items-center gap-2 text-[#666] text-sm mb-1">
              <MapPin className="w-4 h-4" />
              Total Zones
            </div>
            <div className="text-2xl text-[rgb(178,94,8)]">{redZones.length}</div>
          </div>
          <div className="bg-[#0f0f0f] rounded-lg p-4 border border-[#2a2a2a]">
            <div className="flex items-center gap-2 text-[#666] text-sm mb-1">
              <AlertTriangle className="w-4 h-4" />
              Critical
            </div>
            <div className="text-2xl text-[#ef4444]">{criticalZones}</div>
          </div>
          <div className="bg-[#0f0f0f] rounded-lg p-4 border border-[#2a2a2a]">
            <div className="flex items-center gap-2 text-[#666] text-sm mb-1">
              <Users className="w-4 h-4" />
              Affected
            </div>
            <div className="text-2xl text-[rgb(200,166,102)]">{totalAffected.toLocaleString()}</div>
          </div>
        </div>

        {/* Red Zones List */}
        <div className="flex-1 overflow-auto space-y-3 pr-2">
          {redZones.map((zone) => (
            <div
              key={zone.id}
              onClick={() => toggleZone(zone.id)}
              className={`bg-[#0f0f0f] rounded-lg p-4 border cursor-pointer transition-all duration-200 ${
                selectedZones.has(zone.id)
                  ? 'border-[#6366f1] bg-[#6366f1]/5'
                  : 'border-[#2a2a2a] hover:border-[#3a3a3a]'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  selectedZones.has(zone.id)
                    ? 'bg-[#6366f1] border-[#6366f1]'
                    : 'border-[#3a3a3a]'
                }`}>
                  {selectedZones.has(zone.id) && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-white mb-1">{zone.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-[#a0a0a0]">
                        <MapPin className="w-3 h-3" />
                        {zone.address}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-md text-xs ${
                        zone.severity === 'Critical'
                          ? 'bg-[#ef4444]/20 text-[#f87171] border border-[#ef4444]/30'
                          : zone.severity === 'High'
                          ? 'bg-[#f59e0b]/20 text-[#fbbf24] border border-[#f59e0b]/30'
                          : 'bg-[#3d3d4f] text-[#a0a0a0] border border-[#4a4a5f]'
                      }`}>
                        {zone.severity}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-[#666]">
                        <Clock className="w-3 h-3" />
                        {zone.time}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-[#666]">Type:</span>
                      <span className="text-[#e0e0e0]">{zone.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#666]">Affected:</span>
                      <span className="text-[#e0e0e0]">{zone.affected.toLocaleString()} people</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#666]">Units:</span>
                      <span className={zone.units > 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}>
                        {zone.units} deployed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
          <div className="text-sm text-[#a0a0a0]">
            {selectedZones.size > 0 ? (
              <span>{selectedZones.size} zone{selectedZones.size > 1 ? 's' : ''} selected</span>
            ) : (
              <span>Select zones to deploy rescue teams</span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onOpenChange(false)}
              className="px-6 py-2.5 rounded-lg border border-[#3a3a3a] text-[#a0a0a0] hover:bg-[#1f1f1f] hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSendRescue}
              disabled={selectedZones.size === 0 || rescueSent}
              className={`px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                selectedZones.size === 0 || rescueSent
                  ? 'bg-[#2a2a2a] text-[#666] cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white hover:shadow-lg hover:shadow-[#ef4444]/20'
              }`}
            >
              {rescueSent ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Dispatching...
                </>
              ) : (
                <>
                  <Users className="w-4 h-4" />
                  Send Rescue Teams
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function App() {
  const [prioritizeDialogOpen, setPrioritizeDialogOpen] = useState(false);
  const [broadcastDialogOpen, setBroadcastDialogOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0a0a] font-['Inter',_system-ui,_-apple-system,_sans-serif]">
      <Navigation 
        onPrioritizeClick={() => setPrioritizeDialogOpen(true)}
        onBroadcastClick={() => setBroadcastDialogOpen(true)}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8 space-y-6 max-w-[1400px]">
          <MapSection />
          <TriageFeed />
        </div>
      </div>

      <RedZoneDialog open={prioritizeDialogOpen} onOpenChange={setPrioritizeDialogOpen} />
      <BroadcastDialog open={broadcastDialogOpen} onOpenChange={setBroadcastDialogOpen} />
    </div>
  );
}
