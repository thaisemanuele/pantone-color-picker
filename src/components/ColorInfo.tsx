import "./ColorInfo.css";

type ColorInfoProps = {
  hexColor: string;
  mainColor?: Color;
};

const ColorInfo = ({ hexColor, mainColor }: ColorInfoProps) => {
  return (
    <div className="info-wrapper">
      <div className="color-info">
        <h1>{mainColor ? mainColor.name : "Color not found"}</h1>
        {mainColor?.year && <span>({mainColor.year})</span>}
        {mainColor ? (
          <>
            <div>
              RGB: {mainColor.rgb[0]}, {mainColor.rgb[1]}, {mainColor.rgb[2]}
            </div>
            <div>
              HSV: {mainColor.hsv[0]}, {mainColor.hsv[1]}, {mainColor.hsv[2]}
            </div>
            <div>
              HSL: {mainColor.hsl[0]}, {mainColor.hsl[1]}, {mainColor.hsl[2]}
            </div>
            <div className="info-hexcode">{mainColor.hex}</div>
          </>
        ) : (
          <p>Pick a color to start or choose one from our suggested list</p>
        )}
      </div>
    </div>
  );
};

export default ColorInfo;
