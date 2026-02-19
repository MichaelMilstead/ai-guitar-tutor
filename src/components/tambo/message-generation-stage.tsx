"use client";

import { cn } from "@/lib/utils";
import { useTambo } from "@tambo-ai/react";
import { Loader2Icon } from "lucide-react";
import * as React from "react";

export interface GenerationStageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  showLabel?: boolean;
}

export function MessageGenerationStage({
  className,
  showLabel = true,
  ...props
}: GenerationStageProps) {
  const { isIdle, isStreaming, isWaiting } = useTambo();

  if (isIdle) {
    return null;
  }

  const label = isWaiting
    ? "Preparing response"
    : isStreaming
      ? "Generating response"
      : "Processing";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-2 py-1 text-xs rounded-md bg-transparent text-muted-foreground",
        className,
      )}
      {...props}
    >
      <Loader2Icon className="h-3 w-3 animate-spin" />
      {showLabel && <span>{label}</span>}
    </div>
  );
}
