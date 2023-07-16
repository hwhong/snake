import { Coordionate, Direction, Range } from "./type";

export const defaultCoordinates: Coordionate[] = [
  { x: 10, y: 8 },
  { x: 10, y: 9 },
  { x: 10, y: 10 },
];

export const directionDispatch: Record<
  Direction,
  (oldCoord: Coordionate) => Coordionate
> = {
  DOWN: (oldCoord) => ({ x: oldCoord.x + 0, y: oldCoord.y + 1 }),
  UP: (oldCoord) => ({ x: oldCoord.x + 0, y: oldCoord.y - 1 }),
  LEFT: (oldCoord) => ({ x: oldCoord.x - 1, y: oldCoord.y + 0 }),
  RIGHT: (oldCoord) => ({ x: oldCoord.x + 1, y: oldCoord.y + 0 }),
};

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export const isDiretionValid = (
  currentDirection: Direction,
  newDirection: Direction
) => {
  console.log(currentDirection, newDirection);
  if (
    (currentDirection === Direction.DOWN && newDirection === Direction.UP) ||
    (currentDirection === Direction.UP && newDirection === Direction.DOWN) ||
    (currentDirection === Direction.LEFT && newDirection === Direction.RIGHT) ||
    (currentDirection === Direction.RIGHT && newDirection === Direction.LEFT)
  ) {
    return false;
  }
  return true;
};

// Record<ROW_NUMBER, {COLUMN_FROM, COLUMN_TO}[]

export const WATER: Record<number, Range[]> = {
  0: [{ from: 13, to: 18 }],
  1: [
    { from: 0, to: 0 },
    { from: 11, to: 11 },
    { from: 13, to: 18 },
  ],
  2: [
    { from: 0, to: 4 },
    { from: 11, to: 16 },
    { from: 19, to: 19 },
  ],
  3: [
    { from: 0, to: 0 },
    { from: 4, to: 4 },
    { from: 9, to: 9 },
    { from: 12, to: 17 },
  ],
  4: [
    { from: 0, to: 0 },
    { from: 4, to: 5 },
    { from: 8, to: 12 },
    { from: 17, to: 17 },
  ],
  5: [
    { from: 0, to: 0 },
    { from: 5, to: 8 },
    { from: 10, to: 10 },
    { from: 17, to: 17 },
  ],
  6: [
    { from: 0, to: 1 },
    { from: 6, to: 6 },
    { from: 8, to: 11 },
  ],
  7: [
    { from: 0, to: 1 },
    { from: 6, to: 6 },
    { from: 8, to: 8 },
  ],
  8: [
    { from: 0, to: 1 },
    { from: 6, to: 8 },
  ],
  9: [
    { from: 0, to: 1 },
    { from: 6, to: 6 },
    { from: 8, to: 8 },
  ],
  10: [
    { from: 0, to: 1 },
    { from: 6, to: 8 },
  ],
  11: [
    { from: 0, to: 1 },
    { from: 7, to: 7 },
  ],
  12: [
    { from: 0, to: 2 },
    { from: 7, to: 8 },
  ],
  13: [
    { from: 0, to: 2 },
    { from: 7, to: 7 },
  ],
  14: [
    { from: 0, to: 2 },
    { from: 6, to: 7 },
    { from: 17, to: 19 },
  ],
  15: [
    { from: 0, to: 3 },
    { from: 6, to: 6 },
    { from: 9, to: 9 },
    { from: 16, to: 16 },
    { from: 18, to: 18 },
  ],
  16: [
    { from: 0, to: 9 },
    { from: 16, to: 17 },
    { from: 19, to: 19 },
  ],
  17: [
    { from: 0, to: 1 },
    { from: 4, to: 9 },
    { from: 16, to: 17 },
    { from: 19, to: 19 },
  ],
  18: [
    { from: 0, to: 0 },
    { from: 4, to: 10 },
    { from: 14, to: 16 },
    { from: 18, to: 19 },
  ],
  19: [
    { from: 0, to: 0 },
    { from: 2, to: 13 },
    { from: 15, to: 19 },
  ],
};

export const GREEN: Record<number, Range[]> = {
  0: [
    { from: 3, to: 4 },
    { from: 11, to: 12 },
  ],
  1: [
    { from: 6, to: 6 },
    { from: 9, to: 10 },
  ],
  2: [{ from: 7, to: 7 }],
  3: [{ from: 1, to: 1 }],
  4: [
    { from: 1, to: 1 },
    { from: 3, to: 3 },
  ],
  5: [{ from: 1, to: 1 }],
  6: [{ from: 7, to: 7 }],
  7: [
    { from: 7, to: 7 },
    { from: 12, to: 13 },
  ],
  8: [
    { from: 3, to: 4 },
    { from: 13, to: 14 },
  ],
  9: [
    { from: 3, to: 4 },
    { from: 15, to: 15 },
  ],
  10: [
    { from: 3, to: 4 },
    { from: 14, to: 14 },
  ],
  14: [
    { from: 12, to: 12 },
    { from: 16, to: 16 },
  ],
  15: [
    { from: 15, to: 15 },
    { from: 17, to: 17 },
  ],
  16: [
    { from: 15, to: 15 },
    { from: 11, to: 11 },
  ],
  17: [{ from: 2, to: 2 }],
  18: [{ from: 12, to: 12 }],
};

export const AIRPORT: Record<number, Range[]> = {
  12: [{ from: 18, to: 19 }],
  7: [{ from: 10, to: 10 }],
  13: [{ from: 17, to: 19 }],
};
