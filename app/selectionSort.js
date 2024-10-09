import handleCompare from "./sectionSortAnimations/handleCompare";
import handleSwapping from "./sectionSortAnimations/handleSwapping";

export default async function selectionSort(
  newArray,
  n,
  positions,
  setPositions,
  setArray,
  api
) {
  let array = [...newArray];
  for (let i = 0; i < n - 1; i++) {
    let min_idx = i;
    let steps = 0;

    for (let j = i + 1; j < n; j++) {
      steps++;
      if (array[j] < array[min_idx]) {
        min_idx = j;
      }
        await handleCompare(i, j, min_idx, positions, setPositions, api);

    }
    api.set((index) => {
        if (index != i) {
            return { x: 0, y: 0.1 }
        }
    }
    );

    if (min_idx != i) {
      [array[i], array[min_idx]] = [array[min_idx], array[i]];
    }

    let moves = min_idx - i;

    await handleSwapping(i, min_idx, moves, positions, setPositions, api);

    setArray([...array]);

    api.set((i) => ({ x: 0, y: 0 }));
  }

  api.set((i) => ({ x: 0, y: 0 }));

  await new Promise((resolve) => {
    api.start((index) => {
      return {
        from: { backgroundColor: "#ff6d6d" },
        to: { backgroundColor: "green" },
        config: { duration: 200 },
        onRest: resolve, // Resolve when animation completes
      };
    });
  });
}
