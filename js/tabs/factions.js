// Factions Tab & Interactive 3x3 Matchup Matrix Controller
import { FACTION_LORE, MATCHUP_MATRIX } from '../content.js';
import { state, notifyStateChange } from '../state.js';
import { showToast } from '../ui.js';

export function renderFactionsTab() {
  const container = document.getElementById("factions-tab");
  if (!container) return;

  const factionsHTML = Object.entries(FACTION_LORE).map(([name, data]) => `
    <div class="faction-card faction-${name.toLowerCase()}">
      <div class="faction-card-header">
        <h3>${data.title}</h3>
        <span class="faction-tag">${data.tagline}</span>
      </div>
      <p class="faction-desc">${data.desc}</p>
      <blockquote class="faction-motto">"${data.motto}"</blockquote>
    </div>
  `).join("");

  const matrixHTML = MATCHUP_MATRIX.map(item => `
    <div class="matchup-matrix-card">
      <div class="matchup-card-title">
        <h4>${item.title}</h4>
        <span class="matchup-badge">${item.advantage}</span>
      </div>
      <p class="matchup-notes">${item.notes}</p>
      <button type="button" class="btn-matchup-load" data-attacker="${item.exampleMatchup.attacker}" data-defender="${item.exampleMatchup.defender}">
        ⚡ Simulate Matchup in Calculator
      </button>
    </div>
  `).join("");

  container.innerHTML = `
    <div class="section-header">
      <h2>THE THREE COALITIONS</h2>
      <p>Explore the governing philosophies, combat doctrines, and tactical matchups defining the eternal struggle within the Arena.</p>
    </div>

    <div class="factions-grid">
      ${factionsHTML}
    </div>

    <div class="section-header matrix-header">
      <h2>TACTICAL MATCHUP MATRIX (3×3)</h2>
      <p>Click any matchup card below to test the theoretical combat advantage inside the Damage & Trade Calculator.</p>
    </div>

    <div class="matchup-matrix-grid">
      ${matrixHTML}
    </div>
  `;

  // Attach event listeners for cross-linking into calculator
  container.querySelectorAll(".btn-matchup-load").forEach(btn => {
    btn.addEventListener("click", () => {
      const attacker = btn.getAttribute("data-attacker");
      const defender = btn.getAttribute("data-defender");
      if (attacker && defender) {
        state.calculator.attackerId = attacker;
        state.calculator.defenderId = defender;
        state.activeTab = "calculator";
        notifyStateChange();
        showToast(`Loaded ${attacker.toUpperCase()} vs ${defender.toUpperCase()} into Calculator!`, "info");
      }
    });
  });
}
