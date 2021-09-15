import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    setArray([4, 2, 1, 3, 1, 1, 1, 2, 3, 1]);
  }, []);

  const swapArray = () => {
    setArray(() => {
      let newArray: number[] = [...array];

      let temp: number = newArray[0];
      newArray[0] = newArray[newArray.length - 1];
      newArray[newArray.length - 1] = temp;

      return newArray;
    });
  };

  return (
    <div className="app-container">
      <div className="array-container">
        {array.map((value) => (
          <div
            style={{
              backgroundColor: "#888",
              height: `${value + 0.5}em`,
              width: "1em",
              borderRadius: "2em",
              marginTop: "auto",
            }}
          ></div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={swapArray}> Swap Array </button>
      </div>
    </div>
  );
}

export default App;
