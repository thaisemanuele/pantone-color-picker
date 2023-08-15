type Color = {
  name: string;
  hex: string;
  rgb: [number, number, number];
  hsl: [number, number, number];
  hsv: [number, number, number];
  decimal: number;
  relativeLuminance: number;
  year?: number;
  images?: {
    author: string;
    authorUrl: string;
    url: string;
  }[];
};
