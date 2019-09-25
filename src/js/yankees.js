import BaseballCard, {BaseballCardStatTable} from "./baseball-card";
import Header from "./header";
import Players from "./data/yankees";
import PlayerStat from "./player-stat";
import React, { useState } from "react";
import Scroller from "./scroller";
import { state, stateObserver } from "./state";

const Yankees = () => {

  const [localState, setLocalState] = useState(state.getState());

  stateObserver.subscribe(setLocalState);

  return <div>
    <Header />
    <Scroller>
      <div className="baseball-players">
        {Players.players.map(player => <BaseballCard key={player.name} player={player} />)}
      </div>
      <div>
        <PlayerStat player={Players.players[0]} />
        <PlayerStat player={Players.players[1]} />
        <PlayerStat player={Players.players[2]} />
      </div>
    </Scroller>
  </div>
};

export default Yankees;
