// Dojo Council Rulings Controller
import { DOJO_COUNCIL_RULINGS } from '../content.js';
import { escapeHtml } from '../ui.js';

let rulingsSearchQuery = "";

export function renderRulingsTab() {
  const container = document.getElementById("rulings-list-container");
  if (!container) return;

  const filtered = DOJO_COUNCIL_RULINGS.filter(r =>
    r.title.toLowerCase().includes(rulingsSearchQuery.toLowerCase()) ||
    r.changes.some(c => c.toLowerCase().includes(rulingsSearchQuery.toLowerCase()))
  );

  const rulingsHTML = filtered.map(r => `
    <div class="ruling-card glass-panel">
      <div class="ruling-header">
        <span class="ruling-date">${r.date}</span>
        <h3>${r.title}</h3>
      </div>
      <ul class="ruling-changes">
        ${r.changes.map(c => `<li>${c}</li>`).join("")}
      </ul>
    </div>
  `).join("");

  container.innerHTML = rulingsHTML || `<p class="empty-state">No council rulings found matching "${escapeHtml(rulingsSearchQuery)}"</p>`;
}
