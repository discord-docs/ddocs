import { css } from "../stitches.config";

export default function Scrollbar(marginTop?: string, marginBottom?: string) {
  return css({
    "&::-webkit-scrollbar": {
      width: "0.5rem",
    },

    "&::-webkit-scrollbar-track": {
      background: "var(--ddocs-colors-backgroundSecondary)",
      borderRadius: "0.25rem",
      marginTop,
      marginBottom,
    },

    "&::-webkit-scrollbar-thumb": {
      background: "#202225",
      borderRadius: "0.25rem",
    },
  });
}