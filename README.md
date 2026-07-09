# Shadow Fight 4: Arena Fandom Companion

An interactive, premium fandom website and simulation sandbox for Nekki's cross-platform fighter *Shadow Fight 4: Arena*. Built from scratch with glassmorphic visuals, fluid animations, and custom mathematical combat simulators.

---

## Key Features

1.  **Lore Lens Perspective System**: Switch branding aesthetics and read faction-biased records dynamically (Legion, Dynasty, Heralds).
2.  **Interactive Character Archives**: Scale base attributes (Attack, Defense, Shadow, Health) for all 28 roster heroes dynamically using Hero and Dojo sliders.
3.  **Tactical Talent Builder**: Customize level-5 talents, equip epic/legendary weapons, and generate or paste match-grade builds using a two-way encoder (`[PREFIX]-[WEAPON]-[TALENTS]`).
4.  **Combat Damage Calculator**: Select an attacker and defender, configure level matrices, select a battle action (basic, heavy, special, shadow), and execute simulated hits to analyze raw vs. mitigated damage.
5.  **Arena Simulator (Mini-Game)**: Interactive Rock-Paper-Scissors combat training game (Attack intercepts Throw, Block deflects Attack, Throw bypasses Block) featuring unblockable shadow transitions.
6.  **Lore Mastery Quiz**: Test knowledge of the franchise history, grade final rank achievements, and unlock the "Shadow Scholar" badge.

---

## Mathematics & Combat Simulation

### Dynamic Stat Scaling
Stats scale multiplicatively on both Hero and Dojo levels:
$$\text{Stat} = \text{round}\left( \text{Base} \times (1 + (\text{HeroLevel} - 1) \times 0.1) \times (1 + (\text{DojoLevel} - 1) \times 0.1) \right)$$

### Damage Mitigation
Physical defense mitigates incoming raw damage along a hyperbolic curve representing diminishing returns:
$$\text{Mitigation Rate} = \frac{\text{DefenseRating}}{\text{DefenseRating} + 150}$$

---

## Tech Stack & Project Setup

*   **Frontend**: Vanilla HTML5, ES6 JavaScript, and responsive CSS variables.
*   **Fonts & Theme**: Outfit & Cinzel typefaces from Google Fonts.
*   **Launch Guidelines**: Since the application is static and relies on relative paths, simply double-click or open [index.html](index.html) in any modern browser to begin. No installation, building, or bundling is necessary.
