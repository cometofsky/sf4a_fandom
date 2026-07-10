// Centralized Configuration & Design Tokens for Shadow Fight 4: Arena Fandom Companion

export const CONFIG = {
  APP_TITLE: "Shadow Fight 4: Arena | Fandom Hub",
  VERSION: "2.0.0",

  // Mathematical Constants
  MATH: {
    LEVEL_STAT_MULTIPLIER: 0.1,    // 10% multiplicative increase per level
    DEFENSE_MITIGATION_CONSTANT: 150, // Defense / (Defense + 150)
    DEFAULT_CRIT_MULTIPLIER: 1.5
  },

  // Action Power Ratings (Base attack multipliers)
  ACTION_POWERS: {
    basic: { name: "Basic Combo", power: 110, startup: "11f", recovery: "-4", desc: "Fast light strike chain" },
    heavy: { name: "Heavy Strike", power: 180, startup: "19f", recovery: "-8", desc: "High-damage breaker" },
    special: { name: "Special Ability", power: 250, startup: "15f", recovery: "-6", desc: "Hero signature physical sequence" },
    shadow: { name: "Shadow Move", power: 320, startup: "13f", recovery: "-10", desc: "Devastating shadow burst" }
  },

  // LocalStorage Keys
  STORAGE_KEYS: {
    BUILDER_BUILDS: "sf4a_builder_builds",
    CALCULATOR_STATE: "sf4a_calculator_state",
    SIMULATOR_STATE: "sf4a_simulator_state",
    QUIZ_PROGRESS: "sf4a_quiz_progress",
    QUIZ_HIGHSCORE: "sf4a_quiz_highscore",
    TIER_VOTES: "sf4a_tier_votes_v2",
    ONBOARDING_DISMISSED: "sf4a_onboarding_dismissed"
  },

  // Faction Theme Colors & Gradients
  FACTIONS: {
    Legion: {
      accent: "#dc2626",
      glow: "rgba(220, 38, 38, 0.25)",
      bgGradient: "radial-gradient(circle at top right, rgba(220, 38, 38, 0.12), transparent 60%)"
    },
    Dynasty: {
      accent: "#eab308",
      glow: "rgba(234, 179, 8, 0.25)",
      bgGradient: "radial-gradient(circle at top right, rgba(234, 179, 8, 0.12), transparent 60%)"
    },
    Heralds: {
      accent: "#8b5cf6",
      glow: "rgba(139, 92, 246, 0.25)",
      bgGradient: "radial-gradient(circle at top right, rgba(139, 92, 246, 0.14), transparent 60%)"
    }
  }
};
