import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import './range.css';
import { useNavigate } from 'react-router-dom';
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
			min={100}
			max={5000}
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