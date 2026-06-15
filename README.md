# Essie Anawalt — Portfolio

Personal portfolio built as a term project. It's also a real portfolio — I built it to actually use and develop (after migrating to a different server).

[Visit the site](https://essieanawalt.github.io/termProject/)

---

## Running locally

```bash
npm install
npm run dev
```

## Deploying

```bash
npm run deploy
```

Builds and pushes to `gh-pages` via the `gh-pages` package. Always merge to `main` first — `npm run deploy` builds from the working directory, not from git history. Please don't try this one, though :)

---

## Pages

| Page            | What it is                                                              |
| --------------- | ----------------------------------------------------------------------- |
| Home            | intro / lighter about me                                                |
| About           | biography and background                                                |
| Playground      | hub for the games                                                       |
| Farmer's Market | drag-and-drop produce sorting (no mobile support)                       |
| Memory Match    | flip cards, find pairs, count your moves                                |
| Petal Drop      | word-guessing game with themed word lists and easy/medium/hard settings |
| Contact         | form with live validation, wired to Formspree                           |

A catch-all 404 route handles unmatched URLs

---

## Tech

Built with React and Vite. Styled with plain CSS using custom properties. No UI frameworks.

**HTML5** — semantic elements throughout: `<article>`, `<section>`, `<aside>`, `<nav>`, `<main>`, `<header>`, `<footer>`

**CSS3** — custom properties, dark/light mode toggle, responsive flexbox + grid, transitions, `color-mix()`

**JavaScript** — form validation with touched-state tracking, game logic, drag-and-drop, Canvas API for produce rendering, SVG generation for animated flower

**React** — hooks (`useState`, `useEffect`, `useRef`, `useLocation`), React Router, component architecture, lazy state initialisation

**DOM** — `useRef`, `addEventListener`, `classList.toggle`, ARIA attributes (`aria-live`, `aria-pressed`, `aria-hidden`, `role`)

---

## Extra sparkle

- **HTML5 Drag and Drop API** — Farmer's Market game
- **Canvas API** — produce drawn in canvas elements in Farmer's Market
- **SVG** — dynamic flower in Petal Drop; petals generated from data and removed on wrong guesses
- **External API** — contact form via Formspree
- **Responsive layout** — CSS flexbox + grid, no frameworks

---

## Acknowledgements

AI assistance (Claude) used for the following:

- Troubleshooting how gh-pages works alongside git main/deploy post-react migration
- color-mix() solution for using variables in css
- Word list generation in petal drop game
- Highlighting opportunities for accessibility improvements
