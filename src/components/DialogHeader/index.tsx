import { DialogTitle } from "@headlessui/react";

const DialogHeader = () => {
  return (
    <>
      <h3 className="text-center text-sm font-semibold mb-2">seQura</h3>
      <DialogTitle
        as="h2"
        className="text-lg text-center font-medium leading-6 text-gray-900 mb-6"
      >
        Fracciona tu pago
      </DialogTitle>
    </>
  );
};

export default DialogHeader;
