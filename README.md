# P-SCMR Calculator

P-SCMR Calculator is a small web app for quantifying Personal Silicon-Carbon Metabolic Rate: the balance between AI-created value and the real cost of using AI in day-to-day work.

Live site: [https://p-scmr.top](https://p-scmr.top)

## What It Does

- Calculates P-SCMR in real time from revenue-side and cost-side inputs
- Shows a clear `S / A / B / C / D` rating
- Visualizes revenue and cost breakdowns
- Tracks historical results in `localStorage`
- Supports CSV import and export for personal tracking

## Core Inputs

Revenue side includes:

- Direct monetization from AI output
- Time saved by AI
- Asset value created by reusable outputs
- Quality premium
- Cross-project or brand synergy

Cost side includes:

- API or token spend
- Human time spent prompting and correcting
- Infrastructure cost
- Drift / retry time
- Opportunity cost time

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Chart.js
- Framer Motion

## Local Development

Install dependencies:

```bash
npm install
```

Start the default dev server:

```bash
npm run dev
```

If port `3000` is already occupied on your machine, use the dedicated local script:

```bash
npm run dev:3099
```

Then open:

- `http://localhost:3000`
- or `http://localhost:3099`

## Production Build

```bash
npm run build
```

## Deployment

This project is connected to Vercel and GitHub.

- Production domain: [https://p-scmr.top](https://p-scmr.top)
- Repository: [https://github.com/ProdRaymone/p-scmr-calculator](https://github.com/ProdRaymone/p-scmr-calculator)

After the GitHub integration is connected, pushing to `main` triggers automatic deployment.

## Notes

- History is stored locally in the browser, not on a backend
- CSV import/export is intended for personal analysis workflows
- The calculator is decision support, not financial or medical advice
