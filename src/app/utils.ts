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
