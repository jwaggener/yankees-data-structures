import { add, linkedlist, getIndexOfKey } from "../../structures/linked-list";
import BaseballCard from "../BaseballCard.react";
import Code from "./Code.react";
import classnames from "classnames";
import LLControls from "./Controls.react";
import { NextGraphic } from "../graphics.react";
import React, { useState } from "react";
import { state } from "../../state";

const WIDTH_BASEBALLCARD_WITH_MARGIN = 240,
  WIDTH_NEXT = 116;

const LinkedList = (props) => {

  const linkedlist = getLinkedList(props.players),
    linkedlistToArray = getLinkedListToArray(linkedlist);

  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const offset = selectedPlayer ? getIndexOfKey(selectedPlayer.name,linkedlist) : 0;

  const styles = {marginLeft: -(offset * (WIDTH_BASEBALLCARD_WITH_MARGIN + WIDTH_NEXT))};

  function advancePlayer(player){
    return () => { setSelectedPlayer(player)};
  }

  return <div className="linkedlist">
    <LLControls onClick={setSelectedPlayer} players={props.players} />
    <div className="container" style={styles}>
      {props.players.map(
        (player, i, arr) => getPlayer(
          player,
          i <= offset,
          i === 0,
          advancePlayer(player)
        ))
      }
    </div>
    <Code />
  </div>;
}

// instantiates a linked list and
// adds all the players
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

// the display for a single player
function getPlayer(player, isSelected, first=false, advancePlayer){
  return (<React.Fragment>
    {!first && <NextGraphic onClick={advancePlayer} />}
    <BaseballCard
    classNames={classnames({dim:!isSelected})}
    key={player.name}
    player={player} />
  </React.Fragment>);
}

export default LinkedList;
