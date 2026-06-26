import type { DetailSearchFormState } from "@/lib/detail-search";

const PRIMARY_FILTERS = [
  "brand",
  "body",
  "model",
  "modeltrim",
  "condition",
  "drivetrain",
  "province",
  "minprice",
  "maxprice",
  "minmileage",
  "maxmileage",
  "minpower",
  "mindate",
  "maxdate",
];

export function allActiveFiltersCount(filters: DetailSearchFormState): number {
  let count = 0;

  for (const [key, value] of Object.entries(filters)) {
    if (key === "ordering" || key === "offset") continue;

    if (value !== "" && value && value?.length > 0) {
      count++;
    }
  }

  return count;
}

export function secondaryActiveFiltersCount(
  filters: DetailSearchFormState,
): number {
  let count = 0;

  for (const [key, value] of Object.entries(filters)) {
    if (key === "ordering" || key === "offset") continue;

    if (
      !PRIMARY_FILTERS.includes(key) &&
      value !== "" &&
      value &&
      value?.length > 0
    ) {
      count++;
    }
  }

  return count;
}
