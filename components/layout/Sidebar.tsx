import React, { FC, ReactChild, useEffect, useState } from "react";
import Link from "next/link";

import { css, styled } from "../../stitches.config";
import Icon from "../util/Icon";
import { useRouter } from "next/dist/client/router";
import ThemeToggle from "../util/ThemeToggle";
import Hamburger from "../../public/assets/icons/hamburger.svg";

const StyledSidebar = styled("aside", {
  "@mobile": {
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 25,
    width: "100%",
    maxWidth: "66%",
    padding: "66 px 16px 16px 16px",
    backgroundColor: "$backgroundSecondary",
    transition: "left 0.25s ease-in-out",
  },
});

const SidebarContainer = styled("div", {
  flexBasis: 350,
  backgroundColor: "$backgroundSecondary",
  padding: 16,

  "@mobile": {
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
    transition: "background-color 0.15s ease-in-out",
    zIndex: 251,
  },
});

StyledSidebar.displayName = "Sidebar";

const StyledSidebarHeader = styled("header", {
  display: "flex",
  flexDirection: "row",
  columnGap: 12,
  marginLeft: 12,
  marginTop: 13,
  marginBottom: 26,
  cursor: "pointer",
  userSelect: "none",

  "@mobile": {
    margin: 0,
    height: "50px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "$backgroundTeritialy",
    display: "flex",
    alignItems: "center",
    padding: "16px",
  },
});

StyledSidebarHeader.displayName = "SidebarHeader";

const StyledSidebarNavBar = styled("nav", {
  display: "flex",
  flexDirection: "column",
  height: "100%",

  "@mobile": {
    paddingTop: "66px",
    paddingLeft: "8px",
  },
});

StyledSidebarNavBar.displayName = "SidebarNavBar";

const StyledSidebarNavBarItem = styled("a", {
  display: "flex",
  alignItems: "center",
  gap: 12,
  fontSize: 16,
  lineHeight: "20px",
  textDecoration: "none",
  color: "$itemUnactive",
  transition: "color .125s, background .125s",
  "&:hover": {
    color: "$headerPrimary",
  },
  variants: {
    active: {
      true: {
        color: "#eee",
        backgroundColor: "$brand",
        borderRadius: 3,
        "&:hover": {
          color: "white",
        },
      },
    },
    size: {
      medium: {
        padding: 8,
        marginBottom: 8,
      },
    },
  },
  defaultVariants: {
    size: "medium",
    active: false,
  },
});

StyledSidebarNavBarItem.displayName = "SidebarNavBarItem";

const StyledSidebarSubheading = styled("h3", {
  fontSize: 16,
  fontWeight: 600,
  lineHeight: "20px",
  marginBottom: 8,
  marginTop: 16,
});

StyledSidebarSubheading.displayName = "SidebarSubheading";

const HamburgerWrapper = styled("div", {
  display: "none",
  marginRight: "1rem",
  color: "$itemUnactive",
  marginLeft: "-5px",
  transition: "color .125s ease-in-out",

  "@mobile": {
    display: "flex",
  },

  "&:hover": {
    color: "$headerPrimary",
  },
});

const DiscordLogoWrapper = styled("div", {
  color: "$textNormal",
});

const HamburgerStyles = css({
  width: "32px",
  height: "32px",
});

export interface SidebarItem {
  icon: string;
  label: string;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

export interface SidebarSubheading {
  title: string;
}

interface SidebarProps {
  items: (SidebarItem | SidebarSubheading | ReactChild)[];
}

const Sidebar: FC<SidebarProps> = ({ items }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const sidebarInnerRef = React.createRef<HTMLDivElement>();

  const router = useRouter();

  useEffect(() => {
    setSidebarOpen(false);
  }, [router.asPath]);

  return (
    <SidebarContainer
      css={{
        "@mobile": {
          backgroundColor: sidebarOpen ? "#0000007f" : "transparent",
          height: sidebarOpen ? "100%" : "50px",
        },
      }}
      onClick={(e) => {
        const rect = sidebarInnerRef.current?.getBoundingClientRect();

        // check if we clicked anywhere but the sidebar
        if (
          rect &&
          sidebarOpen &&
          !(
            rect.top <= e.clientY &&
            e.clientY <= rect.bottom &&
            rect.left <= e.clientX &&
            e.clientX <= rect.right
          )
        ) {
          setSidebarOpen(false);
        }
      }}
    >
      <StyledSidebar
        onDrag={() => {
          console.log("s");
        }}
        ref={sidebarInnerRef}
        css={{
          left: sidebarOpen ? "0" : "-66%",
        }}
      >
        <StyledSidebarHeader>
          <HamburgerWrapper onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Hamburger className={`${HamburgerStyles}`} />
          </HamburgerWrapper>
          <Link passHref href="/">
            <>
              <DiscordLogoWrapper>
                <Icon icon="Discord-Logo-White" />
              </DiscordLogoWrapper>
              <strong>ddocs.io</strong>
            </>
          </Link>
          <ThemeToggle
            css={{
              marginLeft: "auto",
              "@mobile": {
                marginLeft: "0",
              },
            }}
          />
        </StyledSidebarHeader>

        <StyledSidebarNavBar>
          {items.map((item) => {
            if (!item.hasOwnProperty("title")) {
              const { href, label, icon, onClick, active } =
                item as SidebarItem;

              const link = (
                <StyledSidebarNavBarItem
                  onClick={onClick}
                  active={active || router.asPath === href}
                >
                  <Icon icon={icon} />
                  {label}
                </StyledSidebarNavBarItem>
              );

              if (href) {
                return (
                  <Link key={href} href={href} passHref>
                    {link}
                  </Link>
                );
              }

              return link;
            } else if (React.isValidElement(item)) {
              return item;
            } else {
              const { title } = item as SidebarSubheading;

              return (
                <StyledSidebarSubheading key={title}>
                  {title}
                </StyledSidebarSubheading>
              );
            }
          })}
        </StyledSidebarNavBar>
      </StyledSidebar>
    </SidebarContainer>
  );
};

export default Sidebar;
