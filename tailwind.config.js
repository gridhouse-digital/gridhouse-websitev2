/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#FF4500",
        ink: "#0F0F0F",
        "ink-deep": "#0A0A0A",
        void: "#050505", // canvas / WebGL backplates (was bg-[#050505])
        shell: "#F4F3ED",
        "text-muted": "#71717A", // neutral mid-gray (= zinc-500); dots, muted UI
        success: "#34D399", // status-positive (= emerald-400); light theme remaps via --gh-success
        "success-deep": "#10B981", // status-positive surfaces/borders (= emerald-500)
      },
      fontFamily: {
        display: [
          "Space Grotesk",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        body: [
          "Space Grotesk",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "Syncopate",
          "Space Grotesk",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        "body-sm": ["15px", { lineHeight: "24px" }],
        "body-md": ["16px", { lineHeight: "26px" }],
        "display-sm": ["clamp(22px, 2.5vw, 32px)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(28px, 4vw, 48px)", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(48px, 7vw, 96px)", { lineHeight: "1", letterSpacing: "-0.05em" }],
        "display-hero": ["clamp(38px, 5.8vw, 80px)", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "display-numeral": ["64px", { lineHeight: "1" }],
      },
      letterSpacing: {
        display: "-0.04em",
      },
      maxWidth: {
        rail: "1440px",
      },
      boxShadow: {
        'glow-accent':        '0 0 40px -10px rgba(255,69,0,0.35), 0 25px 60px -15px rgba(255,69,0,0.3)',
        'glow-accent-subtle': '0 20px 60px -20px rgba(255,69,0,0.25)',
        'nav-pill':           'inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.5)',
      },
      transitionDuration: {
        '400': '400ms',
      },
      backgroundImage: {
        "shell-border":
          "linear-gradient(to bottom, rgba(113,113,122,0.4), rgba(39,39,42,0.4), rgba(0,0,0,0.8))",
      },
      animation: {
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-dot": {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
    },
  },
  plugins: [],
};
