// Central Application State & LocalStorage Persistence Manager
import { CONFIG } from './config.js';
import { HERO_DATABASE } from './data.js';
import { parseBuildCode } from './engines.js';

const listeners = new Set();

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function saveJSON(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    // Ignore storage quota errors gracefully
  }
}

// Build default builderBuilds for all 28 heroes
function createDefaultBuilderBuilds() {
  const map = {};
  HERO_DATABASE.forEach(h => {
    map[h.id] = {
      talents: [0, 0, 0, 0, 0],
      weaponIdx: 0
    };
  });
  return map;
}

export const state = {
  activeTab: "factions",
  selectedHeroId: "marcus",
  activePerspective: "standard",
  compareHeroIdA: "marcus",
  compareHeroIdB: "itu",

  // Persistent Builder Builds
  builderBuilds: {
    ...createDefaultBuilderBuilds(),
    ...loadJSON(CONFIG.STORAGE_KEYS.BUILDER_BUILDS, {})
  },

  // Persistent Calculator State
  calculator: {
    attackerId: "marcus",
    attackerHLevel: 1,
    attackerDLevel: 1,
    attackerAction: "basic",
    defenderId: "itu",
    defenderHLevel: 1,
    defenderDLevel: 1,
    ...loadJSON(CONFIG.STORAGE_KEYS.CALCULATOR_STATE, {})
  },

  // Persistent Simulator State
  simulator: {
    playerHP: 1100,
    playerShadow: 0,
    playerHeroId: "marcus",
    opponentHP: 1020,
    opponentShadow: 0,
    opponentHeroId: "itu",
    winStreak: 0,
    maxStreak: 0,
    difficulty: "Normal", // "Normal" | "Veteran" | "Nightmare"
    isPlaying: false,
    ...loadJSON(CONFIG.STORAGE_KEYS.SIMULATOR_STATE, {})
  },

  // Persistent Quiz Progress
  quiz: {
    highScore: loadJSON(CONFIG.STORAGE_KEYS.QUIZ_HIGHSCORE, 0),
    selectedCategory: "all",
    currentQuestionIdx: 0,
    score: 0,
    activePool: []
  }
};

/**
 * Persists persistent slices of state to localStorage
 */
export function savePersistentState() {
  saveJSON(CONFIG.STORAGE_KEYS.BUILDER_BUILDS, state.builderBuilds);
  saveJSON(CONFIG.STORAGE_KEYS.CALCULATOR_STATE, {
    attackerId: state.calculator.attackerId,
    attackerHLevel: state.calculator.attackerHLevel,
    attackerDLevel: state.calculator.attackerDLevel,
    attackerAction: state.calculator.attackerAction,
    defenderId: state.calculator.defenderId,
    defenderHLevel: state.calculator.defenderHLevel,
    defenderDLevel: state.calculator.defenderDLevel
  });
  saveJSON(CONFIG.STORAGE_KEYS.SIMULATOR_STATE, {
    playerHeroId: state.simulator.playerHeroId,
    opponentHeroId: state.simulator.opponentHeroId,
    winStreak: state.simulator.winStreak,
    maxStreak: state.simulator.maxStreak,
    difficulty: state.simulator.difficulty
  });
  saveJSON(CONFIG.STORAGE_KEYS.QUIZ_HIGHSCORE, state.quiz.highScore);
}

/**
 * Subscribes a listener to state changes
 */
export function subscribeState(listener) {
  listeners.add(listener);
}

/**
 * Notify all subscribers
 */
export function notifyStateChange() {
  savePersistentState();
  listeners.forEach(fn => fn(state));
}

/**
 * Parses URL Hash deep links (e.g. #builder=MAR-1-LLLLL)
 * Returns { handled: boolean, tab?: string, message?: string }
 */
export function processUrlHashDeepLink() {
  const hash = window.location.hash || "";
  if (!hash.startsWith("#")) return { handled: false };

  const params = new URLSearchParams(hash.slice(1));
  const builderCode = params.get("builder");

  if (builderCode) {
    const parsed = parseBuildCode(builderCode);
    if (parsed && parsed.valid) {
      // Find matching hero by 3-letter prefix
      const hero = HERO_DATABASE.find(
        h => h.id.toUpperCase().slice(0, 3) === parsed.heroPrefix || h.id.toUpperCase().startsWith(parsed.heroPrefix)
      );
      if (hero) {
        state.selectedHeroId = hero.id;
        state.builderBuilds[hero.id] = {
          weaponIdx: parsed.weaponIdx,
          talents: parsed.talents
        };
        state.activeTab = "builder";
        notifyStateChange();
        return {
          handled: true,
          tab: "builder",
          message: `Loaded shared build for ${hero.name} (${builderCode})`
        };
      }
    }
  }

  const compareParams = params.get("compare");
  if (compareParams) {
    const [hA, hB] = compareParams.split(",");
    const validA = HERO_DATABASE.some(h => h.id === hA);
    const validB = HERO_DATABASE.some(h => h.id === hB);
    if (validA && validB) {
      state.compareHeroIdA = hA;
      state.compareHeroIdB = hB;
      state.activeTab = "heroes";
      notifyStateChange();
      return { handled: true, tab: "heroes", message: `Comparing ${hA} vs ${hB}` };
    }
  }

  return { handled: false };
}
