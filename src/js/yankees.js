import BaseballCard from "./baseball-card";
import Header from "./header";
import LinkedList from "./linkedlist/linkedlist";
import Players from "./data/yankees";
import PlayerStat from "./player-stat";
import React, { useState } from "react";
import { state, stateObserver } from "./state";

const Yankees = () => {

  const [localState, setLocalState] = useState(state.getState());

  stateObserver.subscribe(setLocalState);

  return <div>
    <Header />
    {getYankees(state.getState().structure)}
    {Players.players.map(player => <PlayerStat key={player.name} player={player} />)}
  </div>
};

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
