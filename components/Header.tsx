import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-[100px]">
        <div className="mr-4 hidden md:flex">
          <Link className="mx-6 flex items-center space-x-2" href="/">
            <Image src="/tucumanlogo.svg" alt="logo" width={200} height={90} className="h-[100px] py-4" />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href=""></Link>

          </nav>
        </div>
        <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 w-10 px-0 md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </button>
        <div className="pr-6">
          <Image src="/logogobtuc.svg" alt="logo" width={200} height={90} className="h-[100px] py-4" />
        </div>
      </div>
    </header>
  );
};

export default Header;
