# NEON DODGE — EdVyro Task 03

## State Model
- START: initial state; Start is available.
- PLAYING: timer, score, obstacles and progression run.
- PAUSED: gameplay is frozen; Resume or Restart Run is available.
- WON: reached 60 seconds; result screen shown.
- LOST: collision occurred; result screen shown.

## Progression Rules
- Score = 100 points per second.
- Level 1 starts at 0 seconds.
- Level increases every 12 seconds, capped at Level 5.
- Higher levels increase obstacle speed and spawn frequency.
- 60 seconds is the win condition.

0–11.9s L1 → 12–23.9s L2 → 24–35.9s L3 → 36–47.9s L4 → 48–60s L5 → WIN

## Persistence
Only the best score is stored in browser localStorage. An unfinished run is not persisted.

## Controls
A / Left Arrow: move left
D / Right Arrow: move right
P / Esc: pause/resume
Space: start/restart where allowed
Mobile arrows: movement

## State Flow
START → PLAYING → PAUSED → PLAYING
PLAYING → LOST → PLAYING
PLAYING → WON → PLAYING

Rapid clicks and invalid transitions are guarded so they do not create duplicate game loops or unexpected resets.
