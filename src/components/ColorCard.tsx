import "./ColorCard.css";

const ColorCard = ({ hex, name }: Partial<Color>) => (
  <div className="color-card-container">
    <div className="color-card-box" style={{ backgroundColor: `${hex}` }}></div>
    <p className="card-hex-display">{hex}</p>
    {name && <div className="color-card-name">{name}</div>}
  </div>
);

export default ColorCard;
