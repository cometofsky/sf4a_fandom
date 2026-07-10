# Lessons Learned

- **2026-07-11**: Modular ES module refactoring (`<script type="module">`) allows clean separation of state, math engines, content, and UI controllers without any build step in static SPAs. Pure math engines (`calculateStat`, `calculateDamage`, `simulateCombatLoop`) should be isolated in standard JS modules so they can be executed by Node built-in test runner (`node --test`).
