import React, { useState } from "react";
import "./IncrementDecrement.css";

const IncrementDecrement: React.FC = () => {
  let result = 0;

  function handleIncrementResult() {
    result++;
  }

  function handleDecrementResult() {
    result;
  }

  const [count, setCount] = useState(0);

  const handleIncrementCount = () => {
    setCount(count + 1);
  };

  const handleDecrementCount = () => {
    setCount(count - 1);
  };

  return (
    <div className="increment-decrement-container">
      <h2 style={{ marginTop: "2rem", fontSize: "3rem" }}>
        Increment/Decrement
      </h2>

      <div className="counter">
        <span>Usando variável:</span>
        <button onClick={handleIncrementResult}>
          <span>+</span>
        </button>
        <span className="value">{result}</span>
        <button onClick={handleDecrementResult}>
          <span>-</span>
        </button>
      </div>

      <hr style={{ margin: "2rem" }} />

      {/* <div className="counter">
        <span>Usando variável:</span>
        <button onClick={handleIncrementCount}>
          <span>+</span>
        </button>
        <span className="value">{count}</span>
        <button onClick={handleDecrementCount}>
          <span>-</span>
        </button>
      </div> */}
    </div>
  );
};

export default IncrementDecrement;
