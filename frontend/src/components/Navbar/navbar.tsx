import { Button } from "@/components/ui/button";

import { NavMenu } from "@/components/Navbar/nav-menu";
import { NavigationSheet } from "@/components/Navbar/navigation-sheet";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { userService } from "@/services/user-service";
import { USER_ROLES, UserRole } from "@/Types/TRoles";
import { signOut } from "@/lib/auth-client";
import Logout from "../auth/logout";


const Navbar = async () => {

  const { data, error } = await userService.getSession();
  const user = data?.user;
  function getDashboardRoute(role: UserRole | undefined) {
    switch (role) {
      case USER_ROLES.ADMIN:
        return "/admin-dashboard";
      case USER_ROLES.STUDENT:
        return "/student-dashboard";
      case USER_ROLES.TUTOR:
        return "/tutor-dashboard";
      default:
        return "/login";
    }
  }

  const dashboardRoute = getDashboardRoute(user.role);
  return (
    <nav className="h-16 border-b bg-background">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-12">
          <div>
            <h1 className="text-xl text-custom-primary font-extrabold">
              Teachify
            </h1>
          </div>

          {/* Desktop Menu */}
          <NavMenu
            dashboardRoute={dashboardRoute}
            className="hidden md:block"
          />
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button variant={"outline"}>{user?.name}</Button>
            <Logout/>
            </>
          ) : (
            <>
              <Button
                asChild
                className="hidden sm:inline-flex"
                variant="outline"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button>
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}

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
