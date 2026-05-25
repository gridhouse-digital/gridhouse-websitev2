# Premium UI Upgrade — Design Spec
**Date:** 2026-05-25
**Approach:** Global token upgrade + targeted components (Approach 1)
**Constraint:** WebGL hero (`SimulationMatrixCanvas`, `WebGLPanel`) and all GSAP entry animations are untouched. Hero GSAP timing is refined only — not restructured.

---

## Context

The site has a strong dark-mode aesthetic with WebGL, GSAP animations, and a coherent design system. The goal is to push it from "well-executed" to "premium agency" by deepening the surface language, improving typographic contrast, adding magnetic interactions, and upgrading the navigation to a floating pill that responds to scroll. All changes are additive and token-driven — no page structure or content is modified.

---

## 1. Design Tokens

### `tailwind.config.js` additions

**Named box-shadow utilities** (under `theme.extend.boxShadow`):
```js
'glow-accent':        '0 0 40px -10px rgba(255,69,0,0.35), 0 25px 60px -15px rgba(255,69,0,0.3)',
'glow-accent-subtle': '0 20px 60px -20px rgba(255,69,0,0.25)',
'nav-pill':           'inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.5)',
```

**Updated letter-spacing on font sizes** (tighter tracking for display text):
- `display-lg`: add `letterSpacing: '-0.05em'`
- `display-md`: add `letterSpacing: '-0.03em'`

### `globals.css` additions

```css
/* Top-edge glow line — add as pseudo on any .glow-surface element */
.glow-surface {
  position: relative;
}
.glow-surface::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,69,0,0.55), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.glow-surface:hover::before {
  opacity: 1;
}

/* Base for magnetic tilt cards */
.magnetic-card {
  transform-style: preserve-3d;
  perspective: 600px;
}
```

---

## 2. Cards & Surfaces

All card hover transitions standardised to `duration-400` (replacing mixed 300/500ms).

### `SystemCard.tsx`
- Background: add `bg-gradient-to-br from-accent/[0.06] to-transparent` alongside existing `bg-white/[0.02]`
- Border base: `border-white/10` → `border-accent/[0.15]`
- Border hover: `hover:border-white/20` → `hover:border-accent/[0.35]`
- Shadow hover: add `hover:shadow-glow-accent`
- Add class `glow-surface` for top-edge glow line

### `ServiceCard.tsx`
- Add `glow-surface` class to the article element
- Add `bg-gradient-to-br from-accent/[0.06] to-transparent` beneath the existing `bg-tech-grid-32`
- Hover shadow: replace inline `shadow-[0_20px_60px_-20px_rgba(255,69,0,0.25)]` with `hover:shadow-glow-accent`
- Left accent rail: keep as-is (already correct)

### `CaseStudyCard.tsx`
- Add `glow-surface` class to the article element
- Add `bg-gradient-to-br from-accent/[0.06] to-transparent` to the card wrapper
- Border hover: `hover:border-accent/40` → `hover:border-accent/[0.5]`
- Add `hover:shadow-glow-accent-subtle`

### Magnetic tilt
Applied to `CaseStudyCard` and `SystemCard` (standalone panels). Controlled by `useMagneticTilt` hook — see Section 4.

---

## 3. Typography & Spacing

### Heading weight contrast
- Hero `h1`: wrap the final phrase in `<strong className="font-medium">` — markup convention, no utility change
- Section `h2`: `font-light` → `font-normal` site-wide (update in `SectionHeader.tsx` and `PageHeader.tsx`)
- Card `h3`: keep `font-light`

### Body copy dimming
| Current class | Updated class |
|---|---|
| `text-white/70` (primary descriptions) | `text-white/50` |
| `text-white/60` (secondary text) | `text-white/38` |

Apply in: `ServiceCard.tsx`, `CaseStudyCard.tsx`, `InsightCard.tsx`, `ProductSystemPanel.tsx`

### New `StatBlock` component
**File:** `src/components/ui/StatBlock.tsx`

