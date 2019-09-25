import DATA_STRUCTURES from "./constants/data-structures";
import Menu from "./menu";
import React from "react";
import { state } from "./state";

const Header = () => {

  const onClick = (item) => {
    console.log("item.name", item.name);
    console.log("state.getState().structure", state.getState().structure);

    const val = state.getState().structure === item.name ? null : item.name;
    state.setState({
      structure: val
    })
  }

  return <div>
    <div className="yankees-header">
      <img src="images/logo-yankees.png" />
      <span>YANKEES & DATA STRUCTURES</span>
      <div><Menu
        items={DATA_STRUCTURES}
        onClick={onClick}
        toggleText={state.getState().structure || "Data Structures"}
        /></div>
    </div>
  </div>;
}
export default Header;
