import classnames from "classnames";
import React, { useState } from "react";

export const BaseballCardStatTable = (props) => {
  const rs = [],
    remove = ["age", "name", "img"];

  for (var key in props.player) {
    if(!remove.includes(key)){
      rs.push(<tr key={key}><td>{key}</td><td>{props.player[key]}</td></tr>)
    }
  }

  return <table className="baseball-card-stats-table">
    <tbody>
      {rs}
    </tbody>
  </table>;
}

const BaseballCard = (props) => {

  const [showStats, setShowStats] = useState(false);

  const onToggle = (e) => {
    setShowStats(!showStats);
  };

  const style = {backgroundImage: `url(${props.player.img})`},
    styleStatTable = {opacity: showStats ? 1 : 0};

  return <div className="baseball-card" onClick={onToggle}>
        <div className="baseball-card-header">{props.player.name}</div>
        <div className="baseball-card-img" style={style} ></div>
        <div className="baseball-card-stats-table-container" style={styleStatTable}>
          <div className="baseball-player-stat-img-container">
            <span className="baseball-player-stat-img card" style={style}></span>
          </div>
          <BaseballCardStatTable player={props.player} />
        </div>
      </div>;
}

export default BaseballCard;
