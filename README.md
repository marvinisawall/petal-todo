# 🌸 Petal — A Gentle Todo App

A beautiful, pastel-aesthetic to-do list app built with React + TypeScript + Vite.

![Petal Todo](https://img.shields.io/badge/React-18-61dafb?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat&logo=vite)

## ✨ Features

- **Add, complete & delete tasks** — smooth animations, gentle interactions
- **Categories** — Personal, Work, Health, Creative, Errands (with emoji & color)
- **Tags** — urgent, later, recurring, quick, deep focus
- **Priorities** — low / medium / high with color-coded dots
- **Notes** — attach a small note to any task (tap to expand)
- **Filters** — All, Active, Completed; filter by category or tag
- **Search** — instant search across task titles
- **Progress ring** — see your completion rate at a glance
- **Persistence** — tasks saved to `localStorage` automatically
- **Responsive** — works on mobile too

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deploy to Netlify

### Option 1 — Netlify UI (easiest)
1. Push this repo to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → "Add new site" → "Import an existing project"
3. Connect your GitHub repo
4. Build command: `npm run build` — Publish directory: `dist`
5. Click **Deploy**

### Option 2 — GitHub Actions (automated)
The workflow at `.github/workflows/deploy.yml` auto-deploys on every push to `main`.

Add these secrets to your GitHub repo (**Settings → Secrets → Actions**):
- `NETLIFY_AUTH_TOKEN` — from Netlify user settings → Personal access tokens
- `NETLIFY_SITE_ID` — from Netlify site settings → General → Site ID

### Option 3 — Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## 🎨 Design

- **Fonts**: Lora (display), DM Sans (body), Caveat (accent/handwritten)
- **Palette**: Soft pastel pinks, lavenders, sky blues, mints, butters
- **Aesthetic**: Organic, warm, garden-inspired — not generic AI output
- **Animations**: Framer Motion for task add/remove, panel expand, nav indicator

## 🗂 Project Structure

```
src/
├── components/
│   ├── AddTaskForm.tsx     # Expandable task creation form
│   ├── EmptyState.tsx      # Friendly empty states
│   ├── Sidebar.tsx         # Navigation, filters, stats
│   └── TaskItem.tsx        # Individual task with edit/delete/expand
├── hooks/
│   └── useTodos.ts         # All state + localStorage persistence
├── types/
│   └── index.ts            # TypeScript types
├── utils/
│   └── defaults.ts         # Default categories & tags
├── App.tsx
├── App.module.css
├── index.css               # Design tokens + global styles
└── main.tsx
```

## 📄 License

MIT
