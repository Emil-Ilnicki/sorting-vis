import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [array, setArray] = useState<number[]>([]);

  let trace: any = [];

  useEffect(() => {
    setArray([4, 3, 2, 1]);
  }, []);

  const bubbleSort = () => {
    let arrLength = array.length;
    let newArray: number[] = [...array];

    for (let i = 0; i < arrLength; i++) {
      for (let j = 0; j < arrLength; j++) {
        if (newArray[j] > newArray[j + 1]) {
          let temp = newArray[j];
          newArray[j] = newArray[j + 1];
          newArray[j + 1] = temp;
          trace.push([...newArray]);
        }
      }
    }

    visualizeSort();
  };

  const visualizeSort = () => {
    console.log(trace);
    trace.forEach((step: [], i: number) => {
      setTimeout(() => {
        setArray(step);
      }, 300 * i);
    });
  };

  const reset = () => {
    setArray([4, 3, 2, 1]);
  };

  return (
    <div className="app-container">
      <div className="array-container">
        {array.map((value, i) => (
          <div
            key={i}
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
        <button onClick={bubbleSort}> Swap Array </button>
        <button onClick={reset}> Reset </button>
      </div>
    </div>
  );
}

export default App;
