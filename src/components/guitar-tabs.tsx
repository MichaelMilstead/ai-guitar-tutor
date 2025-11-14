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
  return (
    <div className="w-[600px] h-[400px] rounded-xl overflow-hidden border bg-gray-800">
      <div className="flex h-full">
        <div className="flex flex-col h-full bg-gray-700 items-center justify-center text-sm font-medium text-white border-b border-gray-600">
          {stringLabels.reverse().map((label) => (
            <div key={label} className="flex-1 text-center items-center justify-center h-full">{label}</div>
          ))}
        </div>
        {tabs.map((tab, tabIndex) => (
          <div key={tab.name || tabIndex} className="flex-1 border-r border-gray-600 last:border-r-0">


            <div className="flex flex-col h-[calc(100%-2rem)]">
              {tab.tabs?.map((fingerPos, fingerIndex) => (
                <div 
                  key={fingerPos.string + "-" + fingerPos.fret} 
                  className="flex-1 flex items-center justify-center text-white border-b border-gray-600 last:border-b-0"
                >
                  <div className="text-center">
                    <div className="text-lg font-bold">{fingerPos.fret}</div>
                  </div>
                </div>
              ))}
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