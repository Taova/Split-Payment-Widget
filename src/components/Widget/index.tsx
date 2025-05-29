import { useState } from "react";
import { logEvent } from "../../api";
import useCreditAgreements from "../../hooks/useCreditAgreements";
import CustomSelect from "../CustomSelect";
import WidgetHeader from "../WidgetHeader";
import InfoModal from "../InfoModal";

interface Props {
  price: number;
}

const Widget: React.FC<Props> = ({ price }) => {
  const [isModalOpen, setIsOpen] = useState<boolean>(false);
  const { agreements, selectedAgreement, error, setSelectedAgreement } =
    useCreditAgreements(price);

  if (error || !agreements || !selectedAgreement) {
    return null;
  }

  return (
    <div className="border rounded-md px-4 py-3 shadow-sm bg-white">
      <WidgetHeader onClick={() => setIsOpen(true)} />
      <CustomSelect
        agreements={agreements}
        selectedAgreement={selectedAgreement}
        setSelectedAgreement={setSelectedAgreement}
      />
      <InfoModal
        fee={selectedAgreement.instalment_fee.string}
        isModalOpen={isModalOpen}
        onCloseModal={() => setIsOpen(false)}
      />
    </div>
  );
};

export default Widget;
