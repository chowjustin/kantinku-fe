"use client";

import Button from "@/components/buttons/Button";
import Image from "next/image";

const Hero = () => {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      let offset;
      if (window.innerWidth < 768) {
        offset = element.getBoundingClientRect().top + window.scrollY - 66;
      } else if (window.innerWidth < 1280) {
        offset = element.getBoundingClientRect().top + window.scrollY - 74;
      } else {
        offset = element.getBoundingClientRect().top + window.scrollY - 90;
      }
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full min-h-[100vh] flex items-center">
      {/* Background */}
      <Image
        src="/images/BackgroundHero.png"
        alt="Hero Background"
        fill
        className="absolute inset-0 object-cover z-0"
      />

      {/* Gradient Shadow */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/100 via-white/80 to-transparent" />

      {/* Text Banner */}
      <div className="relative z-20 px-8 md:pl-20 flex flex-col gap-5">
        <Image
          src="/images/LogoKantinku.png"
          alt="Logo"
          width={150}
          height={150}
        />

        <h1 className="text-4xl md:text-5xl font-bold max-w-xs leading-[48px] md:leading-[64px]">
          Quick Meals, Happy Deals!
        </h1>
        <p className="text-xl md:text-2xl max-w-md">
          No more waiting in line, your canteen favorites are just a tap away!
        </p>
        <Button
          size="lg"
          className="w-fit bg-[#243E80] hover:bg-[#243E80] border-none hover:shadow-[#243E80] transition-all duration-300 p-4"
          onClick={() => handleClick("tenants")}
        >
          Explore Menu
        </Button>
      </div>
    </div>
  );
};

export default Hero;
