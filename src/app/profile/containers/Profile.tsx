"use client";

import { useState } from "react";
import { Lock, LogOut } from "lucide-react";
import Button from "@/components/buttons/Button";
import useEditUserMutation from "@/app/hooks/useEditUserMutation";
import EditPasswordModal from "@/app/profile/modal/EditPasswordModal";
import EditModal from "@/app/profile/modal/EditModal";
import ProfileField from "@/app/profile/components/ProfileFields";
import useAuthStore from "@/app/stores/useAuthStore";
import { useGetMe } from "@/app/hooks/useGetMe";
import ProfileSkeleton from "@/app/profile/components/ProfileSkeleton";
import { removeToken } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import formatISOToDayMonthYear from "@/app/utils/dateUtils";
import TenantProfileImage from "@/app/dashboard/profile/components/ProfileImage";
import withAuth from "@/components/hoc/withAuth";

interface ModalState {
  nama: boolean;
  nrp: boolean;
  email: boolean;
  nomor_telepon: boolean;
  password: boolean;
  canteen_id: boolean;
  nama_tenant: boolean;
  image_url: boolean;
}

export default withAuth(ProfileContainer, "student");

function ProfileContainer() {
  const { user: storedUser, logout } = useAuthStore();

  const isTenant = storedUser?.role === "tenant";
  const router = useRouter();

  const [openModals, setOpenModals] = useState<ModalState>({
    nama: false,
    nrp: false,
    email: false,
    nomor_telepon: false,
    password: false,
    canteen_id: false,
    nama_tenant: false,
    image_url: false,
  });

  const { data: user, isLoading: isGetMeLoading } = useGetMe({
    isTenant: isTenant,
  });

  const { mutate: updateUserMutation, isPending: updateUserPending } =
    useEditUserMutation({ isTenant: isTenant });

  const toggleModal = (modal: keyof ModalState, isOpen: boolean) => {
    setOpenModals((prev) => ({ ...prev, [modal]: isOpen }));
  };

  if (isGetMeLoading) {
    return (
      <div className="p-12 max-md:p-6 space-y-6 px-[5%]">
        <ProfileSkeleton />
      </div>
    );
  }

  return (
    <section className="p-12 min-h-screen max-md:p-6 space-y-6 px-[5%]">
      <div>
        <h1 className="text-3xl font-semibold max-md:text-2xl">Profil Kamu</h1>
      </div>

      {isTenant && (
        <TenantProfileImage
          imageUrl={user?.image_url || null}
          isTenant={isTenant}
        />
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <ProfileField
            label="Nama Lengkap"
            value={user?.nama || ""}
            onEdit={() => toggleModal("nama", true)}
          />

          <ProfileField
            label="NRP"
            value={user?.nrp || ""}
            onEdit={() => toggleModal("nrp", true)}
            className={user?.role === "tenant" ? "hidden" : ""}
          />

          <ProfileField
            label="Nama Tenant"
            value={user?.nama_tenant || ""}
            onEdit={() => toggleModal("nama_tenant", true)}
            className={user?.role === "tenant" ? "" : "hidden"}
          />

          <ProfileField
            label="Email"
            value={user?.email || ""}
            onEdit={() => toggleModal("email", true)}
          />

          <ProfileField
            label="Nomor Telepon"
            value={user?.nomor_telepon || ""}
            onEdit={() => toggleModal("nomor_telepon", true)}
          />

          <ProfileField
            label="Tanggal Dibuat"
            value={formatISOToDayMonthYear(user?.created_at || "")}
            canEdit={false}
          />

          <div className="mt-8 flex justify-between">
            <Button
              onClick={() => toggleModal("password", true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Lock size={16} />
              Ubah Kata Sandi
            </Button>
            <Button
              onClick={() => {
                removeToken();
                logout();
                router.push("/login");
              }}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              Keluar
            </Button>
          </div>
        </div>
      </div>

      <EditModal
        isOpen={openModals.nama}
        setIsOpen={(isOpen) => toggleModal("nama", isOpen)}
        id="nama"
        label="Edit Nama Lengkap"
        currentValue={user?.nama || ""}
        fieldName="full_name"
        mutate={updateUserMutation}
        isPending={updateUserPending}
      />

      <EditModal
        isOpen={openModals.nrp}
        setIsOpen={(isOpen) => toggleModal("nrp", isOpen)}
        id="nrp"
        label="Edit NRP"
        currentValue={user?.nrp || ""}
        fieldName="username"
        mutate={updateUserMutation}
        isPending={updateUserPending}
      />

      <EditModal
        isOpen={openModals.nama_tenant}
        setIsOpen={(isOpen) => toggleModal("nama_tenant", isOpen)}
        id="nama_tenant"
        label="Edit Nama Tenant"
        currentValue={user?.nama_tenant || ""}
        fieldName="nama_tenant"
        mutate={updateUserMutation}
        isPending={updateUserPending}
      />

      <EditModal
        isOpen={openModals.email}
        setIsOpen={(isOpen) => toggleModal("email", isOpen)}
        id="email"
        label="Edit Email"
        currentValue={user?.email || ""}
        fieldName="email"
        type="email"
        mutate={updateUserMutation}
        isPending={updateUserPending}
      />

      <EditModal
        isOpen={openModals.nomor_telepon}
        setIsOpen={(isOpen) => toggleModal("nomor_telepon", isOpen)}
        id="nomor_telepon"
        label="Edit Nomor Telepon"
        currentValue={user?.nomor_telepon || ""}
        fieldName="email"
        type="email"
        mutate={updateUserMutation}
        isPending={updateUserPending}
      />

      <EditPasswordModal
        isOpen={openModals.password}
        setIsOpen={(isOpen) => toggleModal("password", isOpen)}
        mutate={updateUserMutation}
        isPending={updateUserPending}
      />
    </section>
  );
}
