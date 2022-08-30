import React from "react";
import { useState } from "react";
import "./Calc.css";

const Calc = () => {
  const [rows, setRows] = useState([]);
  const [disable, setDisable] = useState(false);
  const [label, setLabel] = useState("Disable");
  const [buttons, setButtons] = useState([]);
  const [result, setResult] = useState("");
  const [calc, setCalc] = useState("");
  const ops = ["+", "-"];

  const updateCalc = (event) => {
    const value = event.target.value;
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + value);

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const handleAddRow = () => {
    const newRow = [...rows, []];
    setRows(newRow);
  };

  const handleChange = (event, index) => {
    const value = event.target.value;

    if (value) {
      updateCalc(event);
    }

    const inputData = [...rows];
    inputData[index] = value;
    setRows(inputData);
  };

  const handleDeleteRow = (index) => {
    const deleteRow = [...rows];
    deleteRow.splice(index, 1);
    setRows(deleteRow);

    if (calc === "") {
      return;
    }
  };

  const handleDisable = (event, index) => {
    setDisable(!disable);
    disable ? setLabel("Disable") : setLabel("Enable");
  };

  return (
    <div className="wrapper">
      <form className="form" autoComplete="off">
        <div className="form-field">
          <label htmlFor="calculator" className="heading">
            CALCULATOR
          </label>
          <div className="calculator">
            {rows.map((singleRow, index) => {
              return (
                <div key={index} className="secondOperand">
                  {index !== 0 && (
                    <select onChange={(e) => updateCalc(e)}>
                      <option selected>select</option>
                      <option value="+">+</option>
                      <option value="-">-</option>
                    </select>
                  )}

                  <input
                    name="secondValue"
                    className="secondValue"
                    id="secondValue"
                    value={singleRow}
                    required
                    placeholder="Enter value"
                    onChange={(event) => handleChange(event, index)}
                    disabled={disable}
                  ></input>
                  <button onClick={() => handleDeleteRow(index)} type="button">
                    Delete
                  </button>
                  <button
                    onClick={(event) => {
                      handleDisable(event, index);
                    }}
                    type="button"
                  >
                    {label}
                  </button>
                </div>
              );
            })}

            <button type="button" onClick={() => handleAddRow()}>
              Add Rows
            </button>

            <div className="output">
              <label htmlFor="result">Result :</label>&nbsp;
              <span className="result" name="result" id="result">
                {result}
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Calc;
