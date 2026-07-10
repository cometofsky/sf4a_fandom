// Talent Builder Controller with Shareable URL Links & Inline Validation
import { HERO_DATABASE } from '../data.js';
import { generateBuildCode, parseBuildCode } from '../engines.js';
import { state, notifyStateChange } from '../state.js';
import { renderHeroAvatar, showToast, escapeHtml } from '../ui.js';

let validationMsg = { text: "", type: "info" };

export function renderBuilderTab() {
  const container = document.getElementById("builder-tab");
  if (!container) return;

  const hero = HERO_DATABASE.find(h => h.id === state.selectedHeroId) || HERO_DATABASE[0];
  const heroBuild = state.builderBuilds[hero.id] || { talents: [0, 0, 0, 0, 0], weaponIdx: 0 };

  const heroOptionsHTML = HERO_DATABASE.map(h => `
    <option value="${h.id}" ${h.id === hero.id ? 'selected' : ''}>${h.name} (${h.faction})</option>
  `).join("");

  const weaponsHTML = (hero.weapons || []).map((wp, idx) => `
    <label class="weapon-option ${heroBuild.weaponIdx === idx ? 'active' : ''}">
      <input type="radio" name="builder-weapon" value="${idx}" ${heroBuild.weaponIdx === idx ? 'checked' : ''}>
      <div class="weapon-details">
        <div class="weapon-header">
          <strong>${wp.name}</strong>
          <span class="rarity-badge rarity-${wp.rarity.toLowerCase()}">${wp.rarity}</span>
        </div>
        <p class="weapon-perk">${wp.perk}</p>
        <div class="weapon-mods">
          <span>⚔️ ${(wp.attackMod * 100 - 100).toFixed(0)}% Atk</span>
          <span>🛡️ ${(wp.defenseMod * 100 - 100).toFixed(0)}% Def</span>
        </div>
      </div>
    </label>
  `).join("");

  const talentsHTML = (hero.talents || []).map((tier, tIdx) => {
    const selectedChoice = heroBuild.talents[tIdx] || 0;
    return `
      <div class="builder-talent-row">
        <span class="builder-tier-num">TIER ${tIdx + 1}</span>
        <div class="builder-tier-options">
          <button type="button" class="btn-talent-choice ${selectedChoice === 0 ? 'selected' : ''}" data-tier="${tIdx}" data-choice="0">
            <strong>${tier[0].name}</strong>
            <p>${tier[0].desc}</p>
          </button>
          <button type="button" class="btn-talent-choice ${selectedChoice === 1 ? 'selected' : ''}" data-tier="${tIdx}" data-choice="1">
            <strong>${tier[1].name}</strong>
            <p>${tier[1].desc}</p>
          </button>
        </div>
      </div>
    `;
  }).join("");

  const currentBuildCode = generateBuildCode(hero.id, heroBuild.weaponIdx, heroBuild.talents);
  const shareableUrl = `${window.location.origin}${window.location.pathname}#builder=${currentBuildCode}`;

  const validationBanner = validationMsg.text ? `
    <div class="inline-validation-banner msg-${validationMsg.type}">
      ${validationMsg.text}
    </div>
  ` : '';

  container.innerHTML = `
    <div class="section-header">
      <h2>TACTICAL TALENT & WEAPON BUILDER</h2>
      <p>Configure level 5 talent pathways, equip weapons, and generate match-grade shareable build URLs.</p>
    </div>

    <div class="builder-header-bar faction-${hero.faction.toLowerCase()}">
      <div class="hero-selector-group">
        <label for="builder-hero-select">SELECTED HERO:</label>
        <select id="builder-hero-select" class="glass-select">
          ${heroOptionsHTML}
        </select>
      </div>
      <div class="hero-summary-pill">
        ${renderHeroAvatar(hero, "builder-mini-avatar")}
        <div class="summary-info">
          <h3>${hero.name}</h3>
          <span>${hero.faction}</span>
        </div>
      </div>
    </div>

    <div class="builder-layout">
      <div class="builder-left-col">
        <h3>EQUIPPED WEAPON</h3>
        <div class="weapons-list">
          ${weaponsHTML}
        </div>

        <div class="build-share-box glass-panel">
          <h3>TWO-WAY BUILD CODE & SHARE LINK</h3>
          <p>Copy or paste an encoded build code, or share direct deep links with squad mates:</p>
          <div class="code-input-row">
            <input type="text" id="build-code-input" class="glass-input code-input" value="${currentBuildCode}" placeholder="e.g. MAR-1-LLLLL">
            <button type="button" id="btn-copy-code" class="btn-primary">Copy Code</button>
            <button type="button" id="btn-share-link" class="btn-accent">🔗 Copy Share Link</button>
          </div>
          ${validationBanner}
        </div>
      </div>

      <div class="builder-right-col">
        <h3>5-TIER TALENT PATHWAY</h3>
        <div class="talents-container">
          ${talentsHTML}
        </div>
      </div>
    </div>
  `;

  // Hero select change
  container.querySelector("#builder-hero-select")?.addEventListener("change", (e) => {
    state.selectedHeroId = e.target.value;
    validationMsg = { text: "", type: "info" };
    notifyStateChange();
  });

  // Weapon radio change
  container.querySelectorAll('input[name="builder-weapon"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
      const idx = parseInt(e.target.value, 10);
      state.builderBuilds[hero.id].weaponIdx = idx;
      notifyStateChange();
    });
  });

  // Talent buttons click
  container.querySelectorAll(".btn-talent-choice").forEach(btn => {
    btn.addEventListener("click", () => {
      const tier = parseInt(btn.getAttribute("data-tier"), 10);
      const choice = parseInt(btn.getAttribute("data-choice"), 10);
      state.builderBuilds[hero.id].talents[tier] = choice;
      notifyStateChange();
    });
  });

  // Copy Code
  container.querySelector("#btn-copy-code")?.addEventListener("click", () => {
    navigator.clipboard.writeText(currentBuildCode);
    showToast(`Copied build code: ${currentBuildCode}`, "success");
  });

  // Copy Share Link
  container.querySelector("#btn-share-link")?.addEventListener("click", () => {
    navigator.clipboard.writeText(shareableUrl);
    showToast(`Copied share link to clipboard!`, "success");
  });

  // Build Code input & validation
  const codeInput = container.querySelector("#build-code-input");
  codeInput?.addEventListener("change", (e) => {
    const inputCode = e.target.value.trim();
    const parsed = parseBuildCode(inputCode);
    if (!parsed) {
      validationMsg = { text: "❌ Invalid build format. Must be [3-LETTER-PREFIX]-[WEAPON_IDX]-[TALENTS] (e.g. MAR-1-LLLLL)", type: "error" };
      renderBuilderTab();
      return;
    }

    const matchedHero = HERO_DATABASE.find(h => h.id.toUpperCase().slice(0, 3) === parsed.heroPrefix);
    if (!matchedHero) {
      validationMsg = { text: `❌ Unknown hero prefix '${escapeHtml(parsed.heroPrefix)}'.`, type: "error" };
      renderBuilderTab();
      return;
    }

    if (matchedHero.id !== hero.id) {
      state.selectedHeroId = matchedHero.id;
      validationMsg = { text: `ℹ️ Prefix '${escapeHtml(parsed.heroPrefix)}' belongs to ${matchedHero.name}. Switched hero selection automatically.`, type: "info" };
    } else {
      validationMsg = { text: `✅ Successfully loaded build code ${escapeHtml(inputCode)} for ${hero.name}!`, type: "success" };
    }

    state.builderBuilds[matchedHero.id] = {
      weaponIdx: parsed.weaponIdx,
      talents: parsed.talents
    };
    notifyStateChange();
  });
}
