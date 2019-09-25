import React from "react";

const PlayerStat = (props) => {

  const style = {
    backgroundImage: `url(${props.player.img})`
  };

  return <div className="baseball-player-stat-container">
    <div className="baseball-player-stat">
      <span className="baseball-player-stat-img" style={style}></span>
      <span className="baseball-player-stat-txt">{`WAR: ${props.player.WAR}`}</span>
    </div>
  </div>
}

export default PlayerStat;
