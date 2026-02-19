import { useTambo } from "@tambo-ai/react";
import DefaultMessage from "./default-message";
import LatestTamboMessage from "./latest-tambo-message";
import LatestUserMessage from "./latest-user-message";

export default function MessageList() {
  const { messages } = useTambo();

  return (
    <div className="w-full h-full">
      {messages.length == 0 ? (
        <DefaultMessage />
      ) : (
        <>
          <LatestUserMessage />
          <LatestTamboMessage />
        </>
      )}
    </div>
  );
}
