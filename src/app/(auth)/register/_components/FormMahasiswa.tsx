"use client";
import { useForm, FormProvider } from "react-hook-form";
import Button from "@/components/buttons/Button";
import LabelText from "@/components/form/LabelText";
import Input from "@/components/form/Input";

type RegisterFormValues = {
  name: string;
  nrp: string;
  telephone: string;
  email: string;
  password: string;
};

const FormMahasiswa = () => {
  const methods = useForm<RegisterFormValues>();

  const onSubmit = (_data: RegisterFormValues) => {
    // console.log("Register data:", data);
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <LabelText labelTextClasname="text-sm font-medium">
            Nama Lengkap
          </LabelText>
          <Input
            id="name"
            placeholder="Masukkan nama lengkap"
            className="w-full"
            validation={{ required: "Nama wajib diisi" }}
          />
        </div>

        <div className="space-y-2">
          <LabelText labelTextClasname="text-sm font-medium">NRP</LabelText>
          <Input
            id="nrp"
            type="text"
            inputMode="numeric"
            placeholder="Masukkan nrp"
            className="w-full"
            validation={{ required: "NRP wajib diisi" }}
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

export default FormMahasiswa;
