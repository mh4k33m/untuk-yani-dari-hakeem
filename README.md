# Untuk Yani, dari Hakeem

Surat untuk Yani, dan kata-kata yang aku simpan.

## Local development

Use Node.js 22.12 or newer (the deployment workflow uses Node.js 24).

```sh
npm ci
npm run dev
```

## Check and build

```sh
npm test
npm run build
npm run preview
```

Production preview uses the project path `/untuk-yani-dari-hakeem/`.
The build verifies that `.output/public/index.html` exists and every local
asset uses that path and exists in the deployment folder.

## Deploy to GitHub Pages

1. Open `docs/pages-workflow.yml` in GitHub and copy its contents. Use **Add file → Create new file** to save them as `.github/workflows/pages.yml` on `main`.
2. In **Settings → Pages**, choose **GitHub Actions** as the source. Then open **Actions → Deploy to GitHub Pages → Run workflow** and select `main`.
3. After the workflow completes, the site will be at
   https://mh4k33m.github.io/untuk-yani-dari-hakeem/.

Deployment is manual; pushing a commit does not publish the site.
Only `.output/public/` is uploaded. The HTML is prerendered at build time
and the letter, search, categories, and quote reveals run in the browser.
No server, database, or environment secrets are needed for the published site.

The app uses React, TanStack Start, Vite, Tailwind CSS, and Nitro.
If the repository name changes, update the project path in `vite.config.ts`
and `scripts/check-pages.mjs`.
