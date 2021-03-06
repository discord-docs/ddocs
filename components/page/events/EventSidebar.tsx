import Link from "next/link";
import { FunctionComponent, useState } from "react";
import PartialEvent from "../../../lib/api-models/partialEvent";
import { styled } from "../../../stitches.config";
import Card from "../summary/Card";
import { useAuth } from "../../context/AuthContext";
import Scrollbar from "../../layout/Scrollbar";
import Searchbar from "../../util/form/Searchbar";
import SidebarEventCard from "./SidebarEventCard";

interface EventSidebarProps {
  initialEvents: PartialEvent[];
}

const Container = styled("div", {
  paddingLeft: "1rem",
  marginLeft: "auto",
  marginRight: "0.5rem",
  paddingRight: "0.5rem",
  marginTop: "2rem",
  marginBottom: "2rem",
  borderLeft: "1px solid #ccc",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "332px",
  position: "fixed",
  right: 0,
  bottom: 0,
  top: 0,
  overflowY: "scroll",
});

const SearchResultContainer = styled("div", {
  position: "relative",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(100%, max-content))",
  gap: 20,

  width: "100%",
});

const NoItemsFound = styled("div", {});

interface SearchHistyory {
  query: string;
  events: PartialEvent[];
}

const EventSidebar: FunctionComponent<EventSidebarProps> = ({
  initialEvents,
}) => {
  const auth = useAuth();
  const [events, setEvents] = useState(initialEvents);
  const [searching, setSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistyory[]>([
    {
      query: "",
      events: initialEvents,
    },
  ]);

  const handleSearch = async (query: string) => {
    setSearching(true);
    if (searchHistory.some((x) => x.query === query)) {
      setEvents(searchHistory.find((x) => x.query === query)!.events);
      setSearching(false);
      return;
    }

    const result = await auth.Api?.searchEvents(query)!;

    const newHistory = searchHistory.concat({ query, events: result });
    setSearchHistory(newHistory);
    setEvents(result);
    setSearching(false);
  };

  return (
    <Container className={`${Scrollbar("3.5rem")}`}>
      <Searchbar
        loading={searching}
        onSearch={(v) => {
          handleSearch(v);
        }}
        onChange={(v) => {
          if (searchHistory.some((x) => x.query === v)) {
            setEvents(searchHistory.find((x) => x.query === v)!.events);
          }
        }}
      />
      <SearchResultContainer>
        {events.length > 0 ? (
          <>
            {events.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <div
                  style={{
                    userSelect: "none",
                    cursor: "pointer",
                  }}
                >
                  <SidebarEventCard event={event} />
                </div>
              </Link>
            ))}
          </>
        ) : (
          <NoItemsFound>
            {
              "After searching around we couldn't find any events matching your query :(. Try searching with a different keyword instead!"
            }
          </NoItemsFound>
        )}
      </SearchResultContainer>
    </Container>
  );
};

export default EventSidebar;
