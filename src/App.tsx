import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [array, setArray] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    setArray([1, 2, 3, 4]);
  }, []);

  return (
    <div className="array-container">
      {array.map((value) => (
        <div className="array-value">{value}</div>
      ))}
    </div>
  );
}

export default App;
