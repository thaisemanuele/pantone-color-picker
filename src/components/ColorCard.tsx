import "./ColorCard.css";

const ColorCard = ({
  hex,
  name,
  showCode = true,
  handleClick
}: Partial<Color> & {
  showCode?: boolean;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
}) => (
  <div className="color-card-container">
    <div
      className="color-card-box"
      style={{ backgroundColor: `${hex}` }}
      onClick={handleClick}
    ></div>
    {showCode && <p className="card-hex-display">{hex?.toUpperCase()}</p>}
    {name && <div className="color-card-name">{name}</div>}
  </div>
);

export default ColorCard;
