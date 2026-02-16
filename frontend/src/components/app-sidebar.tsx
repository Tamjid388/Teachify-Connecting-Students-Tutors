import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { adminRoutes } from "@/dashboardRoutes/adminRoutes";
import { tutorRoutes } from "@/dashboardRoutes/tutorRoutes";
import { TRoute } from "@/Types/TRoute";
import Link from "next/link";
import { studentRoutes } from "@/dashboardRoutes/studentRoutes";
import { UserRole } from "@/Types/TRoles";

export function AppSidebar({
  user,
  ...props
}: { user: { role: UserRole } } & React.ComponentProps<typeof Sidebar>) {
  let routes: TRoute[] = [];
  switch (user.role) {
    case "ADMIN":
      routes = adminRoutes;
      break;
    case "TUTOR":
      routes = tutorRoutes;
      break;
    case "STUDENT":
      routes = studentRoutes;
      break;

    default:
      break;
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-custom-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-xl font-bold text-custom-primary">Teachify</span>
                 
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {routes.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <h1 className="font-bold text-xl   mb-2">{item.title}</h1>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild className=" font-semibold">
                          <Link href={item.url}>{item.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
