import axios from "axios";
import type { AppProps } from "next/app";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import { BuildDetailsTab, DEFAULT_SIDEBAR_ITEMS } from "../lib/constants";
import { globalCss, styled } from "../stitches.config";
import "../styles/global.css";

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  minHeight: "100vh",
  height: "100%",
  backgroundColor: "$backgroundPrimary",
  overflow: "hidden",
});

Wrapper.displayName = "Wrapper";

const ContentWrapper = styled("main", {
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  minHeight: "min-content",
  padding: "40px 40px 40px 40px",
  width: "100%",
  overflowY: "auto",
  height: "100%",
});

ContentWrapper.displayName = "ContentWrapper";

const globalStyles = globalCss({
  body: { fontFamily: "Whitney", margin: 0, color: "$headerPrimary" },
  "*": { boxSizing: "border-box" },
});

function DiscordDocsApp({ Component, pageProps }: AppProps) {
  globalStyles();

  const title = `Discord Docs ${
    pageProps.title ? " — " + pageProps.title : ""
  }`;
  const description = pageProps.description || "Discord Docs";

  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
      </Head>
      <Sidebar
        items={[...DEFAULT_SIDEBAR_ITEMS, ...(pageProps.sidebarItems || [])]}
      />
      <ContentWrapper>
        <Component {...pageProps} />
      </ContentWrapper>
    </Wrapper>
  );
}

export default DiscordDocsApp;
