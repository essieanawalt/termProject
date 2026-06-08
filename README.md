# Essie Anawalt — Portfolio

A personal portfolio site built as a term project.

[Visit the site](https://essieanawalt.github.io/termProject/)

---

## About

A personal portfolio site.

Built with React and Vite. Styled with CSS using custom properties.

## Running locally

```bash
npm install
npm run dev
```

## Deploying

```bash
npm run deploy
```

Builds and publishes to the `gh-pages` branch via the `gh-pages` package. GitHub Pages is configured to serve from that branch.

> **Note:** `npm run deploy` builds from your current working directory — always merge changes to `main` before deploying so the deployed site matches version control.

---

## Pages

- **Home** — landing page, empty
- **About** — biography and background
- **Work** — professional experience, empty
- **Game** — memory match card game
- **Contact** — contact form with validation, wired to Formspree

---

## Notes to self

- [ ] another game for funsies?
- [ ] home page needs real content
- [ ] work page needs real content
- [ ] resume — add page or section
- [x] add page `<title>` per route for browser tabs - n/a, keeping as is for aesthetics
- [x] active class on nav links
- [x] dark/light mode
- [x] replace fetch of partials... with react? reusable modules

### Things lost during react converstion, to be addressed...

- [ ] how to redo drag-and-drop in game with react?
- [x] contact form validation not quite right in react -- mix of how errors appear
- [x] contact form image for validation got warped in migration -- keep or drop this?
- [x] game, win + moves, lost spacing in between

---

## Deliverables Checklist

### Required

- [x] 5–10 content pages (5/10)
- [ ] HTML5 semantic elements (React renders HTML but JSX needs `<section>`, `<article>` etc.)
- [x] CSS3
- [x] JavaScript
- [x] React
- [x] Web page layout and design
- [x] DOM manipulation — `Header.jsx` uses `classList.toggle`, `addEventListener`, `useRef`
- [ ] Website usability — content pending
- [x] Code stored publicly on GitHub

### Portfolio Content Ideas

- [x] Biography
- [x] Interests
- [x] Web-based contact form
- [ ] Resume
- [ ] Photo gallery
- [ ] Showcase skills learned in the course

### Extra Credit (optional, up to 10%)

- [ ] HTML5 API — drag and drop was in pre-React version, lost in migration
- [ ] TypeScript
- [x] Connect to a database or external API (contact form via Formspree)
- [x] Responsive layout using CSS Flexbox or CSS Grid (no frameworks)
