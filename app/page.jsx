"use client";
import { useSprings, animated } from "@react-spring/web";
import { useState, useEffect } from "react";
import bubbleSort from "./bubbleSort";
import bubbleSort2 from "./bubbleSort2";
import insertionSort from "./insertionSort";
import selectionSort from "./selectionSort";

const btn =
  "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700";

export default function Home() {
  // const [array, setArray] = useState([5, 2, 4, 3, 1]);
  // const [array, setArray] = useState([2, 15, 7, 31, 6, 0, 11,80, 12, 40, 21 ]);
  const [array, setArray] = useState([2, 15, 7, 31]);
  // const [array, setArray] = useState([2, 1, 0])
  
  const [positions, setPositions] = useState(array.map(() => ({ x: 0, y: 0 })));

  useEffect(() => {
  }, [positions, setPositions]);

  const [springs, api] = useSprings(array.length, (index) => ({
    to: { x: positions[index].x, y: positions[index].y },
    config: { tension: 200, friction: 20 },
  }));

  const handleSorting = async (option) => {
    const newArray = [...array];

    switch (option) {
      case "B1":
        await bubbleSort(
          newArray,
          newArray.length,
          positions,
          setPositions,
          setArray,
          api
        )
        break
      case "B2":
        await bubbleSort2(
          newArray,
          newArray.length,
          positions,
          setPositions,
          setArray,
          api
        )
        break
      case "I":
        await insertionSort(
          newArray,
          newArray.length,
          positions,
          setPositions,
          setArray,
          api
        )
        break;
      case "S":
        selectionSort(newArray,
          newArray.length,
          positions,
          setPositions,
          setArray,
          api
        )
        // setPositions(positions)
        break;
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleShuffle = async () => {
    const newArray = shuffleArray([...array]);

    setArray([...newArray]);

    // const updatedPositions = newArray.map((num, newIndex) => {
    //   const oldIndex = array.indexOf(num); // Find the original index of the element in the current array
    //   return {
    //     x: positions[oldIndex].x  * -70, // Calculate new x position relative to old index
    //     y: 0
    //   };
    // });

    await new Promise((resolve) => {

      api.start((i) => ({
        to: { backgroundColor: "#ff6d6d" }, // Default color
        config: { mass: 1 },
        onRest: () => resolve(),
      }));
    });

  };

  return (
    <div className="container h-[100vh] flex justify-around items-center flex-col">
      <h1>Home Page</h1>

      <div className="flex gap-5">
        {array.map((num, index) => (
          <animated.div
            key={index}
            className="shadow-md rounded-md text-center pt-3 w-[50px] h-[50px] bg-[#ff6d6d]"
            style={{
              ...springs[index],
              display: "inline-block",
            }}
          >
            <span className="text-white font-bold">{num}</span>
          </animated.div>
        ))}
      </div>

      <div>
        <button onClick={handleShuffle} className={btn}>
          Shuffle
        </button>
        <button onClick={() => handleSorting("B1")} className={btn}>
          Bubble Sort 1
        </button>
        <button onClick={() => handleSorting("B2")} className={btn}>
          Bubble Sort 2
        </button>
        <button onClick={() => handleSorting("I")} className={btn}>
          Insertion Sort
        </button>
        <button onClick={() => handleSorting("S")} className={btn}>
          Selection Sort
        </button>
      </div>
    </div>
  );
}
