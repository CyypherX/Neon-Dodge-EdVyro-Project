# NEON DODGE — EdVyro Game Development Capstone

NEON DODGE is a browser-based neon arcade survival game developed as part of the **EdVyro Game Development Internship**.

The player must survive for 60 seconds, dodge incoming obstacles, earn score, and progress through increasing difficulty levels.

## 🎮 Game Objective

Survive the complete 60-second run without colliding with an obstacle.

The game progresses through five difficulty levels as the survival timer increases.

## 🕹️ Controls

| Input | Action |
|---|---|
| A / Left Arrow | Move left |
| D / Right Arrow | Move right |
| P / Esc | Pause / Resume |
| Space | Start / Restart where allowed |
| Mobile arrows | Move left / right |

## 📈 Progression

The game contains five difficulty levels:

- Level 1: 0–11.9 seconds
- Level 2: 12–23.9 seconds
- Level 3: 24–35.9 seconds
- Level 4: 36–47.9 seconds
- Level 5: 48–60 seconds
- Win condition: survive for 60 seconds

As the level increases, the gameplay becomes more challenging.

## 🎯 Game States

The game uses explicit states:

- START
- PLAYING
- PAUSED
- WON
- LOST

Pause, restart, progression, and win/lose behavior are handled through these states.

## 💾 Persistence

The player's best score is saved locally using `localStorage`.

The current unfinished run is intentionally not persisted.

## 🔊 Audio & Game Feel

The game includes event-based audio feedback for important gameplay interactions.

Audio can be enabled or disabled from the settings menu.

The project also includes visual feedback for progression and important game events.

## ♿ Accessibility

The final version includes:

- Sound effects toggle
- Reduced-motion option
- Keyboard controls
- Mobile controls
- Visible keyboard focus styles
- Screen-reader live status announcements

These options allow players to adjust feedback and motion according to their preferences.

## 📱 Responsive Design

The interface is designed to work on desktop and smaller screens.

On mobile devices, dedicated on-screen movement controls are provided.

## 🧪 Playtesting

The game was tested by three participants using the same structured questions.

### Main findings

- The objective was clear to all three testers.
- Controls were generally easy to discover and use.
- No major confusion or control issue was reported.
- Two testers specifically requested more or more satisfying sound effects.
- Additional suggestions included increased difficulty and improved colour grading.

The strongest recurring finding was the need for more satisfying audio feedback.

## 🛠️ Technology

The project was built using:

- HTML5
- CSS3
- JavaScript
- HTML Canvas
- Web Audio API
- Browser Local Storage

No external game engine is required to run the game.

## 📁 Project Documentation

Additional project documentation includes:

- `GDD.md` — Game Design Document
- `STATE-DIAGRAM.md` — Game state documentation
- `EDGE-CASE-TEST-CHECKLIST.md` — Edge-case testing
- `PLAYTEST-NOTES.md` — Three-person playtest results
- `POSTMORTEM.md` — Final development postmortem
- `SUBMISSION.txt` — Submission information

## ▶️ Run Locally

Open `index.html` in a modern web browser.

For development, the project can also be run using VS Code with Live Server.

## 🌐 Published Build

Live game:

https://neon-dodge-edvyro.vercel.app/

## 👤 Credits

**Game:** NEON DODGE

**Developer:** Spandan Chatterjee

**Internship:** EdVyro — Game Development

**Platform:** Web Browser

**Technology:** HTML, CSS, JavaScript

## 📌 Final Project Status

The project includes:

- Core arcade gameplay
- Five-level progression
- 60-second win condition
- Score and best-score persistence
- Pause and restart functionality
- Keyboard controls
- Mobile controls
- Audio feedback
- Audio settings
- Reduced-motion support
- Accessibility feedback
- Responsive interface
- Playtesting documentation
- Development postmortem
- Credits
- Public web deployment