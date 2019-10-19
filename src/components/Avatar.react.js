import React from "react";
import {useDrag} from "react-dnd";

export default function Avatar(props) {

  const [{ opacity }, dragRef] = useDrag({
    item: { type: "AVATAR" },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.85 : 1,
    }),
  })

  const style = {backgroundImage: `url(${props.player.img})`, opacity}
  return <div ref={dragRef} className="baseball-player-stat-img" style={style} ></div>;
}
