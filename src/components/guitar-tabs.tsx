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
      fret: z.number().describe("The fret number (0-12)"),
    })).describe("The finger positions for the guitar tab"),
  })),
});

export default function GuitarTabs({ tabs = [] }: GuitarTabsProps) {
  console.log(tabs);
  return (
    <div className="w-[600px] h-[400px] rounded-xl overflow-hidden border ">
      {tabs.map((tab) => (
        <div key={tab.name} className="w-full h-full">
          <div className="w-full h-full">
            {tab.tabs?.map((tab) => (
              <div key={tab.string + "-" + tab.fret} className="w-full h-full">
                {tab.string} - {tab.fret}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export const InteractableGuitarTabs = withInteractable(GuitarTabs, {
  componentName: "guitar-tabs",
  description: "A component for displaying guitar tabs",
  propsSchema: guitarTabsSchema,
});