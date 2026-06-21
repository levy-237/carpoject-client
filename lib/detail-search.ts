import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  type inferParserType,
} from "nuqs/server";

export type BooleanFilterValue = "" | "true" | "false";

export type DetailSearchId = number;

export const parseAsIdArray = parseAsArrayOf(parseAsInteger).withDefault([]);

export const sideBarSearchParsers = {
  search: parseAsString.withDefault(""),
  ordering: parseAsString.withDefault(""),
  brand: parseAsIdArray,
  body: parseAsIdArray,
  model: parseAsIdArray,
  modeltrim: parseAsIdArray,
  drivetrain: parseAsIdArray,
  province: parseAsIdArray,
  minprice: parseAsString.withDefault(""),
  maxprice: parseAsString.withDefault(""),
  minmileage: parseAsString.withDefault(""),
  maxmileage: parseAsString.withDefault(""),
  mindate: parseAsString.withDefault(""),
  maxdate: parseAsString.withDefault(""),
};

export const detailSearchParsers = {
  search: parseAsString.withDefault(""),
  ordering: parseAsString.withDefault(""),
  brand: parseAsIdArray,
  body: parseAsIdArray,
  model: parseAsIdArray,
  modeltrim: parseAsIdArray,
  condition: parseAsIdArray,
  drivetrain: parseAsIdArray,
  city: parseAsIdArray,
  province: parseAsIdArray,
  minprice: parseAsString.withDefault(""),
  maxprice: parseAsString.withDefault(""),
  minmileage: parseAsString.withDefault(""),
  maxmileage: parseAsString.withDefault(""),
  minpower: parseAsString.withDefault(""),
  maxpower: parseAsString.withDefault(""),
  minbattery: parseAsString.withDefault(""),
  maxbattery: parseAsString.withDefault(""),
  minfactoryrange: parseAsString.withDefault(""),
  maxfactoryrange: parseAsString.withDefault(""),
  minsummerrange: parseAsString.withDefault(""),
  maxsummerrange: parseAsString.withDefault(""),
  minwinterrange: parseAsString.withDefault(""),
  maxwinterrange: parseAsString.withDefault(""),
  minaccharging: parseAsString.withDefault(""),
  mindccharging: parseAsString.withDefault(""),
  maxfastcharginmin: parseAsString.withDefault(""),
  mindate: parseAsString.withDefault(""),
  maxdate: parseAsString.withDefault(""),
  garantie: parseAsStringLiteral(["true", "false"] as const),
  pickerl: parseAsStringLiteral(["true", "false"] as const),
  heatpump: parseAsStringLiteral(["true", "false"] as const),
};

export type DetailSearchFormState = inferParserType<typeof detailSearchParsers>;

export const ORDERING_OPTIONS = [
  { value: "", label: "Standard" },
  { value: "price", label: "Preis (aufsteigend)" },
  { value: "-price", label: "Preis (absteigend)" },
  { value: "makeyear", label: "Baujahr (aufsteigend)" },
  { value: "-makeyear", label: "Baujahr (absteigend)" },
  { value: "mileage", label: "Kilometerstand (aufsteigend)" },
  { value: "-mileage", label: "Kilometerstand (absteigend)" },
  { value: "publish_date", label: "Veröffentlichung (älteste zuerst)" },
  { value: "-publish_date", label: "Veröffentlichung (neueste zuerst)" },
] as const;

export function toBooleanFilterValue(
  value: "true" | "false" | null,
): BooleanFilterValue {
  return value ?? "";
}

export function fromBooleanFilterValue(
  value: BooleanFilterValue,
): "true" | "false" | null {
  if (value === "true" || value === "false") return value;
  return null;
}

export function getDefaultSideBarSearchFormState(): inferParserType<
  typeof sideBarSearchParsers
