---

description: "Task list for Weather App implementation"
---

# Tasks: Weather App

**Input**: Design documents from `/specs/001-weather-app/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1)
- Exact file paths included in every task description.

## Path Conventions

Single web project layout (per plan.md):

```
src/
├── index.html
├── css/styles.css
├── js/
│   ├── api.js
│   ├── ui.js
│   └── app.js
└── assets/
```

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Scaffold the project directory structure and link all files correctly.

- [x] T001 Create directory structure: `src/`, `src/css/`, `src/js/`, `src/assets/` at repository root
- [x] T002 Create `src/index.html` with semantic HTML skeleton: `<header>`, `<main>`, `<section id="search">`, `<section id="weather-result">`, `<footer>`. Link `src/css/styles.css` and `src/js/app.js` (`type="module"`).
- [x] T003 [P] Create `src/css/styles.css` with all CSS custom property tokens (`--clr-bg`, `--clr-glass`, `--clr-accent`, `--font-display`, `--font-body`, `--blur-glass`, etc.) in `:root`
- [x] T004 [P] Create empty module stubs: `src/js/api.js`, `src/js/ui.js`, `src/js/app.js` — each with a top-level file-purpose comment block

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before the user story can be implemented.

**⚠️ CRITICAL**: No user story work begins until this phase is done.

- [x] T005 Define the `API_KEY` and `BASE_URL` constants and the `fetchWeather(cityName)` async function shell in `src/js/api.js`
- [x] T006 Define all UI renderer function shells in `src/js/ui.js`: `showLoading()`, `showError(message)`, `showWeather(data)`, `clearResults()`
- [x] T007 Implement base dark-mode layout in `src/css/styles.css`: full-viewport dark gradient background (`#0a0a1a` → `#0d1b2a`), centered flex layout for the main container, Google Fonts import (`Inter`, `Outfit`)
- [x] T008 Implement the ambient background animation in `src/css/styles.css`: two floating gradient orbs using `@keyframes float` on `transform: translate()` (no layout properties). Apply `prefers-reduced-motion` override.

**Checkpoint**: Foundation ready — design system is live, module stubs exist, dark background animates.

---

## Phase 3: User Story 1 — Search for a City's Weather (Priority: P1) 🎯 MVP

**Goal**: User enters a city name, submits the form, and sees temperature, humidity, wind, description, and icon for that city. Errors (bad city, network failure) are displayed gracefully.

**Independent Test**: Open `src/index.html` via a local server, type "London", hit search → verify weather data renders. Then type "UnknownCity999" → verify a styled error message appears without breaking the layout.

### Implementation for User Story 1

- [x] T009 [P] [US1] Build the search form HTML in `src/index.html`: `<form id="search-form">` containing `<input id="city-input" type="text" placeholder="Search city...">` and `<button type="submit" id="search-btn">`. Add `aria-label` to input and button.
- [x] T010 [P] [US1] Build the weather result card HTML in `src/index.html` inside `<section id="weather-result">`: include `<div id="weather-card" class="glass-card hidden">` containing placeholders for city name, country, temperature, description, icon, humidity, and wind speed.
- [x] T011 [US1] Implement `fetchWeather(cityName)` fully in `src/js/api.js`: construct URL with `?q=`, `&units=metric`, `&appid=`, call `fetch()` with `async/await` inside `try/catch`, throw a typed `Error` on non-200 status (e.g., `cod: 404`), return mapped `WeatherData` object (`cityName`, `country`, `temperature`, `humidity`, `windSpeed`, `description`, `iconCode`)
- [x] T012 [US1] Implement `showWeather(data)` in `src/js/ui.js`: inject weather data fields into DOM targets, set `<img>` `src` to `https://openweathermap.org/img/wn/{iconCode}@2x.png`, remove `hidden` class from `#weather-card`, apply entrance animation class
- [x] T013 [US1] Implement `showError(message)` in `src/js/ui.js`: render a styled error state inside `#weather-result` (replace card or show sibling error element), provide a human-readable message (e.g., "City not found. Try again.")
- [x] T014 [US1] Implement `showLoading()` and `clearResults()` in `src/js/ui.js`: `showLoading()` shows a spinner/skeleton within `#weather-card`; `clearResults()` hides card and removes error
- [x] T015 [US1] Implement `src/js/app.js`: add `DOMContentLoaded` listener, attach `submit` event listener on `#search-form` (using `addEventListener`), call `clearResults()` → `showLoading()` → `fetchWeather(cityName)` → `showWeather(data)` in sequence; `catch` errors and pass to `showError()`

