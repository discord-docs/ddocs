import { keyframes } from "@stitches/react";
import { FunctionComponent } from "react";
import { styled } from "../../stitches.config";

interface SpinnerProps {}

const rotate = keyframes({
  "100%": {
    transform: "rotate(360deg)",
  },
});

const dash = keyframes({
  "0%": {
    strokeDasharray: "1, 150",
    strokeDashoffset: 0,
  },
  "50%": {
    strokeDasharray: "90, 150",
    strokeDashoffset: -35,
  },
  "100%": {
    strokeDasharray: "90, 150",
    strokeDashoffset: -124,
  },
});

const SVG = styled("svg", {
  animation: `${rotate} 2s linear infinite`,
  zIndex: "2",
  width: "20px",
  height: "20px",
  position: "absolute",
  top: "6px",
  right: "0.5rem",
});

const Circle = styled("circle", {
  animation: `${dash} 1.5s ease-in-out infinite`,
  stroke: "#484848",
  strokeLinecap: "round",
});

const Spinner: FunctionComponent<SpinnerProps> = () => {
  return (
    <SVG viewBox="0 0 50 50">
      <Circle cx="25" cy="25" r="20" fill="none" stroke-width="5" />
    </SVG>
  );
};

export default Spinner;
