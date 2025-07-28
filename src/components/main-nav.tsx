"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  RiDashboardLine, 
  RiBarChartBoxLine, 
  RiPieChartLine, 
  RiSettings4Line, 
  RiBuildingLine, 
  RiUserLine 
} from "react-icons/ri";

interface MainNavProps {
  isSidebarOpen?: boolean;
}

export function MainNav({ isSidebarOpen = true }: MainNavProps) {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Overview",
      icon: RiDashboardLine,
      active: pathname === "/",
    },
    {
      href: "/campaigns",
      label: "Campaigns",
      icon: RiBarChartBoxLine,
      active: pathname === "/campaigns",
    },
    {
      href: "/analytics",
      label: "Analytics",
      icon: RiPieChartLine,
      active: pathname === "/analytics",
    },
    {
      href: "/clients",
      label: "Clients",
      icon: RiBuildingLine,
      active: pathname === "/clients",
    },
    {
      href: "/users",
      label: "Users",
      icon: RiUserLine,
      active: pathname === "/users",
    },
    {
      href: "/settings",
      label: "Settings",
      icon: RiSettings4Line,
      active: pathname === "/settings",
    },
  ];

  return (
    <nav className="flex flex-col gap-2 p-2">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
            route.active ? "bg-accent" : "transparent"
          )}
        >
          <route.icon className="h-5 w-5 flex-shrink-0" />
          {isSidebarOpen && <span>{route.label}</span>}
        </Link>
      ))}
    </nav>
  );
}