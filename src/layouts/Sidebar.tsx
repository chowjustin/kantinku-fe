"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  LucideIcon,
  Menu,
  X,
} from "lucide-react";
import NextImage from "@/components/NextImage";
import IconButton from "@/components/buttons/IconButton";
import useAuthStore from "@/app/stores/useAuthStore";
import { removeToken } from "@/lib/cookies";

type SidenavProps = {
  topNav: {
    title: string;
    icon: LucideIcon;
    link: string;
  }[];
};

export default function Sidebar({ topNav }: SidenavProps) {
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const path = usePathname();
  const router = useRouter();

  // Function to check if a link is active
  const isActiveLink = (link: string) => {
    const pathWithoutQuery = path.split("?")[0];

    if (link === "/dashboard") {
      return pathWithoutQuery === "/dashboard";
    }

    return path === link;
  };

  return (
    <>
      <div
        className={`transition-all max-lg:hidden duration-300 z-50 ${
          isOpen ? "w-full lg:w-[22rem]" : "w-full lg:w-[6rem]"
        } h-screen lg:py-8 bg-white lg:drop-shadow-2xl`}
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="relative w-full overflow-visible">
              <IconButton
                icon={isOpen ? ChevronsLeft : ChevronsRight}
                size="sm"
                className="absolute top-0 right-0 translate-x-5 overflow-visible"
                onClick={() => setIsOpen(!isOpen)}
              ></IconButton>

              <div className="flex justify-center px-4">
                <div
                  className={`flex items-center mb-6 ${isOpen ? "gap-3" : ""}`}
                >
                  <Link href="/">
                    <NextImage
                      src="/LogoKantinku.png"
                      width={2000}
                      height={2000}
                      alt="Logo Kantinku"
                      className="flex max-w-[56px] items-center md:max-w-[60px]"
                    />
                  </Link>
                  <div>
                    {isOpen && (
                      <div className="leading-[16px] mt-2">
                        <p className="text-[16px] font-bold">
                          {user?.nama_tenant}
                        </p>
                        <p className="text-[14px]">{user?.email}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {topNav.map((link) => (
              <Link
                href={link.link}
                key={link.title}
                className={`flex flex-row w-full items-center text-[14px] text-black py-3 ${
                  isActiveLink(link.link)
                    ? "bg-primary-main text-white font-bold"
                    : "hover:bg-gray-100 bg-white shadow-sm"
                } ${isOpen && "space-x-3 px-6"}`}
              >
                <link.icon
                  className={`text-2xl items-center ${
                    isActiveLink(link.link) ? "text-white" : "text-primary-main"
                  } ${isOpen ? "" : "mx-auto"}`}
                />
                <p className={`text-S1 ${isOpen ? "visible" : "hidden"}`}>
                  {link.title}
                </p>
              </Link>
            ))}
            <div
              onClick={() => {
                logout();
                removeToken();
                router.replace("/login");
              }}
              className={`flex flex-row w-full items-center text-[14px] text-black py-3 hover:bg-gray-100 bg-white shadow-sm cursor-pointer ${
                isOpen && "space-x-3 px-6"
              }`}
            >
              <LogOut
                className={`text-2xl items-center text-primary-main ${
                  isOpen ? "" : "mx-auto"
                }`}
              />
              <p className={`text-S1 ${isOpen ? "visible" : "hidden"}`}>
                Keluar
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="sticky top-0 z-[100] bg-white flex w-full h-[4.5rem] items-center py-4 justify-between px-4 sm:px-6 md:px-8 shadow-lg lg:hidden">
        {/* Mobile Menu */}
        <div className="lg:hidden">
          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <Link href={"/"}>
              <NextImage
                width={552}
                height={388}
                src="/LogoKantinku.png"
                alt="Logo KantinKu"
                className="flex max-w-[56px] items-center md:max-w-[60px]"
              />
            </Link>
            {isOpen && (
              <div className="leading-[16px] text-left mt-1">
                <p className="text-[16px] font-bold">{user?.nama}</p>
                <p className="text-[14px]">{user?.email}</p>
              </div>
            )}
          </div>
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="cursor-pointer absolute top-6 right-4 sm:right-6 md:right-8"
          >
            {isOpen ? (
              <X className="relative text-2xl text-black" />
            ) : (
              <Menu className="relative text-2xl text-black" />
            )}
          </div>

          {isOpen && (
            <div className="fixed top-[4.5rem] left-0 w-full bg-white z-50 max-h-[calc(100vh-72px)] overflow-y-auto px-4 sm:px-6 md:px-8">
              <div className="relative z-50 flex h-[88vh] flex-col py-4">
                {topNav.map((link) => (
                  <Link
                    href={link.link}
                    key={link.title}
                    className={`flex flex-row space-x-3 px-6 w-full items-center text-[14px] text-black py-3 ${
                      isActiveLink(link.link)
                        ? "bg-primary-main text-white font-bold"
                        : "hover:bg-gray-100 bg-white shadow-sm"
                    } `}
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon
                      className={`text-2xl items-center ${
                        isActiveLink(link.link)
                          ? "text-white"
                          : "text-primary-main"
                      } `}
                    />
                    <p className={`text-S1`}>{link.title}</p>
                  </Link>
                ))}
                <div
                  onClick={() => {
                    logout();
                    removeToken();
                    router.replace("/signin");
                  }}
                  className={`flex flex-row space-x-3 px-6 w-full items-center text-[14px] text-black py-3 hover:bg-gray-100 bg-white shadow-sm cursor-pointer`}
                >
                  <LogOut className="text-2xl text-primary-main" />
                  <p className="text-S1">Keluar</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
