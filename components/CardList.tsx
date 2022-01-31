import { styled } from "../stitches.config";

const CardList = styled("div", {
  position: "relative",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, max-content))",
  gridTemplateRows: "290px",
  gap: 40,
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
  justifyContent: "center",
});

export default CardList;
