# Valentine's Day App

A fun, romantic Valentine's Day web app built with React + Vite.

## Deploy to GitHub Pages

1. **Create a GitHub repo** named `valentine-app` (or any name you like).

2. **If your repo name is not `valentine-app`**, edit `vite.config.js` and set `base` to your repo name:
   ```js
   base: '/your-repo-name/',
   ```

3. **Push your code** to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/valentine-app.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy** (builds and pushes the `dist` folder to the `gh-pages` branch):
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages** in your repo:
   - Go to **Settings → Pages**
   - Under "Build and deployment", set **Source** to **Deploy from a branch**
   - Branch: **gh-pages**, folder: **/ (root)**
   - Save

Your app will be live at: **https://YOUR_USERNAME.github.io/valentine-app/**

---

## React + Vite

This project uses React with Vite.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
