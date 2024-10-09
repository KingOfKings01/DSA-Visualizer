import handleBubbleSortAnimation from "./handleBubbleSortAnimation";

export default async function bubbleSort(
  newArray,
  n,
  positions,
  setPositions,
  setArray,
  api
) {
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (newArray[j] > newArray[j + 1]) {
        // Animate the swap
        await handleBubbleSortAnimation(
          j,
          j + 1,
          positions,
          setPositions,
          api,
          true
        );

        [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];

        // Update the array state after the animation, which will trigger a re-render
        setArray([...newArray]);

        // Reset the animations to the starting state so you can re-trigger them
        api.set((i) => ({
          x: 0,
          y: 0,
        }));
      } else {
        // Animate the swap

        await handleBubbleSortAnimation(
          j,
          j + 1,
          positions,
          setPositions,
          api,
          false
        );
      }
    }
    api.start((index) => {
      if (index === n - i - 1) {
        return {
          backgroundColor: "green",
          config: { duration: 100 },
        };
      }
    });
  }

  api.start((index) => {
    if (index === 0) {
      return {
        backgroundColor: "green",
        config: { duration: 100 },
      };
    }
  });
}
