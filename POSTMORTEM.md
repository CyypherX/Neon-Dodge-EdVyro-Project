# NEON DODGE — Development Postmortem

## 1. Project Overview

NEON DODGE is a browser-based neon arcade survival game developed as part of the EdVyro Game Development Internship.

The player controls a neon character, avoids incoming obstacles, earns score, and progresses through increasing difficulty levels.

The final objective is to survive for 60 seconds.

---

## 2. Project Goals

The main goals of the project were:

- Create a simple but engaging arcade gameplay loop.
- Make the objective immediately understandable.
- Implement predictable game states.
- Add score and difficulty progression.
- Support restart and pause functionality.
- Persist the player's best score.
- Provide keyboard and mobile controls.
- Add audio and visual feedback.
- Include accessibility options such as mute and reduced motion.
- Publish a stable playable version.

---

## 3. Development Challenges

### Game State Management

One of the main challenges was keeping the different game states predictable.

The game uses:

- START
- PLAYING
- PAUSED
- WON
- LOST

This made it possible to control when gameplay, scoring, timers, and progression should run.

### Difficulty Progression

The game needed to become progressively harder without making the experience immediately frustrating.

The final version uses five levels, with progression occurring during the 60-second survival challenge.

### Accessibility

Another challenge was supporting different player preferences.

The game includes:

- Sound effects toggle
- Reduced-motion option
- Keyboard controls
- Mobile controls
- Visible keyboard focus styles
- Screen-reader status announcements

### Responsive Design

The game needed to remain usable on smaller screens.

The interface was adjusted to support mobile layouts and on-screen movement controls.

---

## 4. Playtesting Results

Three people tested the game using the same five questions.

### Common Results

All three testers found the objective clear.

The testers also generally found the controls easy to discover and use.

No major confusion or control problem was reported.

### Main Feedback

The strongest repeated feedback was about sound effects.

Two testers specifically requested more or more satisfying sound effects.

Other suggestions included:

- Increasing difficulty
- Improving colour grading

---

## 5. Changes Made After Playtesting

Based on the playtesting feedback, the project was improved with stronger event-based feedback and additional attention to satisfying gameplay sounds.

The interface was also polished to improve the overall presentation of the final build.

---

## 6. Final Result

The final version provides:

- Five difficulty levels
- 60-second survival objective
- Score tracking
- Best-score persistence
- Pause and restart states
- Keyboard controls
- Mobile controls
- Sound settings
- Reduced-motion settings
- Accessibility feedback
- Visual progression feedback
- Responsive interface
- Credits
- Public playable deployment

---

## 7. What Went Well

The core gameplay loop remained simple and easy to understand.

The state and progression system made the game predictable and easier to test.

Playtesting confirmed that the objective and controls were understandable.

The game was also successfully published as a playable web build.

---

## 8. What Could Be Improved

Future improvements could include:

- More varied obstacle patterns
- Additional visual themes
- More detailed sound design
- More difficulty levels
- Additional gameplay mechanics
- More extensive mobile testing
- More original visual assets

---

## 9. Future Development

If development continues, the next version could include:

- New obstacle types
- Power-ups
- Combo scoring
- Leaderboards
- Additional game modes
- More advanced visual effects
- More detailed audio feedback
- Additional accessibility options

---

## 10. Credits

**Game:** NEON DODGE

**Developer:** Spandan Chatterjee

**Internship:** EdVyro — Game Development

**Technology:** HTML, CSS, JavaScript

**Platform:** Web Browser