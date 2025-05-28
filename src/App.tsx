import { useState } from "react";
import Widget from "./components/Widget";
import InfoModal from "./components/InfoModal";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Widget price={100} isOpen={isOpen} onOpenModal={() => setIsOpen(true)} />
      <InfoModal isOpen={isOpen} onCloseModal={() => setIsOpen(false)} />
    </>
  );
}

export default App;
