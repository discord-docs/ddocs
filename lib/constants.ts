import type { SidebarItem } from "../components/Sidebar";

export const DEFAULT_SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: "Summaries",
    href: "/summaries",
    icon: "summaries",
  },
  {
    label: "Features",
    href: "/features",
    icon: "features",
  },
  {
    label: "API Documentation",
    href: "/documentation",
    icon: "documentation",
  },
  {
    label: "Privacy Policy",
    href: "/privacy",
    icon: "privacypolicy",
  },
];

export enum BuildDetailsTab {
  DETAILS,
  EXPERIMENTS,
  SCRIPTS,
}
