'use client'

import { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Inbox, Film, LayoutDashboard, Lightbulb, ArrowDownToLine, Video,
  History, ThumbsUp, Clock, ChevronRight, CircleUser, ListVideo
} from "lucide-react";
import { SidebarContext } from '@/contexts/sidebarContext';

const fullSidebarLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/shorts', label: 'Shorts', icon: Film },
  { href: '/auth/subscriptions', label: 'Subscriptions', icon: Inbox },
  { isDivider: true },
  { sectionLabel: 'You' },
  { href: '/auth/history', label: 'History', icon: History },
  { href: '/auth/playlist', label: 'Playlist', icon: ListVideo },
  { href: 'https://studio.youtube.com/channel/UCLg-fzcvGfG0dRgJCMqNvhQ/videos/upload?filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D', label: 'Your videos', icon: Video },
  { href: '/auth/courses', label: 'Your courses', icon: Lightbulb },
  { href: '/auth/watchLater', label: 'Watch Later', icon: Clock },
  { href: '/auth/likedVideos', label: 'Liked videos', icon: ThumbsUp },
  { href: '/auth/downloads', label: 'Downloads', icon: ArrowDownToLine },
  { isDivider: true },
  { href: '/auth/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

const compactSidebarLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/shorts', label: 'Shorts', icon: Film },
  { href: '/courses', label: 'Courses', icon: Inbox },
  { sectionLabel: 'You', icon: CircleUser },
  { href: '/auth/history', label: 'History', icon: History },
  { href: '/auth/downloads', label: 'Downloads', icon: ArrowDownToLine },
  { href: '/auth/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

function Sidebar() {
  const { isOpen } = useContext(SidebarContext);
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  const renderFullSidebar = () => (
    <div className="w-[17%] mr-6 text-sm flex flex-col gap-1 pt-2 px-4">
      {fullSidebarLinks.map((item, index) => {
        if (item.isDivider) return <hr key={index} className="my-2" />;
        if (item.sectionLabel) {
          return (
            <div key={index} className="flex p-2 pb-0 items-center gap-2 cursor-default">
              <span className="text-base font-semibold">{item.sectionLabel}</span>
              <ChevronRight className="p-[2px]" />
            </div>
          );
        }
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <Link key={item.href} href={item.href}  className={`flex p-2 items-center rounded-lg hover:bg-zinc-800 ${active ? 'bg-zinc-800' : ''}`}>
            <Icon className="p-[2px]" />
            <span className="ml-5">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  const renderCompactSidebar = () => (
    <div className="mr-4 flex flex-col gap-3 pl-1">
      {compactSidebarLinks.map((item, index) => {
        const Icon = item.icon;
        if (item.sectionLabel) {
          return (
            <div key={index} className="flex flex-col items-center gap-y-1 p-2 cursor-default">
              <Icon className="p-[2px]" />
              <span className="text-xs font-semibold">{item.sectionLabel}</span>
            </div>
          );
        }
        const active = isActive(item.href);
        return (
          <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-y-1 p-2 hover:bg-zinc-800 rounded-lg ${active ? 'bg-zinc-800 ' : ''}`}>
            <Icon className="p-[2px]" />
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  return isOpen ? renderFullSidebar() : renderCompactSidebar();
}

export default Sidebar;