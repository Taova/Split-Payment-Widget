import { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import type { CreditInfo } from "../../types";

// TODO: fix types
interface CustomSelect {
  plans: CreditInfo[];
  selectedPlan: CreditInfo;
  setSelectedPlan: any;
}

const getOptionValue = (count: number, amount: string): string => {
  return `${count} cuotas de ${amount}/mes`;
};

const CustomSelect: React.FC<CustomSelect> = ({
  plans,
  selectedPlan,
  setSelectedPlan,
}) => {
  const [open, setOpen] = useState(false);
  console.log(selectedPlan, "selectedPlan");

  return (
    <Listbox value={selectedPlan} onChange={setSelectedPlan}>
      <div className="relative">
        <ListboxButton
          className={`no-radius-transition w-full border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
            ${open ? "rounded-t-md rounded-b-none" : "rounded-md"}`}
          onClick={() => setOpen((prev) => !prev)}
        >
          {getOptionValue(
            selectedPlan.instalment_count,
            selectedPlan.instalment_total.string,
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
          {plans
            .filter(
              (plan) => plan.instalment_count !== selectedPlan.instalment_count,
            )
            .map((plan) => (
              <ListboxOption
                key={plan.instalment_count}
                value={plan}
                onClick={() => setOpen((prev) => !prev)}
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
    </Listbox>
  );
};

export default CustomSelect;
