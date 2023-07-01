import React, { useState } from "react";
import "./IncrementDecrement.css";

const IncrementDecrement: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div className="increment-decrement-container">
      <h2>Increment/Decrement</h2>
      <div className="counter">
        <button onClick={handleIncrement}>+</button>
        <span>{count}</span>
      </div>
    </div>
  );
};

export default IncrementDecrement;
