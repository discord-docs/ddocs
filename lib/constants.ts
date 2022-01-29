import type { SidebarItem } from '../components/Sidebar';

export const DEFAULT_SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: 'Overview',
    href: '/',
    icon: 'house',
  },
  {
    label: 'Build History',
    href: '/builds',
    icon: 'clock',
  },
  {
    label: 'Experiments',
    href: '/experiments',
    icon: 'science',
  },
  {
    label: 'API Documentation',
    href: '/documentation',
    icon: 'documentation',
  },
];

export enum BuildDetailsTab {
  DETAILS,
  EXPERIMENTS,
  SCRIPTS,
}
