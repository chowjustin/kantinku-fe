"use client";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import useCreateMahasiswaMutation, {
  CreateMahasiswaRequest,
} from "@/app/hooks/useCreateMahasiswaMutation";
import * as React from "react";

const FormMahasiswa = () => {
  const methods = useForm<CreateMahasiswaRequest>();

  const { mutate: createUser, isPending } = useCreateMahasiswaMutation();

  const onSubmit = (data: CreateMahasiswaRequest) => {
    createUser(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
        <Input
          id="nama"
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap"
          className="w-full"
          validation={{ required: "Nama wajib diisi" }}
        />

        <Input
          id="nrp"
          type="text"
          label="NRP"
          inputMode="numeric"
          placeholder="Masukkan NRP"
          className="w-full"
          validation={{ required: "NRP wajib diisi" }}
        />

        <Input
          id="nomor_telepon"
          label="Nomor Telepon"
          placeholder="Masukkan nomor telepon"
          className="w-full"
          validation={{ required: "Nomor telepon wajib diisi" }}
        />

        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="Masukkan email"
          className="w-full"
          validation={{ required: "Email wajib diisi" }}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Masukkan kata sandi"
          className="w-full"
          validation={{ required: "Kata sandi wajib diisi" }}
        />

        <Button
          type="submit"
          isLoading={isPending}
          className="w-full bg-primary-main hover:bg-primary-hover border-none"
        >
          {isPending ? "Memproses..." : "Daftar"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default FormMahasiswa;
