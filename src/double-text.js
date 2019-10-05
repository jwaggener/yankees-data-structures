import React from "react";

const repeater = (text, num) => {
  const arr = [];
  for(var i = 0; i<num; i++){
    arr.push(<span className="repeater">{text}</span>);
  }
  return arr;
}

const DoubleUp = (props) => <div>{repeater(props.children, props.repeats)}</div>;

export default DoubleUp;
