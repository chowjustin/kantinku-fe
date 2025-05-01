import Button from "@/components/buttons/Button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative w-full min-h-[90vh] flex items-center">
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
      <div className="relative z-20 pl-20 flex flex-col gap-5">
        <Image
          src="/images/LogoKantinku.png"
          alt="Logo"
          width={150}
          height={150}
        />

        <h1 className="text-5xl font-bold max-w-xs leading-[64px]">
          Quick Meals, Happy Deals!
        </h1>
        <p className="text-2xl max-w-md">
          No more waiting in line, your canteen favorites are just a tap away!
        </p>
        <Button
          size="lg"
          className="w-fit bg-[#243E80] hover:bg-[#243E80] border-none hover:shadow-[#243E80] transition-all duration-300 p-4"
        >
          Explore Menu
        </Button>
      </div>
    </div>
  );
};

export default Hero;
