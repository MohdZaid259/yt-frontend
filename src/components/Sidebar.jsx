'use client'

import { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Film, LayoutDashboard, ArrowDownToLine, History, ListVideo,
  Video, Clock, ThumbsUp, CircleUser
} from "lucide-react";
import { SidebarContext } from '@/contexts/sidebarContext';

const fullSidebarLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/shorts', label: 'Shorts', icon: Film },
  { isDivider: true },
  { sectionLabel: 'You' },
  { href: '/auth/history', label: 'History', icon: History },
  { href: '/auth/playlist', label: 'Playlist', icon: ListVideo },
  { href: 'https://studio.youtube.com/channel/UCLg-fzcvGfG0dRgJCMqNvhQ/videos/upload?filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D', label: 'Your videos', icon: Video },
  { href: '/auth/watchLater', label: 'Watch Later', icon: Clock },
  { href: '/auth/likedVideos', label: 'Liked videos', icon: ThumbsUp },
  { href: '/auth/downloads', label: 'Downloads', icon: ArrowDownToLine },
  { isDivider: true },
  { href: '/auth/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

const compactSidebarLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/shorts', label: 'Shorts', icon: Film },
  { sectionLabel: 'You', icon: CircleUser },
  { href: '/auth/history', label: 'History', icon: History },
  { href: '/auth/downloads', label: 'Downloads', icon: ArrowDownToLine },
  { href: '/auth/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

const mobileNavLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/shorts', label: 'Shorts', icon: Film },
  { href: '/auth/watchLater', label: 'Watch Later', icon: Clock },
  { href: '/auth/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

function Sidebar() {
  const { isOpen } = useContext(SidebarContext);
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  const renderFullSidebar = () => (
    <div className="hidden md:flex w-[10%] mr-6 text-sm flex-col gap-1 pt-2 px-4 pr-0">
      {fullSidebarLinks.map((item, index) => {
        if (item.isDivider) return <hr key={index} className="my-2" />;
        if (item.sectionLabel) {
          return (
            <div key={index} className="flex p-2 pb-0 items-center gap-2 cursor-default">
              <span className="text-base font-semibold">{item.sectionLabel}</span>
            </div>
          );
        }
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <Link key={item.href} href={item.href} className={`flex p-2 items-center rounded-lg hover:bg-zinc-800 ${active ? 'bg-zinc-800' : ''}`}>
            <Icon className="p-[2px]" />
            <span className="ml-5 text-nowrap">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  const renderCompactSidebar = () => (
    <div className="hidden md:flex mr-4 flex-col gap-3 pl-1">
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

  const renderMobileNavbar = () => (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around bg-zinc-900 border-t border-zinc-800 py-2 md:hidden">
      {mobileNavLinks.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <Link key={item.href} href={item.href} className={`flex flex-col items-center text-xs ${active ? 'text-white' : 'text-zinc-400'}`}>
            <Icon size={20} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {isOpen ? renderFullSidebar() : renderCompactSidebar()}
      {renderMobileNavbar()}
    </>
  );
}

export default Sidebar;
