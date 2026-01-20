import { getColors } from './getColors';

export function getColor(): string {
  const colors = getColors();
  return colors[0];
}
