import { useEffect, useState } from "react";
import ColorCard from "./ColorCard";
import ColorInfo from "./ColorInfo";
import ColorPicker from "./ColorPicker";
import ContrastSection from "./ContrastSection";
import "./DisplayColors.css";
import useDisplayColors from "./useDisplayColors";

function setColorScheme(color: Color) {
  const [h, s, l] = color.hsl;
  const styleRoot = document.documentElement.style;
  const colorLightL = l + 10 < 80 ? 80 : l + 10;
  const colorDarkL = l - 10 < 0 ? 0 : l - 10;
  styleRoot.setProperty("--main-color", `${color?.hex}`);
  styleRoot.setProperty(
    "--main-color-light",
    `hsl(${h} ${s}% ${colorLightL}%)`
  );
  styleRoot.setProperty("--main-color-dark", `hsl(${h} ${s}% ${colorDarkL}%)`);
}

function setTextContrast(contrast: string, colorContrast: string) {
  const styleRoot = document.documentElement.style;
  styleRoot.setProperty("--large-text", contrast);
  styleRoot.setProperty("--small-text", contrast);
  styleRoot.setProperty("--color-contrast", colorContrast);
}

const DisplayColors = () => {
  const {
    colors,
    isLoading,
    setMainColor,
    setHexColor,
    similarColors,
    initialColor,
    hexColor,
    mainColor,
    colorFinder
  } = useDisplayColors();

  const [colorPalette, setColorPalette] = useState<Color[]>([]);

  useEffect(() => {
    const colorFound = colors?.find(colorFinder);
    setMainColor(colorFound);
    if (colorFound) {
      setColorScheme(colorFound);
    }
  }, [hexColor, colors]);

  // useEffect(() => {
  //   const contrastHex = contrastColors?.[0]?.hex || "#000000";
  //   const colorContrast = contrastColors?.[2]?.hex || contrastHex;
  //   setTextContrast(contrastHex, colorContrast);
  // }, [contrastColors]);

  if (isLoading) return <div>Loading</div>;

  return (
    <div>
      <div className="main-color">
        <div className="main-color-box">
          <ColorInfo mainColor={mainColor} hexColor={hexColor} />
          <ColorPicker
            label="Change"
            onChange={e => setHexColor(e.target.value)}
            initialColor={initialColor}
          />
        </div>
        <div className="similar-colors">
          <h2>Similar colors</h2>
          <div className="similar-colors-gallery">
            {similarColors.map((color: Color) => (
              <ColorCard
                name={color.name}
                hex={color.hex}
                key={color.hex}
                handleClick={() => {
                  setColorPalette([...colorPalette, color]);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {false && (
        <>
          <h2>Your palette</h2>

          <div className="color-palette">
            {colorPalette.map(color => (
              <ColorCard
                name={color.name}
                hex={color.hex}
                key={color.hex}
                showCode={false}
              />
            ))}
          </div>
        </>
      )}

      {mainColor && (
        <ContrastSection colors={colors ?? []} mainColor={mainColor} />
      )}
    </div>
  );
};

export default DisplayColors;