```tsx
interface Props { value: string; label: string; }
export default function StatBlock({ value, label }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-display font-light text-display-sm text-white leading-none tracking-[-0.04em]">
        {value}
      </span>
      <span className="text-mono-label text-white/30">{label}</span>
    </div>
  );
}
```

Used in `CaseStudyCard` and any card that surfaces metric data.

---

## 4. Interactions & Motion

### `useMagneticTilt` hook
**File:** `src/hooks/useMagneticTilt.ts`

```ts
// Attaches mousemove/mouseleave to a ref'd element.
// Reads usePrefersReducedMotion — no-ops if reduced motion is on.
// Max tilt: ±8° horizontal, ±6° vertical. translateZ(4px) on hover.
// Reset easing: cubic-bezier(0.23, 1, 0.32, 1) over 500ms.
```

Applied via `useEffect` in `CaseStudyCard.tsx` and `SystemCard.tsx`.

### Hero GSAP animation — `src/pages/HomePage.tsx`

**Current values → updated values:**
| Property | Current | Updated |
|---|---|---|
| `duration` | `1` | `1.2` |
| `stagger` | `0.09` | `0.12` |
| `ease` | `"power3.out"` | `"expo.out"` |
| `y` (start) | `30` | `40` |
| `delay` | none | `0.2` |

**Second animation pass (new):** After hero lines settle, fade in sub-copy and CTA button:
```js
gsap.fromTo(
  [subCopyRef.current, ctaRef.current],
  { opacity: 0, y: 12 },
  { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.1,
    delay: 0.2 + (lines.length * 0.12) + 1.2 }
)
```
Requires adding `ref` attributes to the sub-copy paragraph and CTA button in `HomePage.tsx`.

### Scroll reveal standardisation
All `PageHeader.tsx` and section-entry GSAP triggers: update to `ease: "expo.out", duration: 1.1` for consistency with the updated hero.

---

## 5. Navigation & Header

**File:** `src/components/layout/SiteHeader.tsx` — full rewrite of the header element.

### Structure
```
<div className="fixed top-0 inset-x-0 z-30 px-4 pt-3">   ← outer positioner
  <header className="... floating pill ...">               ← pill
    logo | nav links | cta
  </header>
</div>
```

### Pill classes (default state)
```
h-14 rounded-sm
bg-ink-deep/70 backdrop-blur-2xl backdrop-saturate-150
border border-white/[0.07]
shadow-nav-pill
transition-all duration-300 ease-out
```

### Pill classes (scrolled state — `scrollY > 40`)
```
h-11
bg-ink-deep/90 backdrop-blur-3xl
border-white/[0.05]
```

### `useScrolled` hook (inline, ~8 lines)
```ts
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const handler = () => setScrolled(window.scrollY > 40);
  window.addEventListener('scroll', handler, { passive: true });
  return () => window.removeEventListener('scroll', handler);
}, []);
```

### Active link dot indicator
```tsx
// Inside NavLink className callback, when isActive:
<span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-accent" />
```
NavLink wrapper needs `relative` positioning.

### Logo
- Base: `opacity-100`
- Hover: `opacity-70 transition-opacity duration-300`

### Header CTA button
```
bg-accent/[0.05] border-accent/40
hover:bg-accent/[0.12] hover:border-accent/70
```

---

## Verification

1. `npm run dev --prefix gridhouse-digital-react-site` — confirm dev server starts clean
2. Visit `/` — hero lines should animate in with the new `expo.out` easing, sub-copy and CTA fade in after
3. Scroll down on any page — pill nav should shrink smoothly at 40px scroll
4. Hover over a `CaseStudyCard` — magnetic tilt, top-edge glow line, and orange bloom shadow should all activate
5. Hover over a `ServiceCard` — deep glow gradient, left accent rail, and standardised shadow
6. `npm run build --prefix gridhouse-digital-react-site` — TypeScript strict check must pass (no unused vars)
7. `npm run lint --prefix gridhouse-digital-react-site` — zero ESLint errors
8. Test with OS reduced-motion enabled — all GSAP and magnetic tilt effects should be suppressed
