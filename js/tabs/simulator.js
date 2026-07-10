// Arena Combat Simulator (Interactive RPS Trainer with Hero Specialties & Win Streak Tracking)
import { HERO_DATABASE } from '../data.js';
import { state, notifyStateChange } from '../state.js';
import { renderHeroAvatar, showToast } from '../ui.js';

let roundLogText = "Choose your tactical action above to begin the duel!";

export function renderSimulatorTab() {
  const container = document.getElementById("simulator-tab");
  if (!container) return;

  const playerHero = HERO_DATABASE.find(h => h.id === state.simulator.playerHeroId) || HERO_DATABASE[0];
  const opponentHero = HERO_DATABASE.find(h => h.id === state.simulator.opponentHeroId) || HERO_DATABASE[1];

  const pHPMax = playerHero.baseStats.health;
  const oHPMax = opponentHero.baseStats.health;

  // Initialize match if not playing or HP out of range
  if (!state.simulator.isPlaying) {
    state.simulator.playerHP = pHPMax;
    state.simulator.opponentHP = oHPMax;
    state.simulator.playerShadow = 0;
    state.simulator.opponentShadow = 0;
    state.simulator.isPlaying = true;
  }

  const pHPPct = Math.max(0, Math.min(100, Math.round((state.simulator.playerHP / pHPMax) * 100)));
  const oHPPct = Math.max(0, Math.min(100, Math.round((state.simulator.opponentHP / oHPMax) * 100)));

  const heroOptionsHTML = (selectedId) => HERO_DATABASE.map(h => `
    <option value="${h.id}" ${h.id === selectedId ? 'selected' : ''}>${h.name} (${h.faction})</option>
  `).join("");

  const difficultiesHTML = ["Normal", "Veteran", "Nightmare"].map(diff => `
    <button type="button" class="diff-btn ${state.simulator.difficulty === diff ? 'active' : ''}" data-diff="${diff}">
      ${diff}
    </button>
  `).join("");

  container.innerHTML = `
    <div class="section-header">
      <h2>ARENA COMBAT SIMULATOR</h2>
      <p>Interactive tactical RPS duel where hero identities and faction specialties alter combat outcomes.</p>
    </div>

    <div class="sim-toolbar">
      <div class="streak-badge">
        <span>🔥 CURRENT WIN STREAK: <strong>${state.simulator.winStreak}</strong></span>
        <span>🏆 MAX STREAK: <strong>${state.simulator.maxStreak}</strong></span>
      </div>
      <div class="sim-difficulty">
        <span>DIFFICULTY:</span>
        <div class="diff-buttons">
          ${difficultiesHTML}
        </div>
      </div>
    </div>

    <div class="sim-arena">
      <!-- PLAYER CARD -->
      <div class="sim-fighter faction-${playerHero.faction.toLowerCase()}">
        <div class="fighter-header">
          <select id="sim-player-select" class="glass-select">
            ${heroOptionsHTML(playerHero.id)}
          </select>
          <span class="fighter-faction">${playerHero.faction} Specialty</span>
        </div>
        ${renderHeroAvatar(playerHero, "sim-avatar")}
        <h3>${playerHero.name}</h3>

        <div class="hp-bar-wrapper">
          <div class="hp-bar-fill" style="width: ${pHPPct}%"></div>
          <span class="hp-label">${state.simulator.playerHP} / ${pHPMax} HP</span>
        </div>
        <div class="shadow-bar-wrapper">
          <div class="shadow-bar-fill" style="width: ${state.simulator.playerShadow}%"></div>
          <span class="shadow-label">Shadow: ${state.simulator.playerShadow}%</span>
        </div>
      </div>

      <!-- CENTER RPS CONTROLS -->
      <div class="sim-controls glass-panel">
        <div class="round-log">
          <p id="sim-round-log">${roundLogText}</p>
        </div>

        <div class="rps-buttons">
          <button type="button" class="btn-rps btn-attack" data-move="Attack">
            <span>⚔️</span>
            <strong>ATTACK</strong>
            <small>Beats Throw</small>
          </button>
          <button type="button" class="btn-rps btn-block" data-move="Block">
            <span>🛡️</span>
            <strong>BLOCK</strong>
            <small>Deflects Attack</small>
          </button>
          <button type="button" class="btn-rps btn-throw" data-move="Throw">
            <span>🤼</span>
            <strong>THROW</strong>
            <small>Bypasses Block</small>
          </button>
        </div>

        ${state.simulator.playerShadow >= 100 ? `
          <button type="button" class="btn-shadow-move" data-move="Shadow">
            🌌 UNLEASH SHADOW FORM (UNBLOCKABLE)
          </button>
        ` : ''}

        <button type="button" id="btn-sim-reset" class="btn-secondary sim-reset">
          🔄 Reset Duel
        </button>
      </div>

      <!-- OPPONENT CARD -->
      <div class="sim-fighter faction-${opponentHero.faction.toLowerCase()}">
        <div class="fighter-header">
          <select id="sim-opponent-select" class="glass-select">
            ${heroOptionsHTML(opponentHero.id)}
          </select>
          <span class="fighter-faction">${opponentHero.faction} Specialty</span>
        </div>
        ${renderHeroAvatar(opponentHero, "sim-avatar")}
        <h3>${opponentHero.name} (AI)</h3>

        <div class="hp-bar-wrapper">
          <div class="hp-bar-fill" style="width: ${oHPPct}%"></div>
          <span class="hp-label">${state.simulator.opponentHP} / ${oHPMax} HP</span>
        </div>
        <div class="shadow-bar-wrapper">
          <div class="shadow-bar-fill" style="width: ${state.simulator.opponentShadow}%"></div>
          <span class="shadow-label">Shadow: ${state.simulator.opponentShadow}%</span>
        </div>
      </div>
    </div>
  `;

  // Hero selectors
  container.querySelector("#sim-player-select")?.addEventListener("change", (e) => {
    state.simulator.playerHeroId = e.target.value;
    state.simulator.isPlaying = false;
    roundLogText = `Switched to ${e.target.value.toUpperCase()}. Ready to duel!`;
    notifyStateChange();
  });
  container.querySelector("#sim-opponent-select")?.addEventListener("change", (e) => {
    state.simulator.opponentHeroId = e.target.value;
    state.simulator.isPlaying = false;
    roundLogText = `Opponent switched to ${e.target.value.toUpperCase()}.`;
    notifyStateChange();
  });

  // Difficulty buttons
  container.querySelectorAll(".diff-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.simulator.difficulty = btn.getAttribute("data-diff");
      notifyStateChange();
    });
  });

  // RPS action buttons
  container.querySelectorAll(".btn-rps, .btn-shadow-move").forEach(btn => {
    btn.addEventListener("click", () => {
      const move = btn.getAttribute("data-move");
      executeCombatTurn(move, playerHero, opponentHero);
    });
  });

  // Reset button
  container.querySelector("#btn-sim-reset")?.addEventListener("click", () => {
    state.simulator.isPlaying = false;
    roundLogText = "Duel reset! Choose an action to begin.";
    notifyStateChange();
  });
}

