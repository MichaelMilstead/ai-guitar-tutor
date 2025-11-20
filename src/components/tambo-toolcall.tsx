import { useTamboThread } from "@tambo-ai/react";

export default function TamboToolcall() {
  const { thread, isIdle } = useTamboThread();
  const messages = thread?.messages || [];
  console.log(isIdle);

  const latestToolcallMessage = [...messages]
    .reverse()
    .find((message) => message.role === "assistant" && message.tool_call_id);

  const isAnyMessageAfter =
    latestToolcallMessage &&
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
      {!isIdle && (
        <span className="inline-block mr-1 text-xs text-gray-500 rounded-full bg-[#FBFBFB] h-2 w-2 animate-pulse"></span>
      )}
      {statusMessage}
    </div>
  );
}
