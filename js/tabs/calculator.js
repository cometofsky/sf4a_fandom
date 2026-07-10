// Damage Calculator Controller & Fight-to-KO DPS Loop
import { CONFIG } from '../config.js';
import { HERO_DATABASE } from '../data.js';
import { calculateStat, calculateDamage, simulateCombatLoop } from '../engines.js';
import { state, notifyStateChange } from '../state.js';
import { renderHeroAvatar, showToast } from '../ui.js';

let showLoopLog = false;
let lastSimResult = null;

export function renderCalculatorTab() {
  const container = document.getElementById("calculator-tab");
  if (!container) return;

  const attacker = HERO_DATABASE.find(h => h.id === state.calculator.attackerId) || HERO_DATABASE[0];
  const defender = HERO_DATABASE.find(h => h.id === state.calculator.defenderId) || HERO_DATABASE[1];

  const attHLevel = state.calculator.attackerHLevel;
  const attDLevel = state.calculator.attackerDLevel;
  const defHLevel = state.calculator.defenderHLevel;
  const defDLevel = state.calculator.defenderDLevel;

  const scaledAtk = calculateStat(attacker.baseStats.attack, attHLevel, attDLevel);
  const scaledDef = calculateStat(defender.baseStats.defense, defHLevel, defDLevel);
  const scaledHP = calculateStat(defender.baseStats.health, defHLevel, defDLevel);

  // Equipped weapons from builder state
  const attBuild = state.builderBuilds[attacker.id] || { weaponIdx: 0 };
  const attWeapon = attacker.weapons?.[attBuild.weaponIdx] || { attackMod: 1.0 };

  const actionInfo = CONFIG.ACTION_POWERS[state.calculator.attackerAction] || CONFIG.ACTION_POWERS.basic;

  const singleHitResult = calculateDamage({
    attackerAttack: scaledAtk,
    defenderDefense: scaledDef,
    actionPower: actionInfo.power,
    talentMultiplier: 1.0,
    weaponMultiplier: attWeapon.attackMod || 1.0
  });

  const heroOptionsHTML = (selectedId) => HERO_DATABASE.map(h => `
    <option value="${h.id}" ${h.id === selectedId ? 'selected' : ''}>${h.name} (${h.faction})</option>
  `).join("");

  const actionsHTML = Object.entries(CONFIG.ACTION_POWERS).map(([key, data]) => `
    <button type="button" class="btn-action-select ${state.calculator.attackerAction === key ? 'active' : ''}" data-action="${key}">
      <strong>${data.name}</strong>
      <span>${data.power}% Power &middot; ${data.startup}</span>
    </button>
  `).join("");

  // Fight to KO loop calculation
  const loopResult = simulateCombatLoop(
    {
      name: attacker.name,
      attack: Math.round(scaledAtk * (attWeapon.attackMod || 1.0)),
      actionPower: actionInfo.power,
      hitsPerSec: 1.25
    },
    {
      name: defender.name,
      defense: scaledDef,
      hp: scaledHP
    }
  );

  const combatLogHTML = loopResult.combatLog.map(hit => `
    <div class="log-entry ${hit.isCrit ? 'log-crit' : ''}">
      <span class="hit-num">Strike #${hit.hitNumber}</span>
      <span class="hit-dmg">${hit.isCrit ? '💥 CRITICAL' : 'Hit'}: <strong>-${hit.damage} HP</strong></span>
      <span class="hit-rem">Defender HP: ${hit.remainingHP}</span>
    </div>
  `).join("");

  container.innerHTML = `
    <div class="section-header">
      <h2>COMBAT DAMAGE & DPS TRADE CALCULATOR</h2>
      <p>Simulate exact physical damage, hyperbolic mitigation curves, and fight-to-KO trade loops.</p>
    </div>

    <div class="calc-arena-grid">
      <!-- ATTACKER SIDE -->
      <div class="calc-side attacker-side faction-${attacker.faction.toLowerCase()}">
        <div class="calc-side-header">
          <h3>ATTACKER</h3>
          <select id="calc-attacker-select" class="glass-select">
            ${heroOptionsHTML(attacker.id)}
          </select>
        </div>

        <div class="calc-hero-card">
          ${renderHeroAvatar(attacker, "calc-avatar")}
          <h4>${attacker.name}</h4>
          <span class="calc-weapon-badge">Equipped: ${attWeapon.name} (${(attWeapon.attackMod * 100 - 100).toFixed(0)}% Atk)</span>
        </div>

        <div class="calc-sliders">
          <label>Hero Level: <strong>${attHLevel}</strong>
            <input type="range" min="1" max="13" value="${attHLevel}" id="att-hlevel-slider">
          </label>
          <label>Dojo Level: <strong>${attDLevel}</strong>
            <input type="range" min="1" max="13" value="${attDLevel}" id="att-dlevel-slider">
          </label>
          <div class="scaled-stat-display">
            <span>⚔️ Scaled Attack: <strong>${Math.round(scaledAtk * (attWeapon.attackMod || 1.0))}</strong></span>
          </div>
        </div>
      </div>

      <!-- VS & ACTION SELECTOR -->
      <div class="calc-center">
        <h3>COMBAT ACTION</h3>
        <div class="actions-group">
          ${actionsHTML}
        </div>
        <p class="action-desc">${actionInfo.desc}</p>
      </div>

      <!-- DEFENDER SIDE -->
      <div class="calc-side defender-side faction-${defender.faction.toLowerCase()}">
        <div class="calc-side-header">
          <h3>DEFENDER</h3>
          <select id="calc-defender-select" class="glass-select">
            ${heroOptionsHTML(defender.id)}
          </select>
        </div>

        <div class="calc-hero-card">
          ${renderHeroAvatar(defender, "calc-avatar")}
          <h4>${defender.name}</h4>
          <span class="calc-weapon-badge">Base Health: ${defender.baseStats.health}</span>
        </div>

        <div class="calc-sliders">
          <label>Hero Level: <strong>${defHLevel}</strong>
            <input type="range" min="1" max="13" value="${defHLevel}" id="def-hlevel-slider">
          </label>
          <label>Dojo Level: <strong>${defDLevel}</strong>
            <input type="range" min="1" max="13" value="${defDLevel}" id="def-dlevel-slider">
          </label>
          <div class="scaled-stat-display">
            <span>🛡️ Scaled Defense: <strong>${scaledDef}</strong></span>
            <span>❤️ Scaled Max HP: <strong>${scaledHP}</strong></span>
          </div>
        </div>
      </div>
    </div>

    <!-- DAMAGE READOUT & FIGHT TO KO HEAD-TO-HEAD -->
    <div class="calc-results-section glass-panel">
      <div class="single-hit-result">
        <div class="result-box">
          <span>RAW IMPACT</span>
          <strong class="dmg-raw">${singleHitResult.rawDamage}</strong>
        </div>
        <div class="result-box">
          <span>MITIGATION RATE</span>
          <strong class="dmg-mit">${singleHitResult.mitigationPercent}%</strong>
        </div>
        <div class="result-box primary">
          <span>FINAL HIT DAMAGE</span>
          <strong class="dmg-final">${singleHitResult.mitigatedDamage}</strong>
        </div>
      </div>

      <div class="fight-ko-header">
        <h3>FIGHT-TO-KO TRADE SIMULATOR & DPS READOUT</h3>
        <button type="button" id="btn-toggle-loop" class="btn-accent">
          ⚡ ${showLoopLog ? "Hide Combat Log" : "Run Fight-to-KO Auto-Loop"}
        </button>
      </div>

      <div class="dps-metrics-grid">
        <div class="dps-metric">
          <span>ESTIMATED DPS</span>
          <strong>${loopResult.dps} / sec</strong>
        </div>
        <div class="dps-metric">
          <span>STRIKES TO KO</span>
          <strong>${loopResult.hitsToKO} Hits</strong>
        </div>
        <div class="dps-metric">
          <span>ESTIMATED TIME TO KO</span>
          <strong>${loopResult.timeToKO}s</strong>
        </div>
      </div>

      ${showLoopLog ? `
        <div class="combat-log-container">
          <h4>STRIKE EXCHANGE SEQUENCE (ATTACKER FOCUS)</h4>
          <div class="combat-log-entries">
            ${combatLogHTML}
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // Attacker & Defender selects
  container.querySelector("#calc-attacker-select")?.addEventListener("change", (e) => {
    state.calculator.attackerId = e.target.value;
    notifyStateChange();
  });
  container.querySelector("#calc-defender-select")?.addEventListener("change", (e) => {
    state.calculator.defenderId = e.target.value;
    notifyStateChange();
  });

  // Action select
  container.querySelectorAll(".btn-action-select").forEach(btn => {
    btn.addEventListener("click", () => {
      state.calculator.attackerAction = btn.getAttribute("data-action");
      notifyStateChange();
    });
  });

  // Sliders
  container.querySelector("#att-hlevel-slider")?.addEventListener("input", (e) => {
    state.calculator.attackerHLevel = parseInt(e.target.value, 10);
    notifyStateChange();
  });
  container.querySelector("#att-dlevel-slider")?.addEventListener("input", (e) => {
    state.calculator.attackerDLevel = parseInt(e.target.value, 10);
    notifyStateChange();
  });
  container.querySelector("#def-hlevel-slider")?.addEventListener("input", (e) => {
    state.calculator.defenderHLevel = parseInt(e.target.value, 10);
    notifyStateChange();
  });
  container.querySelector("#def-dlevel-slider")?.addEventListener("input", (e) => {
    state.calculator.defenderDLevel = parseInt(e.target.value, 10);
    notifyStateChange();
  });

  // Toggle combat loop log
  container.querySelector("#btn-toggle-loop")?.addEventListener("click", () => {
    showLoopLog = !showLoopLog;
    renderCalculatorTab();
  });
}
