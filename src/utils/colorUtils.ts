export function hexToRgb(hexColor: string): [number, number, number] {
  let colorVal = hexColor;
  if (hexColor.startsWith("#")) {
    colorVal = hexColor.substring(1);
  }
  const red = parseInt(colorVal.slice(0, 2), 16);
  const green = parseInt(colorVal.slice(2, 4), 16);
  const blue = parseInt(colorVal.slice(4, 6), 16);
  return [red, green, blue];
}

export function hexToHSL(hexColor: string): [number, number, number] {
  const [red, green, blue] = hexToRgb(hexColor);

  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;

  let h = 0;
  let s = 0;
  let l = 0;

  if (delta == 0) {
    h = 0;
  } else if (cmax == r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax == g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}

export function calculateRelativeLuminance(
  red: number,
  green: number,
  blue: number
) {
  const rsrgb = red / 255;
  const gsrgb = green / 255;
  const bsrgb = blue / 255;
  const R = rsrgb <= 0.03928 ? rsrgb / 12.92 : (rsrgb + 0.055 / 1.055) ** 2.4;
  const G = gsrgb <= 0.03928 ? gsrgb / 12.92 : (gsrgb + 0.055 / 1.055) ** 2.4;
  const B = bsrgb <= 0.03928 ? bsrgb / 12.92 : (bsrgb + 0.055 / 1.055) ** 2.4;

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
