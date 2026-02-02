import { SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Navbar/logo";
import { NavMenu } from "@/components/Navbar/nav-menu";
import { NavigationSheet } from "@/components/Navbar/navigation-sheet";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-16 border-b bg-background">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-12">
          <div>
            <h1 className="font-extrabold">Teachify</h1>
          </div>

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3">
          <Button asChild className="hidden sm:inline-flex" variant="outline">
           <Link href="/login">
            Sign In
           </Link>
          </Button>
          <Button>

                <Link href="/register">
            Sign Up
           </Link>
          </Button>
          {/* <Button size="icon" variant="outline">
            <SunIcon />
          </Button> */}
          <ModeToggle />
          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