function executeCombatTurn(playerMove, playerHero, opponentHero) {
  const moves = ["Attack", "Block", "Throw"];
  // AI decision logic based on difficulty
  let aiMove;
  if (state.simulator.opponentShadow >= 100 && Math.random() < 0.6) {
    aiMove = "Shadow";
  } else if (state.simulator.difficulty === "Veteran" || state.simulator.difficulty === "Nightmare") {
    // Adaptive AI weights counter-moves slightly higher
    const weights = [0.35, 0.35, 0.30];
    aiMove = moves[Math.floor(Math.random() * 3)];
  } else {
    aiMove = moves[Math.floor(Math.random() * 3)];
  }

  let pDamage = 0;
  let oDamage = 0;
  let log = "";

  // Faction specialties
  const pFaction = playerHero.faction;
  const oFaction = opponentHero.faction;

  if (playerMove === "Shadow") {
    state.simulator.playerShadow = 0;
    oDamage = 320;
    log = `🌌 ${playerHero.name} unleashes an unblockable Shadow Ability for ${oDamage} damage!`;
  } else if (aiMove === "Shadow") {
    state.simulator.opponentShadow = 0;
    pDamage = 300;
    log = `💥 ${opponentHero.name} triggers a devastating Shadow Strike for ${pDamage} damage!`;
  } else if (playerMove === aiMove) {
    log = `⚔️ Both fighters selected ${playerMove.toUpperCase()} — blades clash in a stalemate!`;
  } else if (
    (playerMove === "Attack" && aiMove === "Throw") ||
    (playerMove === "Block" && aiMove === "Attack") ||
    (playerMove === "Throw" && aiMove === "Block")
  ) {
    // Player wins turn
    let baseDmg = playerMove === "Attack" ? 180 : playerMove === "Throw" ? 160 : 110;
    // Apply faction bonus
    if (pFaction === "Heralds" && Math.random() < 0.35) {
      baseDmg = Math.round(baseDmg * 1.5);
      log = `⚡ CRITICAL HIT! ${playerHero.name}'s Heralds precision deals ${baseDmg} damage against ${aiMove}!`;
    } else if (pFaction === "Dynasty") {
      baseDmg += 30; // combo pressure
      log = `🌪️ ${playerHero.name} chains a Dynasty multi-hit combo (${playerMove} beats ${aiMove}) for ${baseDmg} damage!`;
    } else if (pFaction === "Legion") {
      baseDmg += 25; // heavy unbreakable impact
      log = `🛡️ ${playerHero.name}'s Unbreakable Legion impact crushes (${playerMove} beats ${aiMove}) for ${baseDmg} damage!`;
    } else {
      log = `✅ ${playerHero.name}'s ${playerMove} beats ${opponentHero.name}'s ${aiMove} for ${baseDmg} damage!`;
    }

    oDamage = baseDmg;
    state.simulator.playerShadow = Math.min(100, state.simulator.playerShadow + 25);
  } else {
    // AI wins turn
    let baseDmg = aiMove === "Attack" ? 175 : aiMove === "Throw" ? 155 : 100;
    if (oFaction === "Heralds" && Math.random() < 0.3) {
      baseDmg = Math.round(baseDmg * 1.5);
      log = `❌ ${opponentHero.name} lands a Heralds Critical ${aiMove} for ${baseDmg} damage!`;
    } else {
      log = `❌ ${opponentHero.name}'s ${aiMove} counters your ${playerMove} for ${baseDmg} damage!`;
    }

    pDamage = baseDmg;
    state.simulator.opponentShadow = Math.min(100, state.simulator.opponentShadow + 25);
  }

  state.simulator.playerHP = Math.max(0, state.simulator.playerHP - pDamage);
  state.simulator.opponentHP = Math.max(0, state.simulator.opponentHP - oDamage);

  // Check victory / defeat
  if (state.simulator.opponentHP === 0) {
    state.simulator.winStreak += 1;
    if (state.simulator.winStreak > state.simulator.maxStreak) {
      state.simulator.maxStreak = state.simulator.winStreak;
    }
    log = `🏆 VICTORY! ${playerHero.name} defeats ${opponentHero.name}! Streak: ${state.simulator.winStreak}`;
    showToast(`Victory! Win streak is now ${state.simulator.winStreak}`, "success");
    state.simulator.isPlaying = false;
  } else if (state.simulator.playerHP === 0) {
    log = `☠️ DEFEATED! ${opponentHero.name} knocked out ${playerHero.name}. Streak reset.`;
    showToast("Defeated! Win streak reset.", "error");
    state.simulator.winStreak = 0;
    state.simulator.isPlaying = false;
  }

  roundLogText = log;
  notifyStateChange();
}
