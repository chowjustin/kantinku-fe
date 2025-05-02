import MenuContent from "./MenuContent";

const MenuSection = () => {
  return (
    <div className="flex flex-col items-center gap-12 my-16">
      <h2 className="text-3xl font-bold">Pilih kantin favoritmu</h2>
      <MenuContent />
    </div>
  );
};

export default MenuSection;
