import { extractMessageContent } from "@/lib/utils";
import { useTamboThread } from "@tambo-ai/react";

export default function LatestUserMessage() {
  const { thread } = useTamboThread();
  const latestUserMessage = [...(thread?.messages || [])]
    .reverse()
    .find((message) => message.role === "user");

  return (
    <div className="text-[#82FDF6] p-4 py-8 w-full text-center">
      {extractMessageContent(latestUserMessage)}
    </div>
  );
}
