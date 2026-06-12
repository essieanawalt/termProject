import { useState, useRef, useEffect } from "react";
import produceData from "../data/produce.json";
import { drawProduce } from "../lib/produceShapes";
import "../styles/games.css";
import "../styles/market.css";

// spreading into a new array first so I don't mutate the original list
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);
const randCount = (max) => Math.floor(Math.random() * (max - 1)) + 2;

function ProduceCanvas({ item, onDragStart }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) drawProduce(ref.current, item);
  }, [item]);

  const isOnFloor = item.location === "floor";
  const wrapperStyle = isOnFloor
    ? { transform: `rotate(${item.rotation}deg)` }
    : {};
  const canvasStyle = item.disappearing
    ? { animation: "fall-in 0.4s ease-in forwards" }
    : {};

  return (
    <div style={wrapperStyle}>
      <canvas
        ref={ref}
        draggable
        style={canvasStyle}
        onDragStart={() => onDragStart(item.id)}
      />
    </div>
  );
}

export default function Market() {
  const [items, setItems] = useState([]);
  const draggedId = useRef(null);
  const batchRef = useRef(0);

  function loadProduce() {
    const batch = batchRef.current++;

    const fruits = shuffle([...produceData.fruits]).slice(
      0,
      randCount(produceData.fruits.length),
    );
    const veggies = shuffle([...produceData.vegetables]).slice(
      0,
      randCount(produceData.vegetables.length),
    );

    const newItems = [...fruits, ...veggies]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({
        ...item,
        id: `${batch}-${item.id}`,
        location: "floor",
        rotation: Math.random() * 60 - 30,
      }));
    setItems((prev) => [...prev, ...newItems]);
  }

  function resetGame() {
    setItems([]);
    batchRef.current = 0;
  }

  function handleDragStart(id) {
    draggedId.current = id;
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(targetCategory) {
    const id = draggedId.current;
    if (id === null) return;
    const item = items.find((i) => i.id === id);
    if (!item || item.category !== targetCategory) return;
    draggedId.current = null;
    // move to basket immediately so animation plays there, not on the floor
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, location: targetCategory, disappearing: true }
          : i,
      ),
    );
    setTimeout(() => {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, disappearing: false } : i)),
      );
    }, 400);
  }

  const floorItems = items.filter((i) => i.location === "floor");
  const fruitItems = items.filter((i) => i.location === "fruit");
  const vegItems = items.filter((i) => i.location === "vegetable");

  return (
    <>
      <div className="game-header">
        <div>
          <h1>farmer's market.</h1>
          <div id="status">
            <span>
              fruits: <strong>{fruitItems.length}</strong>
            </span>
            <span>
              vegetables: <strong>{vegItems.length}</strong>
            </span>
          </div>
        </div>
        <div className="btn-group">
          <button className="btn" onClick={loadProduce}>
            Produce Drop
          </button>
          <button className="btn btn-secondary" onClick={resetGame}>
            Clean Up
          </button>
        </div>
      </div>
      <p>
        Oh no! I tripped and dropped everything! Can you sort the produce into
        the right baskets before the market opens?
      </p>
      <p className="mobile-warning">
        ⚠️ drag and drop isn't supported on touch screens
      </p>

      <div id="produce-stands">
        <div className="basket-wrapper" id="fruit-basket">
          <div
            id="fruit-stand"
            className="stand"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop("fruit")}
          >
            <h3>fruits</h3>
            {fruitItems
              .filter((i) => i.disappearing)
              .map((item) => (
                <ProduceCanvas
                  key={item.id}
                  item={item}
                  onDragStart={handleDragStart}
                />
              ))}
          </div>
        </div>
        <div className="basket-wrapper" id="vegetable-basket">
          <div
            id="vegetable-stand"
            className="stand"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop("vegetable")}
          >
            <h3>vegetables</h3>
            {vegItems
              .filter((i) => i.disappearing)
              .map((item) => (
                <ProduceCanvas
                  key={item.id}
                  item={item}
                  onDragStart={handleDragStart}
                />
              ))}
          </div>
        </div>
      </div>

      <div id="produce-container">
        {floorItems.map((item) => (
          <ProduceCanvas
            key={item.id}
            item={item}
            onDragStart={handleDragStart}
          />
        ))}
      </div>

      <div className="how-to-play">
        <p>
          <strong>how to play</strong>
        </p>
        <ul>
          <li>🧺 click the button to drop the crate</li>
          <li>🫴 drag each item to the correct basket</li>
          <li>✨ sort them all to save the day!</li>
        </ul>
      </div>
    </>
  );
}
