import React from "react";

function tree(srcArr){

  let nodesArr = [], rowsArr = [];

  let spliceLengthPow = 1;
  let length;

  // adding 1 item is the base case
  nodesArr.push( [ treeNode(srcArr[0]) ] );

  let i = 1;
  while(i < srcArr.length) {
    let nodesArr2 = [];

    length = Math.pow(2, spliceLengthPow);

    for(var j = i; j < i + length; j++){
      /*if( j >= srcArr.length){
        break;
      }*/
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
  console.log("item", item);
  return <span className="tree-node" >{item}</span>;
}

function treeRow(item) {
  return <div className="tree-row" >{item}</div>;
}

export default tree;

//console.log( tree(
  //["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen"]
//) );
// 1
// 2
// 4
// 8
// 16
