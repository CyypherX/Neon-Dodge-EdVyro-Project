# NEON DODGE — State Diagram

```text
START
  |
  | Start
  v
PLAYING <---- Resume ---- PAUSED
  |                         |
  | Pause                   | Restart
  v                         v
PAUSED                   PLAYING
  |
  | Restart
  v
PLAYING

PLAYING -- collision --> LOST -- Restart --> PLAYING
PLAYING -- 60 seconds --> WON -- Restart --> PLAYING
```

## Allowed actions
| State | Actions |
|---|---|
| START | Start |
| PLAYING | Move, Pause, Lose, Win |
| PAUSED | Resume, Restart |
| LOST | Restart |
| WON | Restart |
