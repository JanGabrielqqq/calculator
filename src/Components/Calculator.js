import React, { useState, useEffect, useContext } from "react";
import Context from "./context/Context";
import Button from "./UI/Button";
import CSSTransition from "react-transition-group/CSSTransition";
import "./Calculator.css";
function Calculator(props) {
  const ctx = useContext(Context);
  let computedValue;
  const [previousOperand, setPreviousOperand] = useState("");
  const [currentOperand, setCurrentOperand] = useState("");
  const [operator, setOperator] = useState("");
  const [afterEquals, setAfterEquals] = useState(false);
  const [i, setI] = useState(0);

  const acClick = (event) => {
    setPreviousOperand("");
    setCurrentOperand("");
  };

  const delClick = (event) => {
    event.preventDefault();
    setCurrentOperand(currentOperand.toString().slice(0, -1));
  };
  const numClick = (event) => {
    event.preventDefault();
    if (
      currentOperand.toString().includes("0") &&
      currentOperand.length === 1
    ) {
      setCurrentOperand(event.target.innerText);
      return;
    }

    if (afterEquals === true) {
      setCurrentOperand(event.target.innerText);
      setAfterEquals(false);
      return;
    }
    if (
      event.target.innerText === "." &&
      currentOperand.toString().includes(".")
    ) {
      return;
    }

    if (
      event.target.innerText === "." &&
      currentOperand.includes("0") &&
      currentOperand.length === 1
    ) {
      setCurrentOperand("0.");
      return;
    } else {
      setCurrentOperand(currentOperand + event.target.innerText);
    }
  };

  const opClick = (event) => {
    if (currentOperand === "" && previousOperand !== "") {
      setPreviousOperand(
        previousOperand.toString().slice(0, -1) + event.target.innerText
      );
      setOperator(event.target.innerText);
      return;
    }
    if (currentOperand === "") {
      return;
    }
    if (
      currentOperand.toString().includes(".") &&
      currentOperand.length === 1
    ) {
      setOperator(event.target.innerText);
      setPreviousOperand(`0 ${event.target.innerText}`);
      return;
    }
    if (previousOperand !== "") {
      setOperator(event.target.innerText);
      compute();
      saveHistory();
      setPreviousOperand(computedValue + event.target.innerText);
      setCurrentOperand("");
    } else {
      setPreviousOperand(
        parseFloat(currentOperand).toString() + " " + event.target.innerText
      );
      setCurrentOperand("");
      setOperator(event.target.innerText);
    }
  };

  const negaClick = () => {
    if (currentOperand.toString().includes("-")) {
      setCurrentOperand(currentOperand.toString().slice(1));
    } else {
      setCurrentOperand("-" + currentOperand.toString());
    }
  };

  const compute = () => {
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(curr)) return;
    switch (operator) {
      case "+":
        computedValue = prev + curr;
        break;
      case "-":
        computedValue = prev - curr;
        break;
      case "*":
        computedValue = prev * curr;
        break;
      case "/":
        computedValue = prev / curr;
        break;
      case "^":
        computedValue = prev ** curr;
        break;
      default:
        return;
    }
  };
  const equalClick = () => {
    if (currentOperand === "" || previousOperand === "") return;
    if (
      currentOperand.toString().includes(".") &&
      currentOperand.length === 1
    ) {
      return;
    }

    compute();
    saveHistory();
    setCurrentOperand(computedValue);
    setPreviousOperand("");
    setOperator("");
    setAfterEquals(true);
  };

  const saveHistory = () => {
    let current;
    if (currentOperand.toString().slice(0, 1) === ".") {
      current = `0${currentOperand}`;
    } else {
      current = currentOperand;
    }
    const historyData = {
      current: current,
      previous: previousOperand.slice(0, -1),
      operator: operator,
      computation: computedValue,
      id: i,
    };
    setI(i + 1);
    ctx.addHistoryData(historyData);
  };

  useEffect(() => {
    if (ctx.displayHistory === undefined) return;
    setCurrentOperand(ctx.displayHistory);
  }, [ctx.displayHistory]);

  return (
    <CSSTransition
      in={ctx.hasItem}
      appear={ctx.hasItem}
      timeout={500}
      classNames={{
        enterActive: "slidecalculator",
        enterDone: "",
        exitActive: "slidebackcalculator",
        exitDone: "",
      }}
    >
      <div className='calculator'>
        <div className='prev-op'>{previousOperand}</div>
        <div className='cur-op'>{currentOperand}</div>
        <div className='buttons'>
          <Button class='AC' text='AC' onClick={acClick} />
          <Button class='DEL' text='DEL' onClick={delClick} />
          <Button class='op-raise' text='^' onClick={opClick} />
          <Button class='op-div' text='/' onClick={opClick} />
          <Button class='num-7' text='7' onClick={numClick} />
          <Button class='num-8' text='8' onClick={numClick} />
          <Button class='num-9' text='9' onClick={numClick} />
          <Button class='op-multi' text='*' onClick={opClick} />
          <Button class='num-4' text='4' onClick={numClick} />
          <Button class='num-5' text='5' onClick={numClick} />
          <Button class='num-6' text='6' onClick={numClick} />
          <Button class='op-min' text='-' onClick={opClick} />
          <Button class='num-1' text='1' onClick={numClick} />
          <Button class='num-2' text='2' onClick={numClick} />
          <Button class='num-3' text='3' onClick={numClick} />
          <Button class='op-plus' text='+' onClick={opClick} />
          <Button class='op-nega' text='-/+' onClick={negaClick} />
          <Button class='num-dot' text='.' onClick={numClick} />
          <Button class='num-0' text='0' onClick={numClick} />
          <Button class='op-equal' text='=' onClick={equalClick} />
        </div>
      </div>
    </CSSTransition>
  );
}

export default Calculator;
