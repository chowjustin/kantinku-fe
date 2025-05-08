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

interface ModalState {
  nama: boolean;
  nrp: boolean;
  email: boolean;
  nomor_telepon: boolean;
  password: boolean;
}

export default function ProfileContainer() {
  const { user: storedUser } = useAuthStore();

  const isTenant = storedUser?.role === "tenant";
  const router = useRouter();

  const [openModals, setOpenModals] = useState<ModalState>({
    nama: false,
    nrp: false,
    email: false,
    nomor_telepon: false,
    password: false,
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
    <section className="p-12 max-md:p-6 space-y-6 px-[5%]">
      <div>
        <h1 className="text-3xl font-semibold max-md:text-2xl">Profile Page</h1>
      </div>

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
            value={user?.created_at}
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
