// references
const board = document.getElementById("game-board");
const moveCount = document.getElementById("move-count");
const winCount = document.getElementById("win-count");

// consts
const emojis = ["🍋", "🧶", "🐟", "🍓", "🧸", "🌳", "🫖", "🫜"];

// let variables
let firstCard = null;
let wins = 0;
let moves = 0;

// helpers
const shuffle = (lists) => lists.sort(() => Math.random() - 0.5);

// dom
document.getElementById("btn-new-game").addEventListener("click", newGame);

function newGame() {
  board.innerHTML = "";
  moveCount.textContent = 0;

  // limit to 6 pairs
  const selected = shuffle([...emojis]).slice(0, 6);
  const pairs = [...selected, ...selected];

  shuffle(pairs).forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.textContent = "?";
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  // prevent clicking the same card twice as a match
  if (card.textContent !== "?") return;

  card.textContent = card.dataset.emoji;

  // if first card, set and return
  if (!firstCard) {
    firstCard = card;
    return;
  }

  moves++;
  moveCount.textContent = moves;

  // check second card for match
  if (firstCard.dataset.emoji === card.dataset.emoji) {
    firstCard = null; // match, reset
    setTimeout(checkWin, 700);
  } else {
    const noMatch = firstCard;
    firstCard = null;
    setTimeout(() => {
      noMatch.textContent = "?";
      card.textContent = "?";
    }, 1000);
  }
}

function checkWin() {
  const allCards = board.querySelectorAll(".card");
  const won = [...allCards].every((card) => card.textContent !== "?");
  if (won) {
    wins++;
    winCount.textContent = wins;
    alert("WIN!");
  }
}

newGame();
