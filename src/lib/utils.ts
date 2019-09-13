import { ILegend, IColoredLegend } from './interfaces';
import { colorPalettes } from './color';

export function applyColorToLegend(legends: ILegend[]): IColoredLegend[] {
  return legends.map((leg, i) => {
    return {
      ...leg,
      color: colorPalettes[i % colorPalettes.length],
    };
  });
}

export function notNullOrUndefined<T>(x: T | null | undefined): x is T {
  return x !== null && x !== undefined;
}
