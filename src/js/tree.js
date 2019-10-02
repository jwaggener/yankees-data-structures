import React from "react";

// for display
// takes an array(n)
// and breaks the array up into base^1 base^2 base^3...
// so base 2 is array(1) array(2) array(4) array(8)...
// base 3 is is array(1) array(3) array(9) array(27)...
// each array is a row with flex display properties, centered
// which makes it display as a simlpe tree graph
function tree(srcArr, base=2){

  let nodesArr = [], rowsArr = [];

  let spliceLengthPow = 1;
  let length;

  // adding 1 item is the base case
  nodesArr.push( [ treeNode(srcArr[0]) ] );

  let i = 1;
  while(i < srcArr.length) {
    let nodesArr2 = [];

    length = Math.pow(base, spliceLengthPow);

    for(var j = i; j < i + length; j++){
      nodesArr2.push( treeNode(srcArr[j]) );
    }

    nodesArr.push(nodesArr2);

    i += length;
    spliceLengthPow++;
  }

  for(var k = 0; k < nodesArr.length; k++){
    rowsArr.push(treeRow(nodesArr[k]));
  }

  return rowsArr;
}

function treeNode(item) {
  return <span className="tree-node" >{item || null}</span>;
}

function treeRow(item) {
  return <div className="tree-row" >{item}</div>;
}

export default tree;
