import React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AIColorEngineProps {
  uploadedContent?: string | null;
  onThemeGenerated?: (colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  }) => void;
}

export function AIColorEngine({
  uploadedContent,
  onThemeGenerated
}: AIColorEngineProps) {
  const [colors, setColors] = useState({
    primary: "#3b82f6", // Default blue
    secondary: "#8b5cf6", // Default purple
    accent: "#f97316", // Default orange
    background: "#f8fafc", // Default light background
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulate AI analysis of content to generate color palette
  useEffect(() => {
    if (uploadedContent) {
      setIsAnalyzing(true);
      setProgress(0);

      // Simulate analysis progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAnalyzing(false);
            return 100;
          }
          return prev + 5;
        });
      }, 100);

      // Simulate color extraction based on content type
      const timeout = setTimeout(() => {
        // For demo, we'll just use some preset color schemes based on the first character
        // In a real implementation, this would analyze the actual content
        const contentType = typeof uploadedContent === 'string' ?
          uploadedContent.toLowerCase().includes('code') ? 'code' :
          uploadedContent.toLowerCase().includes('image') ? 'image' :
          'document' : 'unknown';

        let newColors;

        switch(contentType) {
          case 'code':
            newColors = {
              primary: "#0ea5e9", // Blue
              secondary: "#6366f1", // Indigo
              accent: "#06b6d4", // Cyan
              background: "#f0f9ff", // Light blue background
            };
            break;
          case 'image':
            newColors = {
              primary: "#8b5cf6", // Purple
              secondary: "#ec4899", // Pink
              accent: "#a855f7", // Purple
              background: "#faf5ff", // Light purple background
            };
            break;
          case 'document':
            newColors = {
              primary: "#10b981", // Green
              secondary: "#059669", // Emerald
              accent: "#14b8a6", // Teal
              background: "#f0fdf4", // Light green background
            };
            break;
          default:
            newColors = {
              primary: "#f97316", // Orange
              secondary: "#db2777", // Pink
              accent: "#eab308", // Yellow
              background: "#fff7ed", // Light orange background
            };
        }

        setColors(newColors);
        if (onThemeGenerated) {
          onThemeGenerated(newColors);
        }
      }, 2000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [uploadedContent, onThemeGenerated]);

  if (!uploadedContent) return null;

  return (
    <div className="mb-4">
      {isAnalyzing && (
        <div className="mb-4">
          <div className="text-sm font-medium mb-1">Analyzing content for theme colors...</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="flex gap-2 items-center mt-2">
        <div
          className="w-6 h-6 rounded-full border border-gray-200"
          style={{ backgroundColor: colors.primary }}
        ></div>
        <div
          className="w-6 h-6 rounded-full border border-gray-200"
          style={{ backgroundColor: colors.secondary }}
        ></div>
        <div
          className="w-6 h-6 rounded-full border border-gray-200"
          style={{ backgroundColor: colors.accent }}
        ></div>
        <div
          className="w-6 h-6 rounded-full border border-gray-200"
          style={{ backgroundColor: colors.background }}
        ></div>
      </div>
    </div>
  );
}
