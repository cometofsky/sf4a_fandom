// Reusable UI Helpers, Accessibility Focus Trap, Toast Notifications & Avatar Rendering
import { CONFIG } from './config.js';

/**
 * Safely escapes HTML special characters to prevent DOM XSS.
 * @param {any} str
 * @returns {string}
 */
export function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Renders a cohesive hero avatar box. Uses local photo if present with SVG/CSS heroic crest fallback.
 * @param {Object} hero
 * @param {string} extraClass
 * @returns {string}
 */
export function renderHeroAvatar(hero, extraClass = "") {
  const factionClass = `faction-${(hero.faction || "Legion").toLowerCase()}`;
  const photoMarkup = hero.photo
    ? `<img src="${hero.photo}" alt="${escapeHtml(hero.name)}" class="hero-avatar-photo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">`
    : '';
  const fallbackDisplay = hero.photo ? 'style="display:none;"' : '';

  return `
    <div class="hero-avatar-container ${factionClass} ${extraClass}">
      ${photoMarkup}
      <div class="hero-avatar-fallback" ${fallbackDisplay}>
        <span class="hero-crest-emoji">${hero.avatar || "🛡️"}</span>
        <span class="hero-crest-badge">${escapeHtml((hero.faction || "L").slice(0, 1))}</span>
      </div>
    </div>
  `;
}

/**
 * Displays a non-intrusive floating toast notification.
 * @param {string} message
 * @param {'success'|'error'|'info'} type
 */
export function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast-message toast-${type}`;
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  const span = document.createElement("span");
  span.textContent = message;
  toast.appendChild(span);

  container.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/**
 * Opens a <dialog> modal with accessibility focus trap.
 * @param {HTMLDialogElement} dialog
 */
export function openModalWithA11y(dialog) {
  if (!dialog) return;
  if (!dialog.open) {
    dialog.showModal();
  }

  const focusable = dialog.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstEl = focusable[0];
  const lastEl = focusable[focusable.length - 1];

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      dialog.close();
      dialog.removeEventListener("keydown", handleKeyDown);
    } else if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    }
  }

  dialog.addEventListener("keydown", handleKeyDown);
  firstEl?.focus();
}

/**
 * Shows a custom glassmorphic confirmation modal before destructive actions.
 * @param {Object} params - { title, message, onConfirm }
 */
export function showConfirmModal({ title, message, onConfirm }) {
  let confirmDialog = document.getElementById("confirm-dialog");
  if (!confirmDialog) {
    confirmDialog = document.createElement("dialog");
    confirmDialog.id = "confirm-dialog";
    confirmDialog.className = "detail-modal confirm-modal";
    document.body.appendChild(confirmDialog);
  }

  confirmDialog.innerHTML = `
    <form method="dialog" class="modal-form confirm-form">
      <h3 class="confirm-title">${escapeHtml(title)}</h3>
      <p class="confirm-msg">${escapeHtml(message)}</p>
      <div class="confirm-actions">
        <button type="button" class="btn-secondary confirm-cancel-btn">Cancel</button>
        <button type="button" class="btn-primary confirm-ok-btn">Confirm Reset</button>
      </div>
    </form>
  `;

  const cancelBtn = confirmDialog.querySelector(".confirm-cancel-btn");
  const okBtn = confirmDialog.querySelector(".confirm-ok-btn");

  cancelBtn.addEventListener("click", () => confirmDialog.close());
  okBtn.addEventListener("click", () => {
    confirmDialog.close();
    if (typeof onConfirm === "function") onConfirm();
  });

  openModalWithA11y(confirmDialog);
}

/**
 * Initializes first-time onboarding tour banner if not previously dismissed.
 */
export function initOnboardingTour() {
  const dismissed = localStorage.getItem(CONFIG.STORAGE_KEYS.ONBOARDING_DISMISSED);
  if (dismissed === "true") return;

  const banner = document.createElement("div");
  banner.id = "onboarding-banner";
  banner.className = "onboarding-banner";
  banner.innerHTML = `
    <div class="onboarding-content">
      <div class="onboarding-icon">🌌</div>
      <div class="onboarding-text">
        <h4>Welcome to Shadow Fight 4 Fandom Hub!</h4>
        <p>Switch between <strong>Legion, Dynasty & Heralds</strong> with the Lore Lens header above. Customize talent builds, share URLs, and run live combat simulations.</p>
      </div>
      <button type="button" class="onboarding-close" aria-label="Dismiss onboarding">&times; Got It</button>
    </div>
  `;

  document.body.appendChild(banner);

  banner.querySelector(".onboarding-close").addEventListener("click", () => {
    banner.classList.add("hiding");
    setTimeout(() => banner.remove(), 400);
    localStorage.setItem(CONFIG.STORAGE_KEYS.ONBOARDING_DISMISSED, "true");
  });
}
