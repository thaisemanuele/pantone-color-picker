import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  calculateRelativeLuminance,
  hexToHSL,
  hexToRgb
} from "../utils/colorUtils";

const CLOSE_MATCH_LIMIT = 5;
const INITIAL_COLOR = "#F7CAC9";

async function fetchColors() {
  const colors = await fetch("../api/colors.json");
  return (await colors.json()) as Color[];
}

const useDisplayColors = () => {
  const { data, isLoading } = useQuery(["colors"], fetchColors);

  const colors = data?.map(color => {
    color.relativeLuminance = calculateRelativeLuminance(...color.rgb);
    return color;
  });

  const [hexColor, setHexColor] = useState(INITIAL_COLOR);
  const [mainColor, setMainColor] = useState<Color>();

  const [red, green, blue] = hexToRgb(hexColor);

  const isHueMatch = (mainColorHue: number, hue: number) => {
    const isLowerLimit = mainColorHue - 30 < 0;
    const isUpperLimit = mainColorHue + 30 > 360;
    const maxTargetHue = (mainColorHue + 30) % 360;
    const minTargetHue = isLowerLimit
      ? Math.abs(mainColorHue - 30) + 360
      : Math.abs(mainColorHue - 30);

    if (isLowerLimit || isUpperLimit) {
      return hue >= minTargetHue || hue <= maxTargetHue;
    }

    return hue >= minTargetHue && hue <= maxTargetHue;
  };

  const filterSimilarColor = (color: Color) => {
    if (!hexColor.startsWith("#")) {
      return false;
    }
    if (mainColor?.hex === color.hex) {
      return false;
    }
    const [h, s, l] = mainColor ? mainColor.hsl : hexToHSL(hexColor);
    const hue = mainColor ? mainColor?.hsl[0] : h;

    if (isHueMatch(hue, color.hsl[0])) {
      const sDiff = Math.abs(s - color.hsl[1]);
      const lDiff = Math.abs(l - color.hsl[2]);
      return sDiff < 35 && lDiff < 20;
    }
  };

  const colorFinder = (color: Color) => {
    return (
      Math.abs(color.rgb[0] - red) < CLOSE_MATCH_LIMIT &&
      Math.abs(color.rgb[1] - green) < CLOSE_MATCH_LIMIT &&
      Math.abs(color.rgb[2] - blue) < CLOSE_MATCH_LIMIT
    );
  };

  const similarColors = colors
    ? colors?.filter(filterSimilarColor).slice(0, 6)
    : [];

  return {
    colors,
    isLoading,
    setMainColor,
    setHexColor,
    initialColor: INITIAL_COLOR,
    hexColor,
    mainColor,
    similarColors,
    colorFinder
  };
};

export default useDisplayColors;
