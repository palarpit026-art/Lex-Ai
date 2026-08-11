# LexAI Prototype

A front-end prototype of **LexAI** — an AI-powered legal platform related to law background, starting with the Indian legal market.

This is a clickable, static prototype. It runs entirely in the browser — no build step, no backend, no dependencies to install.

**Screens included:**
- **Home** — daily brief, ask bar, quick actions, legal intelligence feed, active cases
- **Cases** ("Case Spaces") — searchable, filterable case list
- **Research** — recent research questions + ask bar
- **Profile** — account info and usage stats
- **Chat** — opens from any ask bar or list item, with mock contextual responses

All data (cases, stats, chat replies) is hardcoded/mocked in `script.js` — there's no real backend or AI connection yet.

## Running it locally

No install needed. Either:
- Open `index.html` directly in a browser, or
- Serve it locally so relative paths behave exactly like production:
  ```bash
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```

## Adding this to your GitHub repo

**Option A — new repo for just this prototype:**
```bash
git init
git add .
git commit -m "Add LexAI prototype"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

**Option B — inside an existing project:**
Copy `index.html`, `style.css`, and `script.js` into a subfolder (e.g. `/prototype`) of your existing repo, commit, and push.

## Deploying it live (GitHub Pages)

This repo includes `.github/workflows/deploy.yml`, which auto-publishes to GitHub Pages on every push to `main`.

1. Push this repo to GitHub (see above).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Push a commit (or re-run the workflow from the **Actions** tab) — your site will be live at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

No build tooling required — it's static files, so the workflow just uploads them as-is.

## Next steps toward a real product

This prototype is UI-only. To make it functional:
- Replace the mock case data in `script.js` with calls to a real backend/database.
- Replace `mockAnswer()` with a real API call to an LLM (with case documents as context) — this needs a small server, since browsers can't safely hold an API key.
- Add auth (the Profile screen assumes a logged-in advocate).
- Add citation verification and document intelligence as real services once you're past the read-only prototype stage.
LexAI Prototype
