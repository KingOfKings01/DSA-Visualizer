import handleInsertionSortAnimation from "./handleInsertionSortAnimation";

export default async function insertionSort(
  newArray,
  n,
  positions,
  setPositions,
  setArray,
  api
) {
  let array = [...newArray];
  let moves = 0;
  for (let i = 1; i < n; i++) {
    moves = 0;
    let key = array[i];
    let j = i - 1;

    // Find where to insert key
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j]; // Shift larger elements right
      moves += 1;
      j = j - 1;
    }
    array[j + 1] = key; // Insert key into its correct position

    // Step 1: Update the array visually and animate the insertion
    await handleInsertionSortAnimation(
      i, // Current key index
      moves, // How many moves are happening
      positions,
      setPositions,
      api,
      moves !== 0 // Is shifting happening?
    );

    // Step 2: Update the array state so the UI reflects the correct array
    setArray([...array]);

    // Step 4: Reset the animations to the starting state so you can re-trigger them
    api.set(
      (i) => ({ x: 0, y: 0 }) // there is a glitch to fix this {y : 0.1}
    );
  }

  api.set(
    (i) => ({ x: 0, y: 0 }) // there is a glitch to fix this {y : 0.1}
  );


  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const changeColorOneByOne = async (api, durationBetween) => {
    const totalElements = n;

    for (let i = 0; i <= totalElements; i++) {
      await new Promise((resolve) => {
        api.start((index) => {
          if (index === i) {
            return {
              from: { backgroundColor: "#ff6d6d" },
              to: { backgroundColor: "green" },
              config: { duration: 100 },
              onRest: resolve, // Resolve when animation completes
            };
          }
        });
      });

      // Introduce a delay before starting the next element's animation
      await delay(durationBetween); // ms delay
    }
  };

  await changeColorOneByOne(api, 10);
}
