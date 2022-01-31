import { relative } from "node:path/win32";
import React from "react";
import { FC } from "react";
import Card from "../components/Card";
import { AuthContext } from "../components/context/AuthContext";
import DatePicker from "../components/DatePicker";
import Metric from "../components/Metric";
import { css, styled } from "../stitches.config";

const Banner = styled("div", {
  display: "flex",
  height: "35.2vh",
  background:
    "url('/assets/images/summaries-banner.svg'), linear-gradient(90deg, #5865F2 0%, #414EDE 100%);",
  backgroundPosition: "bottom center",
  overflow: "hidden",
});

const BannerContainer = styled("div", {
  alignSelf: "flex-end",
  margin: "auto auto auto 2.5%",
});

const BannerTitle = styled("h1", {
  fontWeight: "bold",
  fontSize: "5em",
  margin: 0,
});

const BannerSubtitle = styled("h3", {
  fontWeight: "normal",
  fontSize: "2em",
});

Banner.displayName = "Banner";

const SummaryList = styled("div", {
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

const Summary = styled(Card, {
  height: 290,
  width: 250,
  textOverflow: "ellipsis",
  whiteSpace: "pre-wrap",
});

const wrapper = css({
  padding: 40,
});

interface SummaryProps {
  description: string;
  summaries: SummaryBody;
}

const Summaries: FC<SummaryProps> = ({ summaries }) => {
  const context = React.useContext(AuthContext);
  console.log(context); // just a test of context

  return (
    <>
      <Banner>
        <BannerContainer>
          <BannerTitle>Stage Summaries</BannerTitle>
          <BannerSubtitle>
            Every developer stage &mdash; all here for you.
          </BannerSubtitle>
          <DatePicker
            onChange={(h) => {
              console.log(h);
            }}
            current="2022"
            values={["2019", "2020", "2021", "2022", "2023", "2024"]}
          />
        </BannerContainer>
      </Banner>

      <div className={wrapper()}>
        <SummaryList>
          <Summary
            title="This is a title"
            image="/assets/images/sample-summary-preview.png"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Summary>
          <Summary title="This is a title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Summary>
          <Summary
            title="This is a title"
            image="/assets/images/sample-summary-preview.png"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Summary>
          <Summary title="This is a title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Summary>
          <Summary
            title="This is a title"
            image="/assets/images/sample-summary-preview.png"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Summary>
          <Summary title="This is a title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Summary>
          <Summary
            title="This is a title"
            image="/assets/images/sample-summary-preview.png"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Summary>
          <Summary title="This is a title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Summary>
          <Summary
            title="This is a title"
            image="/assets/images/sample-summary-preview.png"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Summary>
          <Summary title="This is a title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Summary>
          <Summary
            title="This is a title"
            image="/assets/images/sample-summary-preview.png"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Summary>
          <Summary title="This is a title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Summary>
          <Summary
            title="This is a title"
            image="/assets/images/sample-summary-preview.png"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Summary>
          <Summary title="This is a title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Summary>
        </SummaryList>
      </div>
    </>
  );
};

interface SummaryBody {
  items: SummaryItem[];
}

interface SummaryItem {
  title: string;
  description: string;
  id: string;
  previewImage: string;
}

export async function getServerSideProps() {
  // TODO: Use api
  // const response = await axios.get<SummaryBody>("https://api.ddocs.io/...");

  // grab years
  const yearsAvailable = [2021, 2022];

  // grab items from selected year
  const response: SummaryBody = {
    items: [
      {
        title: "This is a title",
        description: "This is a description",
        id: "100000",
        previewImage: "https://i.imgur.com/wSTFkRM.png",
      },
      {
        title: "This is a title",
        description: "This is a description",
        id: "100000",
        previewImage: "https://i.imgur.com/wSTFkRM.png",
      },
      {
        title: "This is a title",
        description: "This is a description",
        id: "100000",
        previewImage: "https://i.imgur.com/wSTFkRM.png",
      },
    ],
  };

  return {
    props: {
      description: `Discord Docs`,
      summaries: response,
    },
  };
}

export default Summaries;
