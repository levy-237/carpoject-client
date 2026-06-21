"use client";

import { useState } from "react";
import DropDownFilter, { type SelectedFilterIds } from "./DropDownFilter";
import DetailSearchModal from "./DetailSearchModal";
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
            onClick={() => {}}
            searchable
          />
          <DropDownFilter
            apiName="cars/models"
            name="Modell"
            value={selectedModels}
            onChange={setSelectedModels}
            disabled={selectedBrands.length === 0}
            onClick={() => {}}
            searchable
          />
          <DropDownFilter
            apiName="cars/trims"
            name="Trim"
            value={selectedTrims}
            disabled={selectedModels.length === 0}
            onChange={setSelectedTrims}
            onClick={() => {}}
            searchable
          />
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <DropDownFilter
            apiName="cars/body-types"
            name="Karosserie"
            value={selectedBodyTypes}
            onChange={setSelectedBodyTypes}
            onClick={() => {}}
            searchable
          />

          <DropDownFilter
            apiName="province"
            name="Bundesland"
            value={selectedProvince}
            onChange={setSelectedProvince}
            onClick={() => {}}
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
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Zurücksetzen
          </button>

          <DetailSearchModal />
        </div>
      </div>
    </section>
  );
}
