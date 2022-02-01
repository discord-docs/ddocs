import { createStitches } from "@stitches/react";

export const { getCssText, styled, globalCss, css } = createStitches({
  theme: {
    colors: {
      backgroundPrimary: "#36393f",
      backgroundSecondary: "#2f3136",
      headerPrimary: "#fff",
      textNormal: "#dcddde",
      brand: "#5865f2",
    },
  },
  prefix: "ddocs",
});
