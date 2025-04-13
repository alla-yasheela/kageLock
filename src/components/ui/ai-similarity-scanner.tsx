import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye, Search, AlertCircle, Loader2, CheckCircle, Globe, Github, Image as ImageIcon } from "lucide-react";

interface AISimilarityScannerProps {
  assetId?: string;
  assetName?: string;
  assetType?: 'code' | 'image' | 'document';
  onMatchFound?: (match: any) => void;
  demoMode?: boolean;
}

// Mock platforms for scanning
const PLATFORMS = [
  { id: 'github', name: 'GitHub', icon: <Github className="h-4 w-4" /> },
  { id: 'twitter', name: 'X/Twitter', icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg> },
  { id: 'behance', name: 'Behance', icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8,9.874H5.038V7.937H7.8a0.97,0.97,0,0,1,.968.97A0.968,0.968,0,0,1,7.8,9.874ZM7.8,11.966H5.038v2.094H7.8a1.047,1.047,0,0,0,0-2.094ZM18.2,10.254a2.406,2.406,0,0,0-2.331,1.647H14.73V10.254ZM7.8,6A3.911,3.911,0,0,0,3.947,9.874v4.188A3.943,3.943,0,0,0,7.8,18.062h4.392V6Zm8.2,5.874a1.543,1.543,0,0,1,3.078,0ZM24,12a12,12,0,1,1-12-12A12,12,0,0,1,24,12ZM18.2,8.537h3.263V7.433H18.2ZM19.768,14.055c-0.077.109-.153,0.22-0.232,0.328h3.592V13.3a3.81,3.81,0,0,0-3.9-3.865A3.83,3.83,0,0,0,15.337,13.3a3.828,3.828,0,0,0,3.9,3.865,3.864,3.864,0,0,0,3.62-2.336H20.917A2.047,2.047,0,0,1,19.768,14.055Z"></path></svg> },
  { id: 'pinterest', name: 'Pinterest', icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12 0 5.018 3.061 9.336 7.419 11.174-.099-.851-.186-2.156.039-3.084.217-.84 1.397-5.358 1.397-5.358s-.356-.713-.356-1.767c0-1.657.96-2.893 2.153-2.893 1.014 0 1.504.762 1.504 1.673 0 1.019-.653 2.542-.986 3.954-.28 1.181.592 2.148 1.769 2.148 2.123 0 3.755-2.239 3.755-5.471 0-2.859-2.056-4.859-4.993-4.859-3.405 0-5.413 2.556-5.413 5.188 0 1.031.395 2.136.896 2.739.098.118.118.219.088.335-.096.399-.308 1.26-.348 1.432-.055.229-.184.277-.424.167-1.593-.756-2.587-3.136-2.587-5.033 0-4.128 2.99-7.916 8.612-7.916 4.534 0 8.061 3.231 8.061 7.556 0 4.522-2.851 8.181-6.821 8.181-1.329 0-2.582-.692-3.011-1.516 0 0-.66 2.516-.825 3.134-.267 1.018-.896 2.289-1.344 3.066.999.322 2.064.498 3.165.498 5.523 0 10-4.477 10-10s-4.477-10-10-10z"/></svg> },
  { id: 'dribbble', name: 'Dribbble', icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.951.67 1.427-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.329zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z"/></svg> },
  { id: 'nft', name: 'NFT Marketplaces', icon: <ImageIcon className="h-4 w-4" /> },
  { id: 'web', name: 'Web', icon: <Globe className="h-4 w-4" /> },
];

// Mock matches for demonstration
const DEMO_MATCHES = [
  {
    id: 'match-1',
    platform: 'github',
    url: 'https://github.com/fake-user/copied-repo',
    similarity: 87,
    description: 'Code repository with similar code structure',
    date: new Date().toISOString(),
    location: 'San Francisco, CA'
  },
  {
    id: 'match-2',
    platform: 'twitter',
    url: 'https://twitter.com/fake_user/status/123456789',
    similarity: 95,
    description: 'Tweet containing your exact design',
    date: new Date().toISOString(),
    location: 'London, UK'
  },
  {
    id: 'match-3',
    platform: 'nft',
    url: 'https://opensea.io/assets/fake-collection/123',
    similarity: 92,
    description: 'NFT listing with your artwork',
    date: new Date().toISOString(),
    location: 'Tokyo, Japan'
  }
];

export function AISimilarityScanner({
  assetId = '123456',
  assetName = 'Untitled Asset',
  assetType = 'code',
  onMatchFound,
  demoMode = false
}: AISimilarityScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentPlatform, setCurrentPlatform] = useState<string>('');
  const [scannedPlatforms, setScannedPlatforms] = useState<string[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [scanComplete, setScanComplete] = useState(false);

  // Function to start scanning
  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setCurrentPlatform('');
    setScannedPlatforms([]);
    setMatches([]);
    setScanComplete(false);
  };

  // Effect to simulate scanning when in scanning state
  useEffect(() => {
    if (!isScanning) return;

    let platformIndex = 0;
    let progress = 0;

    const scanInterval = setInterval(() => {
      if (platformIndex < PLATFORMS.length) {
        const platform = PLATFORMS[platformIndex];
        setCurrentPlatform(platform.id);
        setScannedPlatforms(prev => [...prev, platform.id]);

        // In demo mode, add fake matches
        if (demoMode && platformIndex % 3 === 0) {
          const randomMatch = DEMO_MATCHES[Math.floor(Math.random() * DEMO_MATCHES.length)];
          const newMatch = {
            ...randomMatch,
            id: `match-${Date.now()}`,
            platform: platform.id,
            date: new Date().toISOString()
          };

          setMatches(prev => [...prev, newMatch]);
          if (onMatchFound) {
            onMatchFound(newMatch);
          }
        }

        platformIndex++;
        progress = (platformIndex / PLATFORMS.length) * 100;
        setScanProgress(progress);
      } else {
        setScanProgress(100);
        setIsScanning(false);
        setScanComplete(true);
        clearInterval(scanInterval);
      }
    }, 1200); // Each platform takes 1.2 seconds to scan

    return () => clearInterval(scanInterval);
  }, [isScanning, demoMode, onMatchFound]);

  return (
    <Card className="border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Search className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
            <h3 className="font-medium">AI Similarity Scanner</h3>
          </div>
          {scanComplete && (
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600 dark:text-green-400">Scan Complete</span>
            </div>
          )}
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Scanning internet platforms for content similar to your {assetType}: <span className="font-medium">{assetName}</span>
        </div>
      </div>

      <div className="p-4">
        {!isScanning && !scanComplete && (
          <div className="text-center py-6">
            <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium mb-2">Start Similarity Scan</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Our AI will search across multiple platforms for similar content
            </p>
            <Button
              onClick={startScan}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Search className="h-4 w-4 mr-2" />
              Start Scanning
            </Button>
          </div>
        )}

        {isScanning && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Scanning progress</span>
              <span className="text-sm text-gray-500">{Math.round(scanProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Loader2 className="h-4 w-4 text-blue-500 animate-spin mr-2" />
                <span className="text-sm">
                  Currently scanning: <span className="font-medium">
                    {PLATFORMS.find(p => p.id === currentPlatform)?.name || 'Preparing scan...'}
                  </span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {PLATFORMS.map((platform) => (
                <div
                  key={platform.id}
                  className={`flex items-center justify-center p-2 rounded-md text-xs font-medium ${
                    scannedPlatforms.includes(platform.id)
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <div className="mr-1.5">
                    {platform.icon}
                  </div>
                  <span>{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {matches.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium flex items-center mb-3">
              <AlertCircle className="h-4 w-4 text-orange-500 mr-1.5" />
              Potential Matches ({matches.length})
            </h4>

            <div className="space-y-3">
              {matches.map((match) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-md p-3"
                >
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="mr-2">
                        {PLATFORMS.find(p => p.id === match.platform)?.icon}
                      </div>
                      <span className="font-medium text-sm">
                        {PLATFORMS.find(p => p.id === match.platform)?.name}
                      </span>
                    </div>
                    <div className="text-xs bg-orange-100 dark:bg-orange-800/30 text-orange-800 dark:text-orange-300 px-2 py-0.5 rounded-full font-medium">
                      {match.similarity}% match
                    </div>
                  </div>
                  <p className="text-sm mt-2">{match.description}</p>
                  <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{match.location}</span>
                    <span>{new Date(match.date).toLocaleString()}</span>
                  </div>
                  <div className="mt-3 flex gap-2 justify-end">
                    <Button size="sm" variant="outline" className="text-xs h-7 px-2">
                      Ignore
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs h-7 px-2">
                      Take Action
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {scanComplete && matches.length === 0 && (
          <div className="text-center py-6">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h4 className="text-lg font-medium mb-2">All Clear!</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              No potential matches found across all platforms.
            </p>
            <Button
              onClick={startScan}
              variant="outline"
            >
              <Search className="h-4 w-4 mr-2" />
              Scan Again
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
