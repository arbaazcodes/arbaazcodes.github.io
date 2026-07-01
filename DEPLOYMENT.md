# Deployment Workflow

Live site: https://arbaazcodes.github.io/

## Branches

- `main` — production. Every push here deploys automatically to GitHub Pages.
- `dev` — development / staging. Nothing here ever deploys.

## Rules

1. All Lovable edits and experimental work go to `dev`.
   In Lovable: Project → GitHub → set the target branch to `dev`.
2. Preview `dev` locally (`bun install && bun run build && bunx serve dist`)
   or via a Netlify/Vercel preview from the branch.
3. When happy, open a PR `dev → main` on GitHub, review the diff, and merge.
4. Merging into `main` triggers `.github/workflows/deploy.yml`, which builds
   and publishes the site. No other branch triggers a deploy.
5. You can also trigger a deploy manually: GitHub → Actions →
   "Deploy to GitHub Pages" → Run workflow (main only).

## Local pre-deploy checklist

```
bun install
bun run build        # must succeed, no errors
bun run verify:pages # asserts favicons, 404.html, .nojekyll, assets present
```

Only after both commands pass should `dev` be merged into `main`.
