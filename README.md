# NEON DODGE — EdVyro Task 03

Browser arcade survival prototype upgraded for **Game State, Progression, and Persistence**.

## Task 03 additions
- Explicit START / PLAYING / PAUSED / WON / LOST states
- Pause/resume with P or Esc
- Restart behavior
- Five-level difficulty progression
- Level increases every 12 seconds
- 60-second win target
- Persistent best score using localStorage
- State transition guard against invalid transitions
- State diagram and edge-case test checklist

## Controls
A / Left Arrow — move left
D / Right Arrow — move right
P / Esc — pause/resume
Space — start/restart where allowed
Mobile — on-screen arrows

## Run
Open `index.html` in a modern browser or use VS Code + Live Server.

## Progression
Level 1: 0–11.9s
Level 2: 12–23.9s
Level 3: 24–35.9s
Level 4: 36–47.9s
Level 5: 48–60s
Win at 60s.

## Persistence
Only the best score is saved locally. The current unfinished run is intentionally not persisted.
