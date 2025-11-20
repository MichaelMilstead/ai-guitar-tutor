# AI Guitar Tutor

An agentic app built using [Tambo](https://github.com/tambo-ai/tambo) to allow an AI to control a guitar tabs component.

Some ideas to try:

"I want to make a simple song, help me think of some chords"

"How do I play that 'indie pop' style?"

"Based on the chords I know, what should I learn next?"

## How it works

With Tambo you can register React components as "AI controllable"

In (/src/compnents/guitar-tabs.tsx)[/src/compnents/guitar-tabs.tsx] you can see how the `InteractableGuitarTabs` is a wrapper around `GuitarTabs`, with descriptions of how to use each prop.

Then, the `InteractableGuitarTabs` is placed on the main `page.tsx`.

Messages submitted in the message input, along with the `InteractableGuitarTabs` information, are sent to Tambo for response generation.

## Running

Get a Tambo api key for free:

`npx tambo@latest init`

Install dependencies and run:

`npm i`

`npm run dev`

## Future

Add a "guided learning" mode, where rather than asking for specific information, the AI will guide you through lessons, duolingo-style.

For more detailed documentation, visit [Tambo's official docs](https://docs.tambo.co).
