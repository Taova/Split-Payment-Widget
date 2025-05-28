import { useEffect, useState } from "react";
import CustomSelect from "../CustomSelect";

import { fetchCreditAgreement, logEvent } from "../../api";

const plans = [
  { id: 1, name: "3 cuotas de 53,00 €/mes" },
  { id: 2, name: "6 cuotas de 28,00 €/mes" },
  { id: 3, name: "12 cuotas de 15,50 €/mes" },
];

interface Props {
  price: number;
  onOpenModal: any;
}

const Widget: React.FC<Props> = ({ price, onOpenModal }) => {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);

  return (
    <div className="w-[320px] border rounded-md px-4 py-3 shadow-sm bg-white">
      <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
        <span>Págalo en</span>
        <button
          type="button"
          onClick={onOpenModal}
          className="text-blue-600 hover:underline focus:outline-none cursor-pointer bg-transparent border-0 p-0"
        >
          Más info
        </button>
      </div>
      <CustomSelect
        plans={plans}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
      />
    </div>
  );
};

export default Widget;
