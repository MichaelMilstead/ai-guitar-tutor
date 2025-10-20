import { useTamboThread } from "@tambo-ai/react";

export default function TamboToolcall() {
  const { thread } = useTamboThread();
  const messages = thread?.messages || [];

  const latestToolcallMessage = [...messages]
    .reverse()
    .find((message) => message.role === "assistant" && message.tool_call_id);
  if (!latestToolcallMessage) {
    return null;
  }

  const isAnyMessageAfter =
    messages.slice(messages.indexOf(latestToolcallMessage)).length > 0;

  const statusMessage = isAnyMessageAfter
    ? latestToolcallMessage?.component?.completionStatusMessage
    : latestToolcallMessage?.component?.statusMessage;

  return (
    <div
      className={
        "text-gray-400 text-sm p-4 w-full text-left " +
        (isAnyMessageAfter ? "" : "animate-pulse")
      }
    >
      {statusMessage}
    </div>
  );
}
