import SmallColorCard from "../SmallColorCard";

const ContrastingColors = ({ contrastColors }: { contrastColors: Color[] }) => {
  return (
    <div className="contrasting-colors">
      {!!contrastColors.length && <h3>Contrasting Colors</h3>}
      {contrastColors.map((color: Color) => (
        <SmallColorCard
          name={color.name}
          hex={color.hex}
          key={color.hex}
          showName
        />
      ))}
    </div>
  );
};

export default ContrastingColors;
