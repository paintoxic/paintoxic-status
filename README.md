# paintoxic-status

Source of [paintoxic.io](https://paintoxic.io): a personal page that looks like a service status page. The service being monitored is me.

- **Uptime** is real GitHub activity from the last 90 days.
- **Mythic+** (a fun fact at the bottom) comes from Raider.io. A depleted key marks only that card as *degraded*; it never changes the headline status.
- It's in Spanish by default (`/`), with English at `/en/`.
- `/api/status.json` serves the same data as JSON, rebuilt with the page.
- Career timeline, current deployment, regions and certifications live in `src/data/presentation.ts`. The certifications section stays hidden while that list is empty.

Built with [Astro](https://astro.build). GitHub Actions rebuilds it on every push to `master`, every Tuesday at 16:00 UTC (after the US weekly reset), and on manual runs.

## Add or remove a WoW character

Edit `src/data/characters.json` and push:

```json
[
  { "name": "Paintóxic", "realm": "ragnaros", "region": "us" },
  { "name": "Belathil", "realm": "quelthalas", "region": "us" }
]
```

Class, spec, race, avatar, score and item level are all fetched from Raider.io.

## Local development

Requires Node 24+.

```sh
npm install
npm run dev          # http://localhost:4321
npm test             # unit tests (vitest)
npm run check        # astro type check
GITHUB_TOKEN=$(gh auth token) npm run fetch-data   # refresh src/data/snapshot.json
npm run build && npm run preview
```

`fetch-data` never fails the build. When a source is down, it keeps that source's last data from `snapshot.json` and prints a warning.

## One-time setup

1. Repo **Settings → Pages → Source: GitHub Actions**. Set the custom domain to `paintoxic.io`, then turn on **Enforce HTTPS** once the certificate is issued.
2. DNS for `paintoxic.io`:
   - Apex `A` records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA` records: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - Optional: `CNAME www → paintoxic.github.io`
3. GitHub profile → **Settings → Public profile →** enable **"Include private contributions on my profile"**. If private days still don't appear after a CI run, create a read-only personal access token and save it as the repo secret `GH_CONTRIB_TOKEN`.
4. Recommended: verify the domain under GitHub account **Settings → Pages**.
