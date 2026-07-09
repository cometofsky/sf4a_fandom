# Project Context: Shadow Fight 4: Arena Fandom Hub

This document acts as a high-density reference map for AI agents and LLMs. It defines the application architecture, data schemas, mathematical engines, and interactive state mutations to prevent regression bugs during future edits.

---

## 1. Architectural Blueprint
The project is a static frontend single-page application (SPA) running in a single execution thread. It has zero external dependencies or compile-time steps.

### Main Entrypoints
*   [index.html](file:///Users/FaozulRafi/Projects/sf4a_fandom/index.html): Structure and visual tabs mapping.
*   [styles.css](file:///Users/FaozulRafi/Projects/sf4a_fandom/styles.css): Color tokens, responsive layout grid, animations, and glassmorphic designs.
*   [app.js](file:///Users/FaozulRafi/Projects/sf4a_fandom/app.js): Database, business math, simulator, and reactive-like UI bindings.

---

## 2. Central State Schema (`state`)
Defined in [app.js](file:///Users/FaozulRafi/Projects/sf4a_fandom/app.js), the global state object drives the interface tabs:

```javascript
const state = {
  activeTab: "factions",       // ["factions", "chronology", "heroes", "builder", "calculator", "simulator", "quiz"]
  selectedHeroId: "marcus",    // ID of the hero active in the Talent Builder panel
  activePerspective: "standard", // ["standard", "legion", "dynasty", "heralds"] (Lore Lens)
  builderBuilds: {
    // Dynamically initialized on startup:
    "[heroId]": {
      talents: [0, 0, 0, 0, 0], // Array of choices (0 = left, 1 = right) for tiers 1-5
      weaponIdx: 0              // Index of equipped weapon inside hero.weapons
    }
  },
  calculator: {
    attackerId: "marcus",
    attackerHLevel: 1,         // Integer [1 - 13]
    attackerDLevel: 1,         // Integer [1 - 13]
    attackerAction: "basic",   // ["basic", "heavy", "special", "shadow"]
    defenderId: "itu",
    defenderHLevel: 1,         // Integer [1 - 13]
    defenderDLevel: 1,         // Integer [1 - 13]
    defenderHPMax: 1000,       // Dynamically calculated based on defender base health
    defenderHPCurrent: 1000    // Tracks current simulation health
  },
  simulator: {
    playerHP: 1000,
    playerShadow: 0,           // Integer [0 - 100] (charges shadow form)
    playerHeroId: "marcus",
    opponentHP: 1000,
    opponentShadow: 0,         // Integer [0 - 100] (charges AI shadow form)
    opponentHeroId: "itu",
    isPlaying: false           // Prevents actions when game is over
  }
};
```

---

## 3. Database & Schema Definitions

### Hero Object Schema (`HERO_DATABASE`)
All heroes are registered inside `HERO_DATABASE` at the head of `app.js`.

```typescript
interface Hero {
  id: string;                  // Unique key matching search queries
  name: string;                // Display name
  faction: "Legion" | "Dynasty" | "Heralds";
  avatar: string;              // Emoji symbol fallback
  photo?: string;              // Local filename (e.g. "marcus_avatar.jpg")
  baseStats: {
    attack: number;            // Physical attack base (typically 90-140)
    defense: number;           // Physical defense base (typically 80-160)
    shadow: number;            // Shadow power base (typically 60-150)
    health: number;            // Base health pool (typically 900-1200)
  };
  bio: string;                 // Default biographical summary
  weapons?: Weapon[];          // Optional custom weapons (populated by fallback if missing)
  explicitTalents?: boolean;   // If true, utilizes custom talent matrices
  talents?: Talent[][];        // 5-tier arrays containing left/right objects
  weaponType?: string;         // Standard weapon descriptor (for fallbacks)
  perk?: string;               // Faction weapon special (for fallbacks)
}

interface Weapon {
  name: string;
  rarity: "Common" | "Epic" | "Legendary";
  perk: string;                // Passive descriptive text
  attackMod: number;           // Attack multiplier (e.g., 1.08)
  defenseMod: number;          // Defense multiplier (e.g., 1.02)
}

interface Talent {
  name: string;
  desc: string;
}
```

### Programmatic Fallback Rules
On startup, `populateHeroFallbacks()` evaluates the database. For any hero lacking `explicitTalents: true`:
1.  **Weapon Fallbacks**: Creates 3 weapons (Common standard issue, Epic Vanguard, Legendary Abyss) with standardized multipliers.
2.  **Health Fallbacks**: Sets base health pool if missing:
    *   Legion: `1100` base health
    *   Dynasty: `1000` base health
    *   Heralds: `950` base health
3.  **Talent Fallbacks**: populates 5 tiers of Left/Right choices using faction templates (e.g., Iron Will, Shadow Surge, Shield Breaker).

---

## 4. Mathematical Engines & Formulas

### dynamic Stat Scaling
$$\text{Stat} = \text{round}\left( \text{Base} \times (1 + (\text{HeroLevel} - 1) \times 0.1) \times (1 + (\text{DojoLevel} - 1) \times 0.1) \right)$$
*   **Code Reference**: `calculateStat(base, heroLevel, dojoLevel)`
*   **Behavior**: Compounding multiplicative growth. Dojo level scales on top of the level-modified stat.

### Defense Mitigation
$$\text{Mitigation Rate} = \frac{\text{DefenseRating}}{\text{DefenseRating} + 150}$$
*   **Code Reference**: `getDefenseMitigation(defenseRating)`
*   **Behavior**: Diminishing returns curve. Yields a hyperbolic limit, meaning defense rating never results in $100\%$ invulnerability.

### Simulated Combat Net Damage
$$\text{Raw Damage} = \text{BaseActionPower} \times \frac{\text{Boosted Stat}}{100}$$
$$\text{Net Damage} = \text{round}\left( \text{Raw Damage} \times (1 - \text{Mitigation Rate}) \right)$$
*   **Code Reference**: `executeSimulatedHit()`
*   *Action Power values*: Basic Punch $= 110$, Heavy Strike $= 180$, Special Ability $= 250$, Shadow Storm $= 320$.
*   *Boosted Stat selection*: References the attacker's **Shadow Power** if the action is shadow-based; otherwise, references the **Attack** stat. Both stats factor in the equipped weapon's multiplier.

---

## 5. UI Updates & Focus Preservation

### Details Modal Scaling (UX Crucial)
*   **Avoid Overwriting Elements**: When sliding Hero/Dojo levels in the popup modal, do **NOT** re-render the modal structure via `innerHTML`. Doing so deletes the slider inputs mid-drag, causing immediate focus loss.
*   **DOM Update Rules**: On slider input events, update the inner text nodes (`lblHl`, `lblDl`, and stat value panels) directly:
    ```javascript
    lblHl.textContent = scaleHLvl;
    lblDl.textContent = scaleDLvl;
    valAtk.textContent = finalAtk;
    valDef.innerHTML = `${finalDef} <span style="font-size:0.7rem; color:var(--text-muted);">(-${mitigation}%)</span>`;
    valShd.textContent = finalShd;
    ```

### Two-Way Build Code Share Engine
*   **Output Format**: `[PREFIX]-[WEAPON INDEX]-[TALENT LETTERS]` (e.g. `MAR-1-LLLLL`).
*   **Imports**: The input field `#build-code-input` listens to the `input` event. Any paste or input matching the format validates the prefix against the selected hero, updates `state.builderBuilds[heroId]`, and calls `renderBuilder()` to dynamically snap the Talent Tree to those selections in real-time.
