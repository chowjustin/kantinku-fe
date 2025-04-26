"use client";

import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import SelectInput from "@/components/form/SelectInput";
import { FormProvider, useForm } from "react-hook-form";

type SandboxData = {
  sandbox1: string;
  sandbox2?: string;
  sandbox3?: string;
  sandbox4?: string;
  sandbox5?: string;
};

const options = [
  { value: "1", label: "Satu" },
  { value: "2", label: "Dua" },
  { value: "3", label: "Tiga" },
  { value: "4", label: "Empat" },
  { value: "5", label: "Lima" },
];

export default function SandboxPage() {
  const methods = useForm<SandboxData>();

  const { handleSubmit } = methods;

  const onSubmit = (data: SandboxData) => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(data);
  };

  return (
    <section className="flex w-full justify-center items-center my-40">
      <div className="flex flex-col gap-4 w-1/2 max-lg:w-3/4 max-md:w-full max-md:px-8">
        <h1 className="text-center mb-4 text-4xl font-semibold">
          Form Sandbox Page
        </h1>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              id="username"
              type="text"
              label="Username"
              placeholder="admin"
              validation={{ required: "Wajib diisi" }}
            />
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="admin"
              validation={{ required: "Wajib diisi" }}
            />
            <SelectInput
              id="sandbox1"
              label="Required SelectInput"
              options={options}
              placeholder="Pilih opsi"
              isSearchable={false}
              validation={{ required: "SelectInput wajib diisi!" }}
            />
            <SelectInput
              id="sandbox2"
              label="Searchable SelectInput"
              options={options}
              placeholder="Pilih opsi"
            />

            <Button type="submit">Submit</Button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}
