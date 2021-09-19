import React, { useState, useEffect, useReducer } from "react";
import Context from "./Context";

const defaultHistoryDatas = {
  historyData: [],
};

const historyDatasReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedHistoryDatas = [action.historyData, ...state.historyData];
    return {
      historyData: updatedHistoryDatas,
    };
  }
  if (action.type === "REMOVE") {
    const updatedHistoryDatas = state.historyData.filter(
      (item) => item.id !== action.id
    );
    return {
      historyData: updatedHistoryDatas,
    };
  }
  if (action.type === "REMOVEALL") {
    return {
      historyData: [],
    };
  }
  return defaultHistoryDatas;
};

function ContextProvider(props) {
  const [historyDatas, setHistoryDatasAction] = useReducer(
    historyDatasReducer,
    defaultHistoryDatas
  );

  const [hasItem, setHasItem] = useState(false);
  const [historyDisplay, setHistoryDisplay] = useState();

  const addHistoryDatas = (data) => {
    setHistoryDatasAction({ type: "ADD", historyData: data });
  };

  useEffect(() => {
    if (historyDatas.historyData.length !== 0) {
      setHasItem(true);
    }
    if (historyDatas.historyData.length === 0) {
      setHasItem(false);
    }
  }, [historyDatas]);

  const historyDisplayOnApp = (data) => {
    setHistoryDisplay(data);
  };

  const removeHistoryHandler = (data) => {
    setHistoryDatasAction({ type: "REMOVE", id: data });
  };

  const removeAllHistoryHandler = (data) => {
    setHistoryDatasAction({ type: "REMOVEALL", id: data });
  };
  const contextData = {
    historyData: historyDatas.historyData,
    displayHistory: historyDisplay,
    hasItem: hasItem,
    addHistoryData: addHistoryDatas,
    setDisplayHistory: historyDisplayOnApp,
    removeHistory: removeHistoryHandler,
    removeAllHistory: removeAllHistoryHandler,
  };
  return (
    <Context.Provider value={contextData}>{props.children}</Context.Provider>
  );
}

export default ContextProvider;

// const [historyDatas, setHistoryDatas] = useState([]);
// const dataCapture = (enteredHistoryData) => {
//   const historyData = {
//     ...enteredHistoryData,
//   };
//   setHistoryDatas([historyData, ...historyDatas]);
// };
// useEffect(() => {
//   if (historyDatas.length !== 0) {
//     setHasItem(true);
//   }
// }, [historyDatas]);
