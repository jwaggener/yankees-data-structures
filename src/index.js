import React from "react";
import { render } from "react-dom";
import Yankees from "./components/Yankees.react";
import "./styles/app.scss";
import "../node_modules/normalize.css/normalize.css";

render(<Yankees />, document.getElementById("root"));
