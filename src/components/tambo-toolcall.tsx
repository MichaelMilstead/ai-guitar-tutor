import { useTambo, type TamboToolUseContent } from "@tambo-ai/react";

export default function TamboToolcall() {
  const { messages, isIdle } = useTambo();

  // Find the latest tool_use content block across all assistant messages
  let latestToolBlock: TamboToolUseContent | undefined;
  let toolMessageIndex = -1;

  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role === "assistant") {
      const toolBlock = msg.content.find(
        (block) => block.type === "tool_use"
      ) as TamboToolUseContent | undefined;
      if (toolBlock) {
        latestToolBlock = toolBlock;
        toolMessageIndex = i;
        break;
      }
    }
  }

  const isAnyMessageAfter =
    toolMessageIndex >= 0 && toolMessageIndex < messages.length - 1;

  const statusMessage = latestToolBlock?.statusMessage;

  return (
    <div
      className={
        "text-gray-400 text-sm p-4 w-full text-left " +
        (isAnyMessageAfter ? "" : "animate-pulse")
      }
    >
      {!isIdle && (
        <span className="inline-block mr-1 text-xs text-gray-500 rounded-full bg-[#FBFBFB] h-2 w-2 animate-pulse"></span>
      )}
      {statusMessage}
    </div>
  );
}
