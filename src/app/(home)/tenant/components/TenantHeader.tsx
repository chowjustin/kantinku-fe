import Image from "next/image";

const RestaurantHeader = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Image
        src="/images/BackgroundHero.png"
        alt="Banner"
        width={100}
        height={100}
        className="w-full md:w-64 h-40 rounded-lg object-cover"
      />

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl md:text-4xl font-bold">Tenant Wong Sangar</h2>
        <div className="flex gap-4 text-md w-fit">
          <p>📍 Kantin Elektro</p>
          <p>💰 40rb–100rb</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;
