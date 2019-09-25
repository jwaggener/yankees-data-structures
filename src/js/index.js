import BaseballCard from "./baseball-card";
import Header from "./header";
import Players from "./data/yankees";
import React from "react";
import Scroller from "./scroller";
import { render } from "react-dom";
import "../sass/app.scss";
import "../../node_modules/normalize.css/normalize.css";

const Yankees = () => (<div>
    <Header />
    <Scroller>
      <div className="baseball-players">
        {Players.players.map(player => <BaseballCard key={player.name} player={player} />)}
      </div>
    </Scroller>
  </div>);

render(<Yankees />, document.getElementById("hello"));
