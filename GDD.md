# NEON DODGE — Game Design Document

## 1. Game Overview
**Title:** Neon Dodge  
**Genre:** Arcade / Survival  
**Platform:** Web Browser  
**Prototype Type:** Playable single-player prototype  
**Core mechanic:** Move horizontally to avoid falling neon obstacles and survive as long as possible.

## 2. Target Audience
Casual and beginner-to-intermediate players who enjoy short arcade sessions, score chasing, reflex challenges, and visually simple neon-themed games.

## 3. Game Goal
The player's objective is to survive for **60 seconds** without colliding with an obstacle. The player's score increases continuously with survival time. A personal best score is stored locally in the browser.

## 4. Rules
1. The player controls a neon spaceship at the bottom of the play area.
2. Obstacles spawn from the top and move downward.
3. The player can move only horizontally.
4. Touching an obstacle ends the current run.
5. The game becomes progressively harder as survival time increases.
6. Surviving for 60 seconds completes the target objective.
7. The highest score is saved as the local best score.

## 5. Controls
| Input | Action |
|---|---|
| Left Arrow / A | Move left |
| Right Arrow / D | Move right |
| Space | Start or restart |
| On-screen ← / → buttons | Mobile movement |

## 6. Core Gameplay Loop
**Start → Move → Avoid obstacles → Survive → Score increases → Collision / 60-second completion → Game Over / Success → Restart**

## 7. Feedback States
- **Start screen:** Explains objective and controls.
- **Playing state:** Shows score, timer, best score, player, obstacles, grid, and visual effects.
- **Collision state:** Displays game-over feedback and final score/time.
- **Success state:** Displays that the 60-second survival target has been completed.
- **Restart state:** Allows the player to immediately start another run.

## 8. Scope
The prototype intentionally focuses on one clear mechanic: horizontal movement and obstacle avoidance. Art is created with browser canvas primitives and CSS rather than external assets, keeping the prototype fast to test and easy to reproduce.

## 9. Success Criteria
The prototype passes when:
- The game starts from the start screen.
- The player can move left and right.
- Obstacles spawn and move toward the player.
- Collision ends the run.
- Score and survival time update during play.
- The 60-second target can be completed.
- The game can be restarted.
- The prototype works on desktop and provides basic touch controls on mobile.
