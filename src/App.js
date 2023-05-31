import React, { useState, useEffect } from "react";
import Child from "./Child";
import './App.css'

export default function App() {
  const [localNumber, setLocalNumber] = useState(0);
  const [childNumber, setChildNumber] = useState(0);

  useEffect(() => {
    console.log("parent render");
  });

  useEffect(() => {
    console.log("parent componentDidMount");
  }, []);

  useEffect(() => {
    console.log("parent componentDidUpdate");
  }, [localNumber, childNumber]);

  useEffect(() => {
    return () => {
      console.log("parent componentWillUnmount");
    };
  }, []);

  function incrementLocal() {
    setLocalNumber((state) => state + 1);
  }

	function changeChildNumber(number) {
		setChildNumber(number)
	}

  return (
    <div className="App">
      <Child changeNumber={changeChildNumber} number={childNumber} />
      <button onClick={incrementLocal}>Click to increment local</button>
      <h1>local: {localNumber}</h1>
    </div>
  );
}