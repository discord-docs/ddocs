import { styled } from "../../stitches.config";

const Panel = styled("div", {
  padding: 16,
  height: "100%",
  boxSizing: "border-box",
  borderColor: "$border",
  borderRadius: 5,
  overflow: "hidden",
  borderStyle: "solid",
  transition: "border .125s",
  variants: {
    color: {
      light: {
        backgroundColor: "#2f3136",
      },
      dark: {
        backgroundColor: "#18191c",
      },
    },
    border: {
      none: {
        borderStyle: "none",
        borderWidth: 0,
      },
      primary: {
        borderColor: "#040405",
      },
      red: {
        borderColor: "#ed4245",
      },
    },
    padding: {
      nopad: {
        padding: 0,
      },
      small: {
        padding: 12,
      },
      medium: {
        padding: 20,
      },
    },
  },
  defaultVariants: {
    color: "light",
    border: "none",
    padding: "small",
  },
});

Panel.displayName = "Panel";

export default Panel;
