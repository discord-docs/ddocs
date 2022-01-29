import React, { FC, ReactChild } from "react";
import Link from "next/link";

import { styled } from "../stitches.config";
import Icon from "./Icon";
import { useRouter } from "next/dist/client/router";

const StyledSidebar = styled("aside", {
  flexBasis: 350,
  backgroundColor: "$backgroundSecondary",
  padding: 16,
});

StyledSidebar.displayName = "Sidebar";

const StyledSidebarHeader = styled("header", {
  display: "flex",
  flexDirection: "column",
});

StyledSidebarHeader.displayName = "SidebarHeader";

const StyledSidebarNavBar = styled("nav", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

StyledSidebarNavBar.displayName = "SidebarNavBar";

const StyledSidebarNavBarItem = styled("a", {
  display: "flex",
  alignItems: "center",
  gap: 12,
  fontSize: 16,
  lineHeight: "20px",
  textDecoration: "none",
  color: "#b9bbbe;",
  transition: "color .125s, background .125s",
  "&:hover": {
    color: "$headerPrimary",
  },
  variants: {
    active: {
      true: {
        color: "$headerPrimary",
        backgroundColor: "$brand",
        borderRadius: 3,
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
  const router = useRouter();

  return (
    <StyledSidebar>
      {/* <StyledSidebarHeader>
        <h2>Discord Previews</h2>
        <h3>Build #12345</h3>
      </StyledSidebarHeader> */}
      <StyledSidebarNavBar>
        {items.map((item) => {
          if (!item.hasOwnProperty("title")) {
            const { href, label, icon, onClick, active } = item as SidebarItem;

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
  );
};

export default Sidebar;
