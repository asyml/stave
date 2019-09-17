// https://css-tricks.com/snippets/javascript/lighten-darken-color/
export function lightenDarkenColor(col: string, amt: number) {
  var usePound = false;

  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}

export const colorPalettes = [
  '#099AEB', // 1
  '#FCB527', // 2
  '#00BFA4', // 3
  '#FF9961', // 4
  '#52BA52', // 5
  '#F26DCC', // 6
  '#38D8F7', // 7
  '#0776BA', // 8
  '#E47700', // 9
  '#00BFA4', // 10
  '#FF5B00', // 11
  '#20822B', // 12
  '#D3279F', // 13
  '#09BEE2', // 14
  '#05588D', // 15
  '#BD5800', // 16
  '#00BFA4', // 17
  '#D63D00', // 18
  '#16491C', // 19
  '#A51B88', // 20
  '#068098', // 21
  '#014439', // 22
  '#971900', // 23
  '#72145E' // 24
];
