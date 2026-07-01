"use client";

import { updateProfile } from "@/actions/authActions";
import FieldError from "@/components/add-listings/FieldError";
import SingleSelectFilter from "@/components/filters/SingleSelectFilter";
import { UpdateProfileFormValues, UpdateProfileSchema } from "@/schemas/users";
import type { UserProfile } from "@/types/users";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";

const inputClass =
  "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-400";

function userToFormValues(user: UserProfile): UpdateProfileFormValues {
  return {
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    phone: user.phone,
    streetname_number: user.streetname_number,
    province: user.province,
    city: user.city,
    isCompany: !user.is_private,
    company_name: user.company_name ?? "",
    picture_file: undefined,
  };
}

export default function EditProfileForm({ user }: { user: UserProfile }) {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: userToFormValues(user),
  });

  const province = useWatch({ control, name: "province" });
  const isCompany = useWatch({ control, name: "isCompany" });

  const cityApiName = province ? `city?relation=${province}` : "city";

  async function onSubmit(data: UpdateProfileFormValues) {
    const result = await updateProfile({ data, id: user.id });

    if (!result.success) {
      setError("root", { message: result.message });
      return;
    }

    router.push("/me");
    router.refresh();
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex flex-col gap-4"
    >
      {errors.root && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
          {errors.root.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
          Vorname
          <input
            type="text"
            placeholder="John"
            className={inputClass}
            {...register("first_name")}
          />
          <FieldError message={errors.first_name?.message} />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
          Nachname
          <input
            type="text"
            placeholder="Doe"
            className={inputClass}
            {...register("last_name")}
          />
          <FieldError message={errors.last_name?.message} />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
        Benutzername
        <input
          type="text"
          placeholder="johndoe"
          className={inputClass}
          {...register("username")}
        />
        <FieldError message={errors.username?.message} />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
        Telefon
        <input
          type="tel"
          placeholder="+43123456789"
          className={inputClass}
          {...register("phone")}
        />
        <FieldError message={errors.phone?.message} />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
        Straße & Hausnummer
        <input
          type="text"
          placeholder="Main St 12"
          className={inputClass}
          {...register("streetname_number")}
        />
        <FieldError message={errors.streetname_number?.message} />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Controller
          name="province"
          control={control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-2">
              <SingleSelectFilter
                apiName="province"
                label="Bundesland"
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  resetField("city");
                }}
                placeholder="Bundesland wählen"
              />
              <FieldError message={fieldState.error?.message} />
            </div>
          )}
        />

        <Controller
          key={province ?? "no-province"}
          name="city"
          control={control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-2">
              <SingleSelectFilter
                apiName={cityApiName}
                label="Stadt"
                value={field.value}
                onChange={field.onChange}
                disabled={!province}
                placeholder="Stadt wählen"
              />
              <FieldError message={fieldState.error?.message} />
            </div>
          )}
        />
      </div>

      <Controller
        name="isCompany"
        control={control}
        render={({ field }) => (
          <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={field.value ?? false}
              onChange={(event) => {
                const checked = event.target.checked;
                field.onChange(checked);
                if (!checked) {
                  setValue("company_name", "");
                }
              }}
              className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-400"
            />
            Ich bin ein Unternehmen
          </label>
        )}
      />

      {isCompany && (
        <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
          Firmenname
          <input
            type="text"
            placeholder="Meine Firma GmbH"
            className={inputClass}
            {...register("company_name")}
          />
          <FieldError message={errors.company_name?.message} />
        </label>
      )}

      <Controller
        name="picture_file"
        control={control}
        render={({ field: { onChange, ref, name, onBlur } }) => (
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Profilbild
            <input
              type="file"
              accept="image/*"
              name={name}
              ref={ref}
              onBlur={onBlur}
              onChange={(event) =>
                onChange(event.target.files?.[0] ?? undefined)
              }
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-gray-700"
            />
          </label>
        )}
      />

      <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/me"
          className="text-center text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
        >
          Abbrechen
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700 disabled:opacity-60 sm:min-w-48"
        >
          {isSubmitting ? "Wird gespeichert..." : "Änderungen speichern"}
        </button>
      </div>
    </form>
  );
}
