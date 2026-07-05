"use client";

import { ChevronDown } from "lucide-react";
import { useState, type FormEvent } from "react";
import DropDownFilter from "./DropDownFilter";
import SearchBar from "./SearchBar";
import RangeInput from "./RangeInput";
import BooleanSelect from "./BooleanSelect";
import FilterSection from "./FilterSection";
import {
  fromBooleanFilterValue,
  fromFilterToApiUrlSearch,
  getDefaultDetailSearchFormState,
  ORDERING_OPTIONS,
  toBooleanFilterValue,
  type DetailSearchFormState,
} from "@/lib/detail-search";
import FormActions from "./FormActions";

export type DetailSearchFormFieldsProps = {
  initialFormFilters: DetailSearchFormState;
  onSubmitFormFilters: (formFilters: DetailSearchFormState) => void;
  onResetFormFilters: () => void;
};

export default function DetailSearchFormFields({
  initialFormFilters,
  onSubmitFormFilters,
  onResetFormFilters,
}: DetailSearchFormFieldsProps) {
  const [formFilters, setFormFilters] = useState(initialFormFilters);

  function patchFormFilters(patch: Partial<DetailSearchFormState>) {
    setFormFilters((prev) => ({ ...prev, ...patch }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmitFormFilters(formFilters);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl rounded-3xl border border-gray-200 bg-white p-8 shadow-lg sm:p-10"
    >
      <div className="mb-6 text-center">
        <h1
          id="detail-search-title"
          className="text-2xl font-semibold text-gray-900"
        >
          Detailsuche
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Alle Filter für eine präzise Fahrzeugsuche
        </p>
      </div>

      <FormActions className="mb-6" />

      <FilterSection title="Suche & Sortierung">
        <div className="grid grid-cols-1 gap-3">
          <SearchBar
            value={formFilters.search}
            onChange={(search) => patchFormFilters({ search })}
          />

          <div className="flex flex-col gap-2">
            <label
              htmlFor="ordering"
              className="text-sm font-medium text-gray-700"
            >
              Sortierung
            </label>
            <div className="relative">
              <select
                id="ordering"
                value={formFilters.ordering}
                onChange={(event) =>
                  patchFormFilters({ ordering: event.target.value })
                }
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium outline-none transition-all duration-200 hover:border-gray-300 hover:shadow-sm focus:border-gray-400"
              >
                {ORDERING_OPTIONS.map((option) => (
                  <option key={option.value || "standard"} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-500"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Fahrzeug">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <DropDownFilter
            apiName="cars/brands"
            name="Marke"
            value={formFilters.brand}
            onChange={(brand) => {
              patchFormFilters({ brand });
              patchFormFilters({ model: [] });
              patchFormFilters({ modeltrim: [] });
            }}
            searchable
          />

          <DropDownFilter
            apiName={`cars/models${fromFilterToApiUrlSearch(formFilters.brand)}`}
            name="Modell"
            value={formFilters.model}
            disabled={formFilters.brand.length === 0}
            onChange={(model) => {
              patchFormFilters({ model });
              patchFormFilters({ modeltrim: [] });
            }}
            searchable
          />
          <DropDownFilter
            apiName={`cars/trims${fromFilterToApiUrlSearch(formFilters.model)}`}
            name="Trim"
            value={formFilters.modeltrim}
            disabled={formFilters.model.length === 0}
            onChange={(modeltrim) => patchFormFilters({ modeltrim })}
            searchable
          />
          <DropDownFilter
            apiName="cars/body-types"
            name="Karosserie"
            value={formFilters.body}
            onChange={(body) => patchFormFilters({ body })}
            searchable
          />
          <DropDownFilter
            apiName="cars/conditions"
            name="Zustand"
            value={formFilters.condition}
            onChange={(condition) => patchFormFilters({ condition })}
            searchable={false}
          />
          <DropDownFilter
            apiName="cars/drive-trains"
            name="Getriebe"
            value={formFilters.drivetrain}
            onChange={(drivetrain) => patchFormFilters({ drivetrain })}
            searchable={false}
          />
        </div>
      </FilterSection>

      <FilterSection title="Baujahr">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <RangeInput
            label="Baujahr"
            minValue={formFilters.mindate}
            maxValue={formFilters.maxdate}
            onMinChange={(mindate) => patchFormFilters({ mindate })}
            onMaxChange={(maxdate) => patchFormFilters({ maxdate })}
            minPlaceholder="Ab Jahr"
            maxPlaceholder="Bis Jahr"
          />
        </div>
      </FilterSection>

      <FilterSection title="Standort">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <DropDownFilter
            apiName="city"
            name="Stadt"
            value={formFilters.city}
            onChange={(city) => patchFormFilters({ city })}
            searchable={false}
          />
          <DropDownFilter
            apiName="province"
            name="Bundesland"
            value={formFilters.province}
            onChange={(province) => patchFormFilters({ province })}
            searchable={false}
          />
        </div>
      </FilterSection>

      <FilterSection title="Preis & Kilometerstand">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <RangeInput
            label="Preis (€)"
            minValue={formFilters.minprice}
            maxValue={formFilters.maxprice}
            onMinChange={(minprice) => patchFormFilters({ minprice })}
            onMaxChange={(maxprice) => patchFormFilters({ maxprice })}
          />
          <RangeInput
            label="Kilometerstand"
            minValue={formFilters.minmileage}
            maxValue={formFilters.maxmileage}
            onMinChange={(minmileage) => patchFormFilters({ minmileage })}
            onMaxChange={(maxmileage) => patchFormFilters({ maxmileage })}
          />
        </div>
      </FilterSection>

      <FilterSection title="Leistung & Batterie">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <RangeInput
            label="Leistung"
            minValue={formFilters.minpower}
            maxValue={formFilters.maxpower}
            onMinChange={(minpower) => patchFormFilters({ minpower })}
            onMaxChange={(maxpower) => patchFormFilters({ maxpower })}
          />
          <RangeInput
            label="Batteriegröße"
            minValue={formFilters.minbattery}
            maxValue={formFilters.maxbattery}
            onMinChange={(minbattery) => patchFormFilters({ minbattery })}
            onMaxChange={(maxbattery) => patchFormFilters({ maxbattery })}
          />
        </div>
      </FilterSection>

      <FilterSection title="Reichweite">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RangeInput
            label="Werkreichweite"
            minValue={formFilters.minfactoryrange}
            maxValue={formFilters.maxfactoryrange}
            onMinChange={(minfactoryrange) =>
              patchFormFilters({ minfactoryrange })
            }
            onMaxChange={(maxfactoryrange) =>
              patchFormFilters({ maxfactoryrange })
            }
          />
          <RangeInput
            label="Sommerreichweite (real)"
            minValue={formFilters.minsummerrange}
            maxValue={formFilters.maxsummerrange}
            onMinChange={(minsummerrange) =>
              patchFormFilters({ minsummerrange })
            }
            onMaxChange={(maxsummerrange) =>
              patchFormFilters({ maxsummerrange })
            }
          />
          <RangeInput
            label="Winterreichweite (real)"
            minValue={formFilters.minwinterrange}
            maxValue={formFilters.maxwinterrange}
            onMinChange={(minwinterrange) =>
              patchFormFilters({ minwinterrange })
            }
            onMaxChange={(maxwinterrange) =>
              patchFormFilters({ maxwinterrange })
            }
          />
        </div>
      </FilterSection>

      <FilterSection title="Laden">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">
              AC-Laden (min.)
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={formFilters.minaccharging}
              onChange={(event) =>
                patchFormFilters({ minaccharging: event.target.value })
              }
              placeholder="Min kW"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">
              DC-Laden (min.)
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={formFilters.mindccharging}
              onChange={(event) =>
                patchFormFilters({ mindccharging: event.target.value })
              }
              placeholder="Min kW"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">
              Schnellladen 20–80% (max.)
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={formFilters.maxfastcharginmin}
              onChange={(event) =>
                patchFormFilters({ maxfastcharginmin: event.target.value })
              }
              placeholder="Max Minuten"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-gray-400"
            />
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Ausstattung">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <BooleanSelect
            label="Garantie"
            value={toBooleanFilterValue(formFilters.garantie)}
            onChange={(value) =>
              patchFormFilters({ garantie: fromBooleanFilterValue(value) })
            }
          />
          <BooleanSelect
            label="Pickerl"
            value={toBooleanFilterValue(formFilters.pickerl)}
            onChange={(value) =>
              patchFormFilters({ pickerl: fromBooleanFilterValue(value) })
            }
          />
          <BooleanSelect
            label="Wärmepumpe"
            value={toBooleanFilterValue(formFilters.heatpump)}
            onChange={(value) =>
              patchFormFilters({ heatpump: fromBooleanFilterValue(value) })
            }
          />
        </div>
      </FilterSection>

      <FormActions className="mt-8" />
    </form>
  );
}
