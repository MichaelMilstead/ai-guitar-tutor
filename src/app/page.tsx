"use client";

import GithubLink from "@/components/github-link";
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
    <div className="h-screen flex flex-col justify-center items-center overflow-hidden relative bg-[#232834]">
      <GithubLink />
      <TamboProvider
        apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
        components={components}
        tools={tools}
        tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
      >
        <div className="h-full max-h-1/2 w-full max-w-4xl mx-auto flex flex justify-center items-center">
          {/* Left column: Toolcall and Guitar Tabs */}
          <div className="w-1/2 h-full flex flex-col items-center justify-center p-4">
            <InteractableGuitarTabs />
            <TamboToolcall />
          </div>

          {/* Right column: Messages and Input */}
          <div className="w-1/2 h-full flex flex-col items-center justify-center p-4">
            <div className="w-full h-full">
              <LatestUserMessage />
              <LatestTamboMessage />
            </div>
            <div className="w-full max-w-2xl">
              <MessageInput contextKey="tambo-template">
                <MessageInputTextarea placeholder="Ask how to play anything" />
                <MessageInputSubmitButton />
              </MessageInput>
            </div>
          </div>
        </div>
      </TamboProvider>
    </div>
  );
}
