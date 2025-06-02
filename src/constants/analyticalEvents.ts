export const EVENT_CONTEXT = {
  INSTALLMENT_WIDGET: "installment-widget",
} as const;

export const EVENT_TYPE = {
  RENDER: "render", // +
  SELECT_INSTALMENT: "select-instalment",
  BUTTON_CLICK: "button-click",
  MODAL_OPEN: "modal-open",
  MODAL_CLOSE: "modal-close",
  LOAD_ERROR: "load-error", // +
} as const;
