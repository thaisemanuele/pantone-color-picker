import { useEffect } from "react";
import ContrastingColors from "./ContrastingColors";
import ContrastingImage from "./ContrastingImage";
import ContrastingText from "./ContrastingText";
import useContrastingColors from "./useContrastingColors";

function setTextContrast(
  contrast: string,
  colorContrast: string,
  badContrast: string
) {
  const styleRoot = document.documentElement.style;
  styleRoot.setProperty("--large-text", contrast);
  styleRoot.setProperty("--small-text", contrast);
  styleRoot.setProperty("--color-contrast", colorContrast);
  styleRoot.setProperty("--bad-contrast", badContrast);
}

type ContrastSectionProps = {
  colors: Color[];
  mainColor: Color;
};

const ContrastSection = ({ colors, mainColor }: ContrastSectionProps) => {
  const { contrastColors, contrastImage, badContrast } = useContrastingColors({
    colors,
    mainColor
  });

  useEffect(() => {
    console.log("update contrast");

    const contrastHex = contrastColors?.[0]?.hex || "#000000";
    const colorContrast = contrastColors?.[2]?.hex || contrastHex;
    setTextContrast(contrastHex, colorContrast, badContrast?.hex ?? "FEFEFE");
  }, [contrastColors]);

  return (
    <section className="content">
      {contrastImage && <ContrastingImage {...contrastImage} />}
      <ContrastingText />
      <ContrastingColors contrastColors={contrastColors} />
    </section>
  );
};

export default ContrastSection;
