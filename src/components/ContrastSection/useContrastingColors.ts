const useContrastingColors = ({
  colors,
  mainColor
}: {
  colors: Color[];
  mainColor: Color;
}) => {
  const calculateLuminanceRate = (colorA: Color, colorB: Color) => {
    if (colorA.relativeLuminance >= colorB.relativeLuminance) {
      return (
        (colorA.relativeLuminance + 0.05) / (colorB.relativeLuminance + 0.05)
      );
    }
    return (
      (colorB.relativeLuminance + 0.05) / (colorA.relativeLuminance + 0.05)
    );
  };

  const filterColorContrast = (color: Color, min: number) => {
    if (!mainColor) {
      return false;
    }
    const luminanceRate = calculateLuminanceRate(mainColor, color);
    return luminanceRate >= min;
  };

  const contrastRange = colors
    ? colors
        ?.filter(color => filterColorContrast(color, 1.5))
        .map(color => {
          return {
            ...color,
            rate: calculateLuminanceRate(mainColor, color)
          };
        })
    : [];

  const badContrast =
    mainColor && contrastRange.find(colorwithRate => colorwithRate.rate < 1.8);
  const contrastColors = colors
    ? contrastRange
        ?.filter(color => color.rate >= 4)
        .sort((a, b) => a.relativeLuminance - b.relativeLuminance)
        .slice(0, 7)
    : [];
  const mainContrastColor = contrastColors[0];
  const secondaryContrastColor = contrastColors[2];
  const hasSecondary = secondaryContrastColor?.images?.[0];
  const contrastColor = hasSecondary
    ? secondaryContrastColor
    : mainContrastColor;
  const firstImage = contrastColor?.images?.[0];
  const contrastImage = firstImage && {
    author: firstImage.author,
    authorUrl: firstImage.authorUrl,
    url: firstImage.url,
    name: contrastColor.name
  };
  return { contrastColors, contrastImage, badContrast };
};

export default useContrastingColors;
