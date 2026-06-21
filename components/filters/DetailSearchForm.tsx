"use client";

import { usePathname, useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";
import { createSerializer } from "nuqs/server";
import DetailSearchFormFields from "./DetailSearchFormFields";
import {
  detailSearchParsers,
  formFiltersToUrlState,
  getResetDetailSearchState,
  type DetailSearchFormState,
} from "@/lib/detail-search";

const serializeDetailSearch = createSerializer(detailSearchParsers);

type DetailSearchFormProps = {
  onClose?: () => void;
};

export default function DetailSearchForm({ onClose }: DetailSearchFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [urlFilters, setUrlFilters] = useQueryStates(detailSearchParsers, {
    history: "push",
  });

  function handleSubmit(formFilters: DetailSearchFormState) {
    const nextState = formFiltersToUrlState(formFilters);

    if (pathname === "/listings") {
      setUrlFilters(nextState);
    } else {
      router.push(`/listings${serializeDetailSearch(nextState)}`);
    }

    onClose?.();
  }

  function handleReset() {
    if (pathname === "/listings") {
      setUrlFilters(getResetDetailSearchState());
    }
  }

  return (
    <DetailSearchFormFields
      key={serializeDetailSearch(urlFilters)}
      initialFormFilters={urlFilters}
      onSubmitFormFilters={handleSubmit}
      onResetFormFilters={handleReset}
    />
  );
}
