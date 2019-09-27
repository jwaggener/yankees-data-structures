import BaseballCard from "../baseball-card";
import LLControls from "./controls";
import React from "react";
import Scroller from "../scroller";
import { add, linkedlist } from "../structures/linked-list";

const LinkedList = (props) => {
  // animations

  console.log(
    "getLinkedList(props.players)",
    getLinkedList(props.players)
  );

  return <div className="linkedlist">
    <LLControls players={props.players} />
    <Scroller>
      <div className="baseball-players">
        {props.players.map(player => <BaseballCard key={player.name} player={player} />)}
      </div>
    </Scroller>
  </div>;
}

function getLinkedList(players) {
  const list = linkedlist();
  players.forEach(
    player => add(player, list)
  );
  return list;
}

export default LinkedList;
