"use client";

import { useForm, FormProvider } from "react-hook-form";
import Button from "@/components/buttons/Button";
import LabelText from "@/components/form/LabelText";
import Input from "@/components/form/Input";
import SelectInput from "@/components/form/SelectInput";

type RegisterFormValues = {
  canteen_id?: string;
  canteen_name?: string;
  owner_name: string;
  tenant_name: string;
  telephone: string;
  email: string;
  password: string;
};

const FormTenant = () => {
  const methods = useForm<RegisterFormValues>();
  const canteenOptions = [
    { value: "34aa8d43-7025-4352-b7a8-7a7534d9580a", label: "Kantin A" },
    { value: "other", label: "Lainnya" },
  ];

  const onSubmit = (data: RegisterFormValues) => {
    // console.log("Register data:", data);
  };

  const canteenId = methods.watch("canteen_id");
  const showCanteenNameInput = canteenId === "other";

  return (
    <FormProvider {...methods}>
      <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <LabelText labelTextClasname="text-sm font-medium">
            Pilih Kantin
          </LabelText>

          <SelectInput
            id="canteen_id"
            label={null}
            placeholder="Pilih kantin"
            options={canteenOptions}
            isClearable={false}
          />

          {showCanteenNameInput && (
            <div className="space-y-2">
              <LabelText labelTextClasname="text-sm font-medium">
                Nama Kantin
              </LabelText>
              <Input
                id="canteen_name"
                placeholder="Masukkan nama kantin"
                {...methods.register("canteen_name", {
                  required: "Nama kantin wajib diisi",
                })}
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <LabelText labelTextClasname="text-sm font-medium">
            Nama Lengkap
          </LabelText>
          <Input
            id="owner_name"
            placeholder="Masukkan nama lengkap"
            className="w-full"
            validation={{ required: "Nama wajib diisi" }}
          />
        </div>

        <div className="space-y-2">
          <LabelText labelTextClasname="text-sm font-medium">
            Nama Tenant
          </LabelText>
          <Input
            id="tenant_name"
            placeholder="Masukkan nama tenant"
            className="w-full"
            validation={{ required: "Nama Tenant wajib diisi" }}
          />
        </div>

        <div className="space-y-2">
          <LabelText labelTextClasname="text-sm font-medium">
            Nomor Telepon
          </LabelText>
          <Input
            id="telephone"
            type="telp"
            placeholder="Masukkan nomor telepon"
            className="w-full"
            validation={{ required: "Nomor wajib diisi" }}
          />
        </div>

        <div className="space-y-2">
          <LabelText labelTextClasname="text-sm font-medium">Email</LabelText>
          <Input
            id="email"
            type="email"
            placeholder="Masukkan email"
            className="w-full"
            validation={{ required: "Email wajib diisi" }}
          />
        </div>

        <div className="space-y-2">
          <LabelText labelTextClasname="text-sm font-medium">
            Password
          </LabelText>
          <Input
            id="password"
            type="password"
            placeholder="Masukkan kata sandi"
            className="w-full"
            validation={{ required: "Kata sandi wajib diisi" }}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#243E80] hover:bg-[#17306D] border-none"
        >
          Masuk
        </Button>
      </form>
    </FormProvider>
  );
};

export default FormTenant;
