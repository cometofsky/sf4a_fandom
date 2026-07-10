// Chronology Timeline Controller
import { CHRONOLOGY_EVENTS } from '../content.js';

export function renderChronologyTab() {
  const container = document.getElementById("chronology-tab");
  if (!container) return;

  const timelineHTML = CHRONOLOGY_EVENTS.map(ev => `
    <div class="timeline-entry glass-panel">
      <span class="timeline-year">${ev.year}</span>
      <h3>${ev.title}</h3>
      <p>${ev.desc}</p>
    </div>
  `).join("");

  container.innerHTML = `
    <div class="section-header">
      <h2>ARENA CHRONOLOGY</h2>
      <p>Key historical events from the opening of the Shadow Gates to the timeless Shadow Tournament.</p>
    </div>
    <div class="timeline-container">
      ${timelineHTML}
    </div>
  `;
}
