# Lessons Learned

## 2026-07-07
- Evaluated the cross-platform play capabilities of Shadow Fight 4: Arena, noting the reliance on a unified matchmaking pool between PC and mobile, balanced with physics-based frame recovery and an account-syncing mechanism using Nekki ID.
- Investigated the combat meta of the Shadow Fight series, noting how automatic blocking when stationary creates a distinct neutral spacing game compared to traditional button-mash fighting games.
- Discovered that Nekki's internally developed AI-assisted physics animation software, Cascadeur, was the technical driver behind the series' signature physical movement aesthetics before it was launched as a standalone commercial product.
- Designed and built a premium glassmorphic interactive fandom website for Shadow Fight 4: Arena, implementing a dynamic Dojo-scaling stat calculator, a customizable talent tree builder with shareable code encoding, a damage formula simulation playground, and a rock-paper-scissors battle trainer.
- Analyzed structural and interactive features of leading game/movie fandom sites (Bulbapedia, Liquipedia, Wookieepedia, Fextralife) and documented key patterns, including continuity toggles, relational MediaWiki databases (Cargo/LPDB), Leaflet.js custom map tiling, and Pending Edits contribution models.
- Expanded the fandom database to encompass all 28 playable heroes in Shadow Fight 4: Arena, designing a dynamic programmatic fallback generator for talents and weapons. Integrated advanced features from the fandom research, including a vertical chronology timeline of the franchise, a faction matchup matrix, and a Lore Lens perspective switcher that dynamically modifies theme branding colors and biases character biographies in real-time.
- Implemented a gamified Lore Quiz interactive dashboard, enabling fans to test their knowledge, score grading ranks, and unlock a collectible 'Shadow Scholar' achievement badge, aligning with community retention strategies found in top fandom wikis.
- Generated and deployed high-resolution AI-rendered square character portraits for core heroes, replacing standard text emojis, and styled the remaining roster using dark shadow silhouettes with glowing faction borders, mirroring the official artistic aesthetic of the Shadow Fight universe.
- Reconfigured the three cross-model developer skills (claude-analyze, claude-review, and claude-attack) to utilize the newly supported 'claude-opus-4-8' model instead of the default 'claude-sonnet-5' to align with the active Claude.ai Max CLI subscription.
- Re-migrated the three developer skills (claude-analyze, claude-review, and claude-attack) to run natively using the active Gemini assistant session (leveraging the user's Google AI subscription) to eliminate dependencies on separate, outside Anthropic/Claude subscription logins.

## 2026-07-08
- Refactored the hero details scaling modal in app.js to avoid complete innerHTML re-renders on slider movement, preserving element focus and eliminating stuttering during drags.
- Enhanced database and combat calculator by assigning faction-based and character-specific base health properties, resolving the flat 1000 HP hardcode.
- Preserved quiz progression across tab switches by decoupling the initialization phase from navigation click events.
- Created interactive two-way talent build sharing by implementing regex-based validation and dynamic state imports for text fields.

## 2026-07-09
- Researched official fighting-game sites (Street Fighter 6, Tekken 8, Mortal Kombat 1) and fan-made frame-data/tier-list tools (TekkenDocs, TierMaker, Tier Flock) as a genre-specific angle distinct from the prior general-wiki research; confirmed official sites expose no public frame data or damage math, meaning the existing Calculator/Builder tabs already exceed official-site functionality.
- Added an Estimated Frame Advantage + punish indicator to the Damage Calculator, derived from action type and the defender's existing `defense` stat (no `speed` stat exists in the hero schema, so defense was used inversely as the tiebreak) since no real SF4A frame data is publicly available; explicitly labeled as a community estimate.
- Added a Community Tier List tab: pairwise voting (no drag-and-drop dependency) seeded from existing hero base-stat totals, with an Elo-lite score persisted in `localStorage` (`sf4a_tier_votes`) — first use of localStorage in this app, scoped per-browser only.
- Added a Dojo Council Rulings tab modeled on MK1's patch-notes convention (dated entries, before→after values in parentheses), populated with static in-universe entries authored for this project rather than fabricated as real balance history.
- Added a Cheat Sheet toggle inside the existing hero details modal (best weapon, top talent, faction matchup tip), split from the full bio per the TekkenDocs cheat-sheet-vs-full-movelist pattern.








