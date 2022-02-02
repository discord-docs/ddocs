import { FunctionComponent } from "react";
import PartialEvent from "../lib/api-models/partialEvent";
import { styled } from "../stitches.config";
import Card from "./Card";
import Searchbar from "./Searchbar";

interface EventSidebarProps {
  initialEvents: PartialEvent[];
}

const Container = styled("div", {
  paddingLeft: "1rem",
  marginLeft: "auto",
  marginRight: "1rem",
  borderLeft: "1px solid #ccc",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "282px",
});

const SearchResultContainer = styled("div", {
  position: "relative",
  display: "grid",
  margin: "2rem 0",
  gridTemplateColumns: "repeat(auto-fit, minmax(100%, max-content))",
  gridTemplateRows: "290px",
  gap: 40,
  width: "100%",
});

const EventSidebar: FunctionComponent<EventSidebarProps> = ({
  initialEvents,
}) => {
  console.log(initialEvents);
  return (
    <Container>
      <Searchbar
        onSearch={(v) => {
          console.log(v);
        }}
      ></Searchbar>
      <SearchResultContainer>
        {initialEvents.map((event) => (
          <Card title={event.title} image={event.thumbnail}>
            {event.description}
          </Card>
        ))}
      </SearchResultContainer>
    </Container>
  );
};

export default EventSidebar;
