"use client";

import { InteractableGuitarTabs } from "@/components/guitar-tabs";
import LatestTamboMessage from "@/components/latest-tambo-message";
import LatestUserMessage from "@/components/latest-user-message";
import TamboToolcall from "@/components/tambo-toolcall";
import {
  MessageInput,
  MessageInputSubmitButton,
  MessageInputTextarea,
} from "@/components/tambo/message-input";
import { components, tools } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden relative bg-[#28272D]">
      <TamboProvider
        apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
        components={components}
        tools={tools}
        tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
      >
        <div className="h-full w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
          <TamboToolcall />
          <LatestTamboMessage />
          <InteractableGuitarTabs />
          <LatestUserMessage />
          <div className="w-full max-w-4xl mx-auto">
            <div className="p-4">
              <MessageInput contextKey="tambo-template">
                <MessageInputTextarea placeholder="Where do you want to go?" />
                <MessageInputSubmitButton />
              </MessageInput>
            </div>
          </div>
        </div>
      </TamboProvider>
    </div>
  );
}
