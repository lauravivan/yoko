import { getColors } from './getColors';

export function getColor(): string {
  const colors = getColors();
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
