function mergeSortAnimations(array: number[]) {
  const animations: number[][] = [];
  const auxiliaryArray: number[] = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray: number[],
  startIndex: number,
  endIndex: number,
  auxiliaryArray: number[],
  animations: number[][]
) {
  if (startIndex === endIndex) return;
  const middleIdx = Math.floor((startIndex + endIndex) / 2);
  mergeSortHelper(auxiliaryArray, startIndex, middleIdx, mainArray, animations);
  mergeSortHelper(
    auxiliaryArray,
    middleIdx + 1,
    endIndex,
    mainArray,
    animations
  );
  doMerge(
    mainArray,
    startIndex,
    middleIdx,
    endIndex,
    auxiliaryArray,
    animations
  );
}

function doMerge(
  mainArray: number[],
  startIndex: number,
  middleIndex: number,
  endIndex: number,
  auxiliaryArray: number[],
  animations: number[][]
) {
  let k = startIndex;
  let i = startIndex;
  let j = middleIndex + 1;
  while (i <= middleIndex && j <= endIndex) {
    /* hacky way of doing animation, 
    we push 3 times to be able to do % 3 in SortVisualizer.tsx
    the 1st time is comparing two indices (going from grey to red)
    the 2nd time is to change the color back to grey for the two indecies
    the 3rd time (last one) is to show the actual swapping of array positions
    */
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIndex) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIndex) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export { mergeSortAnimations };
