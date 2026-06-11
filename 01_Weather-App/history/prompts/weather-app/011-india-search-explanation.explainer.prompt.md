---
id: 011
title: India Search Explanation
stage: explainer
date: 2026-06-12
surface: agent
model: Gemini 3.5 Flash (High)
feature: weather-app
branch: 001-weather-app
user: HP
command: none
labels: ["debugging", "explanation", "api"]
links:
  spec: specs/001-weather-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - src/js/api.js
tests: []
---

## Prompt

Why its showing me innichen when i search for india?

## Response snapshot

Explained that OpenWeatherMap's Current Weather API is city-based (not country-based) and uses a fuzzy matching algorithm. Since "India" is a country rather than a city, the API performs a fuzzy string match and returns the municipality "Innichen" (located in South Tyrol, Italy, which historically/phonetically matches in their database). Advised the user to search for specific Indian cities (e.g. "Mumbai, IN" or "Delhi, IN") instead.

## Outcome

- ✅ Impact: Clarified API behavior regarding country vs. city search inputs.
- 🧪 Tests: N/A
- 📁 Files: None
- 🔁 Next prompts: N/A
- 🧠 Reflection: User education on API query expectations is key to preventing confusion when country names are entered instead of city names.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
