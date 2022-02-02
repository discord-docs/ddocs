import axios from "axios";
import { GetServerSideProps } from "next";
import { FunctionComponent } from "react";
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
  marginLeft: "auto",
  paddingLeft: "2rem",
  marginRight: "2rem",
  display: "flex",
  flexDirection: "column",
  maxWidth: "1100px",
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

const SummaryContainer = styled("div", {
  marginTop: "2rem",
  paddingTop: "2rem",
  borderTop: "1px solid #ccc",
});

const Event: FunctionComponent<EventProps> = ({ event, related }) => {
  console.log(event);
  return (
    <Container>
      <ContentContainer>
        <AccountHeader
          style={{ top: "0px !important", right: "0px !important" }}
        />
        <EventHeader event={event} />
        <PageHeader>{event.title}</PageHeader>
        <EventBanner src="https://s3-alpha-sig.figma.com/img/29be/1a71/0486e49300b467e39356856a8d45c5b7?Expires=1644796800&Signature=LSOgUDrouk7emA8gV2H06QP~nhnu~Lw3JMrw~MzkyHn3LqG2CxgoKH8~COuiNYT0hbD~4OfSGoy9P~8JqUSd09ePq0BZYCgBz9m~Ee8i8XQ8SllqnkrKhHWSWyvgRFVhPPqRrQsz8dRvDLFn-AVBgNT1G7ETlwoscHzibVS7R2z5oaEl6ZIWS35Fx8-ZKmZtEWBqKDnBe0QUKhIxH7yPrvPe~nf9SGXpAXcymUXbYedhMO2pDGLyV4u8bI02jXlJf2PNNyK8bVJ3B3ycSMlaTijs0xQahyOq1I2Y0VkFQ5-MJ6wiutPaA~4ZJkJ731BMI21WI5sBe75AB5ah4cxG7A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
        <Text size={"medium"}>
          This is the main description of the event. This is the text that will
          show up if a description has been written. The title is what is above
          this. If a title has not been written, it will default to what is
          currently showing. <br />
          <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla
          porttitor massa id neque aliquam vestibulum. Est ullamcorper eget
          nulla facilisi etiam. Sed lectus vestibulum mattis ullamcorper velit.
        </Text>
        <SummaryContainer>
          {event.summaries.map((summary) => (
            <Summary summary={summary}></Summary>
          ))}
        </SummaryContainer>
      </ContentContainer>
      <EventSidebar initialEvents={related} />
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
