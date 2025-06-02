import { useState, useMemo } from "react";
import { sendAnalyticsEvent } from "../../api";
import { EVENT_CONTEXT, EVENT_TYPE } from "../../constants";
import useCreditAgreements from "../../hooks/useCreditAgreements";
import Widget from "../../components/Widget";
import type { CreditInfo } from "../../types";

interface Props {
  price: number;
}

const WidgetContainer: React.FC<Props> = ({ price }) => {
  const [isModalOpen, setIsOpen] = useState<boolean>(false);
  const { agreements, selectedAgreement, error, setSelectedAgreement } =
    useCreditAgreements(price);

  const options = useMemo(() => {
    if (agreements === null) return [];

    return agreements.map(({ instalment_count, instalment_total }) => ({
      count: instalment_count,
      total: instalment_total.string,
    }));
  }, [agreements]);

  const handleSelectAgreement = (current: CreditInfo) => {
    setSelectedAgreement(current);

    sendAnalyticsEvent({
      context: EVENT_CONTEXT.INSTALLMENT_WIDGET,
      type: EVENT_TYPE.SELECT_INSTALMENT,
      price,
      selectedOption: {
        count: current.instalment_count,
        total: current.instalment_total.string,
      },
      availableOptions: options,
    });
  };

  const handleOpenModal = () => {
    setIsOpen(true);

    sendAnalyticsEvent({
      context: EVENT_CONTEXT.INSTALLMENT_WIDGET,
      type: EVENT_TYPE.MODAL_OPEN,
    });
  };

  const handleCloseModal = () => {
    setIsOpen(false);

    sendAnalyticsEvent({
      context: EVENT_CONTEXT.INSTALLMENT_WIDGET,
      type: EVENT_TYPE.MODAL_CLOSE,
    });
  };

  const handleButtonClick = () => {
    handleOpenModal();

    sendAnalyticsEvent({
      context: EVENT_CONTEXT.INSTALLMENT_WIDGET,
      type: EVENT_TYPE.BUTTON_CLICK,
      selectedOption: {
        count: selectedAgreement!.instalment_count,
        total: selectedAgreement!.instalment_total.string,
      },
      availableOptions: options,
    });
  };

  if (error || !agreements || selectedAgreement === null) {
    return null;
  }

  return (
    <div className="border rounded-md px-4 py-3 shadow-sm bg-white">
      <Widget
        agreements={agreements}
        selectedAgreement={selectedAgreement}
        isModalOpen={isModalOpen}
        onSelectAgreement={handleSelectAgreement}
        onButtonClick={handleButtonClick}
        onCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default WidgetContainer;
