import { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

// TODO: fix types
interface CustomSelect {
  plans: any;
  selectedPlan: any;
  setSelectedPlan: any;
}

const CustomSelect: React.FC<CustomSelect> = ({
  plans,
  selectedPlan,
  setSelectedPlan,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Listbox value={selectedPlan} onChange={setSelectedPlan}>
      <div className="relative">
        <ListboxButton
          className="w-full rounded-tl-md rounded-tr-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          onClick={() => setOpen((prev) => !prev)}
        >
          {selectedPlan.name}
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
            .filter((plan) => plan.id !== selectedPlan.id)
            .map((plan) => (
              <ListboxOption
                key={plan.id}
                value={plan}
                className={({ active }) =>
                  `text-left cursor-pointer select-none px-4 py-2 ${
                    active ? "bg-blue-100" : ""
                  }`
                }
              >
                {plan.name}
              </ListboxOption>
            ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default CustomSelect;
