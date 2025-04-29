"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormMahasiswa from "@/app/(auth)/register/components/FormMahasiswa";
import FormTenant from "@/app/(auth)/register/components/FormTenant";

const Register = () => {
  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col w-1/2 h-screen bg-[#243E80] items-center justify-center gap-8 fixed left-0 top-0 z-10">
        <Image
          src="/images/ImageLogin.png"
          width={1000}
          height={1000}
          alt="Background"
          className="object-cover object-center z-10 w-60 h-60"
          priority
        />
        <div className="flex flex-col gap-2">
          <p className="text-white text-2xl font-bold">Welcome to Kantinku!</p>
          <p className="text-white text-xl font-medium">
            Quick Meals, Happy Deals!
          </p>
        </div>
      </div>

      <div className="relative flex flex-col justify-end w-full md:w-1/2 h-full p-6 lg:p-8 bg-cover bg-center bg-white ml-auto z-20">
        <div className="bg-typo-white w-full px-12">
          <Image
            src="/images/LogoKantinku.png"
            width={1000}
            height={1000}
            alt="Logo"
            className="object-contain w-40 mb-4 mx-auto"
            priority
          />

          <div className="mb-4 space-y-2">
            <h1 className="text-2xl font-semibold">Daftar</h1>
            <p className="text-md text-typo-secondary">
              Silahkan buat akun anda
            </p>
          </div>

          <Tabs
            defaultValue="mahasiswa"
            className="flex flex-col items-center gap-8 w-full"
          >
            <TabsList className="flex flex-col md:flex-row gap-2 p-2 bg-zinc-200 h-fit w-full">
              <TabsTrigger
                value="mahasiswa"
                className="p-3 bg-zinc-100 px-[56px] w-full"
              >
                Mahasiswa
              </TabsTrigger>

              <TabsTrigger
                value="tenant"
                className="p-3 bg-zinc-100 px-[56px] w-full"
              >
                Tenant
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mahasiswa" className="w-full mt-0">
              <FormMahasiswa />
            </TabsContent>

            <TabsContent value="tenant" className="w-full mt-0">
              <FormTenant />
            </TabsContent>
          </Tabs>

          <div className="text-center my-4">
            <p className="text-md">
              Sudah punya akun?{" "}
              <a
                href="/login"
                className="text-[#243E80] hover:underline font-bold"
              >
                Masuk
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
