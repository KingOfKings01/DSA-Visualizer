"use client";
import { useSprings, animated } from "@react-spring/web";
import { useState } from "react";
import insertionSort from "./insertionSort";

const btn =
  "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700";

export default function Home() {
  // const [array, setArray] = useState([5, 2, 4, 3, 1]);
  // const [array, setArray] = useState([2, 5, 7, 1, 6, 0]);
  const [array, setArray] = useState([2, 1, 0]);

  const [positions, setPositions] = useState(array.map(() => ({ x: 0, y: 0 })));

  const [springs, api] = useSprings(array.length, (index) => ({
    to: { x: positions[index].x, y: positions[index].y },
    config: { tension: 200, friction: 20 },
  }));

  const handleSorting = async () => {
    const newArray = [...array];

    await insertionSort(
      newArray,
      newArray.length,
      positions,
      setPositions,
      setArray,
      api
    );

    setPositions([...positions])
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
        <button onClick={handleSorting} className={btn}>
          Insertion Sort
        </button>
      </div>
    </div>
  );
}
