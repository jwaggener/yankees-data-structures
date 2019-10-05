import React from "react";

const PlayerStat = (props) => {

  const style = {
    backgroundImage: `url(${props.player.img})`
  };

  return <div id={`${props.player.name}-stat`.replace(" ", "-").toLowerCase()} className="baseball-player-stat-container">
    <div className="baseball-player-stat">
      <span className="baseball-player-stat-txt">{`${props.metric}: ${props.player[props.metric]}`}</span>
      <span className="baseball-player-stat-img" style={style}></span>
    </div>
  </div>
}

export default PlayerStat;
