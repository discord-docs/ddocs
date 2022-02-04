import { styled } from "../stitches.config";

const CardList = styled("div", {
  position: "relative",
  display: "grid",
  justifyContent: "center",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, max-content))",
  gridTemplateRows: "290px",
  gap: 40,
  width: "100%",
});

export default CardList;
