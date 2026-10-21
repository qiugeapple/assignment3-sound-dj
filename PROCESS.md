# 2. PROCESS.md

```markdown
# Project Process & Evolution: Cyber Turntable

## 1. Starting Idea
The initial concept began as a backend Python script using Streamlit and pre-rendered `.wav` buffers to generate mood-based ambient sounds. However, while testing the Python environment, dependency management (`uv` PEP 668 restrictions) and the asynchronous nature of button-triggered rendering introduced noticeable latency between action and acoustic feedback.

I pivoted to a browser-native web platform utilizing the **Web Audio API** and **HTML5/CSS3**. This provided:
- Zero installation friction (no environment or dependency issues for evaluators).
- Zero latency between slider dragging and audio parameter modulation.
- A physical metaphor: pairing digital synthesis with a visual spinning vinyl record.

---

## 2. Iteration & Design Decisions

### Phase 1: Real-Time Audio Engine
Instead of loading static MP3 assets, I implemented an oscillator node pipeline (`OscillatorNode` -> `GainNode` -> `AudioContext.destination`). This allowed real-time synthesis of six distinct sound modes (Sine, 8-Bit Square, Analog Saw, Soft Triangle, Sub Bass, Music Box).

### Phase 2: Audio-Visual Synchronization
To make the feedback tactile:
- The vinyl disk CSS rotation speed was programmatically bound to the Tempo slider (`animationDuration = (3 / currentSpeed) + 's'`).
- A red needle tracking indicator (`now-playing-dot`) and status readouts were added to explicitly communicate machine state.

---

## 3. User Trial & Improvements

### The Trial
I asked a peer to try the project without any prior explanation. I observed where they hesitated and how they engaged with the interface:

1. **Observation 1 (Hesitation on Startup)**:
   The user initially tried to move the sliders before clicking `Power On`. Because the audio context wasn't running, moving the sliders caused confusion as nothing occurred.
2. **Observation 2 (Acoustic Comfort)**:
   When switching to 8-bit square wave at high pitch, raw unshaped square waves produced unpleasant clicking noises when notes started and stopped.

### Decisions & Improvements Made
1. **State-Locked UI**:
   I styled the control panel with lowered opacity (`opacity: 0.4`) and disabled interaction (`pointer-events: none`) while paused. Now, users immediately recognise that `Power On` is the required first step.
2. **ADSR Volume Envelopes**:
   I refined the `playTone` gain curve using exponential ramps (`exponentialRampToValueAtTime`), adding a 20ms attack and tailored decay curves for each instrument (e.g., short pluck for Music Box, sustained tail for Sub Bass), eliminating audio clicks.

---

## 4. AI Tool Usage Declaration

AI (Gemini) was utilized as an interactive sounding board and technical consultant during this project:

- **Suggestion Kept**:
  The AI suggested applying mathematical envelopes (`exponentialRampToValueAtTime`) on the Web Audio `GainNode` to simulate acoustic instrument decay (especially the Music Box and Sub Bass dynamics) instead of abrupt note cut-offs.
- **Suggestion Changed / Rejected**:
  The AI initially suggested using Python and Streamlit to synthesize and stream `.wav` files. I rejected this approach after discovering that browser-based server roundtrips caused perceptible lag. Shifting completely to client-side Web Audio API delivered an instantaneous feedback loop.