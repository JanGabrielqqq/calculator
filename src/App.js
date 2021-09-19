import React from "react";
import "./App.css";
import Calculator from "./Components/Calculator";
import ContextProvider from "./Components/context/ContextProvider";
import Background from "./Components/UI/Background";
import Flex from "./Components/UI/Flex";
import HistoryLog from "./Components/UI/HistoryLog";

function App() {
  return (
    <ContextProvider>
      <Background />
      <Flex>
        <Calculator />
        <HistoryLog />
      </Flex>
    </ContextProvider>
  );
}

export default App;
