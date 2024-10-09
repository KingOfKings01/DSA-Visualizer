export default async function handleSwapping(
  index1,
  index2,
  steps,
  positions,
  setPositions,
  api
) {
  const height = 70;
  const width = 60;
  const gap = 10;

  // Step 1: Animate selection
  await new Promise((resolve) => {
    api.start((i) => {
      if (i == index1 || i == index2) {
        return {
          from: { backgroundColor: "#ff6d6d" },
          to: { backgroundColor: "#1826c9" },
          config: { duration: 1 },
          onRest: () => resolve(),
        };
      }
      resolve()
    });
  });

  // Step 2: Move Up (swap preparation)
  await new Promise((resolve) => {
    const updatedPositions = [...positions];
    updatedPositions[index1] = {
      x: 0,
      y: 0 - height,
    };

    updatedPositions[index2] = {
      x: 0,
      y: 0 - height,
    };

    setPositions(updatedPositions);
    api.start((i) => ({
      y: updatedPositions[i].y,
      config: { mass: 1 },
      onRest: () => resolve(),
    }));
  });

  // Step 3: Move Left and Right (swap horizontally)
  if (steps) {
    await new Promise((resolve) => {

      const updatedPositions = [...positions];

      updatedPositions[index1] = {
        x: 0 + (width + gap) * steps, // Move right
        y: 0,
      };
      updatedPositions[index2] = {
        x: 0 - (width + gap) * steps, // Move left
        y: 0,
      };

      setPositions(updatedPositions);
      api.start((i) => {
        if (index1 == i || index2 == i){
          return {
            x: updatedPositions[i].x,
            config: { mass: 1 },
            onRest: () => resolve(),
          };
        }
        // resolve()
      });
    });
  }
  // Step 4: Move Back to Original Y Position (final position after swap)
  await new Promise((resolve) => {
    const updatedPositions = [...positions];
    updatedPositions[index1] = { x: 0, y: 0 };
    updatedPositions[index2] = { x: 0, y: 0 };

    setPositions(updatedPositions);
    api.start((i) => ({
      y: updatedPositions[i].y,
      config: { mass: 1 },
      onRest: () => resolve(),
    }));
  });

  // Step 5: Reset selection color or mark as sorted
  await new Promise((resolve) => {
    api.start((i) => {
      if (i === index1 || i === index2) {
        return {
          to: { backgroundColor: "#ff6d6d" },
          config: { duration: 1 },
          onRest: () => resolve(),
        };
      }
      resolve()
    });
  });
}
