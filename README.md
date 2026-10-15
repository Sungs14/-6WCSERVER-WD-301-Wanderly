# Wanderly: Travel Website

Static site with four pages: `index.html` (Home), `destination.html`, `itinerary.html`, `about.html`.

## Project structure

```
wanderly/
  index.html
  destination.html
  itinerary.html
  about.html
  css/style.css
  js/main.js
  package.json
```

## Run locally

Pick one:

1. **VS Code:** install the "Live Server" extension, right-click `index.html`, choose "Open with Live Server".
2. **Node.js:** run `npm start`, then open http://localhost:3000
3. **Python:** run `python -m http.server 3000`, then open http://localhost:3000

(You can also just double-click `index.html`; everything works without a server.)

## Deploy (free options)

- **Netlify:** go to app.netlify.com/drop and drag the `wanderly` folder onto the page.
- **GitHub Pages:** push the folder to a GitHub repo, then Settings > Pages > Deploy from branch `main` / root.
- **Vercel:** run `npx vercel` inside the folder and follow the prompts.

No build step is needed. The publish directory is the project root.
