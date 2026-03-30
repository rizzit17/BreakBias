# Workday Replay: Dual Identity 🎭

![Workday Replay Hero Banner](https://via.placeholder.com/1200x400/0B0F1A/C5A3FF?text=Workday+Replay:+Dual+Identity)

> **Same work. Same day. Different reality.**

**Workday Replay: Dual Identity** is an interactive, visually stunning workplace bias simulation built to highlight the "reality gap" in modern corporate environments. Users experience identical scenarios—meetings, emails, and direct messages—through the lens of three different identities, revealing how perception, unconscious bias, and systemic structures alter everyday treatment.

---

## 🧠 Core Concept

The core theme is **"Dual Identity / Masked Reality."**
The UI itself is an active storytelling device.
- **Identical Actions, Different Outcomes:** Present the same idea in a meeting as a Male Manager (credit is given instantly) and as a Female Employee (the idea is interrupted and credited to someone else).
- **The "Reality Gap":** By directly comparing outcomes side-by-side, the experience shifts the conversation from "individual performance" to "systemic design flaws."
- **Structural Fixes:** Instead of "leaning in," users are given the tools to act by toggling structural interventions (like Blind Credit Attribution and Inclusive Language Policies) to stabilize the biased system.

---

## ✨ Key Features

- **Interactive Role Selection:** Experience the day as Alex (Male Manager), Sarah (Female Employee), or Jamie (Intern). Progression is tracked to unlock marginalized roles.
- **Dynamic Office UI:** Fully simulated, state-aware components including an Inbox, Calendar, and Slack-style Team Chat.
- **Bias Engine HUD:** Real-time metrics tracking your active Confidence, Visibility, and Interruptions through smooth, Framer Motion-powered progress bars.
- **Immersive Effects:**
  - **Avatar Morphing:** SVGs smoothly morph between identities on hover, revealing "ghost layers" of alternate realities.
  - **Chromatic Aberration & Glitching:** When a severe bias event occurs, the UI visually fractures, duplicating text and splitting screen colors.
  - **Bias Flash Notifications:** Immersive, non-intrusive red overlay alerts to immediately signal a recorded bias moment.
- **Side-by-Side Comparison Reveal:** The climax of the experience, enabling users to objectively compare identical actions and their wildly divergent outcomes simultaneously.

---

## 🛠 Tech Stack

Built with modern web technologies focused on UI polish and animation:

- **Framework:** [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Design System:** Custom CSS tokens implementing *Glassmorphism*, *Neon Accents*, and *Deep Dark Mode* (`#0B0F1A` base).

---

## 🚀 Getting Started

To run the simulation locally on your machine:

### 1. Clone & Navigate
Navigate to the project root directory in your terminal:
```bash
cd breakbias
```

### 2. Install Dependencies
Install all required Node modules:
```bash
npm install
```

### 3. Start the Development Server
Launch the application locally using Vite:
```bash
npm run dev
```

### 4. Experience the Simulation
Open your browser and navigate to the local host address provided in your terminal (typically `http://localhost:5173`).

---

## 🏗 Project Structure

```text
/
├── public/                # Static assets
├── src/
│   ├── components/
│   │   ├── effects/       # Glitch modes, morphing UIs, bias flashes
│   │   ├── layout/        # Navbar, Page layout wrappers
│   │   └── ui/            # Buttons, Cards, Badges, Modals
│   ├── context/           # Global Context for tracking bias states
│   ├── data/              # scenarios.json (Scenario engine logic)
│   ├── features/          # Complex UI clusters (Scenarios, Comparison, etc.)
│   ├── hooks/             # Custom Logic (useBiasEngine, useRoleState)
│   ├── pages/             # Route-level views
│   ├── styles/            # globals.css (Core design rules & keyframes)
│   ├── App.jsx            # Routing and wrapper
│   └── main.jsx           # React app entry point
└── tailwind.config.js     # Custom animations, colors, and plugins
```

---

## 🎨 Design Philosophy

The interface is intentionally layered. **Perception changes reality.**
- **Glassmorphism:** Frosted overlays that hint at something hidden underneath.
- **Offset Text:** "Ghost texts" subtly layered underneath primary headers, creating a feeling of alternate overlapping timelines.
- **Motion Polish:** Everything from hovering a button to navigating between screens utilizes fluid spring animations, so the UI feels premium, award-winning, and alive.

---

*This project is a conceptual simulation designed to foster empathy, drive systemic change, and promote actionable inclusivity in the modern workplace.*
