import React, { useState, useEffect } from "react";
import "./SortVisualizer.css";
import { mergeSortAnimations } from "../../SortingAlgorithms/helperFunctions";
import Button from "../Buttons/Button";

const ANIMATION_SPEED_MS = 1;
const NUM_ARRAY_BARS = 300;
const PRIMARY_COLOR = "lightgray";
const SECONDARY_COLOR = "red";

const SortVisualizer = () => {
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    let generatedArray: number[] = [];
    for (let i = 0; i < NUM_ARRAY_BARS; i++) {
      generatedArray.push(Math.floor(Math.random() * (730 - 5 + 1) + 5));
    }
    setArray(generatedArray);
  };

  const mergeSort = () => {
    const animations = mergeSortAnimations(array);
    console.log(animations);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(
        "array-bar"
      ) as HTMLCollectionOf<HTMLElement>;
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  return (
    <div className="visualizer-container">
      <div className="array-container">
        {" "}
        {array.map((value: number, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}
          ></div>
        ))}
      </div>
      <div className="button-container">
        <Button text="Reset Array" function={generateArray} />
        <Button text="Merge Sort" function={mergeSort} />
      </div>
    </div>
  );
};

export default SortVisualizer;
