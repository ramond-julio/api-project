import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const url =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";
  const convertUrl =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
  const [listCurrency, setListCurrency] = useState({});
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [result, setResult] = useState({});

  useEffect(() => {
    axios.get(url).then((response) => {
      setListCurrency(response?.data);
    });
  }, []);

  const selectFromCurrency = (e) => {
    setFromCurrency(e.target.value);
  };

  const selectToCurrency = (e) => {
    setToCurrency(e.target.value);
  };

  const convertCurrency = () => {
    console.log(convertUrl + fromCurrency + "/" + toCurrency);
    if (fromCurrency !== "" && toCurrency !== "") {
      axios
        .get(convertUrl + fromCurrency + "/" + toCurrency + ".json")
        .then((response) => {
          setResult(response?.data);
        });
    } else {
      console.log("select value first");
    }
  };

  return (
    <div>
      <label>From :</label>
      <select onChange={selectFromCurrency} value={fromCurrency}>
        {Object.entries(listCurrency).map(([key, value]) => (
          <option key={key} value={key}>
            {key} - {value}
          </option>
        ))}
      </select>
      <label>To :</label>
      <select onChange={selectToCurrency} value={toCurrency}>
        {Object.entries(listCurrency).map(([key, value]) => (
          <option key={key} value={key}>
            {key} - {value}
          </option>
        ))}
      </select>
      <button onClick={convertCurrency}>Convert</button>
      {result !== null && (
        <div>
          {Object.entries(result).map(([key, value]) => (
            <h2 key={key} value={key}>
              {key.toString().toUpperCase()} : {value}
            </h2>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
