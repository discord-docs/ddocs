import Link from "../../typography/Link";
import { FunctionComponent, useEffect, useState } from "react";
import { css, styled } from "../../../stitches.config";
import Text from "../../typography/Text";
import { GetServerSideProps } from "next";
import axios from "axios";
import API, { Routes } from "../../../lib/api";
import Author from "../../../lib/api-models/author";
import { useAuth } from "../../context/AuthContext";
import Contributor from "./Contributor";
import Tooltip from "../../util/Tooltip";

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
});

const LeftContentContainer = styled("div", {
  display: "flex",
  margin: "1rem",
});

const RightContentContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  marginLeft: "auto",
  marginRight: "2rem",
});

const Heading = styled("h3", {});

const FooterSection = styled("div", {
  maxWidth: "400px",
  margin: "0 2rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

const ContributorContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  width: "106px",
  gap: "5px",
  margin: "1rem",
});

const AboutSection = styled("div", {
  display: "flex",
  flexDirection: "column",
  maxWidth: "300px",
  marginLeft: "2rem",
  margin: "0.8rem",
});

const TooltipStyles = css({
  padding: "5px 10px !important",
  borderRadius: "5px !important",
  background: "$backgroundSecondaryAlt !important",
  color: "$textPrimary !important",
  fontSize: "1rem !important",
  opacity: "1 !important",
});

const Footer: FunctionComponent<FooterProps> = () => {
  const auth = useAuth();
  const [contributors, setContributors] = useState<Author[]>([]);

  useEffect(() => {
    async function getContributors() {
      setContributors((await auth.Api?.getContributors()) ?? []);
    }

    getContributors();
  }, []);

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
        <FooterSection></FooterSection>
      </LeftContentContainer>
      <RightContentContainer>
        <ContributorContainer>
          <Text
            css={{
              textAlign: "center",
              marginBottom: "0.5rem",
              width: "100%",
            }}
            weight={"bold"}
            size={"normal"}
          >
            Contributors
          </Text>
          {contributors.map((contributor, i) => (
            <Tooltip
              key={i}
              content={`${contributor.username}#${contributor.discriminator}`}
            >
              {(ref: any) => (
                <Contributor
                  targetRef={ref}
                  key={contributor.id}
                  contributor={contributor}
                />
              )}
            </Tooltip>
          ))}
        </ContributorContainer>
        <AboutSection>
          <Heading
            css={{
              margin: "0 0 0.5rem 0",
            }}
          >
            ddocs.io
          </Heading>
          <Text>
            Where we present to you our shi-<em>we mean ingenious</em> design to
            your brittle eyes.
            <br />
            <br />
            {"©️"} 2022 All rights are reserved.
          </Text>
        </AboutSection>
      </RightContentContainer>
    </Container>
  );
};

export default Footer;
