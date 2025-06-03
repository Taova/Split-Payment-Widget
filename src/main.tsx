import React, { createRef } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import type { WidgetRef } from "./types";
import "./index.css";

const SeQuraWidget = {
  root: null as null | ReturnType<typeof ReactDOM.createRoot>,
  ref: createRef<WidgetRef>(),

  render({ containerId, price }: { containerId: string; price: number }) {
    const container = document.getElementById(containerId);
    if (!container) return;

    this.root = ReactDOM.createRoot(container);
    this.ref = createRef<WidgetRef>();

    this.root.render(
      <React.StrictMode>
        <App ref={this.ref} initialPrice={price} />
      </React.StrictMode>,
    );
  },

  update(newPrice: number) {
    this.ref.current?.updatePrice(newPrice);
  },
};

(window as any).SeQuraWidget = SeQuraWidget;
