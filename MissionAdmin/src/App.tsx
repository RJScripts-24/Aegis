import svgPaths from "./imports/svg-fxavcettkm";
import imgImageCityMap from "figma:asset/3cf4bb08d801cdb6a096514ccc6c6dae35dcd4d0.png";
import { useState } from "react";
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
  const markers = [
    { id: 1, left: '33.1%', top: '43%' },
    { id: 2, left: '23.2%', top: '116%' },
    { id: 3, left: '53.2%', top: '79%' },
    { id: 4, left: '68.2%', top: '61%' },
    { id: 5, left: '63.2%', top: '134%' }
  ];

  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-[#2a2a2a]">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#2a2a2a]">
        <h2 className="text-[rgb(255,116,116)] tracking-wide">Mission Control Screen</h2>
      </div>

      {/* Map Container */}
      <div className="relative h-[320px] overflow-hidden">
        <img 
          alt="City Map" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          src={imgImageCityMap} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.4)]" />
        
        {/* Alert Markers */}
        {markers.map((marker) => (
          <div key={marker.id} className="absolute" style={{ left: marker.left, top: marker.top }}>
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-[#ef4444] rounded-full opacity-30 animate-ping" />
              <svg className="w-10 h-10 drop-shadow-lg" fill="none" viewBox="0 0 46 53">
                <g filter="url(#filter0_d)">
                  <path d={svgPaths.pa2b0e00} fill="#ef4444" stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
                  <path d={svgPaths.p2963bb00} fill="#ef4444" stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="56" id="filter0_d" width="56" x="-5" y="-1.66667">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="4" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border-2 border-[#ef4444] rounded-full" />
            </div>
          </div>
        ))}
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
  const [targetZones, setTargetZones] = useState<Set<string>>(new Set(['all']));
  const [isSending, setIsSending] = useState(false);

  const zones = [
    { id: 'all', name: 'All Zones', count: 7800 },
    { id: 'downtown', name: 'Downtown Financial District', count: 2400 },
    { id: 'central', name: 'Central Station Area', count: 1800 },
    { id: 'riverside', name: 'Riverside Park Zone', count: 1200 },
    { id: 'harbor', name: 'East Harbor District', count: 950 },
    { id: 'westside', name: 'Westside Residential', count: 650 }
  ];

  const alertTypes = [
    {
      id: 'emergency',
      label: 'Emergency',
      icon: ShieldAlert,
      color: 'text-[#ef4444]',
      bgColor: 'bg-[#ef4444]/10',
      borderColor: 'border-[#ef4444]/30',
      description: 'Critical situation requiring immediate action'
    },
    {
      id: 'warning',
      label: 'Warning',
      icon: AlertTriangle,
      color: 'text-[#f59e0b]',
      bgColor: 'bg-[#f59e0b]/10',
      borderColor: 'border-[#f59e0b]/30',
      description: 'Important alert requiring attention'
    },
    {
      id: 'info',
      label: 'Information',
      icon: Info,
      color: 'text-[#3b82f6]',
      bgColor: 'bg-[#3b82f6]/10',
      borderColor: 'border-[#3b82f6]/30',
      description: 'General information or updates'
    },
    {
      id: 'advisory',
      label: 'Advisory',
      icon: Bell,
      color: 'text-[#8b5cf6]',
      bgColor: 'bg-[#8b5cf6]/10',
      borderColor: 'border-[#8b5cf6]/30',
      description: 'Guidance and recommendations'
    }
  ];

  const toggleZone = (zoneId: string) => {
    const newTargets = new Set(targetZones);
    
    if (zoneId === 'all') {
      if (newTargets.has('all')) {
        newTargets.clear();
      } else {
        newTargets.clear();
        newTargets.add('all');
      }
    } else {
      newTargets.delete('all');
      if (newTargets.has(zoneId)) {
        newTargets.delete(zoneId);
      } else {
        newTargets.add(zoneId);
      }
    }
    
    setTargetZones(newTargets);
  };

  const handleSendBroadcast = () => {
    if (!message.trim() || targetZones.size === 0) return;
    
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setMessage('');
      setTargetZones(new Set(['all']));
      onOpenChange(false);
    }, 2000);
  };

  const selectedType = alertTypes.find(t => t.id === alertType)!;
  const totalAffected = targetZones.has('all') 
    ? zones[0].count 
    : Array.from(targetZones).reduce((sum, id) => {
        const zone = zones.find(z => z.id === id);
        return sum + (zone?.count || 0);
      }, 0);

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
            <div className="mt-2 text-xs text-[#666] flex justify-between">
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
                    <div className={`mb-1 ${selectedType.color}`}>
                      {selectedType.label}
                    </div>
                    <div className="text-[#e0e0e0]">{message}</div>
                    <div className="mt-2 text-xs text-[#666]">
                      Broadcasting to {totalAffected.toLocaleString()} people
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
            {targetZones.size > 0 ? (
              <span>
                Broadcasting to {targetZones.has('all') ? 'all zones' : `${targetZones.size} zone${targetZones.size > 1 ? 's' : ''}`}
                {' • '}
                {totalAffected.toLocaleString()} people
              </span>
            ) : (
              <span>Select at least one target zone</span>
            )}
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
              disabled={!message.trim() || targetZones.size === 0 || isSending}
              className={`px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                !message.trim() || targetZones.size === 0 || isSending
                  ? 'bg-[#2a2a2a] text-[#666] cursor-not-allowed'
                  : alertType === 'emergency'
                  ? 'bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white hover:shadow-lg hover:shadow-[#ef4444]/20'
                  : alertType === 'warning'
                  ? 'bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white hover:shadow-lg hover:shadow-[#f59e0b]/20'
                  : alertType === 'info'
                  ? 'bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white hover:shadow-lg hover:shadow-[#3b82f6]/20'
                  : 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white hover:shadow-lg hover:shadow-[#8b5cf6]/20'
              }`}
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
                  <Send className="w-4 h-4" />
                  Send Broadcast
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
