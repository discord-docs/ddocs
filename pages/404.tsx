import type { NextPage } from "next";
import { styled } from "../stitches.config";

const CenteredContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const NotFound: NextPage = () => {
  return (
    <CenteredContainer>
      <h1>Page Not Found</h1>
      <h2>Below you can see Ian, he probably ate the page.</h2>
      <video
        width="25%"
        src="https://staging-cdn.discord.co/attachments/716461096130707456/823226275391995904/russian_frog_music.mp4"
        autoPlay
        loop
        muted
      />
    </CenteredContainer>
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
