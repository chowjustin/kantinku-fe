import RestaurantHeader from "../../components/TenantHeader";
import PopularMenuList from "../../components/PopularMenuList";

export default function DetailTenant() {
  return (
    <div className="px-8 md:px-16 py-8 md:py-16 space-y-6">
      <RestaurantHeader />
      <PopularMenuList />
    </div>
  );
}
