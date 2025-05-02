"use client";
import useAuthStore from "@/app/stores/useAuthStore";
import withAuth from "@/components/hoc/withAuth";

export default withAuth(UserDashboard, "student");

function UserDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <p>{user?.id}</p>
      <p>{user?.nama}</p>
      <p>{user?.email}</p>
      <p>{user?.nomor_telepon}</p>
      <p>{user?.nrp}</p>
      <p>{user?.created_at}</p>
      <p>{user?.role}</p>
    </div>
  );
}
