import PopularMenuItem from "./PopularMenuItem";

const dummyMenus = [
  {
    id: 1,
    name: "Nasi Goreng",
    price: 27500,
    description: "Makanan terlaris sedunia, paling murah sedunia",
    image: "/images/BackgroundHero.png",
  },
  {
    id: 2,
    name: "Nasi Goreng",
    price: 21000,
    description: "Makanan terlaris sedunia, paling murah sedunia",
    image: "/images/BackgroundHero.png",
  },
  {
    id: 3,
    name: "Nasi Goreng",
    price: 45000,
    description: "Makanan terlaris sedunia, paling murah sedunia",
    image: "/images/BackgroundHero.png",
  },
  {
    id: 4,
    name: "Nasi Goreng",
    price: 27500,
    description: "Makanan terlaris sedunia, paling murah sedunia",
    image: "/images/BackgroundHero.png",
  },
  {
    id: 5,
    name: "Nasi Goreng",
    price: 21000,
    description: "Makanan terlaris sedunia, paling murah sedunia",
    image: "/images/BackgroundHero.png",
  },
  {
    id: 6,
    name: "Nasi Goreng",
    price: 45000,
    description: "Makanan terlaris sedunia, paling murah sedunia",
    image: "/images/BackgroundHero.png",
  },
];

const PopularMenuList = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Daftar Menu</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dummyMenus.map((item) => (
          <PopularMenuItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PopularMenuList;
