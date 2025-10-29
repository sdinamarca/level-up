# React (no-build) version

This folder contains a no-build React entry (`public/index.html`) that uses React + ReactDOM from CDN and Babel in the browser to transpile JSX. It's intended for quick local testing without Vite or any bundler.

How to run:

- Easiest (recommended): serve the project with a simple static server so `fetch()` requests work correctly.

  PowerShell (from project root `c:\Users\seba\Documents\pagina`):

  ```powershell
  # Python 3
  cd 'c:\Users\seba\Documents\pagina\react-app\public'
  python -m http.server 5173
  # then open http://localhost:5173 in your browser
  ```

- Alternatively use the VS Code Live Server extension and open `react-app/public/index.html`.

Notes:

- This is a development-only setup (Babel in the browser). For production you should build with a bundler (Vite/CRA/etc) or precompile assets.
- The app loads pages from `public/pages/*.html` using fetch and injects them into React (HtmlLoader). To complete the migration, convert those HTML pages to React components incrementally.
