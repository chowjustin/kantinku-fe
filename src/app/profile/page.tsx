"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import Button from "@/components/buttons/Button";
import useEditUserMutation from "@/app/hooks/useEditUserMutation";
import EditModal from "./modal/EditModal";
import ProfileField from "./components/ProfileFields";
import EditRoleModal from "@/app/profile/modal/EditRoleModal";
import EditPasswordModal from "@/app/profile/modal/EditPasswordModal";

const dummyUser = {
  id: "e926a189-36a9-4612-900f-e2ee69ac9538",
  name: "Doni Tri Pamungkas",
  username: "doni3",
  email: "5025231224@student.its.ac.id",
  role: "student",
  created_at: "2025-03-27T08:10:48.507007Z",
  updated_at: "2025-03-27T08:10:48.507007Z",
};

interface ModalState {
  name: boolean;
  username: boolean;
  email: boolean;
  role: boolean;
  password: boolean;
}

export default function ProfilePage() {
  // const {user} = useAuthStore();

  const user = dummyUser;

  const [openModals, setOpenModals] = useState<ModalState>({
    name: false,
    username: false,
    email: false,
    role: false,
    password: false,
  });

  const { mutate: updateUserMutation, isPending: updateUserPending } =
    useEditUserMutation({ id: user?.id! });

  const toggleModal = (modal: keyof ModalState, isOpen: boolean) => {
    setOpenModals((prev) => ({ ...prev, [modal]: isOpen }));
  };

  return (
    <section className="p-12 max-md:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold max-md:text-2xl">Profile Page</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <ProfileField
            label="Nama Lengkap"
            value={user?.name || ""}
            onEdit={() => toggleModal("name", true)}
          />

          <ProfileField
            label="Username"
            value={user?.username || ""}
            onEdit={() => toggleModal("username", true)}
          />

          <ProfileField
            label="Email"
            value={user?.email || ""}
            onEdit={() => toggleModal("email", true)}
          />

          <ProfileField
            label="Role"
            value={user?.role || ""}
            onEdit={() => toggleModal("role", true)}
          />

          <ProfileField
            label="Tanggal Dibuat"
            value={user?.created_at}
            canEdit={false}
          />

          <ProfileField
            label="Update Terakhir"
            value={user?.updated_at}
            canEdit={false}
          />

          <div className="mt-8">
            <Button
              onClick={() => toggleModal("password", true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Lock size={16} />
              Ubah Kata Sandi
            </Button>
          </div>
        </div>
      </div>

      <EditModal
        isOpen={openModals.name}
        setIsOpen={(isOpen) => toggleModal("name", isOpen)}
        id="name"
        label="Edit Nama Lengkap"
        currentValue={user?.name || ""}
        fieldName="full_name"
        mutate={updateUserMutation}
        isPending={updateUserPending}
      />

      <EditModal
        isOpen={openModals.username}
        setIsOpen={(isOpen) => toggleModal("username", isOpen)}
        id="username"
        label="Edit Username"
        currentValue={user?.username || ""}
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

      <EditRoleModal
        isOpen={openModals.role}
        setIsOpen={(isOpen) => toggleModal("role", isOpen)}
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
