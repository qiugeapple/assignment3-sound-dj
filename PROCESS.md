# Process — Boba Melody

**Assignment 3: An interactive experience**

This document records the project's development, including the author's account of the starting idea and user feedback. Author feedback, AI-assisted implementation checks and mobile user feedback are distinguished below. Trial details that have not yet been recorded are identified explicitly.

## 1. Starting idea and intended user

My first idea was a simple DJ-disc webpage where users could move sliders to change the speed and style of music. It offered a direct relationship between an input and a sound change, but I felt that adjusting sliders alone was too monotonous for the experience I wanted to create.

I changed direction to combine making milk tea with music creation. Instead of only adjusting an existing sound, users would build a combination by choosing familiar ingredients. I proposed an empty cup, toppings associated with different instruments, and milk, coffee or tea as the musical foundation. For example, pearls would produce piano sounds and red beans would produce drum beats.

This retained the original interest in controlling music, including a tempo slider, while giving users a more playful reason to experiment. Making a drink also suggested a clear progression: select, add, revise, and finish.

The intended user is someone looking for a short, playful creative experience without needing to understand music software. The central question is: **can a person build and revise a musical combination by choosing ingredients?**

I wanted two stages: adding an ingredient should play a short preview, while completing the drink should reveal the full combination. This gives the finish action a purpose and lets users explore individual sounds first.

## 2. Developing the interaction

The recipe state consists of one selected base and a count for each topping. A click changes this state, and feedback connects sound with the drink: a preview plays, pieces appear in the cup, and the receipt updates.

The finish button becomes available only when there is both a base and a topping. It starts an eight-bar composition using the selected musical parts. Removing ingredients, stopping playback and resetting make experimentation reversible.

The cute café direction uses cream and pink colours, rounded buttons, a receipt-style recipe and a rotating cup. These support the ingredient metaphor and make the process of selecting, adding and finishing visible.

## 3. Changes during development

### Fixing cup rotation

After seeing the first version, I reported that the cup looked strange when rotating. The generated renderer rotated points used for the side outline in a way that made a circular cup appear narrower. The label also moved without correctly turning with the cup surface.

The renderer was revised so the circular silhouette remains stable during horizontal rotation. Ingredients rotate in three-dimensional coordinates, and the label changes its projected angle and disappears when facing away. Drag smoothing and double-click to return to the front were added.

The purpose was to make the feedback consistent: dragging should communicate rotation rather than an unexplained change in the cup's shape.

### Increasing variety rather than quantity

The first version had four toppings and a maximum of three spoonfuls per type. When I requested more toppings, the AI initially interpreted this as more quantity and raised the limit to eight per type.

I clarified that I wanted **more topping types**, and asked for **six spoonfuls per type**. The current version has eight types, adding taro balls, strawberry pieces, grass jelly and sago. These introduce bass, plucked-string-style notes, flute-style melody and shaker rhythm.

The total remains limited to 24 spoonfuls. This offers more sound combinations while keeping the drink bounded. When many different parts are active, the code reduces their individual levels to moderate the mix.

These changes followed feedback from me as the project author. They do not count as the assignment's independent user trial.

## 4. One piece of code connecting input to response

### Later addition: English and Chinese switching

I requested an English version and then clarified that I wanted a language switch so both English and Chinese remained available. With Codex assistance, a header button and a translation layer in `i18n.js` were added. It translates static text and changing recipe/audio messages without recreating controls or resetting the drink. First visits default to English; the browser remembers the chosen language where local storage is available. English layout adjustments were added for longer ingredient names.

Browser checks confirmed that ingredient counts stayed the same when switching both ways, playing-status and compatible-audio messages changed language, and the language selection survived a reload. The English interface was also checked for remaining Chinese visible text, apart from the button labelled “中文”. These are implementation checks rather than a new independent participant trial.

The topping click handler in `app.js` makes the interaction concrete:

1. Read the topping identifier from the clicked button's `data-top` value.
2. Check the six-spoon per-type limit and the 24-spoon total. If either applies, display a message without changing the recipe.
3. Increase `counts[id]` by one and invalidate the previously finished drink.
4. Add visible pieces, arrange their positions, and update the recipe feedback.
5. Call `preview(id)` to play a short example of the topping's sound.

Later, `compose()` reads the selected ingredients and schedules their musical parts together. A topping therefore affects the final audio as well as the cup's appearance. Before presenting the project, I need to understand the click handler and the functions `update()`, `preview()`, `ingredient()` and `compose()`.

