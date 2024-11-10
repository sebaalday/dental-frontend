"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

const routes = [
  {
    label: "Book Appointment",
    icon: Calendar,
    href: "/appointments",
  },
  {
    label: "Chat",
    icon: MessageSquare,
    href: "/chat",
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 border-b bg-background">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <h1 className="text-xl font-bold">DentalCare</h1>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-x-4">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={pathname === route.href ? "default" : "ghost"}
            className="flex items-center gap-x-2"
            asChild
          >
            <Link href={route.href}>
              <route.icon className="w-4 h-4" />
              {route.label}
            </Link>
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-x-2">
        <ThemeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 mt-4">
              {routes.map((route) => (
                <Button
                  key={route.href}
                  variant={pathname === route.href ? "default" : "ghost"}
                  className="flex items-center gap-x-2 justify-start"
                  asChild
                >
                  <Link href={route.href}>
                    <route.icon className="w-4 h-4" />
                    {route.label}
                  </Link>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}