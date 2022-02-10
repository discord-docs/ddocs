import Link from "../../typography/Link";
import { FunctionComponent } from "react";
import { styled } from "../../../stitches.config";
import Text from "../../typography/Text";

interface FooterProps {}

interface FooterInnerContent {
  content: string;
  url?: string;
  isLocalLink?: boolean;
}

const sections = [
  {
    name: "Legal",
    items: [
      {
        content: "Privacy Policy",
        url: "/privacy",
        isLocalLink: true,
      },
      {
        content: "Data Use",
        url: "/data-use",
        isLocalLink: true,
      },
      {
        content: "Cookie Policy",
        url: "/cookie-policy",
        isLocalLink: true,
      },
    ],
  },
  {
    name: "Developers",
    items: [
      {
        content: "API Documentation",
        url: "/api-documentation",
        isLocalLink: true,
      },
      {
        content: "Github",
        url: "https://github.com/discord-docs",
      },
    ],
  },
  {
    name: "Disclamer",
    items: [
      {
        content:
          "ddocs.io is not affiliated, associated, authorized, endorsed by, or in anyway officially connected with Discord Inc. or any of its subsidiaries or its affiliates.",
      },
    ],
  },
];

const Container = styled("div", {
  marginTop: "auto",
  display: "flex",
  backgroundColor: "$backgroundSecondaryAlt",
  paddingBottom: "1rem",
  flexDirection: "row",

  "@mobile": {
    flexDirection: "column-reverse",
  },
});

const LeftContentContainer = styled("div", {
  display: "flex",
  margin: "1rem",

  "@mobile": {
    flexWrap: "wrap",
    margin: "1rem 2rem",
  },
});

const RightContentContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginLeft: "auto",
  marginRight: "2rem",
  maxWidth: "300px",

  "@mobile": {
    margin: "0rem",
    padding: "0 2rem 1rem 2rem",
    width: "100%",
    maxWidth: "100%",
    alignSelf: "center",
  },
});

const Heading = styled("h3", {});

const FooterSection = styled("div", {
  maxWidth: "400px",
  margin: "0 2rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  "@mobile": {
    width: "50%",
    margin: 0,
    "&:last-child": {
      minWidth: "100%",
      margin: "2rem 0 0 0",
    },
  },
});

const Footer: FunctionComponent<FooterProps> = () => {
  const renderSection = (title: string, content: FooterInnerContent[]) => {
    return (
      <FooterSection key={title}>
        <Text weight={"bold"} size={"normal"}>
          {title}
        </Text>
        {content.map((item) => {
          return (
            <div key={item.url || item.content}>
              {item.url ? (
                <Link
                  color="white"
                  external={!item.isLocalLink}
                  darkenHover
                  href={item.url}
                >
                  {item.content}
                </Link>
              ) : (
                <Text size={"normal"}>{item.content}</Text>
              )}
            </div>
          );
        })}
      </FooterSection>
    );
  };

  return (
    <Container>
      <LeftContentContainer>
        {sections.map((section) => renderSection(section.name, section.items))}
      </LeftContentContainer>
      <RightContentContainer>
        <Heading>ddocs.io</Heading>
        <Text>
          Where we present to you our shi-<em>we mean ingenious</em> design to
          your brittle eyes.
          <br />
          <br />
          {"©️"} 2022 All rights are reserved.
        </Text>
      </RightContentContainer>
    </Container>
  );
};

export default Footer;
