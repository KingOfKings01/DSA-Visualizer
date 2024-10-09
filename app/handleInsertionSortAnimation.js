const handleInsertionSortAnimation = async (
  keyIndex,
  steps,
  positions,
  setPositions,
  api,
  isShifting = true
) => {
  const height = 60;
  const width = 60;
  const gap = 10;

  const selectedColor = isShifting ? "#1826c9" : "#ff0000";

  // Step 1: Highlight the selected key element and the elements being compared
  await new Promise((resolve) => {
    api.start((i) => {
      if (
        i === keyIndex ||
        (i <= keyIndex && i >= keyIndex - steps)
      ) {
        return {
          from: { backgroundColor: "#ff6d6d" },
          to: { backgroundColor: "#1826c9" },
          config: { duration: 100 },
          onRest: () => resolve(),
        };
      } else if (i === keyIndex-1 && keyIndex >= 0) {
          return {
            from: { backgroundColor: "#ff6d6d" },
            to: { backgroundColor: "#ff0000" },
            config: { duration: 100 },
            onRest: () => resolve(),
          };
        
      }
    });
  });

  // Step 2: Move the key element up to prepare for shifting
  await new Promise((resolve) => {
    const updatedPositions = [...positions];
    updatedPositions[keyIndex] = {
      y: positions[keyIndex].y - height,
    };

    api.start((i) =>
      i === keyIndex ? { y: updatedPositions[i].y, onRest: resolve } : {}
    );
  });

  // Step 3: Shift the selected elements (in blue) to the right to make space for the key

  //! X position
  await new Promise((resolve) => {
    const updatedPositions = [...positions];
    for (let i = keyIndex - 1; i >= keyIndex - steps; i--) {
      // Move each of the blue elements to the right (except keyIndex)
      updatedPositions[i] = {
        x: 0 + (width + gap),
        y: positions[i]?.y || 0,
      };
    }

    setPositions(updatedPositions);

    // Animate the change
    api.start((i) => {
      if (i < keyIndex && i >= keyIndex - steps) {
        // Only move the blue elements except for keyIndex
        return {
          x: updatedPositions[i].x,
          config: { mass: 1 },
          onRest: resolve,
        };
      } else {
        resolve();
      }
    });
  });

  // Step 4: Move the keyIndex element to the left into its correct position

  if (isShifting) {
    await new Promise((resolve) => {
      const updatedPositions = [...positions];

      // Move the keyIndex element to the left
      updatedPositions[keyIndex] = {
        x: 0 - (width + gap) * steps,
        y: positions[keyIndex].y,
      };

      setPositions(updatedPositions);

      // Animate the keyIndex movement
      api.start((i) => {
        if (i === keyIndex) {
          return {
            x: updatedPositions[i].x,
            config: { mass: 1 },
            onRest: resolve,
          };
        }
      })
    })
  }

  // Step 5: Reset the vertical position of all elements back to the original Y position
  await new Promise((resolve) => {
    const updatedPositions = [...positions];
    for (let i = 0; i < updatedPositions.length; i++) {
      updatedPositions[i] = { y: 0 };
    }

    setPositions(updatedPositions);

    api.start((i) => {
      return { y: 0, onRest: resolve };
    });
  });

  // Step 6: Reset the colors of the shifted elements back to the default
  await new Promise((resolve) => {
    api.start((i) => {
      // if (
      //   i === keyIndex ||
      //   (isShifting && i <= keyIndex && i >= keyIndex - steps)
      // ) {
        return {
          // from: { backgroundColor: selectedColor },
          to: { backgroundColor: "#ff6d6d" },
          config: { duration: 100 },
          onRest: resolve,
        };
      // }
    });
  });
};

export default handleInsertionSortAnimation;
