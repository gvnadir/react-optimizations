import React, { useEffect } from "react";

const Child = (props) => {
  useEffect(() => {
    console.log("child render");
  });

  function changeNumber() {
    props.changeNumber(Math.random());
  }

  return (
    <div>
      <h1>Child: {props.number}</h1>
      <button onClick={changeNumber}>Click to change child number</button>
    </div>
  );
};

export default Child