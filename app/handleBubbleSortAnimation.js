const handleBubbleSortAnimation = async (
  index1,
  index2,
  positions,
  setPositions,
  api,
  isSwapping = true
) => {

  const height = isSwapping ? 50 : 30;
  const width = 60;
  const gap = 10;

  const selectedColor = isSwapping ? "#1826c9" : "#ff0000"; // Blue for swapping, red for comparison

  // Step 1: Animate selection (blue or red color)
  await new Promise((resolve) => {
    api.start((i) => {
      if (i === index1 || i === index2) {
        return {
          from: { backgroundColor: "#ff6d6d" },
          to: { backgroundColor: selectedColor },
          config: { duration: 100 },
          onRest: () => resolve()
        };
      }
    });
  });

  // Step 2: Move Up and Down (swap preparation)
  await new Promise((resolve) => {
    const updatedPositions = [...positions];
    updatedPositions[index1] = {
      x: positions[index1].x,
      y: positions[index1].y - height,
    };
    updatedPositions[index2] = {
      x: positions[index2].x,
      y: positions[index2].y + height,
    };

    setPositions(updatedPositions);
    api.start((i) => ({
      y: updatedPositions[i].y,
      config: {mass: 1},
      onRest: () => resolve(),
    }));
  });

  if (isSwapping) {
    // Step 3: Move Left and Right (swap horizontally)
    await new Promise((resolve) => {
      const updatedPositions = [...positions];
      updatedPositions[index1] = {
        x: 0 + (width + gap), // Move right
        y: updatedPositions[index1].y,
      };
      updatedPositions[index2] = {
        x: 0 - (width + gap), // Move left
        y: updatedPositions[index2].y,
      };

      setPositions(updatedPositions);
      api.start((i) => ({
        x: updatedPositions[i].x,
        config: {mass: 1},
        onRest: () => resolve(),
      }));
    });
  }

  // Step 4: Move Back to Original Y Position (final position after swap)
  await new Promise((resolve) => {
    const updatedPositions = [...positions];
    updatedPositions[index1] = { x: updatedPositions[index1].x, y: 0 };
    updatedPositions[index2] = { x: updatedPositions[index2].x, y: 0 };

    setPositions(updatedPositions);
    api.start((i) => ({
      y: updatedPositions[i].y,
      config: {mass: 1},
      onRest: () => resolve(),
    }));
  });

  // Step 5: Reset selection color or mark as sorted
  await new Promise((resolve) => {
    api.start((i) => {
      if (i === index1 || i === index2) {
        return {
          from: { backgroundColor: selectedColor },
          to: { backgroundColor: "#ff6d6d" },
          config: { duration: 100 },
          onRest: () => resolve(),
        };
      }
    });
  });

};

export default handleBubbleSortAnimation;
