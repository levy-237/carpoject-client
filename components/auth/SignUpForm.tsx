"use client";

import { signUp } from "@/actions/authActions";
import SingleSelectFilter from "@/components/filters/SingleSelectFilter";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";

const inputClass =
  "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-400";

type SignUpFormValues = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  streetname_number: string;
  province: number | null;
  city: number | null;
  isCompany: boolean;
  company_name: string;
  picture_file: File | null;
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <span className="text-xs font-normal text-red-600">{message}</span>;
}

export default function SignUpForm() {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      streetname_number: "",
      province: null,
      city: null,
      isCompany: false,
      company_name: "",
      picture_file: null,
    },
  });

  const province = useWatch({ control, name: "province" });
  const isCompany = useWatch({ control, name: "isCompany" });

  const cityApiName = province ? `city?relation=${province}` : "city";

  async function onSubmit(data: SignUpFormValues) {
    const formData = new FormData();
    formData.append("username", data.username.trim());
    formData.append("password", data.password);
    formData.append("first_name", data.first_name.trim());
    formData.append("last_name", data.last_name.trim());
    formData.append("email", data.email.trim());
    formData.append("province", String(data.province));
    formData.append("city", String(data.city));
    formData.append("is_private", data.isCompany ? "false" : "true");
    formData.append("phone", data.phone.trim());
    formData.append("streetname_number", data.streetname_number.trim());

    if (data.isCompany) {
      formData.append("company_name", data.company_name.trim());
    }

    if (data.picture_file) {
      formData.append("picture_file", data.picture_file);
    }

    const result = await signUp(formData);

    if (!result.success) {
      setError("root", { message: result.message });
      return;
    }

    router.push("/login");
  }

  return (
    <form
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
            {...register("first_name", {
              required: "Vorname ist erforderlich.",
            })}
          />
          <FieldError message={errors.first_name?.message} />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
          Nachname
          <input
            type="text"
            placeholder="Doe"
            className={inputClass}
            {...register("last_name", {
              required: "Nachname ist erforderlich.",
            })}
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
          {...register("username", {
            required: "Benutzername ist erforderlich.",
          })}
        />
        <FieldError message={errors.username?.message} />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
        E-Mail
        <input
          type="email"
          placeholder="john@example.com"
          autoComplete="email"
          className={inputClass}
          {...register("email", {
            required: "E-Mail ist erforderlich.",
          })}
        />
        <FieldError message={errors.email?.message} />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
        Passwort
        <input
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          className={inputClass}
          {...register("password", {
            required: "Passwort ist erforderlich.",
          })}
        />
        <FieldError message={errors.password?.message} />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
        Telefon
        <input
          type="tel"
          placeholder="+43123456789"
          className={inputClass}
          {...register("phone", {
            required: "Telefon ist erforderlich.",
          })}
        />
        <FieldError message={errors.phone?.message} />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
        Straße & Hausnummer
        <input
          type="text"
          placeholder="Main St 12"
          className={inputClass}
          {...register("streetname_number", {
            required: "Straße & Hausnummer ist erforderlich.",
          })}
        />
        <FieldError message={errors.streetname_number?.message} />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Controller
          name="province"
          control={control}
          rules={{
            validate: (value) =>
              value !== null || "Bitte wähle ein Bundesland aus.",
          }}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-2">
              <SingleSelectFilter
                apiName="province"
                label="Bundesland"
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  setValue("city", null);
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
          rules={{
            validate: (value) =>
              value !== null || "Bitte wähle eine Stadt aus.",
          }}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-2">
              <SingleSelectFilter
                apiName={cityApiName}
                label="Stadt"
                value={field.value}
                onChange={field.onChange}
                disabled={province === null}
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
              checked={field.value}
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
            {...register("company_name", {
              validate: (value, formValues) =>
                !formValues.isCompany ||
                value.trim() !== "" ||
                "Bitte gib einen Firmennamen an.",
            })}
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
              onChange={(event) => onChange(event.target.files?.[0] ?? null)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-gray-700"
            />
          </label>
        )}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full rounded-full bg-gray-900 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700 disabled:opacity-60"
      >
        {isSubmitting ? "Registrierung..." : "Registrieren"}
      </button>
    </form>
  );
}
