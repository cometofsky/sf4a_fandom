// Main Application Entrypoint (ES Module Architecture)
import { state, processUrlHashDeepLink, subscribeState } from './state.js';
import { initOnboardingTour, showToast } from './ui.js';
import { renderFactionsTab } from './tabs/factions.js';
import { renderChronologyTab } from './tabs/chronology.js';
import { renderHeroesTab } from './tabs/heroes.js';
import { renderBuilderTab } from './tabs/builder.js';
import { renderCalculatorTab } from './tabs/calculator.js';
import { renderSimulatorTab } from './tabs/simulator.js';
import { renderQuizTab } from './tabs/quiz.js';
import { renderTierListTab } from './tabs/tierlist.js';
import { renderRulingsTab } from './tabs/rulings.js';

function switchTab(tabId) {
  state.activeTab = tabId;
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("data-tab") === tabId);
  });
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.classList.toggle("active", tab.id === `${tabId}-tab`);
  });

  // Render active tab
  switch (tabId) {
    case "factions":
      renderFactionsTab();
      break;
    case "chronology":
      renderChronologyTab();
      break;
    case "heroes":
      renderHeroesTab();
      break;
    case "builder":
      renderBuilderTab();
      break;
    case "calculator":
      renderCalculatorTab();
      break;
    case "simulator":
      renderSimulatorTab();
      break;
    case "quiz":
      renderQuizTab();
      break;
    case "tierlist":
      renderTierListTab();
      break;
    case "rulings":
      renderRulingsTab();
      break;
  }
}

function updateLoreLensTheme(perspective) {
  state.activePerspective = perspective;
  document.body.classList.remove("lens-standard", "lens-legion", "lens-dynasty", "lens-heralds");
  document.body.classList.add(`lens-${perspective}`);
}

function setupNavigation() {
  // Desktop & mobile nav buttons
  document.querySelectorAll(".nav-link").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");
      switchTab(target);
      // Close mobile drawer on pick
      document.querySelector(".app-nav")?.classList.remove("open");
    });
  });

  // Mobile hamburger menu toggle
  const hamburger = document.getElementById("mobile-nav-toggle");
  hamburger?.addEventListener("click", () => {
    document.querySelector(".app-nav")?.classList.toggle("open");
  });

  // Lore Lens Select
  const lensSelect = document.getElementById("perspective-select");
  lensSelect?.addEventListener("change", (e) => {
    updateLoreLensTheme(e.target.value);
    showToast(`Lore Lens shifted to ${e.target.options[e.target.selectedIndex].text}`, "info");
  });
}

function initApp() {
  setupNavigation();
  initOnboardingTour();

  // Process URL deep links (#builder=MAR-1-LLLLL or #compare=marcus,itu)
  const hashResult = processUrlHashDeepLink();
  if (hashResult.handled && hashResult.tab) {
    switchTab(hashResult.tab);
    if (hashResult.message) showToast(hashResult.message, "success");
  } else {
    switchTab(state.activeTab || "factions");
  }

  // Listen for hash changes while page is open
  window.addEventListener("hashchange", () => {
    const res = processUrlHashDeepLink();
    if (res.handled && res.tab) {
      switchTab(res.tab);
      if (res.message) showToast(res.message, "success");
    }
  });

  // Subscribe UI rerenders to state changes
  subscribeState(() => {
    switchTab(state.activeTab);
  });
}

document.addEventListener("DOMContentLoaded", initApp);
