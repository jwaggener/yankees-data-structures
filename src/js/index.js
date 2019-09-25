import React from "react";
import { render } from "react-dom";
import Yankees from "./yankees";
import "../sass/app.scss";
import "../../node_modules/normalize.css/normalize.css";

render(<Yankees />, document.getElementById("hello"));
