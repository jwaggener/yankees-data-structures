import React, {useState} from "react";

const LLControls = (props) => {
  const [searchStr, setSearchStr] = useState("");

  const onClick = (player) => {
    return () => props.onClick(player);
  }

  const onTextChange = (e) => {
    setSearchStr(e.target.value);
  }

  const _players = filterPlayers(props.players, searchStr);

  return <div className="yankees-controls" >
    <input
      type="text"
      value={searchStr}
      onChange={onTextChange}
      placeholder="Type a Name"
      />
    {_players.map(
      player => <button key={`${player.name}-filter`} onClick={onClick(player)} className="player-btn" >{player.name}</button>
    )}
  </div>;
}

function filterPlayers(players, searchStr){
  if(!searchStr.length){ return players }
  // const str = searchStr.toLowerCase();
  const regexp =  RegExp(searchStr.toLowerCase(), "i");
  return players.filter(player => regexp.test(player.name) )
}

export default LLControls;
