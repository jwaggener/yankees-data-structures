import React from "react";
import { render } from "react-dom";
import Yankees from "./components/Yankees.react";
import "../node_modules/normalize.css/normalize.css";
import "./styles/app.scss";

render(<Yankees />, document.getElementById("root"));