**Checkpoint**: User Story 1 is fully functional. The app can search any city, display live data, and handle all error cases.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Apply premium visual polish across the full UI — glassmorphism, animations, micro-interactions, and responsiveness.

- [x] T016 [P] Implement `.glass-card` utility class in `src/css/styles.css`: `backdrop-filter: blur(var(--blur-glass))`, semi-transparent `rgba` background using `--clr-glass`, a subtle border (`1px solid rgba(255,255,255,0.1)`), `border-radius: 20px`, `box-shadow`.
- [x] T017 [P] Style the search form in `src/css/styles.css`: input and button use the `.glass-card` base tokens; input gets a `focus` ring animation using `outline` + `box-shadow` transition; button gets a hover scale + glow effect using `transform: scale(1.05)` and `box-shadow`.
- [x] T018 [P] Style the weather card data display in `src/css/styles.css`: temperature in `--font-display` at large size with a gradient text effect; humidity, wind, description in `--font-body`; icon with a slow `@keyframes pulse` hover effect.
- [x] T019 [P] Implement the weather card entrance animation in `src/css/styles.css`: `@keyframes card-enter` using `transform: translateY(30px)` + `opacity: 0` → `transform: translateY(0)` + `opacity: 1`. Applied via `.glass-card.visible` class toggled by `ui.js`.
- [x] T020 [P] Implement the error state styling in `src/css/styles.css`: error container uses a warm-tinted glass card, an emoji or SVG icon for "not found", and a shake `@keyframes` animation on appearance.
- [x] T021 Implement responsive layout in `src/css/styles.css`: `@media (max-width: 480px)` — card goes full-width, font sizes scale down, search input stacks vertically. Add `prefers-reduced-motion` disable rule for all animations.
- [x] T022 Add file-purpose comment headers to all `src/js/*.js` files and `src/css/styles.css` if not already present. Verify no `var`, no inline handlers, no unused CSS classes.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS Phase 3
- **User Story 1 (Phase 3)**: Depends on Phase 2 (all T005–T008 complete). T009 and T010 can run in parallel with each other. T011 can run in parallel with T009/T010. T012–T015 depend on T011 being complete.
- **Polish (Phase 4)**: Depends on Phase 3 complete. All T016–T021 are parallel.

### Within User Story 1

- T009 [P] + T010 [P] → can be built simultaneously (different sections of `index.html`)
- T011 [P] → can be built simultaneously with HTML tasks (different file)
- T012 → depends on T011 (needs data shape)
- T013 → depends on T012 structure (sibling function)
- T014 → depends on T013 structure
- T015 → depends on T011, T012, T013, T014 (orchestrates all)

---

## Parallel Example: User Story 1

```bash
# Can launch together (different files / HTML sections):
Task T009: Build search form in src/index.html
Task T010: Build weather card markup in src/index.html
Task T011: Implement fetchWeather() in src/js/api.js

# Sequential thereafter:
Task T012: showWeather() → depends on T011 data shape
Task T013: showError() → follows T012 pattern
Task T014: showLoading() / clearResults()
Task T015: app.js wiring → depends on all above
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Open in browser, test city search and error states
5. Proceed to Phase 4 once core logic works

### Incremental Delivery

1. Setup + Foundational → project scaffolded, dark background animates
2. User Story 1 → fully working weather search (MVP)
3. Polish → premium glass UI applied on top of working logic

---

## Notes

- [P] tasks = different files, no shared dependencies at that moment
- [US1] label maps all tasks to User Story 1 for full traceability
- The API key constant MUST live at the top of `api.js` — never inline in URLs
- Commit after each logical group: e.g., after Phase 1, after Phase 2, after T015, after Phase 4
- Verify animations at 60fps using DevTools Performance panel (constitution quality gate)
