import { memo } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { getOptionValue } from "../../utils";
import type { CreditInfo } from "../../types";

interface Props {
  agreements: CreditInfo[];
  selectedAgreement: CreditInfo;
  onSelectAgreement: (value: CreditInfo) => void;
}

const CustomSelect: React.FC<Props> = ({
  agreements,
  selectedAgreement,
  onSelectAgreement,
}) => {
  return (
    <Listbox
      value={selectedAgreement}
      onChange={onSelectAgreement}
    >
      {({ open }) => (
        <div className="relative">
          <ListboxButton
            className={`no-radius-transition w-full border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
            ${open ? "rounded-t-md rounded-b-none" : "rounded-md"}`}
          >
            {getOptionValue(
              selectedAgreement.instalment_count,
              selectedAgreement.instalment_total.string,
            )}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              {open ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              )}
            </span>
          </ListboxButton>

          <ListboxOptions className="absolute z-10 max-h-60 w-full overflow-auto rounded-bl-md rounded-br-md border border-t-0 border-gray-200 bg-white text-sm shadow-lg focus:outline-none">
            {agreements
              .filter(
                (plan) =>
                  plan.instalment_count !== selectedAgreement.instalment_count,
              )
              .map((plan) => (
                <ListboxOption
                  key={plan.instalment_count}
                  value={plan}
                  className={({ active }) =>
                    `text-left cursor-pointer select-none px-4 py-2 ${
                      active ? "bg-blue-100" : ""
                    }`
                  }
                >
                  {getOptionValue(
                    plan.instalment_count,
                    plan.instalment_total.string,
                  )}
                </ListboxOption>
              ))}
          </ListboxOptions>
        </div>
      )}
    </Listbox>
  );
};

export default memo(CustomSelect);
