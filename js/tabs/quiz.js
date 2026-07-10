// Lore Mastery & Mechanics Quiz Controller (Expanded Pool, Shuffle & High Score)
import { QUIZ_QUESTIONS } from '../content.js';
import { state, notifyStateChange } from '../state.js';
import { showToast } from '../ui.js';

let activeQuestions = [];
let currentIdx = 0;
let currentScore = 0;
let hasAnsweredCurrent = false;
let lastAnswerFeedback = null; // { correct: boolean, explanation: string }

function shuffleQuestions(category = "all") {
  const pool = category === "all"
    ? [...QUIZ_QUESTIONS]
    : QUIZ_QUESTIONS.filter(q => q.category === category);

  // Shuffle and pick 10 questions per run
  activeQuestions = pool.sort(() => Math.random() - 0.5).slice(0, 10);
  currentIdx = 0;
  currentScore = 0;
  hasAnsweredCurrent = false;
  lastAnswerFeedback = null;
}

export function renderQuizTab() {
  const container = document.getElementById("quiz-tab");
  if (!container) return;

  if (activeQuestions.length === 0) {
    shuffleQuestions(state.quiz.selectedCategory);
  }

  const isFinished = currentIdx >= activeQuestions.length;

  const categoryPillsHTML = [
    { id: "all", name: "All Categories" },
    { id: "lore", name: "Lore & Chronology" },
    { id: "mechanics", name: "Mechanics & Math" },
    { id: "roster", name: "Roster & Heroes" }
  ].map(cat => `
    <button type="button" class="quiz-cat-pill ${state.quiz.selectedCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
      ${cat.name}
    </button>
  `).join("");

  if (isFinished) {
    const pct = Math.round((currentScore / activeQuestions.length) * 100);
    let rankName = "Shadow Novice";
    let badgeEmoji = "📜";
    if (pct >= 90) { rankName = "Grand Shadow Scholar"; badgeEmoji = "👑"; }
    else if (pct >= 70) { rankName = "Dojo Council Historian"; badgeEmoji = "🏅"; }
    else if (pct >= 50) { rankName = "Arena Initiate"; badgeEmoji = "🎖️"; }

    // Update high score
    if (currentScore > state.quiz.highScore) {
      state.quiz.highScore = currentScore;
    }

    container.innerHTML = `
      <div class="section-header">
        <h2>LORE MASTERY QUIZ</h2>
        <p>Test your deeper knowledge of Shadow Fight 4 history, frame math, and hero abilities.</p>
      </div>

      <div class="quiz-results-card glass-panel">
        <div class="results-badge">${badgeEmoji}</div>
        <h3>FINAL RANK: ${rankName}</h3>
        <p class="score-display">You scored <strong>${currentScore} / ${activeQuestions.length}</strong> (${pct}%)</p>
        <p class="highscore-badge">🏆 Best Score: <strong>${state.quiz.highScore}</strong></p>

        <div class="quiz-actions">
          <button type="button" id="btn-quiz-retry" class="btn-primary">Try Another Round</button>
        </div>
      </div>
    `;

    container.querySelector("#btn-quiz-retry")?.addEventListener("click", () => {
      shuffleQuestions(state.quiz.selectedCategory);
      renderQuizTab();
    });
    return;
  }

  const q = activeQuestions[currentIdx];
  const optionsHTML = q.options.map((opt, idx) => `
    <button type="button" class="quiz-option-btn ${hasAnsweredCurrent && idx === q.correct ? 'correct' : ''}" data-opt="${idx}" ${hasAnsweredCurrent ? 'disabled' : ''}>
      <span class="opt-index">${String.fromCharCode(65 + idx)}</span>
      <span class="opt-text">${opt}</span>
    </button>
  `).join("");

  const feedbackHTML = lastAnswerFeedback ? `
    <div class="quiz-feedback ${lastAnswerFeedback.correct ? 'feedback-correct' : 'feedback-wrong'}">
      <strong>${lastAnswerFeedback.correct ? '✅ CORRECT!' : '❌ INCORRECT'}</strong>
      <p>${lastAnswerFeedback.explanation}</p>
      <button type="button" id="btn-quiz-next" class="btn-primary">Next Question &rarr;</button>
    </div>
  ` : '';

  container.innerHTML = `
    <div class="section-header">
      <h2>LORE MASTERY QUIZ</h2>
      <p>Test your deeper knowledge of Shadow Fight 4 history, frame math, and hero abilities.</p>
    </div>

    <div class="quiz-toolbar">
      <div class="quiz-categories">
        ${categoryPillsHTML}
      </div>
      <div class="quiz-score-meta">
        <span>Question <strong>${currentIdx + 1}</strong> of ${activeQuestions.length}</span>
        <span>Score: <strong>${currentScore}</strong> | Best: <strong>${state.quiz.highScore}</strong></span>
      </div>
    </div>

    <div class="quiz-card glass-panel">
      <span class="question-cat-badge">${q.category.toUpperCase()}</span>
      <h3 class="question-title">${q.question}</h3>
      <div class="quiz-options-list">
        ${optionsHTML}
      </div>
      ${feedbackHTML}
    </div>
  `;

  // Category buttons
  container.querySelectorAll(".quiz-cat-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      state.quiz.selectedCategory = btn.getAttribute("data-cat");
      shuffleQuestions(state.quiz.selectedCategory);
      renderQuizTab();
    });
  });

  // Answer selection
  container.querySelectorAll(".quiz-option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (hasAnsweredCurrent) return;
      hasAnsweredCurrent = true;
      const selected = parseInt(btn.getAttribute("data-opt"), 10);
      const isCorrect = selected === q.correct;
      if (isCorrect) currentScore += 1;
      lastAnswerFeedback = {
        correct: isCorrect,
        explanation: q.explanation
      };
      if (currentScore > state.quiz.highScore) {
        state.quiz.highScore = currentScore;
      }
      renderQuizTab();
    });
  });

  // Next Question
  container.querySelector("#btn-quiz-next")?.addEventListener("click", () => {
    currentIdx += 1;
    hasAnsweredCurrent = false;
    lastAnswerFeedback = null;
    renderQuizTab();
  });
}
