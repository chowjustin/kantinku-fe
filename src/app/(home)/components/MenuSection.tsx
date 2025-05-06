import MenuContent from "./MenuContent";

const MenuSection = () => {
  return (
    <div
      className="flex flex-col items-center gap-12 my-16 px-4 sm:px-6 md:px-8 lg:px-[12.5%]"
      id="tenants"
    >
      <div className="flex text-center flex-col items-center gap-2">
        <h2 className="text-3xl font-bold">Apa aja nih yang enak di ITS?</h2>
        <h4 className="text-xl font-medium">
          Yuk, dicek koleksi makanan populer, favoritnya foodies lokal, dan
          termurah di ITS!
        </h4>
      </div>
      <MenuContent />
    </div>
  );
};

export default MenuSection;
