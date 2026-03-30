# BreakBias

BreakBias is an interactive web app that demonstrates how workplace bias changes outcomes across the same work scenarios.

Users can run:
- `Simulation Mode`: prebuilt scenarios for quick demo/testing.
- `Personal Mode`: Google login + profile setup (including gender/company) + AI-personalized scenarios and response judgement.

## Why This Project

BreakBias is designed to make bias visible, concrete, and discussable.
Instead of abstract theory, it uses realistic day-to-day moments (meeting, email, chat) and tracks impact over a session.

## Core Features

- Dual mode experience: `Simulation` and `Personal`.
- Scenario engine with stage-based progression.
- AI-generated personal scenarios in Personal Mode only.
- AI judgement rubric for personal responses (communication, assertiveness, clarity, boundary-setting, risk).
- Personal profile flow (`name`, `gender`, `role`, `industry`, `company`, `experience`).
- Bias impact feedback and session stats.
- Comparison/intervention modules for simulation path.
- Responsive React UI with animated transitions.

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Firebase Auth (Google)
- Vercel Serverless Functions (`api/personal-ai`) for AI generation and evaluation

## Project Structure

```text
src/
  components/
    effects/
    layout/
    ui/
  context/
  data/
  features/
  hooks/
  pages/
    user/
  services/
  styles/
```

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Default Vite URL is usually:

```text
http://localhost:5173
```

## Firebase Setup (for Personal Mode)

Personal mode uses Google login via Firebase Auth.

1. Create or open a Firebase project.
2. Enable `Authentication > Sign-in method > Google`.
3. Add your local domain in `Authentication > Settings > Authorized domains`.
4. Update Firebase config in:

```text
src/services/firebase.js
```

## Build and Preview

```bash
npm run build
npm run preview
```

## Deployment (Firebase Hosting)

This repo includes `firebase.json` configured for SPA rewrite to `index.html`.

Typical deploy flow:

```bash
npm run build
firebase deploy
```

## AI Setup (Personal Mode)

The Personal Mode AI endpoint lives at:

```text
api/personal-ai.js
```

Set these environment variables in Vercel:

- `GEMINI_API_KEY` (required for live AI responses)
- `GEMINI_MODEL` (optional, default is `gemini-2.0-flash`)

If `GEMINI_API_KEY` is missing or AI call fails, the app falls back to local deterministic scenario/evaluation logic so Personal Mode still works.

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run preview` - preview production build locally

## Notes

- Simulation mode is kept independent from personal mode.
- Personal mode requires auth + profile context to generate personalized scenario flow.

## License

Add your preferred license here (for example MIT) before public distribution.
