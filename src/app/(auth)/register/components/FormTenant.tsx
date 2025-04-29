"use client";

import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import SelectInput from "@/components/form/SelectInput";
import CoordinateSelector from "@/components/maps/CoordinateSelector";
import * as React from "react";
import toast from "react-hot-toast";
import useCreateTenantMutation, {
  CreateTenantRequest,
} from "@/app/hooks/useCreateTenantMutation";
import useCreateCanteenMutation, {
  CreateCanteenRequest,
} from "@/app/hooks/useCreateCanteenMutation";
import LabelText from "@/components/form/LabelText";
import useGetAllCanteen from "@/app/hooks/useGetAllCanteen";

export type Canteen = {
  id: string;
  departement: string;
  nama: string;
  latitude: string;
  longitude: string;
  created_at: string;
};

type RegisterFormValues = {
  canteen_id?: string;
  canteen_name?: string;
  department?: string;
  owner_name: string;
  tenant_name: string;
  telephone: string;
  email: string;
  password: string;
};

const FormTenant = () => {
  const methods = useForm<RegisterFormValues>();
  const { handleSubmit } = methods;

  const {
    data: canteens,
    isLoading: isLoadingCanteens,
    error: canteensError,
  } = useGetAllCanteen();

  const canteenOptions = React.useMemo(() => {
    const options =
      canteens?.map((canteen: Canteen) => ({
        value: canteen.id,
        label: `${canteen.nama} - ${canteen.departement}`,
      })) || [];
    return [...options, { value: "other", label: "Lainnya" }];
  }, [canteens]);

  const [coordinates, setCoordinates] = React.useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const createCanteenMutation = useCreateCanteenMutation();
  const registerTenantMutation = useCreateTenantMutation();

  const onSubmit = async (formData: RegisterFormValues) => {
    try {
      setIsSubmitting(true);

      const canteenId = formData.canteen_id;
      let finalCanteenId = canteenId;

      if (canteenId === "other") {
        if (!coordinates) {
          toast.error("Silakan pilih lokasi kantin pada peta!");
          setIsSubmitting(false);
          return;
        }

        if (!formData.canteen_name || !formData.department) {
          toast.error("Nama kantin dan departemen wajib diisi!");
          setIsSubmitting(false);
          return;
        }

        const canteenRequest: CreateCanteenRequest = {
          nama: formData.canteen_name,
          departement: formData.department,
          lat: coordinates.lat,
          lng: coordinates.lng,
        };

        try {
          const canteenResponse =
            await createCanteenMutation.mutateAsync(canteenRequest);
          console.log(canteenResponse);
          if (canteenResponse.status && canteenResponse.data) {
            finalCanteenId = canteenResponse.data.id;
          } else {
            toast.error("Gagal membuat kantin!");
            setIsSubmitting(false);
            return;
          }
        } catch (error) {
          console.error("Error creating canteen:", error);
          setIsSubmitting(false);
          return;
        }
      }

      if (!finalCanteenId) {
        toast.error("ID Kantin tidak ditemukan!");
        setIsSubmitting(false);
        return;
      }

      const tenantRequest: CreateTenantRequest = {
        nama: formData.owner_name,
        nama_tenant: formData.tenant_name,
        nomor_telepon: formData.telephone,
        email: formData.email,
        password: formData.password,
        canteen_id: finalCanteenId,
      };

      await registerTenantMutation.mutateAsync(tenantRequest);
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("Terjadi kesalahan saat mendaftar!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canteenId = methods.watch("canteen_id");
  const showCanteenForm = canteenId === "other";

  const handleCoordinateChange = (
    coords: { lat: number; lng: number } | null,
  ) => {
    setCoordinates(coords);
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <SelectInput
          id="canteen_id"
          label="Pilih Kantin"
          placeholder={canteensError ? "Gagal memuat kantin" : "Pilih kantin"}
          disabled={isLoadingCanteens}
          isLoading={isLoadingCanteens}
          options={canteenOptions}
          isClearable={false}
        />

        {showCanteenForm && (
          <div className="space-y-4">
            <Input
              label="Nama Kantin"
              id="canteen_name"
              placeholder="Masukkan nama kantin"
              validation={{
                required: "Nama kantin wajib diisi",
              }}
            />
            <Input
              label="Letak Kantin (Departemen)"
              id="department"
              placeholder="Departemen Teknik Informatika"
              validation={{
                required: "Departemen wajib diisi",
              }}
            />
            <div>
              <LabelText required={showCanteenForm}>Lokasi Kantin</LabelText>
              <CoordinateSelector onCoordinateChange={handleCoordinateChange} />
              {showCanteenForm &&
                methods.formState.isSubmitted &&
                !coordinates && (
                  <p className="mt-1 text-sm text-red-500">
                    Lokasi kantin wajib dipilih!
                  </p>
                )}
            </div>
          </div>
        )}

        <Input
          id="owner_name"
          label="Nama Pemilik Tenant"
          placeholder="Masukkan nama pemilik tenant"
          className="w-full"
          validation={{ required: "Nama wajib diisi" }}
        />

        <Input
          id="tenant_name"
          label="Nama Tenant"
          placeholder="Masukkan nama tenant"
          className="w-full"
          validation={{ required: "Nama Tenant wajib diisi" }}
        />

        <Input
          id="telephone"
          label="Nomor Telepon"
          placeholder="Masukkan nomor telepon"
          className="w-full"
          validation={{ required: "Nomor wajib diisi" }}
        />

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Masukkan email"
          className="w-full"
          validation={{ required: "Email wajib diisi" }}
        />

        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Masukkan kata sandi"
          className="w-full"
          validation={{ required: "Kata sandi wajib diisi" }}
        />

        <Button
          type="submit"
          isLoading={
            isSubmitting ||
            createCanteenMutation.isPending ||
            registerTenantMutation.isPending
          }
          className="w-full bg-primary-main hover:bg-primary-hover border-none"
        >
          {isSubmitting ? "Memproses..." : "Daftar"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default FormTenant;
