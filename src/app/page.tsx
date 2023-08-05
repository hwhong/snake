"use client";
import styles from "./page.module.css";
import React from "react";
import classNames from "classnames";
import { Coordionate, Direction, N } from "./type";
import {
  AIRPORT,
  GREEN,
  WATER,
  defaultCoordinates,
  directionDispatch,
  getRandomInt,
  isDiretionValid,
} from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleAlt } from "@fortawesome/free-solid-svg-icons";
import { Inter } from "@next/font/google";
import { Roboto_Mono } from "@next/font/google";

const titleInter = Inter({ subsets: ["latin"], weight: "600" });
const inter = Inter({ subsets: ["latin"], weight: "500" });
const mono = Roboto_Mono({ subsets: ["latin"] });

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
  const [coords, setCoords] = React.useState<Coordionate[]>([
    ...defaultCoordinates,
  ]);
  const requestRef = React.useRef<number>(0);
  const previousTimeRef = React.useRef<number>();
  const directionRef = React.useRef<Direction>(Direction.DOWN);
  const previousDirectionRef = React.useRef<Direction>(Direction.DOWN);
  const foodRef = React.useRef<Coordionate>();
  const isGameOverRef = React.useRef<boolean>(false);
  const appleCountRef = React.useRef<number>(0);

  React.useEffect(() => {
    const onKeyDown = (e: any) => {
      let newDirection = undefined;
      switch (e.key) {
        case "ArrowUp":
          newDirection = Direction.UP;
          break;
        case "ArrowDown":
          newDirection = Direction.DOWN;
          break;
        case "ArrowLeft":
          newDirection = Direction.LEFT;
          break;
        case "ArrowRight":
          newDirection = Direction.RIGHT;
          break;
        case " ":
          if (isGameOverRef.current) {
            isGameOverRef.current = false;
            setCoords([...defaultCoordinates]);
          }
          break;
        default:
          newDirection = undefined;
          break;
      }
      if (newDirection && isDiretionValid(directionRef.current, newDirection)) {
        previousDirectionRef.current = directionRef.current;
        directionRef.current = newDirection;
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

  const isCoordSnake = (x: number, y: number) =>
    coords.find((coord) => coord.x === x && coord.y === y);
  const isCoordFood = (x: number, y: number) => {
    if (foodRef.current) {
      const { x: foodX, y: foodY } = foodRef.current;
      return foodX === x && foodY === y;
    }
    return false;
  };

  React.useEffect(() => {
    generateNewFood(coords);
    function update(currentDelta?: number) {
      requestRef.current = requestAnimationFrame(update);

      var delta = currentDelta! - previousTimeRef.current!;

      if (500 && delta < 200 / 1) {
        return;
      }

      const calculateCoordinates = (prevCoords: Coordionate[]) => {
        const hd = prevCoords[0];
        prevCoords.pop();

        let newHead = directionDispatch[directionRef.current](hd);

        // runs into itself
        if (
          prevCoords.find(({ x, y }) => x === newHead.x && y === newHead.y) &&
          previousDirectionRef.current !== directionRef.current
        ) {
          isGameOverRef.current = true;
        }

        if (
          previousDirectionRef.current &&
          !isDiretionValid(previousDirectionRef.current, directionRef.current)
        ) {
          newHead = directionDispatch[previousDirectionRef.current](hd);
        }

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
          appleCountRef.current = appleCountRef.current + 1;
          newCoords.push(prevCoords[prevCoords.length - 1]);
          generateNewFood(prevCoords);
        }
        return newCoords;
      };

      setCoords(calculateCoordinates);

      previousTimeRef.current = currentDelta;
    }
    if (isGameOverRef.current === false) {
      update();
    }
  }, []); // Make sure the effect runs only once

  return (
    <div className={styles.root}>
      <div className={classNames(styles.titleContainer, titleInter.className)}>
        <div className={styles.title}>New York Subway</div>
        <div className={styles.description}>
          One <p className={styles.appleText}> apple </p> at a time
        </div>
      </div>

      <div className={styles.scoreBoard}>
        <div className={styles.line} />
        <div className={styles.titleWrapper}>
          72 Street Station
          <div className={styles.gameCount}>{appleCountRef.current}</div>
        </div>
      </div>

      <div className={styles.gridWrapper}>
        <div className={styles.manhattan}>Manhattan</div>
        <div className={styles.bronx}>The Bronx</div>
        <div className={styles.statenIsland}>Staten Island</div>
        <div className={styles.queens}>Queens</div>
        <div className={styles.brooklyn}>Brooklyn</div>
        {isGameOverRef.current === true && (
          <div className={styles.gameOverOverlay}>
            <p
              className={classNames(styles.overlayTitle, titleInter.className)}
            >
              Game Over
            </p>
            <div
              className={classNames(styles.overlayDescription, inter.className)}
            >
              Press
              <p className={classNames(styles.spaceButton, mono.className)}>
                SPACE
              </p>
              to get on the subway again!
            </div>
          </div>
        )}
        <div className={styles.grid}>
          {Array.from(Array(N).keys()).map((y) => {
            return Array.from(Array(N).keys()).map((x) => {
              const isWater = WATER[y].find(
                ({ from, to }) => from <= x && x <= to
              );
              const isGreen = GREEN[y]?.find(
                ({ from, to }) => from <= x && x <= to
              );
              const isAirport = AIRPORT[y]?.find(
                ({ from, to }) => from <= x && x <= to
              );

              return (
                <div
                  key={`${x}-${y}`}
                  className={classNames(styles.gridItem, {
                    [styles.water]: isWater,
                    [styles.green]: isGreen,
                    [styles.airport]: isAirport,
                    [styles.snake]: isCoordSnake(x, y),
                  })}
                >
                  {isCoordFood(x, y) && (
                    <FontAwesomeIcon
                      icon={faAppleAlt}
                      color="#DD1533"
                      className={styles.apple}
                    />
                  )}
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
}
