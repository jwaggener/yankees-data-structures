import Avatar from "./Avatar.react";
import React from "react";

export default function PlayerStat(props) {

  return <div id={`${props.player.name}-stat`.replace(" ", "-").toLowerCase()} className="baseball-player-stat-container">
    <div className="baseball-player-stat">
      <span className="baseball-player-stat-txt">{`${props.metric}: ${props.player[props.metric]}`}</span>
      <Avatar player={props.player}></Avatar>
    </div>
  </div>
}
