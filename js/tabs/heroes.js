// Heroes Tab Controller, Side-by-Side Compare Mode & Modal Detail Controller
import { HERO_DATABASE } from '../data.js';
import { calculateStat } from '../engines.js';
import { state, notifyStateChange } from '../state.js';
import { renderHeroAvatar, openModalWithA11y } from '../ui.js';

let currentFilterFaction = "all";
let currentSearchQuery = "";
let showCompareMode = false;

export function renderHeroesTab() {
  const container = document.getElementById("heroes-tab");
  if (!container) return;

  const filteredHeroes = HERO_DATABASE.filter(h => {
    const matchFaction = currentFilterFaction === "all" || h.faction.toLowerCase() === currentFilterFaction.toLowerCase();
    const matchSearch = h.name.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
                        h.faction.toLowerCase().includes(currentSearchQuery.toLowerCase());
    return matchFaction && matchSearch;
  });

  const filterButtonsHTML = ["all", "Legion", "Dynasty", "Heralds"].map(fac => `
    <button type="button" class="filter-pill ${currentFilterFaction === fac ? 'active' : ''}" data-filter="${fac}">
      ${fac === "all" ? "🌐 All Factions" : fac}
    </button>
  `).join("");

  const compareModeHTML = showCompareMode ? renderCompareSection() : '';

  const heroesGridHTML = filteredHeroes.length > 0
    ? filteredHeroes.map(hero => `
        <article class="hero-card faction-${hero.faction.toLowerCase()}" data-heroid="${hero.id}" tabindex="0" role="button" aria-label="View details for ${hero.name}">
          ${renderHeroAvatar(hero, "card-avatar")}
          <div class="hero-card-content">
            <div class="hero-card-header">
              <span class="hero-name">${hero.name}</span>
              <span class="hero-faction-badge badge-${hero.faction.toLowerCase()}">${hero.faction}</span>
            </div>
            <p class="hero-card-bio">${hero.bio}</p>
            <div class="hero-card-stats">
              <div class="stat-pill">⚔️ ${hero.baseStats.attack}</div>
              <div class="stat-pill">🛡️ ${hero.baseStats.defense}</div>
              <div class="stat-pill">✨ ${hero.baseStats.shadow}</div>
              <div class="stat-pill">❤️ ${hero.baseStats.health}</div>
            </div>
          </div>
        </article>
      `).join("")
    : `<div class="empty-state-card">
         <p>No heroes match your search "<strong>${currentSearchQuery}</strong>"</p>
         <button type="button" class="btn-clear-search">Clear Search</button>
       </div>`;

  container.innerHTML = `
    <div class="section-header">
      <h2>ROSTER ARCHIVES</h2>
      <p>Inspect the attributes, combat talent trees, and frame-data movesets for all 28 heroes.</p>
    </div>

    <div class="heroes-toolbar">
      <div class="search-box">
        <input type="search" id="hero-search-input" class="glass-input" placeholder="Search heroes by name or faction..." value="${currentSearchQuery}" aria-label="Search heroes">
      </div>
      <div class="filter-pills">
        ${filterButtonsHTML}
      </div>
      <button type="button" id="toggle-compare-btn" class="btn-compare-toggle ${showCompareMode ? 'active' : ''}">
        ⚖️ ${showCompareMode ? 'Hide Compare Mode' : 'Side-by-Side Compare'}
      </button>
    </div>

    ${compareModeHTML}

    <div class="heroes-grid" id="heroes-grid-container">
      ${heroesGridHTML}
    </div>
  `;

  // Search listeners
  const searchInput = container.querySelector("#hero-search-input");
  searchInput?.addEventListener("input", (e) => {
    currentSearchQuery = e.target.value;
    renderHeroesTab();
    const inputAfter = document.getElementById("hero-search-input");
    if (inputAfter) {
      inputAfter.focus();
      inputAfter.selectionStart = inputAfter.selectionEnd = inputAfter.value.length;
    }
  });

  container.querySelector(".btn-clear-search")?.addEventListener("click", () => {
    currentSearchQuery = "";
    renderHeroesTab();
  });

  // Filter pills
  container.querySelectorAll(".filter-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      currentFilterFaction = btn.getAttribute("data-filter");
      renderHeroesTab();
    });
  });

  // Compare mode toggle
  container.querySelector("#toggle-compare-btn")?.addEventListener("click", () => {
    showCompareMode = !showCompareMode;
    renderHeroesTab();
  });

  // Compare selector listeners
  if (showCompareMode) {
    container.querySelector("#compare-select-a")?.addEventListener("change", (e) => {
      state.compareHeroIdA = e.target.value;
      renderHeroesTab();
    });
    container.querySelector("#compare-select-b")?.addEventListener("change", (e) => {
      state.compareHeroIdB = e.target.value;
      renderHeroesTab();
    });
  }

  // Card click -> open modal
  container.querySelectorAll(".hero-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-heroid");
      openHeroModal(id);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const id = card.getAttribute("data-heroid");
        openHeroModal(id);
      }
    });
  });
}

