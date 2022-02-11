import { css } from "../../stitches.config";

export default function Scrollbar(
  marginTop?: string,
  marginBottom?: string,
  mobileMarginTop?: string,
  mobileMarginBottom?: string
) {
  return css({
    "&::-webkit-scrollbar": {
      width: "0.5rem",
    },

    "&::-webkit-scrollbar-track": {
      background: "$scrollbarTrack",
      borderRadius: "0.25rem",
      marginTop,
      marginBottom,

      "@mobile": {
        marginTop: mobileMarginTop,
        marginBottom: mobileMarginBottom,
      },
    },

    "&::-webkit-scrollbar-thumb": {
      background: "$scrollbarThumb",
      borderRadius: "0.25rem",
    },
  });
}
