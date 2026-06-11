<!-- 
SYNC IMPACT REPORT
==================
Version change: 0.0.0 (template) → 1.0.0 (initial ratification)
Added principles:
  - I. Clean Code
  - II. Structured HTML
  - III. CSS Architecture
  - IV. JavaScript Best Practices
  - V. Animated Premium Design
  - VI. No Bad Practices
Added sections:
  - Development Workflow
  - Quality Gates
  - Governance
Removed sections: N/A (template placeholders replaced)
Templates reviewed: plan-template.md ✅, spec-template.md ✅, tasks-template.md ✅
Follow-up TODOs: None
-->

# Weather App Constitution

## Core Principles

### I. Clean Code (NON-NEGOTIABLE)

Every file produced MUST be clean, readable, and maintainable:
- All code MUST be properly indented (2 spaces for HTML/CSS, consistent for JS).
- Variable and function names MUST be descriptive and in `camelCase` (JS) or `kebab-case` (CSS classes).
- Functions MUST do one thing only — no monolithic functions that mix API calls, DOM manipulation, and business logic.
- No dead code, commented-out blocks, or unused variables. Remove them.
- Every file MUST have a top-level comment block describing its purpose.

### II. Structured & Semantic HTML

HTML MUST serve as the clean backbone of the application:
- Use semantic elements: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<form>`.
- One `<h1>` per page; follow proper heading hierarchy (`h1 → h2 → h3`).
- All interactive elements MUST have unique, descriptive `id` attributes.
- Accessibility is non-negotiable: `aria-label`, `alt` on images, keyboard-navigable controls.
- No inline styles in HTML. All styling goes in `styles.css`.

### III. CSS Architecture (Variables & BEM-lite)

All styling MUST use a consistent, maintainable architecture:
- All design tokens (colors, fonts, spacing, blur values) MUST be defined as CSS custom properties (`--var-name`) in `:root`.
- No magic numbers. Every value MUST trace back to a token or be self-documented with a comment.
- Use a BEM-lite naming convention: `.block`, `.block__element`, `.block--modifier`.
- Glassmorphism properties (`backdrop-filter`, `background: rgba()`, `border`) are design-system-level and MUST be defined as utility classes (e.g., `.glass-card`).
- Animations MUST use `@keyframes` with explicit `animation-fill-mode: both`. Avoid animating layout properties (`width`, `height`, `top`); prefer `transform` and `opacity`.
- MUST respect `prefers-reduced-motion` media query.

### IV. JavaScript Best Practices

All JavaScript MUST follow modern ES6+ conventions and clear separation of concerns:
- MUST use `async/await` with `try/catch` for all API calls. No raw `.then()` chains without error handling.
- Separation of concerns is MANDATORY:
  - `api.js`: Only responsible for fetching and returning raw data.
  - `ui.js`: Only responsible for DOM updates and rendering.
  - `app.js`: Only responsible for wiring events to API and UI logic.
- No `var`. Use `const` by default; `let` only when reassignment is required.
- Error paths MUST be handled explicitly — never silently fail.
- The API key MUST be defined as a named constant at the top of `api.js`, not hardcoded inline in fetch URLs.

### V. Premium Animated Dark Design

The visual design MUST feel premium, modern, and alive:
- Dark Mode is mandatory. Background MUST use a deep dark color (e.g., `#0a0a1a` or similar near-black navy).
- The primary design aesthetic is **Glassmorphism**: frosted glass panels using `backdrop-filter: blur()` and semi-transparent `rgba` backgrounds.
- At least one ambient background animation MUST be present (e.g., floating gradient orbs, subtle particle motion).
- All interactive elements (buttons, cards, inputs) MUST have smooth hover/focus micro-animations (`transition: all 200-300ms ease`).
- Weather icons MUST be visually rich (use OpenWeatherMap icons or custom SVG-based equivalents).
- Typography MUST come from Google Fonts — no browser defaults. Preferred: `Inter` for body, `Sora` or `Outfit` for display.

### VI. No Bad Practices

The following are FORBIDDEN at all times:
- ❌ `!important` in CSS (except a single, documented reset rule if unavoidable).
- ❌ `innerHTML` with user-supplied or uncleaned data.
- ❌ Hardcoded pixel values outside of the design token system for core spacing.
- ❌ Global JavaScript state without clear ownership.
- ❌ Synchronous blocking operations in the main thread.
- ❌ Inline event handlers in HTML (e.g., `onclick="..."`). Use `addEventListener`.

## Development Workflow

### Code Quality Gate

Before any task is considered complete, the following MUST hold:
1. HTML validates with no errors (check using browser DevTools or W3C Validator).
2. CSS contains no orphaned rules or overrides that cancel each other out.
3. JS passes a mental linter check: no `var`, no unused vars, no missing `await`.
4. Animations run at 60fps (verify in DevTools Performance panel).
5. The app renders and functions correctly at both mobile (375px) and desktop (1280px) widths.

### Commit Discipline

- Commit after each logical task group (e.g., after completing `styles.css`, after completing `api.js`).
- Commit messages MUST be descriptive: `feat: implement glassmorphism weather card UI`.

## Quality Gates

| Gate | Standard |
|------|----------|
| HTML Semantic Quality | All semantic elements used correctly, one `h1`, no inline styles |
| CSS Token Coverage | 100% of colors/fonts reference CSS custom properties |
| JS Error Handling | All `async` functions wrapped in `try/catch` |
| Animation Performance | No layout-thrashing animations; `transform`/`opacity` only |
| Accessibility | Keyboard-navigable, ARIA labels on icons, alt text |

## Governance

This constitution supersedes all other coding practices for this project. Any amendment requires:
1. A documented rationale describing why the principle must change.
2. Version bump following semantic versioning rules.
3. Review of all dependent spec, plan, and task documents.

All code produced by agents MUST pass the Quality Gates above before being considered complete.

**Version**: 1.0.0 | **Ratified**: 2026-06-11 | **Last Amended**: 2026-06-11
