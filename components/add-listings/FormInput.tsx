import type { Path, UseFormRegister } from "react-hook-form";
import type { AddListingFormValues } from "@/types/listings";
import FieldError from "./FieldError";

const inputClass =
  "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-400";

type FormInputProps = {
  label: string;
  name: Path<AddListingFormValues>;
  register: UseFormRegister<AddListingFormValues>;
  type?: "text" | "number" | "date";
  placeholder?: string;
  error?: string;
};

export default function FormInput({
  label,
  name,
  register,
  type = "text",
  placeholder,
  error,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
        {label}
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, {
            ...(type === "number"
              ? {
                  setValueAs: (value: string) => {
                    if (value === "") return undefined;
                    const numberValue = Number(value);
                    return Number.isNaN(numberValue) ? undefined : numberValue;
                  },
                }
              : {}),
          })}
          className={inputClass}
        />
      </label>
      <FieldError message={error} />
    </div>
  );
}
