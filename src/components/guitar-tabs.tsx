import { withInteractable } from "@tambo-ai/react";
import { z } from "zod";

export interface GuitarTabFingerPosition {
  string: number;
  fret: number;
}

export interface GuitarTabsProps {
  tabs?: {
    name?: string;
    tabs?: GuitarTabFingerPosition[];
  }[];
}

export const guitarTabsSchema = z.object({
  tabs: z.array(z.object({
    name: z.string().describe("The name of the guitar tab"),
    tabs: z.array(z.object({
      string: z.number().describe("The string number (1-6)"),
      fret: z.number().describe("The fret number (0-12). Use -1 to indicate no finger position (unplayed string)"),
    })).describe("The finger positions for the guitar tab"),
  })),
});

export default function GuitarTabs({ tabs = [] }: GuitarTabsProps) {
  const stringLabels = ["E", "A", "D", "G", "B", "E"];
  // Reverse for display (high E at top, low E at bottom) - use toReversed to avoid mutation
  const reversedLabels = [...stringLabels].reverse();
  
  return (
    <div className="w-[600px] h-[400px] rounded-xl overflow-hidden border bg-gray-800">
      <div className="flex h-full">
        <div className="flex flex-col h-full bg-gray-700 items-center justify-center text-sm font-medium text-white border-r border-gray-600 w-12">
          {reversedLabels.map((label, index) => (
            <div key={`${label}-${index}`} className="flex-1 flex items-center justify-center w-full">{label}</div>
          ))}
        </div>
        {tabs.map((tab, tabIndex) => (
          <div key={tab.name || tabIndex} className="flex-1 border-r border-gray-600 last:border-r-0 relative">
            <div className="absolute inset-0 flex flex-col">
              {/* Horizontal string lines */}
              {reversedLabels.map((label, stringIndex) => (
                <div 
                  key={`${label}-${stringIndex}`}
                  className="flex-1 flex items-center"
                >
                  <div className="w-full h-px bg-gray-500"></div>
                </div>
              ))}
            </div>
            
            {/* Finger positions on top of strings */}
            <div className="relative h-full z-10">
              {tab.tabs?.map((fingerPos) => {
                if (fingerPos.fret === -1) return null; // Skip unplayed strings
                
                // Calculate position: string 1 is at top (index 0), string 6 is at bottom (index 5)
                // The reversed labels array shows string 1 at top, string 6 at bottom
                const stringIndex = fingerPos.string - 1;
                const topPercent = ((stringIndex + 0.5) / stringLabels.length) * 100;
                
                return (
                  <div
                    key={`${fingerPos.string}-${fingerPos.fret}`}
                    className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ top: `${topPercent}%` }}
                  >
                    <div className="rounded-full w-8 h-8 flex items-center justify-center text-white text-sm font-bold">
                      {fingerPos.fret}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const InteractableGuitarTabs = withInteractable(GuitarTabs, {
  componentName: "guitar-tabs",
  description: "A component for displaying guitar tabs",
  propsSchema: guitarTabsSchema,
});