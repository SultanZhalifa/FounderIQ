import Link from "next/link";

const FEATURES = [
  {
    id: "validate",
    name: "Idea Validator",
    description:
      "Get a VC-grade score from 0 to 100 with actionable strengths, weaknesses, opportunities, and next steps.",
    href: "/validate",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    id: "canvas",
    name: "Business Canvas",
    description:
      "Auto-generate a complete 9-box Business Model Canvas from a single paragraph about your idea.",
    href: "/canvas",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: "pitch",
    name: "Pitch Crafter",
    description:
      "Craft a punchy tagline, 30-second elevator pitch, and full investor narrative in one click.",
    href: "/pitch",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    id: "market",
    name: "Market Intel",
    description:
      "Understand your TAM, SAM, SOM, top competitors, market trends, and go-to-market strategy.",
    href: "/market",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2.5">
          <img src="/logo.svg" alt="FounderIQ" className="w-8 h-8 rounded-lg" />
          <span className="text-sm font-bold tracking-tight">FounderIQ</span>
        </div>
        <Link
          href="/validate"
          className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Open App
          <svg
            className="inline-block w-3 h-3 ml-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-2xl mx-auto animate-[fadeUp_0.6s_ease-out_both]">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-4">
            Your AI
            <br />
            <span className="text-foreground">Co-Founder</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
            Validate ideas, build business models, craft investor pitches, and analyze markets — all
            in one place.
          </p>

          {/* CTA */}
          <Link
            href="/validate"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors"
          >
            Open App
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mt-20 w-full animate-[fadeUp_0.6s_ease-out_0.2s_both]">
          {FEATURES.map((feature) => (
            <Link
              key={feature.id}
              href={feature.href}
              className="group block p-5 rounded-xl border border-border bg-card hover:border-foreground/20 hover:bg-foreground/[0.03] transition-all duration-300 text-center"
            >
              <div className="text-muted-foreground group-hover:text-foreground transition-colors mb-3 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold mb-1 group-hover:text-foreground transition-colors">
                {feature.name}
              </h3>
              <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Full Report highlight */}
        <Link
          href="/report"
          className="group inline-flex items-center gap-2 mt-8 px-4 py-2 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors animate-[fadeUp_0.6s_ease-out_0.3s_both]"
        >
          <span className="text-[9px] font-bold tracking-[1.5px] uppercase text-foreground/80 bg-foreground/10 rounded px-1.5 py-0.5">
            New
          </span>
          Generate a Full Report — all four tools on one idea
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-center gap-4 px-6 py-6 text-[11px] text-muted-foreground/40">
        <span>FounderIQ</span>
        <span>—</span>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-muted-foreground transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      </footer>
    </div>
  );
}
