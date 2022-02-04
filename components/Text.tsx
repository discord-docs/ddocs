import { styled } from "../stitches.config";

const Text = styled("div", {
  variants: {
    color: {
      white: {
        color: "#fff",
      },
      white100: {
        color: "#fff",
      },
      white200: {
        color: "#fff",
      },
      white300: {
        color: "#fff",
      },
      white400: {
        color: "#fff",
      },
      white500: {
        color: "#fff",
      },
      white600: {
        color: "#adadad",
      },
      white700: {
        color: "#666",
      },
      white800: {
        color: "#4d4d4d",
      },
      white900: {
        color: "#0d0d0d",
      },
      primary: {
        color: "#4f545c",
      },
      primary100: {
        color: "#f6f6f7",
      },
      primary200: {
        color: "#dcddde",
      },
      primary300: {
        color: "#b9bbbe",
      },
      primary400: {
        color: "#72767d",
      },
      primary500: {
        color: "#4f545c",
      },
      primary600: {
        color: "#36393f",
      },
      primary700: {
        color: "#202225",
      },
      primary800: {
        color: "#18191c",
      },
      primary900: {
        color: "#040405",
      },
    },
    weight: {
      light: {
        fontWeight: "100",
      },
      medium: {
        fontWeight: 200,
      },
      bold: {
        fontWeight: 700,
      },
    },
    size: {
      normal: {
        fontSize: "initial",
        lineHeight: 1.2,
      },
      medium: {
        fontSize: 20,
      },
      large: {
        fontSize: 28,
        lineHeight: "34px",
      },
    },
  },
});

Text.displayName = "Text";

export default Text;
