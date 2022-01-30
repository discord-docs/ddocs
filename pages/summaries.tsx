import { FC } from "react";
import DatePicker from "../components/DatePicker";
import { styled } from "../stitches.config";

const Banner = styled("div", {
  position: "relative",
  display: "flex",
  height: "35.19vh",
  background:
    "url('/assets/images/summaries-banner.svg') bottom left, linear-gradient(90deg, #5865F2 0%, #414EDE 100%);",
  overflow: "hidden",
});

const BannerContainer = styled("div", {
  display: "block",
  alignSelf: "flex-end",
  height: "fit-content",
  margin: "auto",
  marginLeft: 100,
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

interface SummaryProps {
  description: string;
  summaries: SummaryBody;
}

const Summaries: FC<SummaryProps> = ({ summaries }) => {
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
      <h1>Summaries</h1>
      <p>{summaries.items[0].title}</p>
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
