import { withInteractable } from "@tambo-ai/react";
import { z } from "zod";

export interface GuitarTabsProps {
  title?: string;
  columns?: {
    label?: string;
    positions: [number, number, number, number, number, number];
  }[];
  stringLabels?: [string, string, string, string, string, string];
}

// Description of the props schema so Tambo knows how to use it:
export const guitarTabsSchema = z.object({
  columns: z
    .array(
      z.object({
        label: z
          .string()
          .optional()
          .describe(
            "The label for this column (e.g., chord name like 'C' or 'Am', or position number)"
          ),
        positions: z
          .array(z.number())
          .length(6)
          .describe(
            "An array of exactly 6 fret numbers, one for each string (strings 1-6, where 1 is high string and 6 is low string). Use 0 for open strings, 1-12 for fretted strings, and -1 for unplayed strings. CRITICAL: For SCALES, exactly ONE string must have a non-negative value (0-12), all other 5 strings must be -1. For CHORDS, multiple strings can have non-negative values. Make absolutely sure that the notes are in order from highest to lowest string. For example, if the chord is E major, the fret numbers should be [0, 0, 1, 2, 2, 0].One note of a scale might be: [0, 0, 4, 0, 0, 0]."
          ),
      })
    )
    .describe(
      "An array of columns to display horizontally to create guitar tabs. Each column represents notes played at the same time. For CHORDS: multiple notes per column (multiple strings with non-negative fret numbers). For SCALES: exactly ONE note per column (only one string with a non-negative fret number per column, all others -1), with columns progressing sequentially from left to right through the scale notes over time. Scales should show one note per column across multiple strings as the scale progresses. A C-major scale might start with [0, 3, 0, 0, 0, 0], [0, 5, 0, 0, 0, 0], [0, 0, 2, 0, 0, 0], [0, 0, 3, 0, 0, 0], [0, 0, 5, 0, 0, 0], [0, 0, 0, 2, 0, 0], [0, 0, 0, 4, 0, 0], [0, 0, 0, 5, 0, 0]."
    ),
  stringLabels: z
    .array(z.string())
    .length(6)
    .optional()
    .describe(
      "An array of exactly 6 string labels, one for each string from high to low (e.g., ['E', 'B', 'G', 'D', 'A', 'E'] for standard tuning). Defaults to standard tuning if not provided."
    ),
  title: z
    .string()
    .optional()
    .describe(
      "The title for the guitar tabs to display to the user. Maybe a song name, or a chord progression name."
    ),
});

export default function GuitarTabs({
  columns = [],
  stringLabels = ["E", "B", "G", "D", "A", "E"],
  title = "",
}: GuitarTabsProps) {
  return (
    <div className="w-full h-full max-h-2/3 flex flex-col">
      {title && (
        <div className="text-sm text-white p-2 flex-shrink-0">{title}</div>
      )}
      <div className="flex flex-1 rounded-xl overflow-hidden bg-[#161921] min-h-0">
        <div className="flex flex-col h-full w-12">
          <div className="text-xs text-center py-1 flex-shrink-0 font-medium text-transparent">e</div>
          <div className="flex-1 flex flex-col items-center text-xs font-medium text-white min-h-0">
            {stringLabels.map((label, index) => (
              <div
                key={`${label}-${index}`}
                className="flex-1 flex items-center justify-center w-full"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
        {columns.map((column, columnIndex) => (
          <div
            key={`${column.label}-${columnIndex}`}
            className="flex-1 border-r border-gray-600 last:border-r-0 relative flex flex-col"
          >
            {column.label && (
              <div className="text-xs text-semibold text-[#78BBE5] text-center py-1 flex-shrink-0 font-medium">
                {column.label}
              </div>
            )}
            <div className="flex-1 relative min-h-0">
              <div className="absolute inset-0 flex flex-col">
                {stringLabels.map((label, stringIndex) => (
                  <div
                    key={`${label}-${stringIndex}`}
                    className="flex-1 flex items-center"
                  >
                    <div className="w-full h-px bg-gray-500"></div>
                  </div>
                ))}
              </div>

              <div className="relative h-full z-10">
                {column.positions.map((fret, stringIndex) => {
                  const topPercent = ((stringIndex + 0.5) / 6) * 100;

                  return (
                    <div
                      key={`string-${stringIndex}-fret-${fret}`}
                      className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      style={{ top: `${topPercent}%` }}
                    >
                      <div className="rounded-full w-8 h-8 flex items-center justify-center text-white text-xs font-bold">
                        {fret !== -1 ? fret : ""}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Wrapper so Tambo can interact with it:
export const InteractableGuitarTabs = withInteractable(GuitarTabs, {
  componentName: "guitar-tabs",
  description: "A component for displaying guitar tabs",
  propsSchema: guitarTabsSchema,
});
