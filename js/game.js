// references
const board = document.getElementById("game-board");
const moveCount = document.getElementById("move-count");
const winCount = document.getElementById("win-count");

// consts
const emojis = ["🍋", "🧶", "🐟", "🍓", "🧸", "🌳", "🫖", "🫜"];

// state
let firstCard = null;
let wins = 0;
let moves = 0;

// helpers
const shuffle = (list) => list.sort(() => Math.random() - 0.5);

document.getElementById("btn-new-game").addEventListener("click", newGame);

function newGame() {
  board.innerHTML = "";
  firstCard = null;
  moves = 0;
  moveCount.textContent = 0;

  const selected = shuffle([...emojis]).slice(0, 6);
  const pairs = [...selected, ...selected];

  shuffle(pairs).forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.draggable = true;

    const front = document.createElement("span");
    front.classList.add("card-face", "card-front");
    front.textContent = "🌱";

    const back = document.createElement("span");
    back.classList.add("card-face", "card-back");
    back.textContent = emoji;

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener("click", () => flipCard(card));
    card.addEventListener("dragstart", (e) => onDragStart(e, card));
    card.addEventListener("dragover", (e) => onDragOver(e, card));
    card.addEventListener("dragleave", () => card.classList.remove("drag-over"));
    card.addEventListener("drop", (e) => onDrop(e, card));
    card.addEventListener("dragend", () => {
      board.querySelectorAll(".drag-over").forEach((c) => c.classList.remove("drag-over"));
    });
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  const first = firstCard;
  firstCard = null;
  checkMatch(first, card);
}

function onDragStart(e, card) {
  // only the already-flipped first card can be dragged
  if (card !== firstCard) {
    e.preventDefault();
    return;
  }
  e.dataTransfer.effectAllowed = "move";
}

function onDragOver(e, card) {
  // only accept drops on face-down, unmatched cards
  if (!firstCard || card === firstCard || card.classList.contains("flipped") || card.classList.contains("matched")) return;
  e.preventDefault();
  card.classList.add("drag-over");
}

function onDrop(e, card) {
  e.preventDefault();
  card.classList.remove("drag-over");
  if (!firstCard || card === firstCard || card.classList.contains("flipped") || card.classList.contains("matched")) return;

  card.classList.add("flipped");
  const first = firstCard;
  firstCard = null;
  checkMatch(first, card);
}

function checkMatch(card1, card2) {
  moves++;
  moveCount.textContent = moves;

  if (card1.dataset.emoji === card2.dataset.emoji) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    setTimeout(checkWin, 700);
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
    }, 1000);
  }
}

function checkWin() {
  const allCards = board.querySelectorAll(".card");
  const won = [...allCards].every((card) => card.classList.contains("matched"));
  if (won) {
    wins++;
    winCount.textContent = wins;
    alert("WIN!");
  }
}

newGame();
