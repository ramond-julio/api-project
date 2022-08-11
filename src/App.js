import React, { useState, useEffect, useMemo} from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const url =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";
  const convertUrl =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
  const separator = "/";
  const format = ".json";
  const [listCurrency, setListCurrency] = useState({});
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [result, setResult] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url);
      setListCurrency(response?.data);
    };

    fetchData().catch(console.error);
  }, []);

  const selectFromCurrency = (e) => {
    setFromCurrency(e.target.value);
  };

  const selectToCurrency = (e) => {
    setToCurrency(e.target.value);
  };

  const convertCurrency = async (from, to) => {
    if (from !== "" && to !== "") {
      const response = await axios.get(
        convertUrl + from + separator + to + format
      );
      console.log("call api");
      setResult(response?.data);
    }
  };

  const cacheResult = useMemo(
    () => convertCurrency(fromCurrency, toCurrency),
    [fromCurrency, toCurrency]
  );

  return (
    <div className="App">
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
      <button onClick={cacheResult}>Convert</button>
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
