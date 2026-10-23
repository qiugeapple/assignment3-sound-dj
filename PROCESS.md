Process — Boba Melody

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

Feedback from people trying the experience on mobile phones revealed that sound worked on some phones but not on others. Apple iPhones and vivo phones were among the devices mentioned. The exact models, browsers and operating-system versions, and which device succeeded or failed, have not yet been recorded, so I cannot attribute the problem to either brand as a whole.

This exposed a problem with the main interaction: users need to hear the short preview and completed composition to understand how an ingredient changes the music. If the sound is missing, visual changes alone do not communicate the full result of their choices.

### My response and current status

I am keeping the ingredient-to-instrument concept because it is central to the project. The feedback identifies mobile audio reliability as a priority for the next iteration. The README has been updated to disclose the reported limitation, rather than implying that audio works on all phones.

**No mobile-audio code fix or successful device retest is being claimed here.** The existing sound toggle, user-triggered audio setup and retry messages were already present before this feedback; they should not be described as new changes made because of the trial.

The next step is to reproduce the issue on an affected phone and record whether the topping preview, the final composition, or both are silent. Possible follow-up changes include a clearer sound-start action and more useful playback-status feedback, but these remain proposals until implemented and tested. The available feedback does not yet establish a technical cause.

### Details to complete before submission

- **Trial date and task:** [record the actual date and what the person was asked to do]
- **Trial setup:** [record whether the person tried it before the controls were explained, as required by the assignment]
- **Working device:** [model, operating system, browser and whether the site opened in a normal browser or an in-app browser]
- **Affected device:** [the same details, without any personal identifiers]
- **Observed action and result:** [what the person tapped, which visual response appeared, and whether preview or full playback was silent]
- **Follow-up decision and result:** [record an actual change and retest, or explain why the design was retained after investigation]

The reported feedback is recorded here honestly, but it does not yet provide a complete observation-and-iteration record. These remaining details should be completed from a real trial rather than inferred.

## 7. AI tools and my decisions

I used **OpenAI ChatGPT/Codex** to develop the website through conversation. It generated substantial page structure, styling and JavaScript, including audio synthesis, cup rendering, state updates and WAV export. It also assisted with debugging, browser checks, packaging source files and drafting the README and this document.

My contribution recorded in the conversation was the core concept, desired sound mappings, two-stage playback, visual direction, and feedback about cup rotation, topping variety and quantity limits. Additional coding or testing contributions should only be claimed here if I actually complete them.

- **Suggestion kept:** the receipt-style recipe panel introduced by the AI. It remained in the revisions because it gives a visible record of the ingredients and a place to remove them.
- **Suggestion changed:** increasing each topping to eight spoonfuls. I clarified that variety was the priority and changed the limit to six while expanding to eight types.
- **Implementation revised:** the initial cup rotation, because its appearance did not communicate a natural rotating cup.

AI assistance does not replace my responsibility to understand the code, verify that it runs, conduct the independent trial and ensure this document matches the final submission.

## 8. Credits and development history

The ingredient-to-music concept came from my original request. The generated version does not incorporate a supplied course example, external dataset, downloaded photograph or instrument sample. Graphics are drawn in code and sounds are generated in the browser. The external font is **Noto Sans SC via Google Fonts**; icons are Unicode characters and system emoji. See the README for the font source and AI disclosure.

The iterations above are supported by the development conversation. **A visible Git commit history has not been verified here.** Conversation history is not a substitute for repository commits.
