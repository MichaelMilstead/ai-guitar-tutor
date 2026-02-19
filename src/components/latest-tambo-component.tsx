import { useTambo, type TamboComponentContent } from "@tambo-ai/react";

export default function LatestTamboComponent() {
  const { messages } = useTambo();
  const latestTamboComponent = [...messages]
    .reverse()
    .find(
      (message) =>
        message.role === "assistant" &&
        message.content.some((block) => block.type === "component")
    );

  if (!latestTamboComponent) return null;

  const componentBlock = latestTamboComponent.content.find(
    (block) => block.type === "component"
  ) as TamboComponentContent | undefined;

  return componentBlock?.renderedComponent ?? null;
}