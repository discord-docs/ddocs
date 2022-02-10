import axios from "axios";
import { GetServerSideProps } from "next";
import { FunctionComponent, useState } from "react";
import AccountHeader from "../../components/layout/account/AccountHeader";
import EventHeader from "../../components/page/events/EventHeader";
import EventSidebar from "../../components/page/events/EventSidebar";
import API, { Routes } from "../../lib/api";
import Event from "../../lib/api-models/event";
import relativeDate from "../../lib/relativeDate";
import { styled } from "../../stitches.config";
import Text from "../../components/typography/Text";
import Summary from "../../components/page/events/Summary";
import PartialEvent from "../../lib/api-models/partialEvent";
import ApiSummary from "../../lib/api-models/summary";
import ToggleableArrow from "../../components/util/ToggleableArrow";
import Scrollbar from "../../components/layout/Scrollbar";

interface EventProps {
  event: Event;
  related: PartialEvent[];
}

const Container = styled("div", {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  marginBottom: "2rem",
  height: "100vh",
});

const ContentContainer = styled("div", {
  width: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  maxWidth: "1100px",
  marginTop: "2rem",
});

const PageHeader = styled("h3", {
  fontWeight: "700",
  fontSize: "50px",
  lineHeight: "55px",
  margin: "2rem 0",

  "@mobile": {
    fontSize: "36px",
  },
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

  "@mobile": {
    display: "none",
  },
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
  marginTop: "1.75rem",
  marginBottom: "1rem",
});

const ScrollableContainer = styled("div", {
  width: "100%",
  marginRight: "1rem",
  paddingRight: "1rem",
  marginLeft: "2rem",
  marginBottom: "2rem",
  display: "flex",
  justifyContent: "center",
  overflowY: "auto",

  "@mobile": {
    marginRight: "0",
  },
});

const AccountHeaderContainer = styled("div", {
  position: "absolute",
  top: "0",
  right: "0",
  zIndex: "25519",
});

const Event: FunctionComponent<EventProps> = ({ event, related }) => {
  const [whatsNewExpanded, setWhatsNewExpanded] = useState(false);
  const [whatsChangedExpanded, setWhatsChangedExpanded] = useState(false);
  const [qnaEpanded, setQnaExpanded] = useState(false);

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
        <SummaryHeading
          style={{ userSelect: "none", cursor: "pointer", display: "flex" }}
          onClick={() => setExpanded(!fullExpanded)}
        >
          {title}
        </SummaryHeading>
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
      <ScrollableContainer
        className={`${Scrollbar("2rem", undefined, "0rem")}`}
      >
        <ContentContainer>
          <AccountHeaderContainer>
            <AccountHeader key={event.id} />
          </AccountHeaderContainer>
          <EventHeader event={event} />
          <PageHeader>{event.title}</PageHeader>
          {event.thumbnail && <EventBanner src={event.thumbnail} />}
          <Text size={"medium"} weight={"light"}>
            {event.description}
          </Text>
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
