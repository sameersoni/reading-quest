# Reading Quest 📖✨

A gamified reading-comprehension app built for a Grade 2 (ICSE/Cambridge-style)
reader. Stories are grouped into three levels, illustrated with built-in
artwork (no internet needed), and answered by typing — not multiple choice —
so a grown-up can review the answers afterwards.

It's a Progressive Web App (PWA): once installed on the iPad, it opens full
screen like a real app and works with **no internet connection**.

---

## What's inside

```
reading-quest/
  index.html          the app
  css/style.css        all styling
  js/
    stories.js          the story + question content (16 stories, 3 levels)
    illustrations.js     the built-in SVG artwork + icon set
    storage.js            progress, points, stars, badges, level unlocking
    app.js                 screens & interactions
  fonts/                self-hosted fonts (Baloo 2 + Atkinson Hyperlegible —
                         the latter is designed for early / low-vision readers)
  icons/                app icons for the home screen, all sizes
  manifest.json          PWA install config
  sw.js                   service worker — caches everything for offline use
```

Nothing here calls any server or API. There's no login and no analytics —
all progress is saved with `localStorage`, directly on the iPad.

---

## 1. Try it out right now

Double-click `index.html` to open it in a browser and click through it.
That's enough to review content and design. Full offline install (next
section) needs the app to be served over `http(s)`, which `file://` can't do.

## 2. Deploy with GitHub and Cloudflare Pages

This is a static site, so Cloudflare Pages does not need a build framework or
install command. The included `wrangler.toml` points Pages at the repository
root (`.`).

1. Create an empty repository on GitHub.
2. From this project folder, run:

  ```sh
  git init
  git add .
  git commit -m "Initial Reading Quest app"
  git branch -M main
  git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
  git push -u origin main
  ```

3. In Cloudflare, open **Workers & Pages → Create application → Pages →
  Connect to Git** and select the GitHub repository.
4. Use these build settings:
  - **Framework preset:** None
  - **Build command:** leave blank
  - **Build output directory:** `.`
5. Save and deploy. Cloudflare will rebuild the site whenever you push to
  `main`.

You can also deploy from the terminal with Wrangler after authenticating with
`npx wrangler login`:

```sh
npx wrangler pages deploy . --project-name reading-quest
```

The resulting HTTPS URL can be opened in Safari on the iPad and added to the
Home Screen as described below.

## 3. Install it as an app on the iPad

A PWA has to be **hosted somewhere** for Safari to be able to "install" it
and cache it for offline use. Two easy, free options:

### Option A — Netlify Drop (fastest, no account needed)
1. On a computer, go to **https://app.netlify.com/drop**
2. Drag the whole `reading-quest` folder onto the page.
3. Netlify gives you a URL like `https://random-name-123.netlify.app`.
4. Open that URL in **Safari on the iPad** (must be Safari, not Chrome, for
   the install step below).
5. Tap the **Share** icon → **Add to Home Screen** → **Add**.
6. A "Reading Quest" icon appears on the home screen. Opening it launches
   full-screen, and after the first visit it keeps working with Wi-Fi off.

### Option B — GitHub Pages (free, a bit more setup, good if you'll keep editing)
1. Create a new GitHub repository and upload the contents of `reading-quest/`.
2. In the repo, go to **Settings → Pages**, set the source to the `main`
   branch (root), and save.
3. GitHub gives you a URL like `https://yourname.github.io/reading-quest/`.
4. Open it in Safari on the iPad and **Add to Home Screen** as above.

After the first successful load, the service worker (`sw.js`) has cached
every file, so the app keeps working with the iPad in airplane mode.

> **Updating content later:** if you edit any file after installing, bump
> `CACHE_NAME` in `sw.js` (e.g. `reading-quest-v1` → `reading-quest-v2`) so
> the installed app picks up the change next time it's opened.

---

## 4. How the gamification works

- **Typed answers, always.** Every question is a free-text box — nothing
  to tap-guess.
- **Grown-up review.** After finishing a story's questions, the app shows a
  "Grown-up check" screen: her typed answer next to a reference answer, and
  you mark each one Correct / Try again. (Comprehension answers can
  reasonably vary — the reference is a guide, not a strict key.)
- **Stars.** 1–3 stars per story, based on how many she got right.
- **Points & streaks.** Points accumulate across stories; reading on
  consecutive days builds a streak.
- **Badges.** Milestone badges (first story, finishing a whole level, 10
  vocabulary answers correct, 3-day streak, etc.) — see the "Badges" tab.
- **Level unlocking.** Level 2 unlocks after 3 completed Level 1 stories;
  Level 3 unlocks after 3 completed Level 2 stories. This keeps her from
  jumping to "hard mode" before she's warmed up, while still letting her
  pick any story within an unlocked level.
- **"Surprise me!"** on the home screen picks a random not-yet-completed
  story from whatever's unlocked, for variety.
- **For grown-ups** (small link at the bottom of the home screen) shows a
  no-frills summary: stories completed, stars, points, streak, and a
  "reset all progress" option if you ever want a clean slate.

## 5. Personalizing it

Open `js/app.js` and edit this line near the top:

```js
const CHILD_NAME = 'Story Explorer';
```

Change it to her name — it shows under the app title.

## 6. Adding more stories, or a new grade

Everything content-related lives in `js/stories.js`. Each story is a plain
object:

```js
{
  id: 'unique_key',
  level: 1,               // 1, 2, or 3
  title: 'Story Title',
  art: 'unique_key',       // must match a key in js/illustrations.js
  paragraphs: ['...', '...'],
  questions: [
    { id: 1, type: 'recall', prompt: '...', hint: '...', sampleAnswer: '...' },
    // type is one of: recall | vocabulary | inference | imagine
  ],
}
```

To add a story:
1. Copy an existing story object in `js/stories.js`, give it a new `id`.
2. Add a matching illustration in `js/illustrations.js` — either reuse the
   existing shape library (`sun`, `hill`, `tree`, `cloud`, `simpleAnimal`,
   `houseRow`, `waterBand`, `star`, `planet`, `rocket`...) to compose a new
   scene function, or keep it simple and reuse an existing scene key.
3. Add the illustration's key to the `scenes` object.

**For another grade**, the cleanest approach is a `grade` field (e.g. add
`grade: 2` to every story object, default new ones to `grade: 3`, etc.) and
a grade switcher on the home screen — the current level/badge/unlock system
will work the same way underneath. Happy to build that switcher when you're
ready to extend it.

## 7. Accessibility notes

- Body text uses **Atkinson Hyperlegible**, a typeface designed for low
  vision and early readers.
- Every interactive element has visible keyboard focus and large tap targets.
- Reduced-motion is respected automatically.
