import type { Path, UseFormRegister } from "react-hook-form";
import type { AddListingFormValues } from "@/schemas/schema";
import FieldError from "./FieldError";

const textareaClass =
  "min-h-28 w-full resize-y rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-400";

type FormTextareaProps = {
  label: string;
  name: Path<AddListingFormValues>;
  register: UseFormRegister<AddListingFormValues>;
  placeholder?: string;
  error?: string;
};

export default function FormTextarea({
  label,
  name,
  register,
  placeholder,
  error,
}: FormTextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
        {label}
        <textarea
          placeholder={placeholder}
          {...register(name, {
            setValueAs: (value: string) => (value === "" ? undefined : value),
          })}
          className={textareaClass}
        />
      </label>
      <FieldError message={error} />
    </div>
  );
}
