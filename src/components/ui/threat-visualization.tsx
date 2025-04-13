import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface ThreatVisualizationProps {
  showLiveDemo?: boolean;
}

// Mock locations for threat simulation
const LOCATIONS = [
  { lat: 37.7749, lng: -122.4194, name: "San Francisco", country: "United States" },
  { lat: 40.7128, lng: -74.0060, name: "New York", country: "United States" },
  { lat: 51.5074, lng: -0.1278, name: "London", country: "United Kingdom" },
  { lat: 35.6762, lng: 139.6503, name: "Tokyo", country: "Japan" },
  { lat: 22.3193, lng: 114.1694, name: "Hong Kong", country: "China" },
  { lat: 55.7558, lng: 37.6173, name: "Moscow", country: "Russia" },
  { lat: -33.8688, lng: 151.2093, name: "Sydney", country: "Australia" },
  { lat: 19.4326, lng: -99.1332, name: "Mexico City", country: "Mexico" },
  { lat: -23.5505, lng: -46.6333, name: "São Paulo", country: "Brazil" },
  { lat: 28.6139, lng: 77.2090, name: "New Delhi", country: "India" },
  { lat: 37.5665, lng: 126.9780, name: "Seoul", country: "South Korea" },
];

// Mock threat types
const THREAT_TYPES = [
  { type: "Code Scraping", color: "#6366F1" }, // Indigo
  { type: "Design Copy", color: "#EC4899" }, // Pink
  { type: "Document Theft", color: "#10B981" }, // Emerald
  { type: "NFT Duplication", color: "#F59E0B" }, // Amber
];

// Convert lat/lng to x/y coordinates on a 2D projection of a globe
const projectLatLngToXY = (lat: number, lng: number, width: number, height: number) => {
  // Simple equirectangular projection
  const x = (lng + 180) * (width / 360);
  const y = (90 - lat) * (height / 180);
  return { x, y };
};

