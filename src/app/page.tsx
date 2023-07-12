"use client";
import styles from "./page.module.css";
import React from "react";
import classNames from "classnames";

const N = 10;

interface Coordionate {
  x: number;
  y: number;
}

const def = [
  { x: 5, y: 5 },
  // { x: 5, y: 4 },
  //{ x: 5, y: 3 },
];

/**
 * State behaves like a snapshot. When we call three setState consecutively
 * ----------
 * setCount(count + 1)
 * setCount(count + 1)
 * setCount(count + 1)
 * ----------
 * the count will ultimatly be just 1.
 * Because a state variable's value never changes within a render.
 * Need to use updater function to use the same state variable before the next render
 */

export default function Home() {
  const [coords, setCoords] = React.useState<Coordionate[]>(def);

  const requestRef = React.useRef<number>(0);
  const previousTimeRef = React.useRef<number>();

  // const animate = (time: any) => {
  //   if (previousTimeRef.current != undefined) {
  //     const deltaTime = time - previousTimeRef.current;

  //     // const newCoords = [];
  //     // for (let i = 0; i < coords.length; i++) {
  //     //   newCoords.push({ x: coords[i].x, y: coords[i].y + 1 });
  //     // }
  //     setCoords((prevCoords) =>
  //       prevCoords.map(({ x, y }) => ({ x, y: y + 1 }))
  //     );

  //     setCount((prevCount) => (prevCount + deltaTime * 0.01) % 100);
  //   }

  //   previousTimeRef.current = time;
  //   requestRef.current = requestAnimationFrame(animate);
  // };

  React.useEffect(() => {
    // requestRef.current = requestAnimationFrame(animate);
    // return () => cancelAnimationFrame(requestRef.current);
    function update(currentDelta: number) {
      requestRef.current = requestAnimationFrame(update);

      var delta = currentDelta - previousTimeRef.current;

      if (500 && delta < 1000 / 1) {
        return;
      }

      const calculateCoordinates = () => {};

      setCoords((prevCoords) =>
        prevCoords.map(({ x, y }) => ({ x, y: y + 1 }))
      );

      previousTimeRef.current = currentDelta;
    }
    update();
  }, []); // Make sure the effect runs only once

  // React.useEffect(() => {
  //   requestRef.current = requestAnimationFrame(animate);
  //   return () => cancelAnimationFrame(requestRef.current);
  // }, []);

  // console.log(count);
  console.log(coords[0].x, coords[0].y);

  return (
    <div className={styles.root}>
      {Array.from(Array(N).keys()).map((y) => {
        return Array.from(Array(N).keys()).map((x) => {
          return (
            <div
              key={`${x}-${y}`}
              className={classNames(styles.gridItem, {
                [styles.snake]: coords.find(
                  (coord) => coord.x === x && coord.y === y
                ),
              })}
            >{`${x}-${y}`}</div>
          );
        });
      })}
    </div>
  );
}
