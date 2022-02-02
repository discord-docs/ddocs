import axios from "axios";
import { GetServerSideProps } from "next";
import { FunctionComponent, useState } from "react";
import AccountHeader from "../../components/AccountHeader";
import EventHeader from "../../components/EventHeader";
import EventSidebar from "../../components/EventSidebar";
import API, { Routes } from "../../lib/api";
import Event from "../../lib/api-models/event";
import relativeDate from "../../lib/relativeDate";
import { styled } from "../../stitches.config";
import Text from "../../components/Text";
import Summary from "../../components/Summary";
import PartialEvent from "../../lib/api-models/partialEvent";
import ApiSummary from "../../lib/api-models/summary";
import ToggleableArrow from "../../components/ToggleableArrow";

interface EventProps {
  event: Event;
  related: PartialEvent[];
}

const Container = styled("div", {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  marginTop: "2rem",
});

const ContentContainer = styled("div", {
  width: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  maxWidth: "1100px",
  marginBottom: "2rem",
});

const PageHeader = styled("h3", {
  fontWeight: "700",
  fontSize: "50px",
  lineHeight: "55px",
  margin: "2rem 0",
});

const EventBanner = styled("img", {
  width: "100%",
  height: "auto",
  objectFit: "cover",
  borderRadius: "3px",
  marginBottom: "1rem",
  marginLeft: "auto",
  marginRight: "auto",
});

const EventSidebarContainer = styled("div", {
  paddingLeft: "1rem",
  marginLeft: "auto",
  marginRight: "1rem",
  minWidth: "316px",
  position: "unset",
});

const SummaryItemContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "0.75rem",
});

const SummaryHeading = styled("h4", {
  fontWeight: "bold",
  fontSize: "26px",

  marginTop: "1.25rem",
  marginBottom: "1rem",
});

const ScrollableContainer = styled("div", {
  overflowY: "auto",
  width: "100%",
  marginRight: "1rem",
  paddingRight: "1rem",
  marginLeft: "2rem",
  marginBottom: "4rem",
  display: "flex",
  justifyContent: "center",

  "&::-webkit-scrollbar": {
    width: "0.5rem",
  },

  "&::-webkit-scrollbar-track": {
    background: "var(--ddocs-colors-backgroundSecondary)",
    borderRadius: "0.25rem",
  },

  "&::-webkit-scrollbar-thumb": {
    background: "#202225",
    borderRadius: "0.25rem",
  },
});

const Event: FunctionComponent<EventProps> = ({ event, related }) => {
  const [whatsNewExpanded, setWhatsNewExpanded] = useState(false);
  const [whatsChangedExpanded, setWhatsChangedExpanded] = useState(false);
  const [qnaEpanded, setQnaExpanded] = useState(false);

  console.log(event);

  const getWhatsNew = () => {
    return event.summaries.filter((x) => x.isNew);
  };

  const getWhatsChanged = () => {
    return event.summaries.filter((x) => x.type === "feature");
  };

  const getQNA = () => {
    return event.summaries.filter((x) => x.type === "qnaanswer");
  };

  const renderSection = (
    summaries: ApiSummary[],
    title: string,
    fullExpanded: boolean,
    setExpanded: (expanded: boolean) => void
  ) => {
    return (
      <>
        <div
          style={{ userSelect: "none", cursor: "pointer", display: "flex" }}
          onClick={() => setExpanded(!fullExpanded)}
        >
          <SummaryHeading>{title}</SummaryHeading>
          <ToggleableArrow
            style={{
              marginTop: "1.25rem",
              marginBottom: "1rem",
            }}
            expanded={fullExpanded}
          />
        </div>
        <SummaryItemContainer>
          {summaries.map((x) => (
            <Summary key={x.id} fullExpanded={fullExpanded} summary={x} />
          ))}
        </SummaryItemContainer>
      </>
    );
  };

  return (
    <Container>
      <ScrollableContainer>
        <ContentContainer>
          <AccountHeader
            style={{ top: "0px !important", right: "0px !important" }}
          />
          <EventHeader event={event} />
          <PageHeader>{event.title}</PageHeader>
          {event.thumbnail && <EventBanner src={event.thumbnail} />}
          <Text size={"medium"}>{event.description}</Text>
          {renderSection(
            getWhatsNew(),
            "What's New",
            whatsNewExpanded,
            setWhatsNewExpanded
          )}
          {renderSection(
            getWhatsChanged(),
            "What's Changed",
            whatsChangedExpanded,
            setWhatsChangedExpanded
          )}
          {renderSection(
            getQNA(),
            "Questions and Answers",
            qnaEpanded,
            setQnaExpanded
          )}
        </ContentContainer>
      </ScrollableContainer>
      <EventSidebarContainer>
        <EventSidebar initialEvents={related} />
      </EventSidebarContainer>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<EventProps> = async (
  context
) => {
  const { id } = context.query;

  const event = await axios.get(API.getRoute(Routes.Events + `/${id}`));
  const related = await axios.get(
    API.getRoute(Routes.Events + `/${id}/related`)
  );
  return {
    props: {
      event: event.data as Event,
      related: related.data as PartialEvent[],
    },
  };
};

export default Event;
