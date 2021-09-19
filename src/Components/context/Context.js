import React from "react";

const Context = React.createContext({
  historyData: [],
  displayHistory: undefined,
  addHistoryData: () => {},
  setDisplayHistory: () => {},
  hasItem: false,
  removeAllHistory: () => {},
});
export default Context;
