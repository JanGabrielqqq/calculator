import React, { useContext } from "react";
import historyLogo from "./img/History-Icon.png";
import ScrollableFeed from "react-scrollable-feed";
import CSSTransition from "react-transition-group/CSSTransition";
import "./HistoryLog.css";
import Historylogdata from "./Historylogdata";
import Context from "../context/Context";

function HistoryLog(props) {
  const ctx = useContext(Context);

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={ctx.hasItem}
      appear={ctx.hasItem}
      timeout={500}
      classNames={{
        enterActive: "showHistory",
        enterDone: "",
        exitActive: "closeHistory",
        exitDone: "",
      }}
    >
      <div className='HistoryLog'>
        <ScrollableFeed className='scroll'>
          <div className='historylog-body'>
            {ctx.historyData.map((data) => (
              <Historylogdata
                key={data.id}
                id={data.id}
                current={data.current}
                previous={data.previous}
                operator={data.operator}
                computation={data.computation}
              />
            ))}
          </div>
        </ScrollableFeed>
        <div className='Header'>
          <img src={historyLogo} alt='history'></img>
          <h3>History Log</h3>
          <button className='button-remove-all' onClick={ctx.removeAllHistory}>
            X
          </button>
        </div>
      </div>
    </CSSTransition>
  );
}

export default HistoryLog;
