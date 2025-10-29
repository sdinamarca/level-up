# Create React App (CRA) usage

This folder was updated to use Create React App (react-scripts). To run it locally:

1. Open a terminal and go to the React app folder:

```powershell
cd 'c:\Users\seba\Documents\pagina\react-app'
```

2. Install dependencies and start the dev server:

```powershell
npm install
npm start
```

3. The app will open at http://localhost:3000 by default.

Notes / next steps:

- Copy `assets/style.css` and your image folders (`img`, `img2`, `img3`) into `react-app/public/` or import them from `src` so styles and images are available during development.
- I left the copied HTML pages under `react-app/public/pages/` and components in `src/` that still use the HtmlLoader approach. To complete the migration fully, convert each page to React components and remove HtmlLoader.
