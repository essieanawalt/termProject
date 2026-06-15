import { useState, useEffect } from "react";
import "../styles/games.css";
import "../styles/memory.css";

const emojis = ["🍋", "🧶", "🐟", "🍓", "🧸", "🌳", "🫖", "🫜"];

// spreading into a new array first so I don't mutate the original list
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);

function createCards() {
  // always grab 6 unique 'cards'
  const selected = shuffle(emojis).slice(0, 6);
  return shuffle([...selected, ...selected]).map((emoji, id) => ({
    id,
    emoji,
    flipped: false,
    matched: false,
  }));
}

export default function Memory() {
  useEffect(() => {
    document.title = "memory match · Essie Anawalt";
  }, []);

  // passing createCards as a reference so React only runs it once
  // if I write useState(createCards()) it calls it on every render
  const [cards, setCards] = useState(createCards);
  const [firstCard, setFirstCard] = useState(null);
  const [moves, setMoves] = useState(0);
  const [wins, setWins] = useState(0);

  function newGame() {
    setCards(createCards());
    setFirstCard(null);
    setMoves(0);
    // wins persist across new games
  }

  function handleCardClick(card) {
    if (card.flipped || card.matched) return;
    if (firstCard?.id === card.id) return;

    // 'prev' used to capture current state pre-update
    if (!firstCard) {
      setCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c)),
      );
      setFirstCard(card);
      return;
    }

    setMoves((m) => m + 1);
    setFirstCard(null);

    if (firstCard.emoji === card.emoji) {
      // using cards directly instead of 'prev' for synchronous read
      const next = cards.map((c) =>
        c.id === firstCard.id || c.id === card.id
          ? { ...c, flipped: true, matched: true }
          : c,
      );
      setCards(next);
      if (next.every((c) => c.matched)) {
        setWins((w) => w + 1);
      }
    } else {
      setCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c)),
      );

      // setFirstCard(null) above doesn't actually change firstCard yet, react schedules it for
      // the next render. but the setTimeout runs a second later when firstCard is already null,
      // so capture the id now while I still have it
      const fid = firstCard.id;
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === fid || c.id === card.id ? { ...c, flipped: false } : c,
          ),
        );
      }, 1000);
    }
  }

  return (
    <>
      <div className="game-header">
        <div>
          <h1>memory match.</h1>
          <div id="status">
            <span>
              Wins: <strong>{wins}</strong>
            </span>
            <span>
              Moves: <strong>{moves}</strong>
            </span>
          </div>
        </div>
        <button className="btn" onClick={newGame}>
          New Game
        </button>
      </div>

      <section id="game-board">
        {cards.map((card) => (
          <button
            key={card.id}
            className={`card${card.flipped || card.matched ? " flipped" : ""}${card.matched ? " matched" : ""}`}
            onClick={() => handleCardClick(card)}
            aria-label={card.matched || card.flipped ? card.emoji : "hidden card"}
          >
            {card.flipped || card.matched ? card.emoji : "🌱"}
          </button>
        ))}
      </section>

      <div aria-live="polite">
        {cards.every((c) => c.matched) && (
          <p className="result-message win">you got them all! ✨</p>
        )}
      </div>

      <div className="how-to-play">
        <p>
          <strong>how to play</strong>
        </p>
        <ul>
          <li><span aria-hidden="true">🌱</span> click a card to flip it</li>
          <li><span aria-hidden="true">🖱️</span> click a second card to try a match</li>
          <li><span aria-hidden="true">✨</span> find all pairs to win!</li>
        </ul>
      </div>
    </>
  );
}
