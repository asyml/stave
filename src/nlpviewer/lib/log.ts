/* eslint-disable @typescript-eslint/no-explicit-any */
import { colorPalettes } from './color';

const labels: any = {};
const colorIterator = createColorIterator();

(window as any).ll = ll;
export function ll(label: string, ...values: any[]) {
  let color = '';
  if (labels[label]) {
    color = labels[label];
  } else {
    labels[label] = colorIterator.next();
    color = labels[label];
  }

  console.log(`%c ${label} `, `background: ${color}; color: white;`, ...values);
}

function createColorIterator() {
  let colorIndex = -1;

  return {
    next() {
      colorIndex++;
      return colorPalettes[colorIndex % colorPalettes.length];
    },
  };
}
