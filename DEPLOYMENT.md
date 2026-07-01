# Deployment Workflow — Manual Approval Only

Live site: https://arbaazcodes.github.io/

## Branches

- `main` — production. Updated **only** when you explicitly say
  "Deploy to Production".
- `dev` — development. All Lovable edits land here. Pushes to `dev` never
  deploy.

## Rules

1. All Lovable edits and experimental work go to `dev`.
   In Lovable: Project → GitHub → set the target branch to `dev`.
2. No branch push, merge, or PR triggers a deploy. The workflow
   (`.github/workflows/deploy.yml`) is `workflow_dispatch` only.
3. To ship, tell the agent **"Deploy to Production"**. Only then will it:
   a. Merge `dev` → `main`.
   b. Trigger the GitHub Pages workflow manually.
   c. Verify the live site.

## Local pre-deploy checklist

```
bun install
bun run build
bun run verify:pages
```
