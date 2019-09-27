import BaseballCard from "../baseball-card";
import LLControls from "./controls";
import React from "react";
import { add, linkedlist } from "../structures/linked-list";

const LinkedList = (props) => {
  // animations

  console.log(
    "getLinkedList(props.players)",
    getLinkedList(props.players)
  );

  return <div className="linkedlist">
    <LLControls players={props.players} />
    <div className="container">
      {props.players.map(player => <BaseballCard key={player.name} player={player} />)}
    </div>
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
