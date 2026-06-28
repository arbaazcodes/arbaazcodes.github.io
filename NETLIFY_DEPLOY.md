# Deploy to Netlify

This project is a TanStack Start app. The Lovable sandbox builds it for Cloudflare Workers by default, but `netlify.toml` overrides the Nitro preset to `netlify` at build time, so Netlify will produce a serverless function for SSR automatically.

## One-time setup

1. **Push to GitHub** — in Lovable, click the GitHub icon (top right) → *Connect to GitHub* → create repo.
2. **Import on Netlify** — https://app.netlify.com → *Add new site* → *Import from Git* → pick the repo.
3. Netlify will read `netlify.toml`. Leave build settings as auto-detected:
   - Build command: `bun run build`
   - Publish directory: `dist/client`
   - Node version: `20`
4. Click **Deploy site**. First build takes ~2 min.

## What the config does

- `NITRO_PRESET=netlify` — switches the SSR build target from Cloudflare Workers to Netlify Functions.
- Publish dir `dist/client` — static client assets (CSS, JS, images, the resume PDF asset pointer).
- Redirect `/* → /.netlify/functions/server` — every non-static request is server-rendered through Nitro's generated function.

## After deploy

- Your site is live at `https://<random-name>.netlify.app`.
- Connect a custom domain: *Site settings → Domain management → Add custom domain*.
- Future pushes to your default branch auto-deploy.

## Local parity

You don't need to change anything locally — `bun run dev` keeps working in Lovable. The Netlify preset only kicks in during Netlify's CI build because that env var is only set there.

## Troubleshooting

- **Build fails with "preset not found"** — make sure `NITRO_PRESET=netlify` is in `netlify.toml` (not just in the Netlify UI).
- **404 on refresh of a sub-route** — confirm the `[[redirects]]` block in `netlify.toml` is present.
- **Resume PDF not loading** — the PDF is served from Lovable's CDN (`/__l5e/assets-v1/...`), which works from any host. No change needed.
