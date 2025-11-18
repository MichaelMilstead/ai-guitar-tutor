import SuggestedMessages from "./suggested-messages";

export default function DefaultMessage() {
  return (
    <div className="text-sm text-[#FBFBFB] p-2 w-full font-semibold text-left flex flex-col gap-6">
      <p>Hello! I'm your AI guitar tutor.</p>
      <p className="text-gray-400">
        Ask me how to play songs, chords, scales, or even about theory.
      </p>
      <p className="text-gray-400">Or try one of these:</p>
      <SuggestedMessages />
    </div>
  );
}
