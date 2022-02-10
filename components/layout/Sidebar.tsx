import React, { FC, ReactChild, useEffect, useState } from "react";
import Link from "next/link";

import { css, styled, config } from "../../stitches.config";
import Icon from "../util/Icon";
import { useRouter } from "next/dist/client/router";
import ThemeToggle from "../util/ThemeToggle";
import Hamburger from "../../public/assets/icons/hamburger.svg";
import Draggable from "react-draggable";
import Logo from "../util/Logo";

const StyledSidebar = styled("aside", {
  "@mobile": {
    position: "fixed",
    top: 0,
    bottom: 0,
    zIndex: 25,
    width: "100%",
    maxWidth: "66%",
    padding: "66px 10px 16px",
    right: "100vw",
    backgroundColor: "$backgroundSecondary",
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
  marginLeft: 2,
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
    cursor: "default",
  },
});

StyledSidebarHeader.displayName = "SidebarHeader";

const StyledSidebarNavBar = styled("nav", {
  display: "flex",
  flexDirection: "column",
  height: "100%",

  "@mobile": {
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
  color: "$itemUnactive",
  marginLeft: "-5px",
  transition: "color .125s ease-in-out",
  cursor: "pointer",

  "@mobile": {
    display: "flex",
  },

  "&:hover": {
    color: "$headerPrimary",
  },
});

const LogoWrapper = styled("div", {
  color: "$textNormal",

  marginTop: "-6px",

  "@mobile": {
    marginTop: "4px",
  },
});

const HamburgerStyles = css({
  width: "32px",
  height: "32px",
});

const LinkWrapper = styled("section", {
  display: "flex",

  "@mobile": {
    alignItems: "center",
  },
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
  const [sidebarWidth, setSidebarWidth] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  const router = useRouter();

  const handleMediaCheck = (m: MediaQueryListEvent) => {
    setIsMobile(m.matches);
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    if (sidebarInnerRef.current) {
      setSidebarWidth(sidebarInnerRef.current.clientWidth);

      window.onresize = (e) => {
        if (sidebarInnerRef.current) {
          setSidebarWidth(sidebarInnerRef.current.clientWidth);
        }
      };
    }
  }, [sidebarInnerRef]);

  useEffect(() => {
    const matchMedia = window.matchMedia(config.media.mobile);
    setIsMobile(matchMedia.matches);

    matchMedia.addEventListener("change", handleMediaCheck);

    return () => {
      matchMedia.removeEventListener("change", handleMediaCheck);
    };
  }, []);

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
      <StyledSidebarHeader>
        <HamburgerWrapper onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Hamburger className={`${HamburgerStyles}`} />
        </HamburgerWrapper>
        <LinkWrapper
          style={{
            display: "flex",
          }}
          onClick={() => router.push("/")}
        >
          <LogoWrapper>
            <Logo width={32} height={32} />
          </LogoWrapper>
          <strong>ddocs.io</strong>
        </LinkWrapper>
        <ThemeToggle
          css={{
            marginLeft: "auto",
            "@mobile": {
              marginLeft: "0",
            },
          }}
        />
      </StyledSidebarHeader>
      <Draggable
        nodeRef={sidebarInnerRef}
        disabled={!isMobile}
        onStart={() => setIsDragging(true)}
        onStop={(_, d) => {
          setIsDragging(false);
          if (d.x < sidebarWidth / 2) {
            setSidebarOpen(false);
          }
        }}
        axis="x"
        position={{
          x: isMobile ? (sidebarOpen ? sidebarWidth : 0) : 0,
          y: 0,
        }}
        defaultPosition={isMobile ? { x: 0, y: 0 } : { x: 0, y: 0 }}
        bounds={{
          right: sidebarWidth,
          left: 0,
        }}
      >
        <StyledSidebar
          ref={sidebarInnerRef}
          css={{
            transform: `translateX(${sidebarOpen ? "100%" : "0"})`,
            transition: isDragging ? "none" : "transform .125s ease-in-out",
          }}
        >
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
      </Draggable>
    </SidebarContainer>
  );
};

export default Sidebar;
