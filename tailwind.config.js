/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#FF4500",
        ink: "#0F0F0F",
        "ink-deep": "#0A0A0A",
        shell: "#F4F3ED",
        "text-muted": "#71717A",
        reserved: "#FFF80A",
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
        "label-md": ["10px", { lineHeight: "15px", letterSpacing: "0.16em" }],
        "body-md": ["16px", { lineHeight: "26px" }],
        "display-sm": ["clamp(22px, 2.5vw, 32px)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(28px, 4vw, 48px)", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(48px, 7vw, 96px)", { lineHeight: "1", letterSpacing: "-0.05em" }],
      },
      letterSpacing: {
        mono: "0.16em",
      },
      maxWidth: {
        rail: "1440px",
      },
      backgroundImage: {
        "ignition-overlay":
          "linear-gradient(to bottom right, rgba(255, 184, 0, 0.4), transparent, rgba(154, 0, 255, 0.3))",
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
