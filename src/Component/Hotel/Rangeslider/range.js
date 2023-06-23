import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import './range.css';
function RangeSlider() {
const [minValue, set_minValue] = useState(25);
const [maxValue, set_maxValue] = useState(75);
const handleInput = (e) => {
	set_minValue(e.minValue);
	set_maxValue(e.maxValue);
};

return (
	<div className="range">
		<MultiRangeSlider
			min={400}
			max={40000}
			step={500}
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