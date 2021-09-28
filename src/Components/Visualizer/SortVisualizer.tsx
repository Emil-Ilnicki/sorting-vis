import React, { useState, useEffect } from "react";
import "./SortVisualizer.css";
import {
  mergeSortAnimations,
  bubbleSortAnimations,
} from "../../SortingAlgorithms/helperFunctions";
import Button from "../Buttons/Button";

const ANIMATION_SPEED_MS = 1;
const PRIMARY_COLOR = "lightgray";
const SECONDARY_COLOR = "red";

const SortVisualizer = () => {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(100);

  useEffect(() => {
    generateArray(arraySize);
  }, [arraySize]);

  const generateArray = (arraySize: number) => {
    let generatedArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
      generatedArray.push(Math.floor(Math.random() * (arraySize - 5 + 1) + 5));
    }
    setArray(generatedArray);
  };

  const mergeSort = () => {
    const animations = mergeSortAnimations(array);

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

  const bubbleSort = () => {
    const animations = bubbleSortAnimations(array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(
        "array-bar"
      ) as HTMLCollectionOf<HTMLElement>;
      const isSwap = animations[i][2] === 1 ? true : false;

      if (isSwap) {
        setTimeout(() => {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const tmp = barTwoStyle.height;

          barTwoStyle.height = barOneStyle.height;
          barOneStyle.height = tmp;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = animations[i][2] === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
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
      <div className="slider-container">
        <input
          type="range"
          min="20"
          max="300"
          value={arraySize}
          className="slider"
          onChange={(e) => setArraySize(parseInt(e.target.value))}
        />
      </div>
      <div className="button-container">
        <Button
          text="Reset Array"
          sliderValue={arraySize}
          function={generateArray}
        />
        <Button text="Bubble Sort" function={bubbleSort} />
      </div>
    </div>
  );
};

export default SortVisualizer;
