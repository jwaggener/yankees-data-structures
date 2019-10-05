import DATA_STRUCTURES from "../const/data-structures";
import Menu from "./menu";
import React from "react";
import { state } from "../state";

const Header = () => {

  const onClick = (item) => {
    const val = state.getState().structure === item.name ? null : item.name;
    state.setState({
      structure: val
    })
  }

  return <div className="yankees-header">
      <div className="title">
        <img src="images/logo-yankees.png" />
        <span>YANKEES & DATA STRUCTURES</span>
      </div>
      <Menu
        items={DATA_STRUCTURES}
        onClick={onClick}
        toggleText={state.getState().structure || "Data Structures"}
        />
    </div>;
}
export default Header;
