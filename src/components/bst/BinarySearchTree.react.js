import { binarySearchTree, insert, postorder } from "../../structures/binary-search-tree";
import { arrsToFlex,
  bstToDescription,
  constructLayout,
  treeToFlexLayout
} from "../../tree-flex";
import { boundingRects } from "../../bounding-rects";
import { debounce } from "lodash";
import Code from "./Code.react";
import Menu from "../Menu.react";
import Players from "../../data/yankees";
import PlayerStat from "../PlayerStat.react";
import React, { useState, useEffect } from "react";

export default function BST(props) {
  // an array holding all the SVG paths
  let branches;

  const [rectsState, setRectsState] = useState(null),
    [metric, setMetric] = useState("HR");

  const bst = getBST(props.players, metric),
    descr = bstToDescription(bst),
    toFlex = arrsToFlex(constructLayout(descr, props.players), metric);

  console.info("bst", bst);

  // gets the bounding rects of the stat items, keying them by player
  function getRects(){
    const ids = props.players.map( player => (`${player.name}-stat`).replace(" ", "-").toLowerCase() );
    ids.push("tree-container");
    return boundingRects(ids);
  }

  useEffect(() => {
    const cb = debounce( () => setRectsState(getRects()) );

    window.addEventListener("resize", cb);

    if(rectsState === null){
      setRectsState(getRects());
    }

    return () => window.removeEventListener("resize", cb);
  });

  const onClick = (item) => {
    setRectsState(null);
    setMetric(item.name);
  }

  if(rectsState){
    branches = generateBranches(descr, rectsState);
  }

  const menuItems = [ {name:"HR"}, {name:"BA"}, {name:"RBI"}, {name:"SLG"}, {name:"OBP"}, {name:"WAR"} ];

  return <div>
      <div className="container decorated">
        <Menu
        items={menuItems}
        onClick={onClick}
        toggleText={metric}
        />
      </div>
      <div id="tree-container">
        {branches && rectsState && getSVG(rectsState["tree-container"], branches)}
        <div className="tree">{toFlex}</div>
      </div>
      <Code />
    </div>;
}

// instantiates a linked list and
// adds all the players
function getBST(players, metric="HR") {
  const bst = binarySearchTree();
  players.forEach(
    player => insert(player, metric, bst)
  );
  return bst;
}

function getSVG(br, paths){
  return <svg className="tree-branches" width={br.width} height={br.height}>{paths}</svg>;
}

function generateBranches(descr, rectsState){
  function toStat(key){
    return `${key.replace(" ", "-").toLowerCase()}-stat`;
  }

  let branches = [];
  for(var key in descr){
    const item = descr[key];
    if(item && item.pathsTo){
      if(item.pathsTo[0]){
        branches.push(getBranchLine(toStat(key), toStat(item.pathsTo[0]), rectsState))
      }
      if(item.pathsTo[1]){
        branches.push(getBranchLine(toStat(key), toStat(item.pathsTo[1]), rectsState))
      }
    }
  }
  return branches;
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
