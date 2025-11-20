import { useTamboThread } from "@tambo-ai/react";

export default function LatestTamboComponent() {
      const { thread } = useTamboThread();
  const latestTamboComponent = [...(thread?.messages || [])]
    .reverse()
    .find((message) => message.role === "assistant" && message.renderedComponent);
  return latestTamboComponent?.renderedComponent;
}