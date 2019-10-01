import { colorPalettes } from './color';

const labels: any = {};
const colorIterator = createColorIterator();

export function ll(label: string, ...values: any[]) {
  let e = new Error();
  let stack = e.stack || '';
  const stackFormatted = stack
    .split('\n')
    .map(a => '> ' + a.trim().replace(/^at\s+/, ''))
    .slice(2)
    .join('\n');

  let color = '';
  if (labels[label]) {
    color = labels[label];
  } else {
    labels[label] = colorIterator.next();
    color = labels[label];
  }

  console.groupCollapsed(
    `%c ${label} `,
    `background: ${color}; color: white;`,
    ...values
  );
  console.log(stackFormatted);
  console.groupEnd();
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
