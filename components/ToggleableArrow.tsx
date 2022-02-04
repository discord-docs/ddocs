import { FunctionComponent } from "react";
import { styled } from "../stitches.config";

interface ToggleableArrorProps {
  expanded: boolean;
  style?: React.CSSProperties;
}

const ArrowIcon = styled("svg", {
  width: "24px",
  height: "24px",
  fill: "white",
  transition: "all 0.15s ease-in-out",
  marginLeft: "auto",
});

const ToggleableArror: FunctionComponent<ToggleableArrorProps> = ({
  expanded,
  style,
}) => {
  return (
    <ArrowIcon
      viewBox="0 0 24 24"
      style={{
        ...style,
        transform: expanded ? "rotate(0deg)" : "rotate(90deg)",
      }}
    >
      <path d="M 23.9375 7.273438 C 23.785156 6.839844 23.371094 6.546875 22.910156 6.546875 L 1.089844 6.546875 C 0.628906 6.546875 0.214844 6.839844 0.0625 7.273438 C -0.0898438 7.710938 0.046875 8.199219 0.410156 8.488281 L 11.320312 17.214844 C 11.519531 17.375 11.757812 17.453125 12 17.453125 C 12.242188 17.453125 12.484375 17.375 12.683594 17.214844 L 23.589844 8.488281 C 23.953125 8.199219 24.089844 7.710938 23.9375 7.273438 Z M 23.9375 7.273438 " />
    </ArrowIcon>
  );
};

export default ToggleableArror;
