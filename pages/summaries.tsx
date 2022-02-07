import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import Card from "../components/page/summary/Card";
import CardList from "../components/page/summary/CardList";
import { AuthContext } from "../components/context/AuthContext";
import DatePicker from "../components/page/summary/DatePicker";
import Scrollbar from "../components/layout/Scrollbar";
import API, { Routes } from "../lib/api";
import PartialEvent from "../lib/api-models/partialEvent";
import Summary from "../lib/api-models/summary";
import { css, styled } from "../stitches.config";
import GracefulImage from "../components/util/GracefulImage";

const Banner = styled("div", {
  display: "flex",
  height: "35.2vh",
  minHeight: "35.2vh",
  background:
    "url('/assets/images/summaries-banner.svg'), linear-gradient(90deg, #5865F2 0%, #414EDE 100%);",
  backgroundPosition: "bottom center",
  overflow: "hidden",
  backgroundRepeat: "no-repeat",
  color: "white",
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

const Summary = styled(Card, {
  height: 290,
  width: 250,
});

const Wrapper = styled("div", {
  padding: 40,
  overflowY: "auto",
});

const SummaryWrapper = styled("div", {
  userSelect: "none",
  cursor: "pointer",
});

interface SummaryProps {
  description: string;
  currentEvents: PartialEvent[];
}

interface LoadedEvents {
  events: PartialEvent[];
  year: string;
}

const Summaries: FC<SummaryProps> = ({ currentEvents }) => {
  const [year, setYear] = useState<string>(`${new Date().getFullYear()}`);
  const [events, setEvents] = useState<PartialEvent[]>(currentEvents);
  const [loadedEvents, setLoadedEvents] = useState<LoadedEvents[]>([]);

  const auth = React.useContext(AuthContext);

  const getEvents = async () => {
    console.log(loadedEvents);
    if (loadedEvents?.some((x) => x.year === year)) {
      setEvents(loadedEvents.find((x) => x.year === year)!.events);
      return;
    }

    const events = await auth.Api!.getEvents(year);

    setEvents(events);

    const l = loadedEvents?.concat({ events, year });
    setLoadedEvents(l);
  };

  useEffect(() => {
    getEvents();
  }, [year]);

  const SummaryElements = () => (
    <>
      {events.map((i, idx) => (
        <Link key={i.id} href={`/events/${i.id}`}>
          <SummaryWrapper>
            <Summary key={idx} title={i.title} image={i.thumbnail}>
              {i.description}
            </Summary>
          </SummaryWrapper>
        </Link>
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
              setYear(h);
            }}
            current={year}
            values={["2019", "2020", "2021", "2022", "2023", "2024"]}
          />
        </BannerContainer>
      </Banner>

      <Wrapper className={`${Scrollbar("0.25rem", "0.25rem")}`}>
        <CardList>
          <SummaryElements />
        </CardList>
      </Wrapper>
    </>
  );
};

export async function getServerSideProps() {
  // TODO: Use api
  // const response = await axios.get<SummaryBody>("https://api.ddocs.io/...");

  // grab years
  const yearsAvailable = [2021, 2022];

  // grab items from selected year
  const result = await axios.get(
    API.getRoute(Routes.Events + `?year=${new Date().getFullYear()}`)
  );

  return {
    props: {
      description: `Stage Summaries`,
      currentEvents: result.status === 200 ? result.data : [],
    },
  };
}

export default Summaries;
