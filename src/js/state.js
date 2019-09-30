import {memo} from "./util";
import {Observer, Subject} from "./observer";

export const state = Subject({
  dim: false,
  structure: null
});

export const stateObserver = Observer();

state.registerObserver(stateObserver);

stateObserver.subscribe(newState => console.log("newState", newState));
