import {Observer, Subject} from "./observer";

export const state = Subject({
  dim: false,
  rects: null,
  structure: null
});

export const stateObserver = Observer();

state.registerObserver(stateObserver);
