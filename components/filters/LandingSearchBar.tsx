"use client";

import { useState } from "react";
import DropDownFilter, { type SelectedFilterIds } from "./DropDownFilter";
import DetailSearchModal from "./DetailSearchModal";
import FiltersDelete from "./FiltersDelete";
import SearchBar from "./SearchBar";

export default function LandingSearchBar() {
  const [selectedBrands, setSelectedBrands] = useState<SelectedFilterIds>([]);
  const [selectedModels, setSelectedModels] = useState<SelectedFilterIds>([]);
  const [selectedTrims, setSelectedTrims] = useState<SelectedFilterIds>([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<SelectedFilterIds>(
    [],
  );

  const [selectedProvince, setSelectedProvince] = useState<SelectedFilterIds>(
    [],
  );

  const handleReset = () => {
    setSelectedBrands([]);
    setSelectedModels([]);
    setSelectedTrims([]);
    setSelectedBodyTypes([]);
    setSelectedProvince([]);
  };

  return (
    <section className="flex h-fit items-center justify-center px-4 py-30 max-md:hidden max-md:py-5">
      <div className="w-full max-w-4xl rounded-3xl border border-gray-200 bg-white p-10 shadow-lg">
        <SearchBar onChange={() => {}} />

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <DropDownFilter
            apiName="cars/brands"
            name="Marke"
            value={selectedBrands}
            onChange={setSelectedBrands}
            searchable
          />
          <DropDownFilter
            apiName="cars/models"
            name="Modell"
            value={selectedModels}
            onChange={setSelectedModels}
            disabled={selectedBrands.length === 0}
            searchable
          />
          <DropDownFilter
            apiName="cars/trims"
            name="Trim"
            value={selectedTrims}
            disabled={selectedModels.length === 0}
            onChange={setSelectedTrims}
            searchable
          />
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <DropDownFilter
            apiName="cars/body-types"
            name="Karosserie"
            value={selectedBodyTypes}
            onChange={setSelectedBodyTypes}
            searchable
          />

          <DropDownFilter
            apiName="province"
            name="Bundesland"
            value={selectedProvince}
            onChange={setSelectedProvince}
            searchable={false}
          />
          <div className="w-full flex justify-center">
            <button
              type="button"
              className="w-[70%]  rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700"
            >
              Suchen
            </button>
          </div>
        </div>

        <div className="mt-3 flex justify-end gap-4">
          <FiltersDelete onReset={handleReset} />
          <DetailSearchModal />
        </div>
      </div>
    </section>
  );
}
