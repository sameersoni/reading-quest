/* ============================================================
   app.js — Reading Quest
   A small hash-free single-page app. No framework, no build step,
   so it can run straight from index.html on an iPad, online or off.
   ============================================================ */

(function () {
  const { getStoryArt, Icon } = window.ReadingQuestArt;
  const Storage = window.ReadingQuestStorage;
  const STORIES = window.ReadingQuestStories;

  // Personalize this with your child's name — shown under the app title.
  const CHILD_NAME = 'Story Explorer';

  const LEVEL_META = {
    1: { name: 'Beginner', blurb: 'Short, cosy stories to start your quest.', color: '#6FB7DE' },
    2: { name: 'Growing Reader', blurb: 'A little longer, a little trickier.', color: '#4F9A6B' },
    3: { name: 'Bright Explorer', blurb: 'Rich stories for a bright imagination.', color: '#F2795B' },
  };

  let state = Storage.loadState();

  // ---- navigation / transient UI state ----
  const nav = {
    view: 'home',       // home | stories | reader | questions | review | result | badges | grownup
    level: 1,
    storyId: null,
    qIndex: 0,
    answers: {},         // { qid: text }  (current in-progress attempt)
    verdicts: {},         // { qid: true|false|undefined } (current review)
    lastResult: null,
  };

  const root = document.getElementById('app-root');

  function findStory(id) {
    return STORIES.find((s) => s.id === id);
  }

  function go(view, extra = {}) {
    nav.view = view;
    Object.assign(nav, extra);
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    render();
  }

  function pickRandomStory({ onlyUnlocked = true, excludeCompleted = true } = {}) {
    let pool = STORIES.filter((s) => (!onlyUnlocked || state.levelUnlocked[s.level]));
    const fresh = pool.filter((s) => !(state.stories[s.id] && state.stories[s.id].completed));
    if (excludeCompleted && fresh.length) pool = fresh;
    if (!pool.length) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // ---------------- render helpers ----------------

  function starRow(count, max = 3, size = 'small') {
    let out = '<span class="story-tile__stars">';
    for (let i = 0; i < max; i++) out += Icon.star(i < count);
    out += '</span>';
    return out;
  }

  function topbar() {
    const stars = Storage.totalStars(state);
    return `
      <div class="topbar">
        <div class="topbar__brand">
          <div class="topbar__brand-mark">${Icon.book('#fff')}</div>
          <div class="topbar__title">Reading Quest<small>${CHILD_NAME}'s story world</small></div>
        </div>
        <div class="stat-pill" aria-label="${stars} stars earned">${Icon.star(true)} ${stars}</div>
      </div>`;
  }

  function bottomNav() {
    const item = (view, label, icon) => `
      <button class="nav-btn ${nav.view === view || (view === 'stories' && ['stories','reader','questions','review','result'].includes(nav.view)) ? 'is-active' : ''}" data-nav="${view}">
        ${icon}<span>${label}</span>
      </button>`;
    return `
      <nav class="bottom-nav">
        <div class="bottom-nav__inner">
          ${item('home', 'Home', Icon.home(navColor('home')))}
          ${item('stories', 'Stories', Icon.map(navColor('stories')))}
          ${item('badges', 'Badges', Icon.medal(navColor('badges')))}
        </div>
      </nav>`;
  }
  function navColor(view) {
    const active = nav.view === view || (view === 'stories' && ['stories','reader','questions','review','result'].includes(nav.view));
    return active ? '#386E4C' : '#6E5C6C';
  }

  // ---------------- HOME ----------------

  function renderHome() {
    const rows = [1, 2, 3].map((lvl) => {
      const meta = LEVEL_META[lvl];
      const list = Storage.storiesInLevel(lvl);
      const done = Storage.completedCountInLevel(state, lvl);
      const unlocked = state.levelUnlocked[lvl];
      const pct = list.length ? Math.round((done / list.length) * 100) : 0;
      return `
        <button class="level-card" data-open-level="${lvl}" ${unlocked ? '' : 'disabled'}>
          <div class="level-card__badge" style="background:${meta.color}">${lvl}</div>
          <div class="level-card__body">
            <h3>${meta.name}</h3>
            <p>${unlocked ? `${done} of ${list.length} stories done` : `Complete 3 stories in Level ${lvl - 1} to unlock`}</p>
            ${unlocked ? `<div class="level-card__progress"><span style="width:${pct}%"></span></div>` : ''}
          </div>
          ${unlocked ? '' : `<div class="level-card__lock">${Icon.lock()}</div>`}
        </button>`;
    }).join('');

    root.innerHTML = `
      ${topbar()}
      <main>
        <div class="welcome-card">
          <div class="decor-star" style="top:14px; right:70px;">${Icon.sparkle('#fff')}</div>
          <div class="decor-star" style="bottom:10px; right:24px; opacity:.5;">${Icon.sparkle('#fff')}</div>
          <h1>Hello, story explorer!</h1>
          <p>Pick a level below, or let us surprise you with a story from your quest map.</p>
          <button class="btn btn--gold" id="btn-surprise">${Icon.shuffle('#4a3306')} Surprise me!</button>
        </div>

        <h2 class="section-label">${Icon.map('#3B2A3A')} Your quest map</h2>
        <div class="level-list">${rows}</div>

        <div class="parent-entry">
          <button id="btn-grownup">For grown-ups →</button>
        </div>
      </main>
      ${bottomNav()}
      <div class="toast" id="toast"></div>
    `;
  }

  // ---------------- STORY GRID ----------------

  function renderStoriesOverview() {
    const cards = [1, 2, 3].map((lvl) => {
      const meta = LEVEL_META[lvl];
      const unlocked = state.levelUnlocked[lvl];
      const list = Storage.storiesInLevel(lvl);
      const tiles = list.map((s) => {
        const info = state.stories[s.id];
        const stars = (info && info.bestStars) || 0;
        return `
          <button class="story-tile" data-open-story="${s.id}" ${unlocked ? '' : 'disabled'}>
            <div class="story-tile__art">${unlocked ? getStoryArt(s.art) : `<div style="display:grid;place-items:center;height:100%;color:#6E5C6C;">${Icon.lock('#6E5C6C')}</div>`}</div>
            <div class="story-tile__body">
              <h4>${s.title}</h4>
              ${unlocked ? starRow(stars) : '<span style="font-size:.78rem;color:var(--ink-soft);">Locked</span>'}
            </div>
          </button>`;
      }).join('');
      return `
        <h2 class="section-label"><span style="width:26px;height:26px;border-radius:8px;background:${meta.color};display:inline-flex;align-items:center;justify-content:center;color:#fff;font-family:var(--font-display);font-weight:700;font-size:.85rem;">${lvl}</span> ${meta.name}</h2>
        <div class="story-grid">${tiles}</div>`;
    }).join('');

    root.innerHTML = `
      ${topbar()}
      <main>
        <div class="view-header">
          <h1>All stories</h1>
          <p>Tap any story to start reading. Locked levels open as you finish more stories.</p>
        </div>
        ${cards}
      </main>
      ${bottomNav()}
    `;
  }

  function renderLevelStories(level) {
    const meta = LEVEL_META[level];
    const list = Storage.storiesInLevel(level);
    const tiles = list.map((s) => {
      const info = state.stories[s.id];
      const stars = (info && info.bestStars) || 0;
      return `
        <button class="story-tile" data-open-story="${s.id}">
          <div class="story-tile__art">${getStoryArt(s.art)}</div>
          <div class="story-tile__body">
            <h4>${s.title}</h4>
            ${starRow(stars)}
          </div>
        </button>`;
    }).join('');

    root.innerHTML = `
      ${topbar()}
      <main>
        <button class="back-link" data-nav="home">${Icon.arrowLeft()} Back</button>
        <div class="view-header">
          <h1>${meta.name}</h1>
          <p>${meta.blurb}</p>
        </div>
        <div class="story-grid">${tiles}</div>
      </main>
      ${bottomNav()}
    `;
  }

  // ---------------- READER ----------------

  function renderReader(storyId) {
    const story = findStory(storyId);
    if (!story) return go('home');
    root.innerHTML = `
      ${topbar()}
      <main>
        <button class="back-link" data-nav="stories">${Icon.arrowLeft()} Back to stories</button>
        <div class="story-art">${getStoryArt(story.art)}</div>
        <h1 class="story-title">${story.title}</h1>
        <div class="story-meta">${Icon.book('#6E5C6C')} Level ${story.level} · ${LEVEL_META[story.level].name}</div>
        <div class="story-text">${story.paragraphs.map((p) => `<p>${p}</p>`).join('')}</div>
        <div class="reader-actions">
          <button class="btn btn--coral btn--lg" id="btn-start-questions">I'm done reading ${Icon.arrowRight()}</button>
        </div>
      </main>
      ${bottomNav()}
    `;
  }

  // ---------------- QUESTIONS ----------------

  function renderQuestions(storyId, qIndex) {
    const story = findStory(storyId);
    if (!story) return go('home');
    const q = story.questions[qIndex];
    const total = story.questions.length;
    const current = nav.answers[q.id] || '';

    const dots = story.questions.map((_, i) => {
      let cls = '';
      if (i < qIndex) cls = 'is-done';
      else if (i === qIndex) cls = 'is-current';
      return `<span class="q-progress__dot ${cls}"></span>`;
    }).join('');

    const kicker = { recall: 'Remember the story', vocabulary: 'Word meaning', inference: 'Think it through', imagine: 'Use your imagination' }[q.type] || 'Question';

    root.innerHTML = `
      ${topbar()}
      <main>
        <button class="back-link" data-nav="reader-back">${Icon.arrowLeft()} ${qIndex === 0 ? 'Back to story' : 'Previous question'}</button>
        <div class="view-header" style="margin-bottom:0;">
          <h1 style="font-size:1.15rem;">${story.title}</h1>
        </div>
        <div class="q-progress">${dots}</div>
        <div class="q-card">
          <p class="q-card__kicker">${kicker} · Question ${qIndex + 1} of ${total}</p>
          <p class="q-card__prompt">${q.prompt}</p>
          ${q.hint ? `<p class="q-card__hint">💡 ${q.hint}</p>` : ''}
          <label class="visually-hidden" for="answer-box">Type your answer</label>
          <textarea id="answer-box" placeholder="Type your answer here...">${current}</textarea>
        </div>
        <div class="q-nav">
          <button class="btn btn--outline" id="btn-q-back" ${qIndex === 0 ? 'disabled' : ''}>${Icon.arrowLeft('#3B2A3A')} Back</button>
          <button class="btn btn--coral" id="btn-q-next">${qIndex === total - 1 ? 'Finish' : 'Next'} ${Icon.arrowRight()}</button>
        </div>
      </main>
      ${bottomNav()}
    `;

    document.getElementById('answer-box').focus({ preventScroll: true });
  }

  function saveCurrentAnswer() {
    const story = findStory(nav.storyId);
    const q = story.questions[nav.qIndex];
    const box = document.getElementById('answer-box');
    if (box) nav.answers[q.id] = box.value;
  }

  // ---------------- REVIEW (grown-up check) ----------------

  function renderReview(storyId) {
    const story = findStory(storyId);
    const items = story.questions.map((q) => {
      const ans = (nav.answers[q.id] || '').trim();
      const verdict = nav.verdicts[q.id];
      return `
        <div class="review-item" data-q="${q.id}">
          <p class="review-item__prompt">${q.prompt}</p>
          <div class="review-item__row">
            <p class="review-item__label">What she wrote</p>
            <div class="review-item__answer">${ans ? escapeHtml(ans) : '<em style="color:var(--ink-soft);">(left blank)</em>'}</div>
          </div>
          <div class="review-item__row">
            <p class="review-item__label">A good answer might include</p>
            <div class="review-item__answer is-model">${escapeHtml(q.sampleAnswer)}</div>
          </div>
          <div class="review-item__verdict">
            <button class="verdict-btn ${verdict === true ? 'is-selected-yes' : ''}" data-verdict="${q.id}:yes">${Icon.check(verdict === true ? '#386E4C' : '#6E5C6C')} Correct</button>
            <button class="verdict-btn ${verdict === false ? 'is-selected-no' : ''}" data-verdict="${q.id}:no">${Icon.x(verdict === false ? '#D45E42' : '#6E5C6C')} Try again</button>
          </div>
        </div>`;
    }).join('');

    const allSet = story.questions.every((q) => nav.verdicts[q.id] !== undefined);

    root.innerHTML = `
      ${topbar()}
      <main>
        <div class="view-header">
          <h1>Grown-up check</h1>
        </div>
        <div class="review-intro">
          ${Icon.parent()}
          <p><strong>Hi grown-up!</strong> Compare her answer with the guide below and mark each one. Comprehension answers can vary — use your judgement, the guide is just a reference.</p>
        </div>
        ${items}
        <div class="reader-actions">
          <button class="btn btn--coral btn--lg" id="btn-save-review" ${allSet ? '' : 'disabled'}>Save results ${Icon.arrowRight()}</button>
        </div>
      </main>
    `;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ---------------- RESULT ----------------

  function renderResult() {
    const r = nav.lastResult;
    const story = findStory(nav.storyId);
    const msg = r.stars === 3 ? "Amazing reading — three stars!" : r.stars === 2 ? "Great job on this story!" : "Nice work — keep practising!";

    let badgeHtml = '';
    if (r.newBadges && r.newBadges.length) {
      badgeHtml = r.newBadges.map((b) => `
        <div class="badge-toast">
          ${Icon[b.icon] ? Icon[b.icon]('#C88F1F') : Icon.sparkle('#C88F1F')}
          <div><strong>New badge: ${b.name}</strong><span>${b.desc}</span></div>
        </div>`).join('');
    }
    if (r.leveledUp) {
      badgeHtml += `
        <div class="badge-toast">
          ${Icon.sparkle('#C88F1F')}
          <div><strong>Level ${r.leveledUp} unlocked!</strong><span>${LEVEL_META[r.leveledUp].name} is now open on your quest map.</span></div>
        </div>`;
    }

    root.innerHTML = `
      ${topbar()}
      <main>
        <div class="result-card">
          <div class="result-stars">${[0,1,2].map((i) => Icon.star(i < r.stars)).join('')}</div>
          <h2>${msg}</h2>
          <p>You finished "${story.title}" and earned ${r.points} points.</p>
          ${badgeHtml}
          <button class="btn btn--gold btn--lg btn--block" id="btn-result-continue">Continue quest ${Icon.arrowRight('#4a3306')}</button>
        </div>
      </main>
    `;
  }

  // ---------------- BADGES ----------------

  function renderBadges() {
    const tiles = Storage.BADGES.map((b) => {
      const unlocked = !!state.badges[b.id];
      return `
        <div class="badge-tile ${unlocked ? '' : 'is-locked'}">
          <div class="badge-tile__icon">${Icon[b.icon] ? Icon[b.icon]('#4a3306') : Icon.sparkle('#4a3306')}</div>
          <p>${b.name}</p>
        </div>`;
    }).join('');

    root.innerHTML = `
      ${topbar()}
      <main>
        <div class="view-header">
          <h1>Your badges</h1>
          <p>${Object.keys(state.badges).length} of ${Storage.BADGES.length} earned</p>
        </div>
        <div class="badge-grid">${tiles}</div>
      </main>
      ${bottomNav()}
    `;
  }

  // ---------------- GROWN-UP PANEL ----------------

  function renderGrownup() {
    const totalDone = Object.values(state.stories).filter((s) => s.completed).length;
    root.innerHTML = `
      ${topbar()}
      <main>
        <button class="back-link" data-nav="home">${Icon.arrowLeft()} Back</button>
        <div class="view-header">
          <h1>For grown-ups</h1>
          <p>A quick look at how the story quest is going. All progress is stored only on this iPad.</p>
        </div>
        <div class="grownup-panel">
          <h3>Progress summary</h3>
          <div class="grownup-stat-row"><span>Stories completed</span><strong>${totalDone} / ${STORIES.length}</strong></div>
          <div class="grownup-stat-row"><span>Total stars</span><strong>${Storage.totalStars(state)}</strong></div>
          <div class="grownup-stat-row"><span>Points</span><strong>${state.points}</strong></div>
          <div class="grownup-stat-row"><span>Reading streak</span><strong>${state.streak.count} day${state.streak.count === 1 ? '' : 's'}</strong></div>
          <div class="grownup-stat-row"><span>Badges earned</span><strong>${Object.keys(state.badges).length} / ${Storage.BADGES.length}</strong></div>
        </div>
        <div class="grownup-panel">
          <h3>By level</h3>
          ${[1,2,3].map((lvl) => `<div class="grownup-stat-row"><span>${LEVEL_META[lvl].name}</span><strong>${Storage.completedCountInLevel(state, lvl)} / ${Storage.storiesInLevel(lvl).length}</strong></div>`).join('')}
        </div>
        <button class="danger-link" id="btn-reset-progress">Reset all progress</button>
      </main>
    `;
  }

  // ---------------- master render ----------------

  function render() {
    if (nav.view === 'home') return renderHome();
    if (nav.view === 'stories') return renderStoriesOverview();
    if (nav.view === 'level-stories') return renderLevelStories(nav.level);
    if (nav.view === 'reader') return renderReader(nav.storyId);
    if (nav.view === 'questions') return renderQuestions(nav.storyId, nav.qIndex);
    if (nav.view === 'review') return renderReview(nav.storyId);
    if (nav.view === 'result') return renderResult();
    if (nav.view === 'badges') return renderBadges();
    if (nav.view === 'grownup') return renderGrownup();
    return renderHome();
  }

  // ---------------- events (delegated) ----------------

  document.addEventListener('click', (e) => {
    const navBtn = e.target.closest('[data-nav]');
    if (navBtn) {
      const target = navBtn.getAttribute('data-nav');
      if (target === 'reader-back') {
        if (nav.qIndex === 0) {
          go('reader', { storyId: nav.storyId });
        } else {
          saveCurrentAnswer();
          go('questions', { qIndex: nav.qIndex - 1 });
        }
        return;
      }
      go(target);
      return;
    }

    const openLevel = e.target.closest('[data-open-level]');
    if (openLevel && !openLevel.disabled) {
      go('level-stories', { level: Number(openLevel.getAttribute('data-open-level')) });
      return;
    }

    const openStory = e.target.closest('[data-open-story]');
    if (openStory && !openStory.disabled) {
      const id = openStory.getAttribute('data-open-story');
      go('reader', { storyId: id, qIndex: 0, answers: {}, verdicts: {} });
      return;
    }

    if (e.target.closest('#btn-surprise')) {
      const s = pickRandomStory();
      if (s) go('reader', { storyId: s.id, qIndex: 0, answers: {}, verdicts: {} });
      else showToast('You have read every story — amazing!');
      return;
    }

    if (e.target.closest('#btn-grownup')) { go('grownup'); return; }

    if (e.target.closest('#btn-start-questions')) {
      go('questions', { storyId: nav.storyId, qIndex: 0, answers: {} });
      return;
    }

    if (e.target.closest('#btn-q-next')) {
      saveCurrentAnswer();
      const story = findStory(nav.storyId);
      if (nav.qIndex < story.questions.length - 1) {
        go('questions', { qIndex: nav.qIndex + 1 });
      } else {
        Storage.saveAttempt(state, nav.storyId, Object.entries(nav.answers).map(([qid, text]) => ({ qid, text })));
        nav.verdicts = {};
        go('review', { storyId: nav.storyId });
      }
      return;
    }

    if (e.target.closest('#btn-q-back')) {
      saveCurrentAnswer();
      if (nav.qIndex > 0) go('questions', { qIndex: nav.qIndex - 1 });
      return;
    }

    const verdictBtn = e.target.closest('[data-verdict]');
    if (verdictBtn) {
      const [qid, val] = verdictBtn.getAttribute('data-verdict').split(':');
      nav.verdicts[qid] = val === 'yes';
      render();
      // restore scroll to the item just tapped
      const item = document.querySelector(`.review-item[data-q="${qid}"]`);
      if (item) item.scrollIntoView({ block: 'nearest' });
      return;
    }

    if (e.target.closest('#btn-save-review')) {
      const story = findStory(nav.storyId);
      const verdictList = story.questions.map((q) => ({ qid: q.id, type: q.type, correct: !!nav.verdicts[q.id] }));
      const result = Storage.recordReview(state, nav.storyId, verdictList);
      nav.lastResult = result;
      go('result');
      return;
    }

    if (e.target.closest('#btn-result-continue')) { go('stories'); return; }

    if (e.target.closest('#btn-reset-progress')) {
      if (confirm('This clears all stars, badges and points on this iPad. Are you sure?')) {
        localStorage.removeItem('readingQuest.v1');
        state = Storage.loadState();
        go('home');
      }
      return;
    }
  });

  let toastTimer = null;
  function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('is-visible'), 2600);
  }

  // ---------------- PWA: service worker + install hints ----------------

  function initPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch((err) => console.warn('SW registration failed', err));
      });
    }

    window.addEventListener('online', () => showToast('Back online'));
    window.addEventListener('offline', () => showToast('Offline — your stories still work!'));
  }

  // ---------------- boot ----------------
  render();
  initPWA();
})();
