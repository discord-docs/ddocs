import { FunctionComponent } from "react";
import { styled } from "../../../stitches.config";

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
}

const SliderContainer = styled("div", {});

const SliderInput = styled("input", {
  appearance: "none",
  color: "$scrollbarTrack",
  background: "$backgroundTeritialy",
  borderRadius: "8px",
  width: "100%",

  "&::-webkit-slider-thumb": {
    appearance: "none",
    background: "$textNormal",
    width: "16px",
    height: "16px",
    borderRadius: "8px",
  },

  "&::-moz-range-thumb": {
    appearance: "none",
    background: "$textNormal",
    width: "16px",
    height: "16px",
    borderRadius: "8px",
  },
});

const Slider: FunctionComponent<SliderProps> = ({
  min,
  max,
  value,
  onChange,
  step,
}) => {
  min ??= 0;
  max ??= 100;

  return (
    <SliderContainer>
      <SliderInput
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(v) => {
          onChange(parseInt(v.currentTarget.value));
        }}
      />
    </SliderContainer>
  );
};

export default Slider;
