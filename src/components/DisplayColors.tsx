import { useState } from "react";
import ColorCard from "./ColorCard";
import "./DisplayColors.css";
import useDisplayColors from "./useDisplayColors";

const MATCH_LIMIT = 15;
const UPPER_LIMIT = 50;

const DisplayColors = () => {
  const { colors, isLoading } = useDisplayColors();
  const [inputColor, setInputColor] = useState("#000000");

  function filterColorFunction(color: Color) {
    if (!inputColor.startsWith("#")) {
      return false;
    }
    const colorVal = inputColor.substring(1);

    const red = parseInt(colorVal.slice(0, 2), 16);
    const green = parseInt(colorVal.slice(2, 4), 16);
    const blue = parseInt(colorVal.slice(4, 6), 16);

    const redDiff = Math.abs(color.rgb[0] - red);
    const greenDiff = Math.abs(color.rgb[1] - green);
    const blueDiff = Math.abs(color.rgb[2] - blue);

    const redMatch = redDiff < MATCH_LIMIT;
    const greenMatch = greenDiff < MATCH_LIMIT;
    const blueMatch = blueDiff < MATCH_LIMIT;

    const redInRange = redDiff < UPPER_LIMIT;
    const greenInRange = greenDiff < UPPER_LIMIT;
    const blueInRange = blueDiff < UPPER_LIMIT;

    if (red >= green && red >= blue && redMatch) {
      console.log({ color, colorName: color.name, red, green, blue, redMatch });

      return greenInRange && blueInRange;
    }
    if (green >= red && green >= blue && greenMatch) {
      console.log({
        color,
        colorName: color.name,
        red,
        green,
        blue,
        greenMatch
      });

      return redInRange && blueInRange;
    }
    if (blue >= red && blue >= green && blueMatch) {
      console.log({
        color,
        colorName: color.name,
        red,
        green,
        blue,
        blueMatch
      });

      return redInRange && greenInRange;
    }

    return redMatch && greenMatch && blueMatch;
  }
  if (isLoading) return <div>Loading</div>;

  return (
    <div>
      <div className="main-color-box">
        <label htmlFor="colorpicker">Pick a color</label>
        <input
          type="color"
          name="colorpicker"
          value={inputColor}
          onChange={e => setInputColor(e.target.value)}
        />
        <ColorCard hex={inputColor} />
      </div>
      <div className="colors-gallery">
        {colors.filter(filterColorFunction).map((color: Color) => (
          <ColorCard name={color.name} hex={color.hex} />
        ))}
      </div>
    </div>
  );
};

export default DisplayColors;
