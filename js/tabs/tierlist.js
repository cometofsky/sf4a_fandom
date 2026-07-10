// Community Pairwise Tier List Controller with Persistent Storage & Confirm Reset Modal
import { CONFIG } from '../config.js';
import { HERO_DATABASE } from '../data.js';
import { showConfirmModal, showToast, renderHeroAvatar } from '../ui.js';

let votes = {};
let matchupPair = [0, 1];

function loadVotes() {
  try {
    const raw = localStorage.getItem(CONFIG.STORAGE_KEYS.TIER_VOTES);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveVotes() {
  try {
    localStorage.setItem(CONFIG.STORAGE_KEYS.TIER_VOTES, JSON.stringify(votes));
  } catch (e) {}
}

function pickRandomMatchup() {
  if (HERO_DATABASE.length < 2) return [0, 0];
  const idxA = Math.floor(Math.random() * HERO_DATABASE.length);
  let idxB = Math.floor(Math.random() * HERO_DATABASE.length);
  while (idxB === idxA) {
    idxB = Math.floor(Math.random() * HERO_DATABASE.length);
  }
  return [idxA, idxB];
}

export function renderTierListTab() {
  const container = document.getElementById("tierlist-container");
  if (!container) return;

  votes = loadVotes();
  if (!matchupPair || matchupPair[0] === matchupPair[1]) {
    matchupPair = pickRandomMatchup();
  }

  const heroA = HERO_DATABASE[matchupPair[0]] || HERO_DATABASE[0];
  const heroB = HERO_DATABASE[matchupPair[1]] || HERO_DATABASE[1];

  const totalVotesCast = Object.values(votes).reduce((sum, v) => sum + (v.wins || 0) + (v.losses || 0), 0) / 2;

  // Calculate tier placement based on win rate & base stats
  const rankedHeroes = HERO_DATABASE.map(h => {
    const rec = votes[h.id] || { wins: 0, losses: 0 };
    const total = rec.wins + rec.losses;
    const winRate = total > 0 ? rec.wins / total : 0.5;
    const baseTotal = h.baseStats.attack + h.baseStats.defense + h.baseStats.shadow + h.baseStats.health;
    const score = winRate * 1000 + baseTotal * 0.1;
    return { hero: h, wins: rec.wins, losses: rec.losses, score };
  }).sort((a, b) => b.score - a.score);

  const tiers = { S: [], A: [], B: [], C: [] };
  rankedHeroes.forEach((item, idx) => {
    if (idx < 5) tiers.S.push(item);
    else if (idx < 12) tiers.A.push(item);
    else if (idx < 20) tiers.B.push(item);
    else tiers.C.push(item);
  });

  const renderTierRow = (tierLetter, items) => `
    <div class="tier-row tier-${tierLetter.toLowerCase()}">
      <div class="tier-label-box">${tierLetter}</div>
      <div class="tier-heroes-list">
        ${items.map(({ hero, wins, losses }) => `
          <div class="tier-hero-chip faction-${hero.faction.toLowerCase()}">
            ${renderHeroAvatar(hero, "tier-mini-avatar")}
            <span>${hero.name}</span>
            <small>${wins}W / ${losses}L</small>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  const matchupContainer = document.getElementById("tier-vote-matchup");
  if (matchupContainer) {
    matchupContainer.innerHTML = `
      <button type="button" class="btn-vote-card faction-${heroA.faction.toLowerCase()}" data-winner="${heroA.id}" data-loser="${heroB.id}">
        ${renderHeroAvatar(heroA, "vote-avatar")}
        <h4>${heroA.name}</h4>
        <span>${heroA.faction}</span>
      </button>

      <span class="vote-vs">VS</span>

      <button type="button" class="btn-vote-card faction-${heroB.faction.toLowerCase()}" data-winner="${heroB.id}" data-loser="${heroA.id}">
        ${renderHeroAvatar(heroB, "vote-avatar")}
        <h4>${heroB.name}</h4>
        <span>${heroB.faction}</span>
      </button>
    `;

    matchupContainer.querySelectorAll(".btn-vote-card").forEach(btn => {
      btn.addEventListener("click", () => {
        const winnerId = btn.getAttribute("data-winner");
        const loserId = btn.getAttribute("data-loser");

        if (!votes[winnerId]) votes[winnerId] = { wins: 0, losses: 0 };
        if (!votes[loserId]) votes[loserId] = { wins: 0, losses: 0 };

        votes[winnerId].wins += 1;
        votes[loserId].losses += 1;
        saveVotes();

        matchupPair = pickRandomMatchup();
        renderTierListTab();
      });
    });
  }

  const countEl = document.getElementById("tier-vote-count");
  if (countEl) countEl.textContent = Math.round(totalVotesCast);

  const rowsContainer = document.getElementById("tier-rows-container");
  if (rowsContainer) {
    rowsContainer.innerHTML = Object.entries(tiers)
      .map(([letter, items]) => renderTierRow(letter, items))
      .join("");
  }

  const resetBtn = document.getElementById("tier-reset-btn");
  resetBtn?.addEventListener("click", () => {
    showConfirmModal({
      title: "Reset Tier List Votes?",
      message: "Are you sure you want to clear all your community voting history on this device? This action cannot be undone.",
      onConfirm: () => {
        votes = {};
        localStorage.removeItem(CONFIG.STORAGE_KEYS.TIER_VOTES);
        renderTierListTab();
        showToast("Your tier list votes have been reset.", "info");
      }
    });
  });
}