> {
  return {
    search: "",
    ordering: "",
    brand: [],
    body: [],
    model: [],
    modeltrim: [],
    drivetrain: [],
    province: [],
    minprice: "",
    maxprice: "",
    minmileage: "",
    maxmileage: "",
    mindate: "",
    maxdate: "",
  };
}

export function getDefaultDetailSearchFormState(): DetailSearchFormState {
  return {
    search: "",
    ordering: "",
    brand: [],
    body: [],
    model: [],
    modeltrim: [],
    condition: [],
    drivetrain: [],
    city: [],
    province: [],
    minprice: "",
    maxprice: "",
    minmileage: "",
    maxmileage: "",
    minpower: "",
    maxpower: "",
    minbattery: "",
    maxbattery: "",
    minfactoryrange: "",
    maxfactoryrange: "",
    minsummerrange: "",
    maxsummerrange: "",
    minwinterrange: "",
    maxwinterrange: "",
    minaccharging: "",
    mindccharging: "",
    maxfastcharginmin: "",
    mindate: "",
    maxdate: "",
    garantie: null,
    pickerl: null,
    heatpump: null,
  };
}

export function formFiltersToUrlState(formFilters: DetailSearchFormState) {
  return {
    search: formFilters.search || null,
    ordering: formFilters.ordering || null,
    brand: formFilters.brand.length > 0 ? formFilters.brand : null,
    body: formFilters.body.length > 0 ? formFilters.body : null,
    model: formFilters.model.length > 0 ? formFilters.model : null,
    modeltrim: formFilters.modeltrim.length > 0 ? formFilters.modeltrim : null,
    condition: formFilters.condition.length > 0 ? formFilters.condition : null,
    drivetrain:
      formFilters.drivetrain.length > 0 ? formFilters.drivetrain : null,
    city: formFilters.city.length > 0 ? formFilters.city : null,
    province: formFilters.province.length > 0 ? formFilters.province : null,
    minprice: formFilters.minprice || null,
    maxprice: formFilters.maxprice || null,
    minmileage: formFilters.minmileage || null,
    maxmileage: formFilters.maxmileage || null,
    minpower: formFilters.minpower || null,
    maxpower: formFilters.maxpower || null,
    minbattery: formFilters.minbattery || null,
    maxbattery: formFilters.maxbattery || null,
    minfactoryrange: formFilters.minfactoryrange || null,
    maxfactoryrange: formFilters.maxfactoryrange || null,
    minsummerrange: formFilters.minsummerrange || null,
    maxsummerrange: formFilters.maxsummerrange || null,
    minwinterrange: formFilters.minwinterrange || null,
    maxwinterrange: formFilters.maxwinterrange || null,
    minaccharging: formFilters.minaccharging || null,
    mindccharging: formFilters.mindccharging || null,
    maxfastcharginmin: formFilters.maxfastcharginmin || null,
    mindate: formFilters.mindate || null,
    maxdate: formFilters.maxdate || null,
    garantie: formFilters.garantie,
    pickerl: formFilters.pickerl,
    heatpump: formFilters.heatpump,
  };
}

export function getResetDetailSearchState() {
  return {
    search: null,
    ordering: null,
    brand: null,
    body: null,
    model: null,
    modeltrim: null,
    condition: null,
    drivetrain: null,
    city: null,
    province: null,
    minprice: null,
    maxprice: null,
    minmileage: null,
    maxmileage: null,
    minpower: null,
    maxpower: null,
    minbattery: null,
    maxbattery: null,
    minfactoryrange: null,
    maxfactoryrange: null,
    minsummerrange: null,
    maxsummerrange: null,
    minwinterrange: null,
    maxwinterrange: null,
    minaccharging: null,
    mindccharging: null,
    maxfastcharginmin: null,
    mindate: null,
    maxdate: null,
    garantie: null,
    pickerl: null,
    heatpump: null,
  } as const;
}

export function fromFilterToApiUrlSearch(filters: number[]): string {
  const idArr = filters.join(",");

  return `?relation=${idArr}`;
}
