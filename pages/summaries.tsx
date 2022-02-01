import React from "react";
import { FC } from "react";
import Card from "../components/Card";
import CardList from "../components/CardList";
import { AuthContext } from "../components/context/AuthContext";
import DatePicker from "../components/DatePicker";
import { css, styled } from "../stitches.config";

const Banner = styled("div", {
  display: "flex",
  height: "35.2vh",
  background:
    "url('/assets/images/summaries-banner.svg'), linear-gradient(90deg, #5865F2 0%, #414EDE 100%);",
  backgroundPosition: "bottom center",
  overflow: "hidden",
  backgroundRepeat: "no-repeat",
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

  const SummaryElements = () => (
    <>
      {summaries.items.map((i, idx) => (
        <Summary key={idx} title={i.title} image={i.previewImage}>
          {i.description}
        </Summary>
      ))}
    </>
  );

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
        <CardList>
          <SummaryElements />
        </CardList>
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
  previewImage?: string;
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
        previewImage: "/assets/images/sample-summary-preview.png",
      },
      {
        title: "This is a title",
        description: "This is a description",
        id: "100000",
      },
      {
        title: "This is a title",
        description: "This is a description",
        id: "100000",
        previewImage: "/assets/images/sample-summary-preview.png",
      },
    ],
  };

  return {
    props: {
      description: `Stage Summaries`,
      summaries: response,
    },
  };
}

export default Summaries;
