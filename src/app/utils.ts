import { Coordionate, Direction } from "./type";

export const defaultCoordinates: Coordionate[] = [
  { x: 5, y: 5 },
  { x: 5, y: 4 },
  { x: 5, y: 3 },
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
  if (
    (currentDirection === Direction.DOWN && newDirection === Direction.UP) ||
    (currentDirection === Direction.LEFT && newDirection === Direction.RIGHT)
  ) {
    return false;
  }
  return true;
};