## 5. Implementation checks completed with AI assistance

These checks were carried out during development using Codex tools and the in-app browser. They are functional checks, not an independent usability study.

| Check | Observed result |
| --- | --- |
| JavaScript syntax check with `node --check app.js` | Passed after implementation changes |
| Select a base and add toppings | Receipt and drink count updated; finishing became available |
| Finish a valid recipe | Player entered playback state and enabled export |
| Export a composition in an earlier version | A WAV download was produced and its RIFF/WAVE header was inspected |
| Test the earlier 24-spoon total limit | A further addition was rejected with a full-cup message |
| Attempt seven spoonfuls of taro in the current version | Count stayed at six and a limit message appeared |
| Add all four new types and finish | Player entered playback without captured browser errors |
| Drag a filled cup after the rotation fix | Cup outline stayed stable while ingredients and label changed orientation |

The export check predates the new instruments. Final recipe export, a fresh run following the README and the final repository link still need checking before submission. These results do not establish compatibility with every browser or device.

## 6. User feedback: inconsistent sound on mobile phones

Feedback from people trying the experience on mobile phones revealed that sound worked on some phones but not on others. I later clarified that my iPhone 17 and a classmate's vivo phone both had no sound. The exact vivo model, browsers and operating-system versions have not yet been recorded, so I cannot attribute the problem to either brand as a whole.

This exposed a problem with the main interaction: users need to hear the short preview and completed composition to understand how an ingredient changes the music. If the sound is missing, visual changes alone do not communicate the full result of their choices.

### My response and current status

I kept the ingredient-to-instrument concept and asked for help investigating the missing sound. The original code attempted to resume only a suspended audio context, did not handle other interrupted states, and labelled sound as enabled without verifying startup. These are confirmed code limitations, but they do not establish the exact cause on the two phones.

With Codex assistance, the implementation was changed to request startup directly during a click, check the running state, time out an unresolved startup attempt, and allow an explicit retry to replace a stuck context. An optional playback audio-session setting is used only where the browser supports it. A new **开启声音 / 测试音** control sends three test notes; its wording does not claim that the phone speaker is definitely audible.

A second output path was added: after finishing a recipe, the user can generate compatible audio, then deliberately tap again to play its WAV file through a normal browser audio element. This preserves the rule that the complete composition is available only after finishing. Editing the recipe stops and invalidates that audio. These changes are in `app.js`, with the new sound-help layout in `style.css`.

Desktop browser checks confirmed the startup interaction, generation and playback of compatible audio, and stopping/invalidation after editing. Following the changes, I tested the website on mobile again and reported on **27 October 2026** that sound could now be heard normally. This is a successful author-reported mobile retest following the audio changes, rather than only a desktop check.

The result supports keeping the revised audio controls and compatible playback option. It also completes a documented sequence of feedback, an implementation change and a positive follow-up result. I have not yet recorded which phone/browser was used for this successful retest, whether both originally affected phones were tested again, or whether live synthesis or compatible playback was used. I therefore do not claim that every playback path works on every mobile device. The README has been updated with the successful result and these limits.

## 7. AI tools and my decisions

I used **OpenAI ChatGPT/Codex** to develop the website through conversation. It generated substantial page structure, styling and JavaScript, including audio synthesis, cup rendering, state updates and WAV export. It also assisted with debugging, browser checks, packaging source files and drafting the README and this document.

My contribution recorded in the conversation was the core concept, desired sound mappings, two-stage playback, visual direction, and feedback about cup rotation, topping variety and quantity limits. Additional coding or testing contributions should only be claimed here if I actually complete them.

- **Suggestion kept:** the receipt-style recipe panel introduced by the AI. It remained in the revisions because it gives a visible record of the ingredients and a place to remove them.
- **Suggestion changed:** increasing each topping to eight spoonfuls. I clarified that variety was the priority and changed the limit to six while expanding to eight types.
- **Implementation revised:** the initial cup rotation, because its appearance did not communicate a natural rotating cup.



## 8. Credits and development history

The ingredient-to-music concept came from my original request. The generated version does not incorporate a supplied course example, external dataset, downloaded photograph or instrument sample. Graphics are drawn in code and sounds are generated in the browser. The external font is **Noto Sans SC via Google Fonts**; icons are Unicode characters and system emoji.
