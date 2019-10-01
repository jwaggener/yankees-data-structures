import { add, linkedlist } from "../structures/linked-list";
import BaseballCard from "../baseball-card";
import classnames from "classnames";
import LLControls from "./controls";
import { NextGraphic } from "../graphics";
import React, { useState } from "react";
import { state } from "../state";

const WIDTH_BASEBALLCARD_WITH_MARGIN = 240,
  WIDTH_NEXT = 116;

// so make a linked list from the list and work from the linkedlist
// then you can use everything from that linkedlist
// for rendering
// does this solve the indexing issue?
// should we add 'selected' and 'index' to the list?
// how should we handle re-renders?
const LinkedList = (props) => {

  // create the list with items using .next to link one player to the next
  const linkedlist = getLinkedList(props.players),
    linkedlistToArray = getLinkedListToArray(linkedlist);

  console.log("linkedlist", linkedlist);
  console.log("linkedlistToArray", linkedlistToArray);

  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const styles = {marginLeft: -(WIDTH_BASEBALLCARD_WITH_MARGIN + WIDTH_NEXT)};

  return <div className="linkedlist">
    <LLControls players={props.players} />
    <div className="container" style={styles}>
      {props.players.map(
        (player, i, arr) => getPlayer(
          player,
          player.name === selectedPlayer,
          i === arr.length - 1
        ))
      }
    </div>
  </div>;
}

function getLinkedList(players) {
  const list = linkedlist();
  let i = 0;
  players.forEach(
    player => { add( Object.assign.apply({},[{index:i}, player]), list); i++ }
  );
  return list;
}

// back to array so that we can pass it to react
function getLinkedListToArray(list) {
  let arr = [], curr = list.head;
  while(curr){
    arr.push(curr.element);
    curr = curr.next;
  }
  return arr;
}

function getPlayer(player, isSelected, last=false){
  return (<React.Fragment>
    <BaseballCard
    classNames={classnames({dim:!isSelected})}
    key={player.name}
    player={player} />
    {!last && <NextGraphic />}
  </React.Fragment>);
}

export default LinkedList;
