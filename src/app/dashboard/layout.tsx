"use client";

import Sidebar from "@/layouts/Sidebar";
import { ReactNode } from "react";
import { ListOrdered, LucideIcon, Users, Utensils } from "lucide-react";
import useAuthStore from "../stores/useAuthStore";

type ChildrenLayoutProps = {
  children: ReactNode;
};

type NavbarLink = {
  title: string;
  icon: LucideIcon;
  link: string;
};

const ChildrenLayout = ({ children }: ChildrenLayoutProps) => {
  const { user } = useAuthStore();

  const AllNavbarLinks: NavbarLink[] = [
    {
      title: "Antrian Pesanan",
      icon: ListOrdered,
      link: "/dashboard",
    },
    {
      title: "Menu Tenant",
      icon: Utensils,
      link: "/dashboard/menu",
    },
    {
      title: "Profil Tenant",
      icon: Users,
      link: "/dashboard/profile",
    },
  ];

  const filterNavbarLinks = (role: string) => {
    switch (role) {
      case "admin":
        return AllNavbarLinks;
      case "tenant":
        return AllNavbarLinks.filter(
          (link) =>
            link.link === "/dashboard" ||
            link.link === "/dashboard/profile" ||
            link.link === "/dashboard/menu",
        );
      default:
        return [];
    }
  };

  const NavbarLinks = filterNavbarLinks(user?.role || "");

  return (
    <>
      <div className="max-lg:hidden lg:flex lg:max-h-screen lg:h-screen lg:max-w-screen lg:w-screen">
        <Sidebar topNav={NavbarLinks} />
        <div className="max-lg:hidden max-md:pt-[48px] max-lg:pt-[72px] lg:flex lg:flex-col lg:max-h-screen h-full w-full">
          <div className="lg:max-h-screen lg:h-nav lg:overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <Sidebar topNav={NavbarLinks} />
        <div className="px-4 md:px-8 lg:px-[10%]">{children}</div>
      </div>
    </>
  );
};

export default ChildrenLayout;