export function ThreatVisualization({ showLiveDemo = false }: ThreatVisualizationProps) {
  const [threats, setThreats] = useState<any[]>([]);
  const [latestThreat, setLatestThreat] = useState<any | null>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 250 });

  // Generate a random threat
  const generateRandomThreat = () => {
    const sourceLocation = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    const threatType = THREAT_TYPES[Math.floor(Math.random() * THREAT_TYPES.length)];

    const threat = {
      id: Date.now(),
      source: {
        ...sourceLocation,
        ...projectLatLngToXY(sourceLocation.lat, sourceLocation.lng, dimensions.width, dimensions.height)
      },
      type: threatType.type,
      color: threatType.color,
      timestamp: new Date().toISOString(),
      similarity: Math.floor(Math.random() * 40) + 60, // 60-99% similarity
    };

    return threat;
  };

  // Effect to update dimensions on mount and window resize
  useEffect(() => {
    const updateDimensions = () => {
      const width = Math.min(500, window.innerWidth - 40);
      setDimensions({ width, height: width / 2 });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Effect to generate random threats
  useEffect(() => {
    if (!showLiveDemo) return;

    // Initial threats
    const initialThreats = Array.from({ length: 5 }, () => generateRandomThreat());
    setThreats(initialThreats);

    // Add new threats periodically
    const interval = setInterval(() => {
      const newThreat = generateRandomThreat();
      setLatestThreat(newThreat);
      setThreats(prev => {
        const updated = [...prev, newThreat];
        if (updated.length > 20) {
          updated.shift(); // Remove oldest if we have too many
        }
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [showLiveDemo, dimensions]);

  return (
    <Card className="p-4 relative bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Global Threat Monitor</h3>
        {showLiveDemo && (
          <div className="flex items-center">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs font-medium text-gray-300">LIVE</span>
          </div>
        )}
      </div>

      <div
        className="relative border border-gray-700 rounded-lg bg-gray-900 overflow-hidden"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        {/* World Map Outline */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTA2LDIzNiBsLTMsMCAtMiwxIC04LDEgLTIsLTEgLTQsLTEgLTUsMSAtNCwtMSAtMTMsLTMgLTEwLC04IC0xLC0yIC0yNywtMTQgLTgsLTIgLTgsMSAtOCw0IC00LDAgLTQsLTIgLTMsLTMgLTIsLTQgMCwtNiAyLC00IDQsLTYgMCwtNiAtMSwtMSAtNCwwIC0xLC0yIDAsLTMgLTIsLTQgLTcsLTQgLTMsLTYgLTQsLTQgLTUsLTIgLTMsLTQgLTYsLTIgLTcsLTYgLTUsLTEgLTUsLTQgLTQsLTEgLTQsLTQgLTYsLTMgLTMsLTQgLTQsLTMgLTQsLTEgLTMsLTQgLTQsLTIgLTQsLTEgLTUsMCAtNCwyIC01LDEgLTUsMCAtNCwtMiAtNSwwIC02LDMgLTMsMSAtNiwwIC00LC0yIC0zLC0zIC00LDIgLTMsLTEgLTcsMCAtNCwyIC00LDAgLTMsLTEgLTIsLTQgLTIsLTEgLTUsMCAtMjIsMTAgLTEwLDIgLTgsLTEgLTEwLC0zIC03LC00IC0xLC0xIDAsLTcgLTYsLTcgMCwtMiAyLC0zIDMsLTIgMCwtMyAtMSwtMiAtMiwtMSAxLC0zIDEsLTggMiwtMyA0LC0zIDMsLTEgNCwtMyAyLC0zIDE2LC0yMyA1LC01IDIsLTUgLTEsLTUgLTgsLTExIC0xMCwtMjEgLTUsLTUgLTEsLTQgMCwtNSAyLC0zIDYsLTUgMywtNCAyLC01IDQsLTEwIDgsLTEwIDQsLTkgNSwtMyA1LC01IDIsLTQgMiwtMTYgMCwtNiAtMiwtNCAtMywtMyAtOSwtNCAtNiwtNiAtMiwtNSAwLC01IDEsLTQgLTEsLTIgLTUsLTUgLTIsLTQgMCwtNSAxLC00IC0xLC0yIC02LC00IC0zLC01IC0xLC00IDAsLTUgMiwtNCAxMCwtOSA0LC0xIDEsLTEgMiwtNCAtMSwtNSAtNCwtNCAtMSwtMiAwLC0zIDIsLTQgLTEsLTMgLTMsLTIgMCwtNiAtMiwtNiAtNCwtNSAtMSwtNSAxLC01IDQsLTQgMiwtNSAxLC0yIDQsLTIgNCwtNSA0LC0yIDIsLTMgMCwtNCAtMiwtNSAtNCwtMiAtOCwxIC00LC0xIC00LC0zIC00LC0xMCAtMiwtMiAtNSwtMSAtOCwxIC00LDAgLTMsLTIgLTIsLTIgLTQsLTIgLTEsLTEgLTgsLTEgLTEsLTEgLTUsLTQgLTIsLTEgLTQsLTYgLTQsLTIgLTQsLTUgLTEsLTQgMCwtNyAtMiwtNSAtNSwtNyAtMiwtNSAtMiwtNyAwLC0xMSAyLC00IDEwLC0xMCAxNiwtMTEgNSwtMiA1LC00IDcsLTMgNSwtMSA0LC00IDYsLTIgNiwtMSA0LDAgNSwtMSA2LC0zIDUsLTEgNiwxIDUsMiA1LDQgNSwyIDQsMCA0LC0yIDMsLTMgNCwtMiA4LDAgOCw0IDYsMiAxMCwxIDQsMSAxMCwxIDQsMyAzLDIgOCwxIDQsLTEgMywtMiA0LC0xIDgsLTYgMTMsLTQgNSwtMyAxMCwtMyA1LC0zIDUsMCA3LDIgOCwtMSA3LDAgOSwtMSAxMCwwIDEwLDQgNiwwIDQsLTEgNSwwIDUsMyA0LDYgNCwzIDgsMiA0LDAgNCwtMyA1LC0xNiAxLC0zIDQsLTQgNSwtNCA0LC0yIDksLTEgOCwxIDQsLTEgMTEsLTggNywtNCA4LC0xIDMsMSA0LDQgMyw0IDIsMSA2LC00IDYsMCA0LC0yIDQsMCA0LDMgNSwwIDMsLTEgOCw1IDEyLDIgOCw0IDksMSA1LDAgNiwxIDYsNCAxMCw0IDUsLTEgOSw0IDksMSA1LDIgNCwzIDQsNiAyLDQgMCw0IC0yLDcgMiw2IC0zLDQgLTEsNiAxLDQgLTIsMyAtNSwyIC0zLDIgLTMsNCAtMSw0IC0yLDQgLTgsOCAtMyw0IDAsMTggMSw0IDMsNCA0LDIgNCwwIDQsLTIgNSwwIDQsMyAxLDIgMCw2IC02LDMgLTEsNSA0LDYgMiw2IDQsNSA1LDIgMTAsLTIgNCwtNCAxMCwtMiA1LDEgMTIsNiA2LDUgMTIsMiA0LDAgMTQsLTMgNCwtMyA0LC0yIDEwLDAgNCwtMSA0LC0zIDMsLTIgNSwwIDMsMyAzLDEgNCwtMiA0LDAgMTAsMSAxMCwzIDgsLTEgMTYsLTEwIDQsLTEgNCwwIDMsLTIgLTMsLTYgMCwtNSAxLC01IDMsLTIgNSwtNSAyLC00IDgsLTkgMiwtNiAxLC0xMCAxLC0zIDIsLTQgNiwtNiAyLC0zIDcsLTQgMiwtMiAxLC00IDIsLTMgOCwtNiA0LC0yIDQsLTQgNSwtMiA1LC00IDQsLTEgOSwxIDQsLTEgMTAsLTggNSwtMiA0LC0xIDQsMSA0LC0xIDMsLTIgNiwtMSA0LDAgNCwtMiA1LC0xIDQsMSA0LC0yIDQsMCA1LDEgNSwzIDQsMSAxMywxIDQsLTEgNCwtMiAzLC0xIDcsMyA0LDAgNSwtMiA4LDIgNCwwIDMsLTEgNCwtNCA0LC0yIDQsLTEgNCwwIDEwLDMgOCwxIDQsLTEgNSwtMyA0LC0xIDQsMCA1LDEgNSwtMSA0LDAgNCwtMiA0LDIgNSwxIDQsLTEgNCwtMyA4LC0zIDQsLTEgNCwyIDMsMiAxMCwtMiA2LDEgNSwtMiA0LC0zIDQsLTEgOCwxIDQsLTEgMTQsLTcgNywtMiA0LDAgNywzIDQsMCA0LC0xIDgsLTUgNCwtMSA0LDAgNywyIDQsLTEgNSwtMyA0LC0xIDQsMSA0LDMgOCw0IDQsMSA0LC0xIDEzLC03IDEyLC0zIDgsLTQgOCwtMiA4LDEgOCw4IDYsMyA0LDQgMiw0IC0xLDkgLTMsNCAtMTQsMTQgLTEsNSAwLDYgMyw1IDQsMiA2LC0xIDQsLTMgNCwtMiA0LDEgNCw3IDQsNSAwLDQgLTEsMTAgLTIsNyAwLDQgMSwyIDMsMSA1LC0xIDEwLDQgNCwwIDQsLTEgOCwxIDEwLDYgNSw0IDQsMSA0LC0yIDQsLTEgNCwxIDMsNSAzLDMgMTAsNiA4LDIgOCwtMSA5LC0zIDEwLC0yIDEzLDMgMyw2IDQsNCA0LDAgNSwyIDQsMSA4LC0xIDQsLTIgNCwtMSA0LDEgOCw2IDQsNSA4LDQgLTIsMTQgLTMsNyAtNiw4IC0yLDQgLTIsNiAtMSw0IC0zLDEyIC0yLDMgLTQsMiAtMyw0IC0yLDMgLTEsMTYgLTEsMTQgLTEsMyAtMyw4IC0zLDMgLTUsMyAtMiwzIC0yLDYgLTMsMiAwLDMgNCwzIDksLTIgNiw0IDUsMiA0LDMgNSw2IDQsNCAxLDMgMCw0IC0xLDQgLTMsNCAtNyw0IC02LC0xIC02LDAgLTYsMyAtNSwtMSAtNCwtMyAtOCwtMiAtNSwwIC04LDIgLTQsNCAtNCwxIC0zLC0xIC00LC0yIC00LDEgLTQsMiAtNSwwIC01LC0xIC00LDEgLTQsMiAtMTEsMiAtOCwwIC05LC0yIC05LC01IC0yLC0zIC03LC0zIC00LC0zIC01LC0xIC01LDEgLTQsMSAtNSwtMSAtOCwtMyAtOCwwIC01LDIgLTgsNSAtNCwyIC00LDEgLTQsLTIgLTQsLTQgLTQsLTEgLTUsMCAtNSwyIC0zLC0yIC0zLC0zIC0zLC0xIC00LDEgLTQsLTEgLTUsLTMgLTgsLTEgLTcsLTIgLTQsLTIgLTQsLTMgLTksLTIgLTUsMCAtOCwxIC00LDEgLTUsMCAtNCwtMiAtNSwtMSAtOCwzIC01LC0xIC00LC0yIC00LDAgLTQsMyAtOCwyIC00LDEgLTMsLTEgLTgsLTIgLTgsNCAtNSwxIC00LC0xIC00LC0yIC01LDAgLTQsMyAtMiwzIC00LDEgLTUsLTIgLTQsLTEgLTQsMCAtNSw0IC00LDEgLTQ0LDAgLTQsLTEiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')] bg-no-repeat bg-center"></div>

        {/* Attack lines */}
        {threats.map(threat => (
          <motion.div
            key={threat.id}
            className="absolute"
            style={{
              top: 0,
              left: 0,
              width: dimensions.width,
              height: dimensions.height,
              opacity: 0.7,
            }}
          >
            <svg width={dimensions.width} height={dimensions.height}>
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                x1={dimensions.width / 2}
                y1={dimensions.height / 2}
                x2={threat.source.x}
                y2={threat.source.y}
                stroke={threat.color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeDasharray="5,5"
              />
            </svg>
          </motion.div>
        ))}

        {/* Threat points */}
        {threats.map(threat => (
          <motion.div
            key={`point-${threat.id}`}
            className="absolute rounded-full"
            style={{
              top: threat.source.y - 4,
              left: threat.source.x - 4,
              backgroundColor: threat.color,
              width: 8,
              height: 8,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                top: 0,
                left: 0,
                backgroundColor: threat.color,
                width: '100%',
                height: '100%',
              }}
              animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        ))}

        {/* Central point representing your IP assets */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <motion.div
            className="absolute inset-0 bg-blue-500 rounded-full"
            animate={{ scale: [1, 2], opacity: [0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Latest threat alert */}
      {latestThreat && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3 bg-gray-800 border border-gray-700 rounded-md p-2 text-xs"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: latestThreat.color }}
              ></div>
              <span className="font-medium">{latestThreat.type} detected</span>
            </div>
            <span className="text-gray-400 text-xs">{new Date(latestThreat.timestamp).toLocaleTimeString()}</span>
          </div>
          <div className="mt-1 flex justify-between">
            <span className="text-gray-400">
              {latestThreat.source.name}, {latestThreat.source.country}
            </span>
            <span className="text-amber-400 font-medium">{latestThreat.similarity}% match</span>
          </div>
        </motion.div>
      )}
    </Card>
  );
}
