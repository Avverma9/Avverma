import MultiRangeSlider from "multi-range-slider-react";
import "./range.css";


function RangeSlider({ minValue, maxValue, set_minValue, set_maxValue }) {

  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  return (
    <div className="range">
      <MultiRangeSlider
        min={400}
        max={4000}
        step={100}
        minValue={minValue}
        maxValue={maxValue}
        onInput={(e) => {
          handleInput(e);
        }}
      />
    </div>
  );
}

export default RangeSlider;