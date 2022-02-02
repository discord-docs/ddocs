import type { NextPage } from "next";
import Link from "next/link";
import { styled } from "../stitches.config";
import MissingWumpus from "../public/assets/images/missing-wumpus.svg";

const PageWrapper = styled("div", {
  display: "relative",
});

const HeadingContainer = styled("div", {
  marginLeft: 80,
  marginTop: 40,
});

const MainHeading = styled("h1", {
  fontSize: 180,
  fontWeight: "bold",
  margin: 0,
});

const NotFoundHeading = styled("h2", {
  fontSize: 48,
  fontWeight: "bold",
  margin: 0,
});

const LinkHome = styled("a", {
  fontSize: 18,
  display: "inline-block",
  marginTop: 26,
  color: "$brand",
  textDecoration: "none",
});

// TODO: handle scaling on smaller screens
const WumpusWrapper = styled("div", {
  position: "absolute",
  bottom: 0,
  right: 40,
});

const NotFound: NextPage = () => {
  return (
    <PageWrapper>
      <HeadingContainer>
        <MainHeading>404</MainHeading>
        <NotFoundHeading>Not found.</NotFoundHeading>
        <Link href="/" passHref>
          <LinkHome>Return to home.</LinkHome>
        </Link>
      </HeadingContainer>
      <WumpusWrapper>
        <MissingWumpus />
      </WumpusWrapper>
    </PageWrapper>
  );
};

export function getStaticProps() {
  return {
    props: {
      title: "Page Not Found",
    },
  };
}

export default NotFound;
