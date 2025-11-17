import { useTamboThreadInput } from "@tambo-ai/react";

export default function SuggestedMessages() {
  const { setValue } = useTamboThreadInput();

  const handleSuggestedMessage = (message: string) => {
    setValue(message);
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        className="bg-[#3D4865] hover:bg-[#4D5A75] text-[#78BBE5] p-2 rounded-md w-fit text-xs cursor-pointer"
        onClick={() =>
          handleSuggestedMessage(
            "Show me a simple Brazilian bossa nova chord progression"
          )
        }
      >
        Learn a Bossa nova groove
      </button>
      <button
        className="bg-[#3D4865] hover:bg-[#4D5A75] text-[#78BBE5] p-2 rounded-md w-fit text-xs cursor-pointer"
        onClick={() =>
          handleSuggestedMessage("I'm a beginner, what should I learn first?")
        }
      >
        Start with the basics
      </button>
      <button
        className="bg-[#3D4865] hover:bg-[#4D5A75] text-[#78BBE5] p-2 rounded-md w-fit text-xs cursor-pointer"
        onClick={() =>
          handleSuggestedMessage(
            "Show me a chord progression for a popular song"
          )
        }
      >
        Play a popular song
      </button>
    </div>
  );
}
