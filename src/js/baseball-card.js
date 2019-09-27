import React from "react";

export const BaseballCardStatTable = (props) => {
  const rs = [],
    excludes = ["age", "name", "img"];

  for (var key in props.player) {
    if(!excludes.includes(key)){
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

  const style = {backgroundImage: `url(/${props.player.img})`};

  return (
    <div>
      <div className="baseball-card">
        <div className="baseball-card-header">{props.player.name}</div>
        <div className="baseball-card-img" style={style} ></div>
        <div className="baseball-card-stats-table-container">
          <span className="baseball-player-stat-img card" style={style}></span>
          <BaseballCardStatTable player={props.player}/>
        </div>
      </div>
    </div>);
}

export default BaseballCard;
