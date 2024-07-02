import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [input, setInput] = useState("0");
  const [operators, setOperators] = useState([]);
  const [operands, setOperands] = useState([]);

  function handleNumberInput(event) {
    const value = event.target.value;
    console.log(value);
    if (input === "0" && value === "0") {
      return;
    } else if (input === "0") {
      setInput(() => value);
    } else {
      setInput((prevInput) => prevInput + value);
    }
  }

  function clear() {
    setInput(() => "0");
    setOperators(() => []);
    setOperands(() => []);
  }

  /*
  function handleOperatorInput(event) {
    const value = event.target.value;
    switch (value) {
      case "/":
        setOperands((prevOperands) => [...prevOperands, Number(input)]);
        setInput(() => "0");
        setOperators(() => [value]);
        break;
      case "-":
        if (operands.length < 1 && input === "0") {

        }  
    }
  }
  */

  function handleEquals() {

  }

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
          <div className='col p-0'><button id="clear" onClick={clear} className='btn btn-dark w-100'>Clear</button></div>
        </div>
        <div className='row row-padding'>
          <div className='col-sm-9 p-0'></div>
          <div className='col-sm-3 p-0'><button id="divide" value="/" className='operator-button btn w-100'>/</button></div>
        </div>
        <div className='row row-padding'>
          <div className='col-sm-3 p-0'><button id="seven" value="7" onClick={handleNumberInput} className='numeric-button btn w-100'>7</button></div>
          <div className='col-sm-3 p-0'><button id="eight" value="8" onClick={handleNumberInput} className='numeric-button btn w-100'>8</button></div>
          <div className='col-sm-3 p-0'><button id="nine" value="9" onClick={handleNumberInput} className='numeric-button btn w-100'>9</button></div>
          <div className='col-sm-3 p-0'><button id="multiply" value="*" className='operator-button btn w-100'>*</button></div>
        </div>
        <div className='row row-padding'>
          <div className='col-sm-3 p-0'><button id="four" value="4" onClick={handleNumberInput} className='numeric-button btn w-100'>4</button></div>
          <div className='col-sm-3 p-0'><button id="five" value="5" onClick={handleNumberInput} className='numeric-button btn w-100'>5</button></div>
          <div className='col-sm-3 p-0'><button id="six" value="6" onClick={handleNumberInput} className='numeric-button btn w-100'>6</button></div>
          <div className='col-sm-3 p-0'><button id="subtract" value="-" className='operator-button btn w-100'>-</button></div>
        </div>
        <div className='row row-padding'>
          <div className='col-sm-3 p-0'><button id="one" value="1" onClick={handleNumberInput} className='numeric-button btn w-100'>1</button></div>
          <div className='col-sm-3 p-0'><button id="two" value="2" onClick={handleNumberInput} className='numeric-button btn w-100'>2</button></div>
          <div className='col-sm-3 p-0'><button id="three" value="3" onClick={handleNumberInput} className='numeric-button btn w-100'>3</button></div>
          <div className='col-sm-3 p-0'><button id="add" value="+" className='operator-button btn w-100'>+</button></div>  
        </div>
        <div className='row row-padding'>
          <div className='col-sm-3 p-0'><button id="decimal" onClick={handleDecimalInput} className='operator-button btn w-100'>.</button></div>
          <div className='col-sm-3 p-0'><button id="zero" value="0" onClick={handleNumberInput} className='numeric-button btn w-100'>0</button></div>
          <div className='col-sm-6 p-0'><button id="equals" className='btn btn-dark w-100'>=</button></div>          
        </div>
      </div>
    </div>
  );
}

export default App;
