import { styled } from "@stitches/react";
import { FunctionComponent, useState } from "react";
import Author from "../lib/api-models/author";
import Event from "../lib/api-models/event";
import relativeDate from "../lib/relativeDate";
import ReactTooltip from "react-tooltip";

interface EventHeaderProps {
  event: Event;
}

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const TopContent = styled("div", {
  display: "flex",
  flexDirection: "row",
});

const BottomContent = styled("div", {
  marginTop: "0.25rem",
});

const AuthorAvatar = styled("img", {
  height: "48px",
  width: "48px",
  borderRadius: "24px",
});

const ContributorAvatar = styled("img", {
  height: "32px",
  width: "32px",
  borderRadius: "16px",
  margin: "0 0.25rem",
});

const ContributorAvatarContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "20px",
  backgroundColor: "#36393f",
  width: "40px",
  height: "40px",
  transition: "all 0.15s ease-in-out",
});

const TopTextContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  fontSize: "18px",
  marginLeft: "0.5rem",
  fontWeight: "200",
  strong: {
    fontSize: "20px",
  },
});

const AvatarsContainer = styled("div", {
  "&::before": {
    content: '" "',
    display: "block",
    position: "absolute",
    top: "0",
    right: "100%",
    bottom: "50%",
    left: "-32px",
    marginBottom: "2px",
    marginLeft: "-1px",
    marginRight: "4px",
    marginTop: "-1px",

    borderBottom: "2px solid #4f545c",
    borderRight: "0 solid #4f545c",
    borderTop: "0 solid #4f545c",
    borderBottomLeftRadius: "6px",
    borderLeft: "2px solid #4f545c",
  },
  position: "relative",
  marginLeft: "56px",
  display: "flex",
});

const EventHeader: FunctionComponent<EventHeaderProps> = ({ event }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Container>
      <TopContent>
        <AuthorAvatar src={event.author.avatar} />
        <TopTextContainer>
          <strong>
            {event.author.username}#{event.author.discriminator}
          </strong>
          Updated {relativeDate(Date.parse(event.lastRevised))}
        </TopTextContainer>
      </TopContent>
      {event.contributors.length > 0 && (
        <BottomContent>
          <AvatarsContainer
            style={{
              width: expanded ? `${40 * event.contributors.length}px` : "40px",
            }}
            onMouseEnter={() => {
              setExpanded(true);
            }}
            onMouseLeave={() => {
              setExpanded(false);
            }}
          >
            {event.contributors.map((contributor, i) => {
              return (
                <ContributorAvatarContainer
                  data-tip={`${contributor.username}#${contributor.discriminator}`}
                  style={{
                    zIndex: event.contributors.length - i,
                    position: i === 0 ? "relative" : "absolute",
                    left: `${i * (expanded ? 40 : 20)}px`,
                  }}
                  key={contributor.id}
                >
                  <ContributorAvatar src={contributor.avatar} />
                </ContributorAvatarContainer>
              );
            })}
          </AvatarsContainer>
          <ReactTooltip
            className="ddocs-tooltip"
            place="top"
            type="dark"
            effect="solid"
          />
        </BottomContent>
      )}
    </Container>
  );
};

export default EventHeader;
