import React from "react";

const BaseballCard = (props) => {

  const style = {backgroundImage: `url(/${props.player.img})`};

  return (
    <div className="baseball-card">
      <div className="baseball-card-header">{props.player.name}</div>
      <div className="baseball-card-img" style={style} ></div>
    </div>);
}

export default BaseballCard;
