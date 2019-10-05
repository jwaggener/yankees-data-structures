import BaseballCard from "./BaseballCard.react";
import BST from "./bst/BinarySearchTree.react";
import classnames from "classnames";
import Header from "./Header.react";
import LinkedList from "./linkedlist/linkedlist.react";
import Players from "../data/yankees";
import PlayerStat from "./PlayerStat.react";
import React, { useState } from "react";
import { state, stateObserver } from "../state";

const Yankees = () => {
  const [localState, setLocalState] = useState(state.getState());

  stateObserver.subscribe(setLocalState);

  const classes = classnames(
    "yankees-and-data-structures",
    {"dim":  !!localState.structure }
  );

  const playerStats = Players.players.map(player => <PlayerStat key={player.name} player={player} />);

  return <div className={classes}>
    <Header />
    {getYankees(state.getState().structure)}
  </div>
};

function getYankees(view){
  switch(view){
    case "Binary Search Tree":
      return <BST players={Players.players} />;

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
