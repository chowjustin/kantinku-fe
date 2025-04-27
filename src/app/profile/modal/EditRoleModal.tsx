import { UpdateUserRequest } from "@/types/user";
import { Dialog, DialogPanel } from "@headlessui/react";
import clsxm from "@/lib/clsxm";
import { X } from "lucide-react";
import Button from "@/components/buttons/Button";
import { Controller, FormProvider, useForm } from "react-hook-form";
import LabelText from "@/components/form/LabelText";
import TOption from "@/components/table/TOption";

interface EditRoleModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  type?: string;
  mutate: (data: UpdateUserRequest) => void;
  isPending: boolean;
}

export default function EditRoleModal({
  isOpen,
  setIsOpen,
  mutate,
  isPending,
}: EditRoleModalProps) {
  const methods = useForm<UpdateUserRequest>({
    mode: "onChange",
  });
  const { handleSubmit, control } = methods;

  const onSubmit = (data: UpdateUserRequest) => {
    mutate(data);
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black/20 pr-4 max-md:pl-4">
        <DialogPanel
          className={clsxm(
            "bg-white relative shadow-lg text-gray-900 rounded-lg p-6 w-[30%] max-lg:w-[40%] max-md:w-1/2 max-sm:w-full",
          )}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X strokeWidth={2.5} size={20} />
          </button>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2 mb-4 w-full">
                <LabelText>Edit Role</LabelText>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Role harus dipilih" }}
                  render={({ field }) => (
                    <>
                      <TOption
                        value={field.value}
                        title=""
                        onChange={(selectedValue) => {
                          field.onChange(selectedValue);
                        }}
                        options={roleOptions}
                      />
                    </>
                  )}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                >
                  Batal
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

const roleOptions = [
  { value: "canteen", label: "Kantin" },
  { value: "tenant", label: "Tenant" },
  { value: "student", label: "Mahasiswa" },
];
