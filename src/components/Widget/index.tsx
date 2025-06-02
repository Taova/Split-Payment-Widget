import { useEffect } from "react";
import { sendAnalyticsEvent } from "../../api";
import { EVENT_CONTEXT, EVENT_TYPE } from "../../constants";
import CustomSelect from "../CustomSelect";
import WidgetHeader from "../WidgetHeader";
import InfoModal from "../InfoModal";
import type { CreditInfo } from "../../types";

interface Props {
  agreements: CreditInfo[];
  selectedAgreement: CreditInfo;
  isModalOpen: boolean;
  onSelectAgreement: (value: CreditInfo) => void;
  onButtonClick: () => void;
  onCloseModal: () => void;
}

const Widget: React.FC<Props> = ({
  agreements,
  selectedAgreement,
  isModalOpen,
  onSelectAgreement,
  onButtonClick,
  onCloseModal,
}) => {
  useEffect(() => {
    sendAnalyticsEvent({
      context: EVENT_CONTEXT.INSTALLMENT_WIDGET,
      type: EVENT_TYPE.RENDER,
    });
  }, []);

  return (
    <>
      <WidgetHeader onClick={onButtonClick} />
      <CustomSelect
        agreements={agreements}
        selectedAgreement={selectedAgreement}
        onSelectAgreement={onSelectAgreement}
      />
      <InfoModal
        fee={selectedAgreement.instalment_fee.string}
        isModalOpen={isModalOpen}
        onCloseModal={onCloseModal}
      />
    </>
  );
};

export default Widget;
