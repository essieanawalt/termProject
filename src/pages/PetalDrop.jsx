import { useState, useEffect } from "react";
import "../styles/games.css";
import "../styles/petal-drop.css";

// for longer lists or additional options, maybe break into another file
const WORD_LISTS = {
  nature: [
    "MUSHROOM",
    "LANTERN",
    "MEADOW",
    "AUTUMN",
    "BIRCH",
    "CLOVER",
    "FERN",
    "HARBOR",
    "MAPLE",
    "FLOWER",
    "MARSH",
    "WILLOW",
    "RIVER",
    "SNOWFALL",
    "VIOLET",
    "FOREST",
    "STREAM",
    "HOLLOW",
    "SPRUCE",
    "ACORN",
    "THISTLE",
    "PEBBLE",
    "VALLEY",
    "CEDAR",
  ],
  moomin: [
    "MOOMIN",
    "SNUFKIN",
    "DAISY",
    "ADVENTURE",
    "TEACUP",
    "PICNIC",
    "SWIMMING",
    "HAMMOCK",
    "FIREFLY",
    "PORRIDGE",
    "BLOSSOM",
    "PANCAKES",
    "MOONLIGHT",
    "BAREFOOT",
    "FRIENDSHIP",
    "MELODY",
    "COMET",
    "LIGHTHOUSE",
    "CAMPING",
    "JOURNEY",
    "FISHING",
    "MOONRISE",
  ],
  hobbit: [
    "BREAKFAST",
    "TEATIME",
    "FIREWORKS",
    "BIRTHDAY",
    "COMFORT",
    "ADVENTURE",
    "DRAGON",
    "BILBO",
    "PANTRY",
    "GARDEN",
    "ARMCHAIR",
    "PRESENTS",
    "MUSHROOMS",
    "DOORSTEP",
    "WARMTH",
    "KETTLE",
    "CELLAR",
    "SHIRE",
    "MISCHIEF",
    "FIRESIDE",
    "PUMPKIN",
  ],
};

const THEMES = [
  { key: "nature", label: "nature", emoji: "🌿" },
  { key: "moomin", label: "moomin", emoji: "🎩" },
  { key: "hobbit", label: "hobbit", emoji: "💍" },
];

const DIFFICULTIES = [
  { key: "easy", label: "easy", maxWrong: 9 },
  { key: "medium", label: "medium", maxWrong: 7 },
  { key: "hard", label: "hard", maxWrong: 5 },
];

function pickWord(theme) {
  const list = WORD_LISTS[theme];
  return list[Math.floor(Math.random() * list.length)];
}

export default function PetalDrop() {
  useEffect(() => {
    document.title = "petal drop · Essie Anawalt";
  }, []);

  const [theme, setTheme] = useState("nature");
  const [word, setWord] = useState(() => pickWord("nature"));
  const [guessed, setGuessed] = useState(new Set());
  const [difficulty, setDifficulty] = useState("medium");
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const maxWrong = DIFFICULTIES.find((d) => d.key === difficulty).maxWrong;
  const wrong = [...guessed].filter((l) => !word.includes(l));
  const wrongCount = wrong.length;
  const lost = wrongCount >= maxWrong;
  const masked = word.split("").map((l) => (guessed.has(l) || lost ? l : null));
  const won = !lost && masked.every((l) => l !== null);

  useEffect(() => {
    if (won) setWins((w) => w + 1);
  }, [won]);

  useEffect(() => {
    if (lost) setLosses((l) => l + 1);
  }, [lost]);

  function handleGuess(letter) {
    if (guessed.has(letter) || won || lost) return;
    setGuessed((prev) => new Set([...prev, letter]));
  }

  function newGame() {
    setWord(pickWord(theme));
    setGuessed(new Set());
  }

  function changeTheme(newTheme) {
    setTheme(newTheme);
    setWord(pickWord(newTheme));
    setGuessed(new Set());
  }

  function changeDifficulty(newDifficulty) {
    setDifficulty(newDifficulty);
    if (guessed.size > 0) {
      setWord(pickWord(theme));
      setGuessed(new Set());
    }
  }

  return (
    <>
      <div className="game-header">
        <div>
          <h1>petal drop.</h1>
          <div id="status">
            <span>
              Wins: <strong>{wins}</strong>
            </span>
            <span>
              Losses: <strong>{losses}</strong>
            </span>
            <span>
              Wrong:{" "}
              <strong>
                {wrongCount} / {maxWrong}
              </strong>
            </span>
            <span className="difficulty-inline">
              {DIFFICULTIES.flatMap(({ key, label }, i) => [
                i > 0 && (
                  <span key={`sep-${i}`} className="difficulty-sep">
                    ·
                  </span>
                ),
                <button
                  key={key}
                  className={`difficulty-opt${difficulty === key ? " active" : ""}`}
                  onClick={() => changeDifficulty(key)}
                  aria-pressed={difficulty === key}
                >
                  {label}
                </button>,
              ])}
            </span>
          </div>
        </div>
        <button className="btn" onClick={newGame}>
          New Game
        </button>
      </div>

      <div className="theme-picker">
        {THEMES.map(({ key, label, emoji }) => (
          <button
            key={key}
            className={`theme-btn${theme === key ? " active" : ""}`}
            onClick={() => changeTheme(key)}
            aria-pressed={theme === key}
          >
            {emoji} {label}
          </button>
        ))}
      </div>

      <div className="petal-layout">
        <div className="petal-left">
          <svg
            viewBox="0 0 200 220"
            className="petal-flower"
            aria-hidden="true"
          >
            <line className="stem" x1="100" y1="115" x2="100" y2="195" />
            <ellipse
              className="leaf"
              cx="84"
              cy="160"
              rx="14"
              ry="7"
              transform="rotate(-35 84 160)"
            />
            {Array.from({ length: maxWrong }, (_, i) => {
              const angle = (360 / maxWrong) * i + 10;
              return wrongCount < i + 1 ? (
                <g key={i} transform={`rotate(${angle} 100 95)`}>
                  <ellipse className="petal" cx="100" cy="60" rx="11" ry="28" />
                </g>
              ) : null;
            })}
            <circle className="flower-center" cx="100" cy="95" r="18" />
          </svg>

          <div aria-live="polite">
            {won && <p className="result-message win">you got it! 🌸</p>}
            {lost && (
              <p className="result-message lose">
                the word was <strong>{word.toLowerCase()}</strong>.
              </p>
            )}
          </div>
        </div>

        <div className="petal-right">
          <div className="word-display" aria-label="word to guess">
            {word.split("").map((letter, i) => (
              <span
                key={i}
                className={`letter-slot${lost && !guessed.has(letter) ? " revealed" : ""}`}
              >
                {masked[i] ?? ""}
              </span>
            ))}
          </div>

          <div className="keyboard" role="group" aria-label="letter guesses">
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
              <button
                key={letter}
                className={`letter-btn${
                  guessed.has(letter)
                    ? word.includes(letter)
                      ? " correct"
                      : " wrong"
                    : ""
                }`}
                onClick={() => handleGuess(letter)}
                disabled={guessed.has(letter) || won || lost}
                aria-label={letter}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="how-to-play">
        <p>
          <strong>how to play</strong>
        </p>
        <ul>
          <li>
            <span aria-hidden="true">🌸</span> guess letters to reveal the
            hidden word
          </li>
          <li>
            <span aria-hidden="true">🥀</span> {maxWrong} wrong guesses and the
            flower is bare
          </li>
          <li>
            <span aria-hidden="true">✨</span> reveal the full word to win!
          </li>
        </ul>
      </div>
    </>
  );
}
