/* ============================================================
   storage.js
   All progress lives in localStorage, on-device only (nothing is
   sent anywhere — this app has no server). One profile per iPad.

   State shape:
   {
     points: number,
     streak: { count: number, lastDate: 'YYYY-MM-DD' | null },
     stories: {
       [storyId]: {
         bestStars: 0-3,
         completed: boolean,          // has at least one grown-up review
         lastAnswers: [{ qid, text }],
         reviewedTypes: { vocabulary: n, imagine: n }  // for badge tracking
       }
     },
     badges: { [badgeId]: true },
     levelUnlocked: { 1: true, 2: false, 3: false }
   }
   ============================================================ */

const STORAGE_KEY = 'readingQuest.v1';

const BADGES = [
  { id: 'first_story', name: 'First Story', desc: 'Finish your very first story', icon: 'sparkle' },
  { id: 'level1_explorer', name: 'Garden Explorer', desc: 'Complete every Level 1 story', icon: 'medal' },
  { id: 'level2_reader', name: 'Rising Reader', desc: 'Complete every Level 2 story', icon: 'medal' },
  { id: 'level3_champion', name: 'Bright Champion', desc: 'Complete every Level 3 story', icon: 'medal' },
  { id: 'word_wizard', name: 'Word Wizard', desc: 'Get 10 vocabulary answers right', icon: 'book' },
  { id: 'big_imagination', name: 'Big Imagination', desc: 'Answer 8 imagination questions', icon: 'sparkle' },
  { id: 'streak_3', name: '3-Day Streak', desc: 'Read on 3 different days in a row', icon: 'flame' },
  { id: 'star_collector', name: 'Star Collector', desc: 'Earn 20 stars in total', icon: 'star' },
];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function defaultState() {
  return {
    points: 0,
    streak: { count: 0, lastDate: null },
    stories: {},
    badges: {},
    levelUnlocked: { 1: true, 2: false, 3: false },
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    // merge with defaults in case new fields were added since last save
    return Object.assign(defaultState(), parsed, {
      streak: Object.assign({ count: 0, lastDate: null }, parsed.streak),
      stories: parsed.stories || {},
      badges: parsed.badges || {},
      levelUnlocked: Object.assign({ 1: true, 2: false, 3: false }, parsed.levelUnlocked),
    });
  } catch (e) {
    console.warn('Could not read saved progress, starting fresh.', e);
    return defaultState();
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save progress.', e);
  }
}

function totalStars(state) {
  return Object.values(state.stories).reduce((sum, s) => sum + (s.bestStars || 0), 0);
}

function storiesInLevel(level) {
  return window.ReadingQuestStories.filter((s) => s.level === level);
}

function completedCountInLevel(state, level) {
  return storiesInLevel(level).filter((s) => state.stories[s.id] && state.stories[s.id].completed).length;
}

function bumpStreak(state) {
  const today = todayStr();
  if (state.streak.lastDate === today) return; // already counted today
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (state.streak.lastDate === yesterday) {
    state.streak.count += 1;
  } else {
    state.streak.count = 1;
  }
  state.streak.lastDate = today;
}

function checkAndAwardBadges(state) {
  const newlyAwarded = [];
  const award = (id) => {
    if (!state.badges[id]) {
      state.badges[id] = true;
      const def = BADGES.find((b) => b.id === id);
      if (def) newlyAwarded.push(def);
    }
  };

  const anyCompleted = Object.values(state.stories).some((s) => s.completed);
  if (anyCompleted) award('first_story');

  if (storiesInLevel(1).length && completedCountInLevel(state, 1) === storiesInLevel(1).length) award('level1_explorer');
  if (storiesInLevel(2).length && completedCountInLevel(state, 2) === storiesInLevel(2).length) award('level2_reader');
  if (storiesInLevel(3).length && completedCountInLevel(state, 3) === storiesInLevel(3).length) award('level3_champion');

  let vocab = 0, imagine = 0;
  Object.values(state.stories).forEach((s) => {
    vocab += (s.reviewedTypes && s.reviewedTypes.vocabulary) || 0;
    imagine += (s.reviewedTypes && s.reviewedTypes.imagine) || 0;
  });
  if (vocab >= 10) award('word_wizard');
  if (imagine >= 8) award('big_imagination');

  if (state.streak.count >= 3) award('streak_3');
  if (totalStars(state) >= 20) award('star_collector');

  return newlyAwarded;
}

function updateLevelUnlocks(state) {
  if (completedCountInLevel(state, 1) >= 3) state.levelUnlocked[2] = true;
  if (completedCountInLevel(state, 2) >= 3) state.levelUnlocked[3] = true;
}

/**
 * Save a story attempt's typed answers (before grown-up review).
 */
function saveAttempt(state, storyId, answers) {
  if (!state.stories[storyId]) {
    state.stories[storyId] = { bestStars: 0, completed: false, lastAnswers: [], reviewedTypes: {} };
  }
  state.stories[storyId].lastAnswers = answers;
  saveState(state);
}

/**
 * Record a grown-up's review verdicts.
 * verdicts: [{ qid, type, correct: boolean }]
 * Returns { stars, points, newBadges, leveledUp }
 */
function recordReview(state, storyId, verdicts) {
  const total = verdicts.length;
  const correctCount = verdicts.filter((v) => v.correct).length;
  const stars = total === 0 ? 0 : Math.max(1, Math.round((correctCount / total) * 3));

  const entry = state.stories[storyId] || { bestStars: 0, completed: false, lastAnswers: [], reviewedTypes: {} };
  entry.completed = true;
  entry.bestStars = Math.max(entry.bestStars || 0, correctCount > 0 ? stars : entry.bestStars || 0);
  entry.reviewedTypes = entry.reviewedTypes || {};
  verdicts.forEach((v) => {
    if (v.correct) entry.reviewedTypes[v.type] = (entry.reviewedTypes[v.type] || 0) + 1;
  });
  state.stories[storyId] = entry;

  const earnedPoints = correctCount * 10 + (stars === 3 ? 15 : 0);
  state.points += earnedPoints;

  bumpStreak(state);

  const levelsBefore = { ...state.levelUnlocked };
  updateLevelUnlocks(state);
  const leveledUp = Object.keys(state.levelUnlocked).find(
    (lvl) => state.levelUnlocked[lvl] && !levelsBefore[lvl]
  );

  const newBadges = checkAndAwardBadges(state);
  saveState(state);

  return { stars, points: earnedPoints, newBadges, leveledUp: leveledUp ? Number(leveledUp) : null };
}

window.ReadingQuestStorage = {
  loadState,
  saveState,
  totalStars,
  storiesInLevel,
  completedCountInLevel,
  saveAttempt,
  recordReview,
  BADGES,
};
