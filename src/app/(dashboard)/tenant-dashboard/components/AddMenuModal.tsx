"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Button from "@/components/buttons/Button";

interface AddMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    nama: string;
    deskripsi: string;
    harga: number;
    stok: number;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: () => void;
}

export default function AddMenuModal({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
}: AddMenuModalProps) {
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
                  Tambah Menu
                </Dialog.Title>

                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={onChange}
                    placeholder="Nama"
                    className="w-full border rounded px-3 py-2"
                  />
                  <textarea
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={onChange}
                    placeholder="Deskripsi"
                    className="w-full border rounded px-3 py-2"
                  />
                  <input
                    type="number"
                    name="harga"
                    value={formData.harga}
                    onChange={onChange}
                    placeholder="Harga"
                    className="w-full border rounded px-3 py-2"
                  />
                  <input
                    type="number"
                    name="stok"
                    value={formData.stok}
                    onChange={onChange}
                    placeholder="Stok"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <Button onClick={onClose} className="bg-gray-200 text-black">
                    Batal
                  </Button>
                  <Button onClick={onSubmit}>Simpan</Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
