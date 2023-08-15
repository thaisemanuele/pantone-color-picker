import { useState } from "react";
import "./ColorPicker.css";

type ColorPickerProps = {
  label: string;
  initialColor: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const ColorPicker = ({ label, initialColor, onChange }: ColorPickerProps) => {
  const [inputColor, setInputColor] = useState(initialColor);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColor(e.target.value);
    onChange(e);
  };

  return (
    <div className="color-picker">
      <label htmlFor="colorpicker">{label}</label>
      <input
        type="color"
        id="colorpicker"
        value={inputColor}
        onChange={event => handleChange(event)}
      />
    </div>
  );
};

export default ColorPicker;