function renderCompareSection() {
  const heroA = HERO_DATABASE.find(h => h.id === state.compareHeroIdA) || HERO_DATABASE[0];
  const heroB = HERO_DATABASE.find(h => h.id === state.compareHeroIdB) || HERO_DATABASE[1];

  const optionsHTML = (selectedId) => HERO_DATABASE.map(h => `
    <option value="${h.id}" ${h.id === selectedId ? 'selected' : ''}>${h.name} (${h.faction})</option>
  `).join("");

  const renderSideStats = (h, otherH) => {
    const stats = ['attack', 'defense', 'shadow', 'health'];
    return stats.map(st => {
      const val = h.baseStats[st];
      const otherVal = otherH.baseStats[st];
      const diff = val - otherVal;
      const diffClass = diff > 0 ? "stat-plus" : diff < 0 ? "stat-minus" : "stat-neutral";
      const diffLabel = diff > 0 ? `+${diff}` : diff === 0 ? "EQUALS" : `${diff}`;
      return `
        <div class="compare-stat-row">
          <span class="compare-stat-name">${st.toUpperCase()}</span>
          <span class="compare-stat-value">${val}</span>
          <span class="compare-stat-diff ${diffClass}">${diffLabel}</span>
        </div>
      `;
    }).join("");
  };

  return `
    <div class="hero-compare-container glass-panel">
      <h3>HEAD-TO-HEAD STAT COMPARISON</h3>
      <div class="compare-grid">
        <div class="compare-side faction-${heroA.faction.toLowerCase()}">
          <select id="compare-select-a" class="glass-select compare-picker">
            ${optionsHTML(heroA.id)}
          </select>
          ${renderHeroAvatar(heroA, "compare-avatar")}
          <h4>${heroA.name}</h4>
          <p class="compare-perk">${heroA.perk || heroA.bio}</p>
          <div class="compare-stats-box">
            ${renderSideStats(heroA, heroB)}
          </div>
        </div>

        <div class="compare-vs-badge">VS</div>

        <div class="compare-side faction-${heroB.faction.toLowerCase()}">
          <select id="compare-select-b" class="glass-select compare-picker">
            ${optionsHTML(heroB.id)}
          </select>
          ${renderHeroAvatar(heroB, "compare-avatar")}
          <h4>${heroB.name}</h4>
          <p class="compare-perk">${heroB.perk || heroB.bio}</p>
          <div class="compare-stats-box">
            ${renderSideStats(heroB, heroA)}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function openHeroModal(heroId) {
  const hero = HERO_DATABASE.find(h => h.id === heroId);
  if (!hero) return;

  const modal = document.getElementById("hero-modal");
  const contentWrapper = document.getElementById("modal-hero-content");
  if (!modal || !contentWrapper) return;

  let hLvl = 1;
  let dLvl = 1;

  function renderModalInner() {
    const atk = calculateStat(hero.baseStats.attack, hLvl, dLvl);
    const def = calculateStat(hero.baseStats.defense, hLvl, dLvl);
    const shd = calculateStat(hero.baseStats.shadow, hLvl, dLvl);
    const hp = calculateStat(hero.baseStats.health, hLvl, dLvl);

    const talentsHTML = (hero.talents || []).map((tier, idx) => `
      <div class="modal-talent-tier">
        <span class="tier-label">TIER ${idx + 1}</span>
        <div class="tier-choices">
          <div class="tier-choice">
            <strong>${tier[0].name}</strong>
            <p>${tier[0].desc}</p>
          </div>
          <div class="tier-choice">
            <strong>${tier[1].name}</strong>
            <p>${tier[1].desc}</p>
          </div>
        </div>
      </div>
    `).join("");

    const movesHTML = (hero.moves || []).map(mv => `
      <tr>
        <td><strong>${mv.name}</strong></td>
        <td><span class="move-type-badge type-${mv.type.toLowerCase()}">${mv.type}</span></td>
        <td><code>${mv.startup}</code></td>
        <td><code>${mv.recovery}</code></td>
        <td><strong>${mv.damageMult}x</strong></td>
        <td>${mv.property}</td>
      </tr>
    `).join("");

    contentWrapper.innerHTML = `
      <div class="modal-header faction-${hero.faction.toLowerCase()}">
        ${renderHeroAvatar(hero, "modal-avatar")}
        <div class="modal-title-area">
          <h2>${hero.name}</h2>
          <span class="hero-faction-badge badge-${hero.faction.toLowerCase()}">${hero.faction}</span>
        </div>
      </div>

      <p class="modal-bio">${hero.bio}</p>

      <div class="modal-stats-section">
        <h3>DYNAMIC LEVEL SCALING</h3>
        <div class="slider-controls">
          <label>Hero Level: <strong>${hLvl}</strong>
            <input type="range" min="1" max="13" value="${hLvl}" id="modal-hero-slider">
          </label>
          <label>Dojo Level: <strong>${dLvl}</strong>
            <input type="range" min="1" max="13" value="${dLvl}" id="modal-dojo-slider">
          </label>
        </div>

        <div class="modal-stats-grid">
          <div class="modal-stat-box"><span>⚔️ ATTACK</span><strong>${atk}</strong></div>
          <div class="modal-stat-box"><span>🛡️ DEFENSE</span><strong>${def}</strong></div>
          <div class="modal-stat-box"><span>✨ SHADOW</span><strong>${shd}</strong></div>
          <div class="modal-stat-box"><span>❤️ HEALTH</span><strong>${hp}</strong></div>
        </div>
      </div>

      <div class="modal-tabs">
        <button type="button" class="modal-tab-btn active" data-modaltab="moves">Move & Frame Data</button>
        <button type="button" class="modal-tab-btn" data-modaltab="talents">5-Tier Talent Tree</button>
      </div>

      <div id="modal-tab-moves" class="modal-tab-view active">
        <table class="frame-data-table">
          <thead>
            <tr>
              <th>Move Name</th>
              <th>Type</th>
              <th>Startup</th>
              <th>Recovery</th>
              <th>Damage Mult</th>
              <th>Special Property</th>
            </tr>
          </thead>
          <tbody>
            ${movesHTML}
          </tbody>
        </table>
      </div>

      <div id="modal-tab-talents" class="modal-tab-view" style="display:none;">
        ${talentsHTML}
      </div>
    `;

    // Sliders
    contentWrapper.querySelector("#modal-hero-slider")?.addEventListener("input", (e) => {
      hLvl = parseInt(e.target.value, 10);
      renderModalInner();
    });
    contentWrapper.querySelector("#modal-dojo-slider")?.addEventListener("input", (e) => {
      dLvl = parseInt(e.target.value, 10);
      renderModalInner();
    });

    // Sub-tab toggling
    contentWrapper.querySelectorAll(".modal-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        contentWrapper.querySelectorAll(".modal-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const target = btn.getAttribute("data-modaltab");
        contentWrapper.querySelector("#modal-tab-moves").style.display = target === "moves" ? "block" : "none";
        contentWrapper.querySelector("#modal-tab-talents").style.display = target === "talents" ? "block" : "none";
      });
    });
  }

  renderModalInner();
  openModalWithA11y(modal);
}
