export default async function handleCompare(
  index1,
  index2,
  min_idx,
  positions,
  setPositions,
  api
) {
  const height = 70;
  const width = 60;
  const gap = 10;

  // Step 1: Animate selection and change colors
  await new Promise((resolve) => {
    api.start((i) => {
      if (i == index1) {
        return {
          to: { backgroundColor: "#1826c9" },
          config: { duration: 100 },
          onRest: () => resolve(),
        };
      } else if (i == min_idx) {
        return {
          to: { backgroundColor: "#5eafd4" },
          config: { duration: 100 },
          onRest: () => resolve(),
        };
      } else if (i == index2) {
        return {
          to: { backgroundColor: "red" },
          config: { duration: 100 },
          onRest: () => resolve(),
        };
      }
      resolve();
    });
  });

  // Step 2: Move Up (swap preparation)
  await new Promise((resolve) => {
    const updatedPositions = [...positions];
    updatedPositions[index1] = {
      x: positions[index1].x,
      y: positions[index1].y - height,
    };
    
    updatedPositions[index2] = {
      x: positions[index2].x,
      y: positions[index2].y + 0.1,
    };

    setPositions(updatedPositions);
    
    api.start((i) => ({
      y: updatedPositions[i].y,
      config: { mass: 1 },
      onRest: resolve,
    }));
  });

  // Step 4: Move Back to Original Y Position (final position after swap)
  // await new Promise((resolve) => {
  //   const updatedPositions = [...positions];
  //   updatedPositions[index2] = { x: updatedPositions[index2].x, y: 0 };

  //   setPositions(updatedPositions);

  //   api.start((i) => {
  //     if (index1 == i) {
  //       return {
  //         y: updatedPositions[i].y - 70,
  //         config: { duration: 300 },
  //         onRest: () => resolve(),
  //       };
  //     } else
  //       return {
  //         y: updatedPositions[i].y,
  //         config: { duration: 300 },
  //         onRest: () => resolve(),
  //       };
  //   });
  // });

  // Reset selection color or mark as sorted
  await new Promise((resolve) => {
    api.start((i) => {
      return {
        from: { backgroundColor: "red" },
        to: { backgroundColor: "#ff6d6d" },
        config: { duration: 1 },
        onRest: () => resolve(),
      };
    });
  });


  // cheng the color
  await new Promise((resolve) => {
    api.start((i) => {
      return {
        from: { backgroundColor: "#5eafd4" },
        to: { backgroundColor: "#ff6d6d" },
        config: { duration: 1 },
        onRest: () => resolve(),
      };
    });
  });
}
