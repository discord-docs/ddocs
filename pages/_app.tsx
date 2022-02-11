import axios from "axios";
import type { AppProps } from "next/app";
import Head from "next/head";
import AccountHeader from "../components/layout/account/AccountHeader";
import AuthenticationContextProvider from "../components/context/AuthContext";
import Sidebar from "../components/layout/Sidebar";
import { BuildDetailsTab, DEFAULT_SIDEBAR_ITEMS } from "../lib/constants";
import { globalCss, styled, lightTheme, css } from "../stitches.config";
import "../styles/global.css";
import NextNprogress from "nextjs-progressbar";
import Footer from "../components/layout/footer/Footer";
import ScrollBar from "../components/layout/Scrollbar";
import { ThemeProvider } from "next-themes";

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
  // padding: "40px 40px 40px 40px",
  width: "100%",
  position: "relative",

  "@mobile": {
    marginTop: "50px",
  },
});

const AccountHeaderContainer = styled("div", {
  position: "absolute",
  top: "40px",
  right: "40px",
  zIndex: "25519",
});

const MainContentWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  position: "relative",
  width: "100%",
});

ContentWrapper.displayName = "ContentWrapper";

const globalStyles = globalCss({
  body: { fontFamily: "Whitney", margin: 0, color: "$headerPrimary" },
  "*": { boxSizing: "border-box" },
});

const dontRenderSidebarOn = ["/login"];

const dontRenderLoginButtonOn = ["/events/[id]"];

const dontRenderFooterOn = ["/events/[id]"];

const dontOverflowOn = ["/events/[id]"];

function DiscordDocsApp({ Component, pageProps, router }: AppProps) {
  globalStyles();

  const title = `Discord Docs ${
    pageProps.title ? " — " + pageProps.title : ""
  }`;
  const description = pageProps.description || "Discord Docs";

  return (
    <AuthenticationContextProvider>
      <ThemeProvider
        disableTransitionOnChange
        attribute="class"
        value={{ light: lightTheme.className, dark: "dark-theme" }}
        defaultTheme="system"
      >
        <NextNprogress
          options={{
            showSpinner: false,
          }}
          color="#5865f2"
        />
        <Wrapper>
          <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="og:title" content={title} />
            <meta name="og:description" content={description} />
          </Head>
          {!dontRenderSidebarOn.includes(router.pathname) && (
            <Sidebar
              items={[
                ...DEFAULT_SIDEBAR_ITEMS,
                ...(pageProps.sidebarItems || []),
              ]}
            />
          )}

          <MainContentWrapper
            className={`${ScrollBar()}`}
            css={{
              overflow: dontOverflowOn.includes(router.pathname)
                ? "hidden"
                : "auto",
            }}
          >
            {!dontRenderLoginButtonOn.includes(router.pathname) && (
              <AccountHeaderContainer>
                <AccountHeader />
              </AccountHeaderContainer>
            )}
            <ContentWrapper>
              <Component {...pageProps} />
            </ContentWrapper>
            {!dontRenderFooterOn.includes(router.pathname) && <Footer />}
          </MainContentWrapper>
        </Wrapper>
      </ThemeProvider>
    </AuthenticationContextProvider>
  );
}

export default DiscordDocsApp;
