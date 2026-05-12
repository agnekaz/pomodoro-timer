# Pomodoro timer

A small single-page Pomodoro timer built with **React**, **TypeScript**, **Vite**, and **Sass**. Timer logic lives in a `useReducer` hook (`usePomodoroTimer`); the UI is a minimal `Timer` component plus layout in `App`.

## Behaviour

- **Work**: 25 minutes (default).
- **Short break**: 5 minutes after each completed work session, except every fourth completion.
- **Long break**: 15 minutes after every **fourth** completed work session (after work sessions 4, 8, 12, …).
- **Start / Pause**: toggles the countdown; when time reaches zero while running, the session switches automatically.
- **Session counter**: shows the next work session number (`completed work sessions + 1`).

Durations and the “long break every 4 work sessions” rule are defined in `src/hooks/usePomodoroTimer.ts` in the `config` object and the `SWITCH_SESSION` branch of the reducer.

## Tech stack

| Piece        | Role                          |
| ------------ | ----------------------------- |
| React 19     | UI                            |
| TypeScript   | Types and build-time checks   |
| Vite 8       | Dev server and production build |
| Sass         | `App.scss` styles             |
| ESLint       | `npm run lint`                |


## Prerequisites

- **Node.js** (current LTS is fine)
- **npm** (or use your preferred client with equivalent commands)

## Scripts

| Command          | Description                                      |
| ---------------- | ------------------------------------------------ |
| `npm run dev`    | Start the Vite dev server (HMR)                  |
| `npm run build`  | Typecheck (`tsc -b`) then production Vite build  |
| `npm run preview`| Serve the built app from `dist/`                 |
| `npm run lint`   | Run ESLint on the project                        |

## Project layout

```
src/
  App.tsx                 # Page shell and title
  App.scss                # Layout and timer styling
  main.tsx                # React root
  index.css               # Global baseline (e.g. full-height root)
  components/
    Timer.tsx             # Displays session, time, session #, Start/Pause
  hooks/
    usePomodoroTimer.ts   # Reducer, intervals, session switching
  utils/
    formatTime.ts         # `MM:SS` formatting for the countdown
```
