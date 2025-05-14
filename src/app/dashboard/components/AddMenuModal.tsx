"use client";

import { Dialog, Transition } from "@headlessui/react";
import * as React from "react";
import { Fragment } from "react";
import Button from "@/components/buttons/Button";
import { FormProvider, useForm } from "react-hook-form";
import useCreateMenuMutation, {
  CreateMenuRequest,
} from "@/app/hooks/useCreateMenuMutation";
import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import { Menu } from "@/types/tenant/menu";
import useEditMenuMutation from "@/app/hooks/useEditMenuMutation";

interface AddMenuModalProps {
  isOpen: boolean;
  isEditing?: boolean;
  menuData?: Menu;
  onClose: () => void;
}

export default function AddMenuModal({
  isOpen,
  isEditing = false,
  menuData,
  onClose,
}: AddMenuModalProps) {
  const methods = useForm<CreateMenuRequest>({
    mode: "onChange",
  });

  const { handleSubmit, reset, setValue } = methods;

  const createMutation = useCreateMenuMutation({ onClose, reset });
  const updateMutation = useEditMenuMutation({
    id: menuData?.id || "",
    onClose,
    reset,
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  React.useEffect(() => {
    if (isEditing && menuData) {
      setValue("nama", menuData.nama);
      setValue("deskripsi", menuData.deskripsi);
      setValue("harga", menuData.harga);
      setValue("stok", menuData.stok);
    }
  }, [isEditing, menuData, setValue, reset]);

  const onSubmit = (data: CreateMenuRequest) => {
    if (isEditing && menuData) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {isEditing ? "Edit Menu " : "Tambah Menu"}
                </Dialog.Title>

                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4 space-y-4">
                      <Input
                        id="nama"
                        type="text"
                        label="Nama Makanan"
                        placeholder="Masukkan nama makanan"
                        validation={{
                          required: "Nama makanan harus diisi",
                        }}
                      />
                      <TextArea
                        id="deskripsi"
                        label="Deskripsi Makanan"
                        placeholder="Masukkan deskripsi makanan"
                        validation={{
                          required: "Deskripsi makanan harus diisi",
                        }}
                      />
                      <Input
                        id="harga"
                        type="number"
                        label="Harga Makanan"
                        prefix="Rp. "
                        min={"0"}
                        placeholder="Masukkan harga makanan"
                        validation={{
                          required: "Harga makanan harus diisi",
                          valueAsNumber: true,
                        }}
                      />
                      <Input
                        id="stok"
                        type="number"
                        label="Stok Makanan"
                        placeholder="Masukkan stok makanan"
                        min={"0"}
                        validation={{
                          required: "Stok makanan harus diisi",
                          valueAsNumber: true,
                        }}
                      />
                    </div>
                    <div className="mt-6 flex justify-end gap-2">
                      <Button
                        className="bg-gray-200 text-black"
                        onClick={() => {
                          onClose();
                          reset();
                        }}
                      >
                        Batal
                      </Button>
                      <Button type="submit" isLoading={isPending}>
                        Simpan
                      </Button>
                    </div>
                  </form>
                </FormProvider>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
