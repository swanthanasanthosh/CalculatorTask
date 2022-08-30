import React from "react";
import { useState } from "react";
import "./Calc.css";

const Calc = () => {
  const [rows, setRows] = useState([]);
  const [disable, setDisable] = useState(false);
  const [label, setLabel] = useState("Disable");
  const [buttons, setButtons] = useState([]);
  const [result, setResult] = useState("");

  const handleAddRow = () => {
    const newRow = [...rows, []];
    setRows(newRow);
  };

  const handleChange = (event, index) => {
    const value = event.target.value;
    const inputData = [...rows];
    inputData[index] = value;
    setRows(inputData);
  };

  const handleDeleteRow = (index) => {
    const deleteRow = [...rows];
    deleteRow.splice(index, 1);
    setRows(deleteRow);
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
                    <select>
                      <option selected>select</option>
                      <option>+</option>
                      <option>-</option>
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
