import React, { useState, useEffect, useCallback } from "react";
import Child from "./Child";
import './App.css'

export default function App() {
  const [localNumber, setLocalNumber] = useState(0);
  const [childNumber, setChildNumber] = useState(0);
	const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

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

	const memoizedCallback = useCallback(number => changeChildNumber(number), [])

  function incrementLocal() {
    setLocalNumber((state) => state + 1);
  }

	function changeChildNumber(number) {
		setChildNumber(number)
	}

  function getLargestNumber() {
    console.log("getLargestNumber");
    return Math.max(...arr);
  }

  return (
    <div className="App">
      <Child changeNumber={memoizedCallback} number={childNumber} />
      <button onClick={incrementLocal}>Click to increment local</button>
      <h1>local: {localNumber}</h1>
      <h1>Largest Number: {getLargestNumber()}</h1>
    </div>
  );
}