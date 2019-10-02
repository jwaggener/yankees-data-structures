import BaseballCard from "./baseball-card";
import { debounce } from "lodash";
import { boundingRects } from "./bounding-rects";
import classnames from "classnames";
import Header from "./header";
import LinkedList from "./linkedlist/linkedlist";
import Players from "./data/yankees";
import PlayerStat from "./player-stat";
import React, { useState, useEffect } from "react";
import { state, stateObserver } from "./state";
import tree from "./tree";

const Yankees = () => {

  const [localState, setLocalState] = useState(state.getState());

  stateObserver.subscribe(setLocalState);

  const classes = classnames(
    "yankees-and-data-structures",
    {"dim":  !!localState.structure }
  );

  const playerStats = Players.players.map(player => <PlayerStat key={player.name} player={player} />);

  useEffect(() => {
    const cb = debounce( () => state.setState({rects: getRects()}) );

    window.addEventListener("resize", cb);

    if(state.getState().rects === null){
      console.log( "getRects()", getRects() );
      state.setState({rects: getRects()});
    }

    return () => window.removeEventListener("resize", cb);
  });

  const HEIGHT = 210, WIDTH = 500;
  const X1 = 0, Y1 = 0, X2 = 200, Y2 = 200;
  const STYLE = {
    stroke: "rgb(255,0,0)",
    strokeWidth: 2
  };

  const svgChild = <svg height={HEIGHT} width={WIDTH}>
    <path
      d="M100,200  C150,50  400,100  500,200"
     fill="none" stroke="#F00" stroke-width="2px" ></path>
  </svg>;

  return <div className={classes}>
    <Header />
    {getYankees(state.getState().structure)}
    <div id="tree-container">
      {localState.rects && getSVG(localState.rects["tree-container"])(
        [
          getBranchLine("aaron-judge-stat", "brett-gardner-stat", localState.rects),
          getBranchLine("brett-gardner-stat", "gio-urshela-stat", localState.rects),
          getBranchLine("brett-gardner-stat", "gleyber-torres-stat", localState.rects),
          getBranchLine("aaron-judge-stat", "gary-sanchez-stat", localState.rects),
          getBranchLine("gary-sanchez-stat", "cameron-maybin-stat", localState.rects)
        ]
      )}
      <div className="tree">
        {tree(playerStats)}
      </div>
    </div>
  </div>
};

function getRects(){
  const ids = Players.players.map( player => (`${player.name}-stat`).replace(" ", "-").toLowerCase() );
  ids.push("tree-container");
  return boundingRects(ids);
}

function getBranchLine(id1, id2, rects){
  // (left + width/2)
  // (top - container.top + height/2)
  const container = rects["tree-container"],
    rect1 = rects[id1],
    rect2 = rects[id2],
    mid1 = { x: rect1.left + rect1.width/2, y: (rect1.top - container.top) + rect1.height/2 },
    mid2 = { x: rect2.left + rect2.width/2, y: (rect2.top - container.top) + rect2.height/2}
    // use cubic benzier?
    // M100,200  C100,100  400,100  400,200

    function controlPoint(val){
      return null
    }

    return <path
      d={`M${mid1.x},${mid1.y} C${mid1.x},${mid1.y + 40} ${mid2.x},${mid2.y + 40} ${mid2.x},${mid2.y}`}
     fill="none" stroke="#F00" stroke-width="4px" ></path>
}

function getSVG(br){
  return (paths) => <svg className="tree-branches" width={br.width} height={br.height}>{paths}</svg>
}

function getYankees(view){
  switch(view){
    case "Linked List":
      return <LinkedList players={Players.players} />;

    default:
      return (
        <div className="container">
          {Players.players.map(player => <BaseballCard key={player.name} player={player} />)}
        </div>
      );
  }
}

export default Yankees;
