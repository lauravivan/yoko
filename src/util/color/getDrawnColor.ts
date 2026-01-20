import { getColor } from './getColor';

export function getDrawnColor(lastColor: string): string {
  let drawnColor = getColor();

  while (lastColor == drawnColor) {
    drawnColor = getColor();
  }

  return drawnColor;
}
