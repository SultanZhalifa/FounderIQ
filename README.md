# FounderIQ -- AI Co-Founder Platform

> Validate startup ideas, generate business models, craft investor pitches, and analyze markets -- powered by Claude AI.

[![Next.js](https://img.shields.io/badge/Next.js-15-000?style=flat&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=flat&logo=typescript)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?style=flat&logo=vercel)](https://vercel.com/)

---

## Features

- **Idea Validator** -- Get a VC-grade score (0--100) with strengths, weaknesses, opportunities, and actionable next steps.
- **Business Canvas** -- Auto-generate a full 9-box Business Model Canvas in seconds.
- **Pitch Crafter** -- Craft a punchy tagline, 30-second elevator pitch, and full investor narrative.
- **Market Intel** -- Understand your TAM/SAM/SOM, top competitors, and go-to-market strategy.
- **Full Report** -- Run all four tools on a single idea at once for a complete startup brief.
- **History** -- Every analysis is saved locally and can be reopened, re-run, exported, or deleted.
- **Export & Share** -- Copy or download any result as Markdown, print / save as a clean PDF, or share a link that re-generates the analysis.

All tools stream structured AI responses in real-time using the Vercel AI SDK.

---

## Tech Stack

| Layer       | Technology                          |
| :---------- | :---------------------------------- |
| Framework   | Next.js 15 (App Router)             |
| Language    | TypeScript (strict mode)            |
| Styling     | Tailwind CSS v4                     |
| Components  | shadcn/ui                           |
| Animation   | Framer Motion                       |
| AI          | Vercel AI SDK + Anthropic Claude    |
| State       | Zustand (persisted to localStorage) |
| Validation  | Zod                                 |
| Testing     | Vitest                              |
| Package Mgr | pnpm                                |
| Deployment  | Vercel                              |

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- Anthropic API Key -- [console.anthropic.com](https://console.anthropic.com)

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/founderiq.git
cd founderiq

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Add your Anthropic API key to .env.local
# ANTHROPIC_API_KEY=sk-ant-...

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Project Structure

```
founderiq/
  app/
    (dashboard)/          -- Dashboard layout with sidebar
      validate/           -- Idea validation tool
      canvas/             -- Business Model Canvas tool
      pitch/              -- Pitch crafting tool
      market/             -- Market analysis tool
      report/             -- Full Report (all four tools at once)
      history/            -- Saved analyses (list + [id] detail)
    api/analyze/          -- Streaming AI endpoint (rate-limited)
    robots.ts, sitemap.ts -- SEO
    page.tsx              -- Landing page
    layout.tsx            -- Root layout + metadata
  components/
    ui/                   -- shadcn/ui primitives
    layout/               -- Sidebar, header, mobile nav
    tools/                -- Result views, ResultActions, ResultView
    shared/               -- Reusable components
  hooks/                  -- useAnalyze, useReport, useIdeaFromUrl, useHydrated
  store/                  -- Zustand store (persists full analysis records)
  prompts/                -- AI system prompts
  lib/                    -- export, share, rate-limit, format, utils, config
  types/                  -- TypeScript type definitions
  __tests__/              -- Vitest unit tests
```

---

## Scripts

```bash
pnpm dev      # start the dev server
pnpm build    # production build (type-checks the whole app)
pnpm lint     # ESLint
pnpm test     # run the Vitest unit suite
pnpm format   # Prettier
```

Tests cover the Markdown export serializers, the Zod request/result schemas, and the
API rate limiter (`__tests__/`).

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Set `ANTHROPIC_API_KEY` in Environment Variables
4. Deploy

### Manual

```bash
pnpm build
pnpm start
```

---

## Environment Variables

| Variable            | Required | Description            |
| :------------------ | :------- | :--------------------- |
| `ANTHROPIC_API_KEY` | Yes      | Your Anthropic API key |

---

## License

MIT
