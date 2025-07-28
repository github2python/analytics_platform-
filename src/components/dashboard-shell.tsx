"use client";

import Image from "next/image";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { RiMenu2Line, RiCloseLine, RiNotification2Line, RiSearch2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Desktop Sidebar */}
      <div 
        className={`hidden border-r bg-background transition-all duration-300 md:block ${
          isSidebarOpen ? "md:w-64" : "md:w-20"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-indigo-700 rounded-md" />
                <span className="absolute inset-0 flex items-center justify-center font-bold text-white">A</span>
              </div>
              <span className="text-xl font-semibold">ADmyBRAND</span>
            </div>
          ) : (
            <div className="relative mx-auto h-8 w-8 overflow-hidden rounded">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-indigo-700 rounded-md" />
              <span className="absolute inset-0 flex items-center justify-center font-bold text-white">A</span>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex"
          >
            {isSidebarOpen ? (
              <RiMenu2Line className="h-5 w-5" />
            ) : (
              <RiMenu2Line className="h-5 w-5" />
            )}
          </Button>
        </div>
        <MainNav isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <RiMenu2Line className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-16 items-center border-b px-4">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-indigo-700 rounded-md" />
                <span className="absolute inset-0 flex items-center justify-center font-bold text-white">A</span>
              </div>
              <span className="text-xl font-semibold">ADmyBRAND</span>
            </div>
          </div>
          <MainNav />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <RiMenu2Line className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex h-16 items-center border-b px-4">
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded">
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-indigo-700 rounded-md" />
                      <span className="absolute inset-0 flex items-center justify-center font-bold text-white">A</span>
                    </div>
                    <span className="text-xl font-semibold">ADmyBRAND</span>
                  </div>
                </div>
                <MainNav />
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex flex-1 items-center gap-4 md:ml-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <RiSearch2Line className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="search"
                placeholder="Search..."
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 pl-9 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <RiNotification2Line className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
            <ThemeToggle />
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
} 