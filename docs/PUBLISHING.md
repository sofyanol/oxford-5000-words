# Publishing & Deployment

## GitHub Pages Deployment

The project is deployed via GitHub Actions workflow (.github/workflows/pages.yml).
The workflow:
1. Builds and bundles publish/ containing index.html and the udio/ directory.
2. Uploads the artifact using @actions/upload-pages-artifact@v3.
3. Deploys using @actions/deploy-pages@v4.

The live site is published at:
https://sofyanol.github.io/oxford-5000-words/
