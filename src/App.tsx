import { useState, useImperativeHandle, forwardRef } from "react";
import WidgetContainer from "./containers/WidgetContainer";
import type { WidgetRef } from "./types";
import "./index.css";

type Props = {
  initialPrice: number;
};

const App = forwardRef<WidgetRef, Props>(({ initialPrice }, ref) => {
  const [price, setPrice] = useState(initialPrice);

  useImperativeHandle(ref, () => ({
    updatePrice(newPrice: number) {
      setPrice(newPrice);
    },
  }));

  return <WidgetContainer price={price} />;
});

export default App;
