import { styled } from "../../../stitches.config";

const CardList = styled("div", {
  position: "relative",
  display: "grid",
  justifyContent: "center",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, max-content))",
  gridTemplateRows: "290px",
  gap: 40,
  width: "100%",

  "@mobile": {
    gridTemplateColumns: "repeat(auto-fit, 25%)",
    gap: 0,
    gridTemplateRows: "266px",
  },

  "@media (max-width: 700px)": {
    gridTemplateColumns: "repeat(auto-fit, 33%)",
  },

  "@media (max-width: 520px)": {
    gridTemplateColumns: "repeat(auto-fit, 50%)",
  },
});

export default CardList;
