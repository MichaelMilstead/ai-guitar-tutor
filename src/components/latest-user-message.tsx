import { extractMessageContent } from "@/lib/utils";
import { useTamboThread } from "@tambo-ai/react";

export default function LatestUserMessage() {
  const { thread } = useTamboThread();
  const latestUserMessage = [...(thread?.messages || [])]
    .reverse()
    .find((message) => message.role === "user");

  return (
    <div className="text-[#82FDF6] p-2 w-full text-left">
      {extractMessageContent(latestUserMessage)}
    </div>
  );
}
