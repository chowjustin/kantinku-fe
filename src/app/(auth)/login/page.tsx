"use client";

import { useForm, FormProvider } from "react-hook-form";
import Button from "@/components/buttons/Button";
import LabelText from "@/components/form/LabelText";
import Image from "next/image";
import ImageLogin from "../../../../public/images/ImageLogin.png";
import LogoKantinku from "../../../../public/images/LogoKantinku.png";
import Input from "@/components/form/Input";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const methods = useForm<LoginFormValues>();

  const onSubmit = (_data: LoginFormValues) => {
    // console.log("Login data:", data);
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 h-screen">
      <div className="relative hidden md:flex flex-col w-full h-screen bg-[#243E80] rounded-r-3xl items-center justify-center gap-8">
        <Image
          src={ImageLogin}
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

      <div className="relative flex flex-col items-center justify-center w-full h-screen p-6 lg:p-0 bg-cover bg-center lg:bg-none bg-white">
        <div className="bg-typo-white w-full max-w-lg">
          <Image
            src={LogoKantinku}
            alt="Logo"
            className="object-contain w-40 mb-4 mx-auto"
            priority
          />
          <div className="mb-4 space-y-2">
            <h1 className="text-2xl font-semibold">Login</h1>
            <p className="text-md text-typo-secondary">
              Silahkan masuk dengan akun anda
            </p>
          </div>

          <FormProvider {...methods}>
            <form
              className="space-y-4"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <div className="space-y-2">
                <LabelText labelTextClasname="text-sm font-medium">
                  Email
                </LabelText>
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

              <div className="text-center mt-4">
                <p className="text-md">
                  Belum punya akun?{" "}
                  <a
                    href="/register"
                    className="text-[#243E80] hover:underline font-bold"
                  >
                    Daftar
                  </a>
                </p>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;
