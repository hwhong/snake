"use client";
import styles from "./page.module.css";
import React from "react";
import classNames from "classnames";
import { Coordionate, Direction, N } from "./type";
import {
  defaultCoordinates,
  directionDispatch,
  directionMap,
  getRandomInt,
} from "./utils";

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
  const [coords, setCoords] = React.useState<Coordionate[]>(defaultCoordinates);

  const requestRef = React.useRef<number>(0);
  const previousTimeRef = React.useRef<number>();
  const directionRef = React.useRef<Direction>(Direction.DOWN);
  const foodRef = React.useRef<Coordionate>();

  React.useEffect(() => {
    const onKeyDown = (e: any) => {
      switch (e.key) {
        case "ArrowUp":
          directionRef.current = Direction.UP;
          break;
        case "ArrowDown":
          directionRef.current = Direction.DOWN;
          break;
        case "ArrowLeft":
          directionRef.current = Direction.LEFT;
          break;
        case "ArrowRight":
          directionRef.current = Direction.RIGHT;
          break;
        default:
          directionRef.current = Direction.DOWN;
          break;
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const generateNewFood = (coords: Coordionate[]) => {
    const random = () => ({
      x: getRandomInt(0, N - 1),
      y: getRandomInt(0, N - 1),
    });

    let foodCoord = random();
    // make sure the food is not generated on the snake body
    while (
      !!coords.find(({ x, y }) => foodCoord.x === x && foodCoord.y === y)
    ) {
      foodCoord = random();
    }
    foodRef.current = foodCoord;
  };

  React.useEffect(() => {
    generateNewFood(coords);
    function update(currentDelta?: number) {
      requestRef.current = requestAnimationFrame(update);

      var delta = currentDelta! - previousTimeRef.current!;

      if (500 && delta < 500 / 1) {
        return;
      }

      const calculateCoordinates = (prevCoords: Coordionate[]) => {
        const hd = prevCoords[0];
        prevCoords.pop();

        const newHead = directionDispatch[directionRef.current](hd);

        if (newHead.x < 0) {
          newHead.x = N - 1;
        }
        if (newHead.x > N - 1) {
          newHead.x = 0;
        }
        if (newHead.y < 0) {
          newHead.y = N - 1;
        }
        if (newHead.y > N - 1) {
          newHead.y = 0;
        }

        const newCoords = [newHead, ...prevCoords];
        if (
          newHead.x === foodRef.current?.x &&
          newHead.y === foodRef.current?.y
        ) {
          newCoords.push(prevCoords[prevCoords.length - 1]);
          generateNewFood(prevCoords);
        }

        return newCoords;
      };

      setCoords(calculateCoordinates);

      previousTimeRef.current = currentDelta;
    }
    update();
  }, []); // Make sure the effect runs only once

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
                [styles.food]:
                  foodRef.current?.x === x && foodRef.current?.y === y,
              })}
            >{`${x}-${y}`}</div>
          );
        });
      })}
    </div>
  );
}
