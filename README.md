# Wanderly: Travel Website
Wanderly is a web application that helps users explore Philippine destinations and organize daily travel activities. It provides one place to select a destination, review a suggested itinerary and save a customized travel plan. The application belongs to the Travel category and was developed using MongoDB, Express, Vue and Node.js.
Travelers often collect destination information from several sources and keep their plans in separate notes. This can make it difficult to track activities, compare estimated costs and revise a trip. Wanderly addresses these organizational issues through destination browsing and editable itineraries. Its four pages are Home, Destination, Itinerary and About Us.

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
