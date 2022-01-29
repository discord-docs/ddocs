import axios from "axios";
import { FC } from "react";

interface OverviewProps {
  description: string;
}

const Overview: FC<OverviewProps> = ({ description }) => {
  return (
    <>
      <h1>Placeholder</h1>
      <p>{description}</p>
    </>
  );
};

interface APIStatus {
  date_generated: string;
  statistics: {
    builds: number;
    experiments: number;
  };
}

export async function getServerSideProps() {
  // TODO: Template stuff, change this
  const response = await axios.get<APIStatus>("https://api.discord.sale/");

  return {
    props: {
      description: `Discord Docs`,
    },
  };
}

export default Overview;
