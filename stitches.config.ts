import { createStitches } from "@stitches/react";

const stitches = createStitches({
  theme: {
    colors: {
      backgroundPrimary: "#36393f",
      backgroundSecondary: "#2f3136",
      headerPrimary: "#fff",
      textNormal: "#dcddde",
      brand: "#5865f2",
      backgroundSecondaryAlt: "rgb(24, 25, 28)",
      backgroundTeritialy: "#222",
      backgroundAccent: "#444",
      scrollbarTrack: "#262729",
      scrollbarThumb: "#1f2022",
      itemUnactive: "#b9bbbe",
      textInput: "#212225",

      buttonPrimary: "#5865f2",
      buttonPrimaryHover: "#4752c4",

      buttonSecondary: "#4f545c",
      buttonSecondaryHover: "#72767d",

      buttonSuccess: "#3ba55d",
      buttonSuccessHover: "hsl(139,calc(1*47.1%),33.3%)",

      buttonDanger: "#e53e3e",
      buttonWarning: "#f5a623",

      errorRed: "rgb(237, 66, 69)",
    },
  },
  prefix: "ddocs",
});

export const { getCssText, styled, globalCss, css, createTheme } = stitches;

export const lightTheme = createTheme("light-theme", {
  colors: {
    backgroundPrimary: "white",
    backgroundSecondary: "#f2f3f5",
    headerPrimary: "#060607",
    textNormal: "#2e3338",
    brand: "#5865f2",
    backgroundSecondaryAlt: "#ebedef",
    backgroundTeritialy: "#e3e5e8",
    backgroundAccent: "#747f8d",
    scrollbarTrack: "#f2f3f5",
    scrollbarThumb: "#747f8d",
    itemUnactive: "#2e3338",
    textInput: "#dfdfdf",

    buttonPrimary: "#5865f2",
    buttonPrimaryHover: "#4752c4",

    buttonSecondary: "#4f545c",
    buttonSecondaryHover: "#72767d",

    buttonSuccess: "#3ba55d",
    buttonSuccessHover: "hsl(139,calc(1*47.1%),33.3%)",

    buttonDanger: "#e53e3e",
    buttonWarning: "#f5a623",

    errorRed: "rgb(237, 66, 69)",
  },
});
