import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [input, setInput] = useState("0");
  const [operators, setOperators] = useState([]);
  const [operands, setOperands] = useState([]);
  const [shouldCalculate, setShouldCalculate] = useState(false);

  const operandsRef = useRef(operands);
  const operatorsRef = useRef(operators);

  useEffect(() => {
    operandsRef.current = operands;
  }, [operands]);

  useEffect(() => {
    operatorsRef.current = operators;
  }, [operators]);

  function handleNumberInput(event) {
    const value = event.target.value;
    if (input === "0" && value === "0") {
      return;
    } else if (input === "-" && value === "0") {
      return;
    } else if (input === "0") {
      setInput(() => value);
    } else {
      setInput((prevInput) => prevInput + value);
    }
  }

  function clearAll() {
    setInput(() => "0");
    setOperators(() => []);
    setOperands(() => []);
  }

  function clearOps() {
    setOperators(() => []);
    setOperands(() => []);
  }

  useEffect(() => {
    if (shouldCalculate) {  
      console.log("Calc begins");
      console.log("Operators: " + operatorsRef.current);
      console.log("Operands: " + operandsRef.current);
      let result = Number(operandsRef.current[0]);
      if (operatorsRef.current.length === operandsRef.current.length) {
        console.log("Slicing");
        setOperators((prevOperators) => [...prevOperators].slice(0, -1));
      }
      for (let i = 0; i < operatorsRef.current.length; i++) {
        switch(operatorsRef.current[i]) {
          case "/":
            result /= Number(operandsRef.current[i + 1]);
            break;
          case "*":
            result *= Number(operandsRef.current[i + 1]);
            break;
          case "+":
            result += Number(operandsRef.current[i + 1]);
            break;
          case "-":
            result -= Number(operandsRef.current[i + 1]);
            break;
          default:
            //This should never be reached
        }
      }
      setInput(() => result);
      setShouldCalculate(() => false);
      clearOps();
    }
  }, [shouldCalculate]);

  function handleOperators(event) {
    const value = event.target.value;
    //For handling negative numbers
    if (input === "" && value === "-") {
      setInput(() => value);
    } 
    if (input === "-") {
      setOperators((prevOperators) => [...prevOperators.slice(0, -1), value]);
      setInput(() => "");
    } else if (!(input === "")) {
      setOperands((prevOperands) => [...prevOperands, input]);
      setOperators((prevOperators) => [...prevOperators, value]);
      setInput(() => "");
    } else if (input === "" && operators.length > 0) {
      if (value === "/" || value === "*" || value === "+")
      setOperators((prevOperators) => [...prevOperators.slice(0, -1), value]);
    }
  }
  
  function handleEquals() {
    if (input === "" || input === "-") {
      return;
    } else if (operands.length < 1) {
      setOperands((prevOperands) => [...prevOperands, input])
      return;
    } else {
      setOperands((prevOperands) => [...prevOperands, input])
      setShouldCalculate(() => true);
    }
  }

  useEffect(() => {
    console.log(operands);
    console.log(operators);
  }, [operands, operators]);
  
  function handleDecimalInput() {
    if (input.includes(".")) {
      return;
    } else if (input === "0") {
      setInput(() => ".");
    } else {
      setInput((prevInput) => prevInput + ".");
    }
  }

  return (
    <div className="App">
      <div className="container outer-box">
        <div className='row-padding'>
          <div className="display w-100 border border-dark rounded">
            <div className='col w-100 pt-3'><p id="display">{input}</p></div>
          </div>
        </div>
        <div className='row row-padding'>
          <div className='col p-0'><button id="clear" onClick={clearAll} className='btn btn-dark w-100'>Clear</button></div>
        </div>
        <div className='row row-padding'>
          <div className='col-9 p-0'></div>
          <div className='col-3 p-0'><button id="divide" value="/" onClick={handleOperators} className='operator-button btn w-100'>/</button></div>
        </div>
        <div className='row row-padding'>
          <div className='col-3 p-0'><button id="seven" value="7" onClick={handleNumberInput} className='numeric-button btn w-100'>7</button></div>
          <div className='col-3 p-0'><button id="eight" value="8" onClick={handleNumberInput} className='numeric-button btn w-100'>8</button></div>
          <div className='col-3 p-0'><button id="nine" value="9" onClick={handleNumberInput} className='numeric-button btn w-100'>9</button></div>
          <div className='col-3 p-0'><button id="multiply" value="*" onClick={handleOperators} className='operator-button btn w-100'>*</button></div>
        </div>
        <div className='row row-padding'>
          <div className='col-3 p-0'><button id="four" value="4" onClick={handleNumberInput} className='numeric-button btn w-100'>4</button></div>
          <div className='col-3 p-0'><button id="five" value="5" onClick={handleNumberInput} className='numeric-button btn w-100'>5</button></div>
          <div className='col-3 p-0'><button id="six" value="6" onClick={handleNumberInput} className='numeric-button btn w-100'>6</button></div>
          <div className='col-3 p-0'><button id="subtract" value="-" onClick={handleOperators} className='operator-button btn w-100'>-</button></div>
        </div>
        <div className='row row-padding'>
          <div className='col-3 p-0'><button id="one" value="1" onClick={handleNumberInput} className='numeric-button btn w-100'>1</button></div>
          <div className='col-3 p-0'><button id="two" value="2" onClick={handleNumberInput} className='numeric-button btn w-100'>2</button></div>
          <div className='col-3 p-0'><button id="three" value="3" onClick={handleNumberInput} className='numeric-button btn w-100'>3</button></div>
          <div className='col-3 p-0'><button id="add" value="+" onClick={handleOperators} className='operator-button btn w-100'>+</button></div>  
        </div>
        <div className='row row-padding'>
          <div className='col-3 p-0'><button id="decimal" onClick={handleDecimalInput} className='operator-button btn w-100'>.</button></div>
          <div className='col-3 p-0'><button id="zero" value="0" onClick={handleNumberInput} className='numeric-button btn w-100'>0</button></div>
          <div className='col-6 p-0'><button id="equals" onClick={handleEquals} className='btn btn-dark w-100'>=</button></div>          
        </div>
      </div>
    </div>
  );
}

export default App;
