import React, { useContext } from "react";
import Context from "../context/Context";
import "./Historylogdata.css";

function Historylogdata(props) {
  const ctx = useContext(Context);

  const historyClick = (event) => {
    ctx.setDisplayHistory(props.computation);
  };

  const buttonClick = (event) => {
    ctx.removeHistory(props.id);
  };

  return (
    <div className='logdata' onClick={historyClick}>
      <div className='logdata-top'>
        <button className='remove-button' onClick={buttonClick}>
          x
        </button>
        <h3>
          {props.previous} {props.operator} {props.current}
        </h3>
      </div>

      <hr />
      <div className='logdata-bot'>
        <div className='equals'>
          <h3>=</h3>

          <h3>{props.computation}</h3>
        </div>
      </div>
    </div>
  );
}

export default Historylogdata;
