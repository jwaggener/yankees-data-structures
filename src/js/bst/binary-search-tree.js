import { binarySearchTree, insert, postorder } from "../structures/binary-search-tree";
import { arrsToFlex,
  bstToDescription,
  constructLayout,
  treeToFlexLayout
} from "../tree-flex";
import { boundingRects } from "../bounding-rects";
import { debounce } from "lodash";
import Players from "../data/yankees";
import PlayerStat from "../player-stat";
import React, { useState, useEffect } from "react";
import { state, stateObserver } from "../state";

export default function BST() {

  const [localState, setLocalState] = useState(state.getState());

  stateObserver.subscribe(setLocalState);

  const bst = getBST(Players.players),
    descr = bstToDescription(bst),
    toFlex = arrsToFlex(constructLayout(descr, Players.players));

  useEffect(() => {
    const cb = debounce( () => state.setState({rects: getRects()}) );

    window.addEventListener("resize", cb);

    if(state.getState().rects === null){
      state.setState({rects: getRects()});
    }

    return () => window.removeEventListener("resize", cb);
  });

  function toStat(key){
    return `${key.replace(" ", "-").toLowerCase()}-stat`;
  }

  let branches;
  if(localState.rects){
    branches = [];
    for(var key in descr){
      const item = descr[key];
      if(item && item.pathsTo){
        if(item.pathsTo[0]){
          branches.push(getBranchLine(toStat(key), toStat(item.pathsTo[0]), localState.rects))
        }
        if(item.pathsTo[1]){
          branches.push(getBranchLine(toStat(key), toStat(item.pathsTo[1]), localState.rects))
        }
      }
    }
  }

  return <div id="tree-container">
      {branches && localState.rects && getSVG(localState.rects["tree-container"])(
        branches
      )}
      <div className="tree">{toFlex}</div>
    </div>;
}

// instantiates a linked list and
// adds all the players
function getBST(players) {
  const bst = binarySearchTree();
  players.forEach(
    player => insert(player, "HR", bst)
  );
  return bst;
}

function getRects(){
  const ids = Players.players.map( player => (`${player.name}-stat`).replace(" ", "-").toLowerCase() );
  ids.push("tree-container");
  return boundingRects(ids);
}

function getSVG(br){
  return (paths) => <svg className="tree-branches" width={br.width} height={br.height}>{paths}</svg>
}

function getBranchLine(id1, id2, rects){
  // (left + width/2)
  // (top - container.top + height/2)
  const container = rects["tree-container"],
    rect1 = rects[id1],
    rect2 = rects[id2],
    mid1 = { x: rect1.left + rect1.width/2, y: (rect1.top - container.top) + rect1.height/2 },
    mid2 = { x: rect2.left + rect2.width/2, y: (rect2.top - container.top) + rect2.height/2}
    // cubic benzier signature
    // M100,200  C100,100  400,100  400,200

    return <path
      d={`M${mid1.x},${mid1.y} C${mid1.x},${mid1.y + 40} ${mid2.x},${mid2.y + 40} ${mid2.x},${mid2.y}`}
     fill="none" stroke="#F00" strokeWidth="4px" ></path>
}
