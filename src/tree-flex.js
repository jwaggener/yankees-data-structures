import PlayerStat from "./components/PlayerStat.react";
import React from "react";

// take a binary search tree structure and convert it to
// a hash that describes where players are placed in rows
// in the flex layout for a tree
// eg Brett is at 1,1
// Aaron is at 0,0 etc
export function bstToDescription(bst){
  if(!bst.root){ return }
  return bstNodeToDescription(bst.root)
}

export function bstNodeToDescription(node, obj={}, level=0, position=0) {

  if(node === null){ return }

  // if there's no entry, create one
  if(!obj[node.element.name]){
    obj[node.element.name] = {
      // used to draw lines to the correct players
      pathsTo:[
        node.left && node.left.element.name || null,
        node.right && node.right.element.name || null
      ],
      // this is row and position information. eg row 1, position 2
      position: [level, position]
    };
  }

  if(!obj["maxLevel"]){
    obj["maxLevel"] = 0;
  }

  if(level > obj["maxLevel"]){
    obj["maxLevel"] = level;
  }

  bstNodeToDescription(node.left, obj, level + 1, position * 2);
  bstNodeToDescription(node.right, obj, level + 1, (position * 2) + 1);

  return obj;
}

// obj - {max_num, playername: [level, position]}
// creates arrays and positions the players
export function constructLayout(obj, players){
  const arr = [],
    power = 1;

  for (var i = 0; i<=obj.maxLevel; i++){
    if(i === 0){
      arr.push( new Array() );
    } else {
      arr.push( new Array(Math.pow(2,i)) );
    }
  }

  for(var i = 0; i < players.length; i++){
    const player = players[i],
      pos = obj[player.name].position;

    arr[pos[0]][pos[1]] = player;
  }

  return arr;
}

// take the layout from constructLayout
// and create the react elements
export function arrsToFlex(arr, metric){
  const rows = [];
  let arr2, row;
  for(var i = 0; i<arr.length; i++){
    row = [];
    arr2 = arr[i];
    for(var j = 0; j < arr2.length; j++){
      const player = arr2[j];
      row.push( treeNode(
        player ? React.createElement(PlayerStat, { player, metric } ) : null
      ) )
    }
    rows.push( treeRow(row) );
  }
  return rows;
}

// for display in flex display
// takes an array(n)
// and breaks the array up into base^1 base^2 base^3...
// so base 2 is array(1) array(2) array(4) array(8)...
// base 3 is is array(1) array(3) array(9) array(27)...
// each array is a row with flex display properties, centered
// which makes it display as a simlpe tree graph
export function treeToFlexLayout(srcArr, base=2){

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
