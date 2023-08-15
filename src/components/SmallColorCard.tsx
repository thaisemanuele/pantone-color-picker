import "./SmallColorCard.css";

const SmallColorCard = ({
  hex,
  name,
  showName,
  handleClick
}: Partial<Color> & {
  showName?: boolean;
  nameToRight?: boolean;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
}) => (
  <div className="sm-color-card-container">
    <div
      className="sm-color-card-box"
      style={{ backgroundColor: `${hex}` }}
      onClick={handleClick}
    ></div>
    {showName && <p className="sm-color-card-name-to-right">{name}</p>}
  </div>
);

export default SmallColorCard;
