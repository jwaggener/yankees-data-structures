import {immutable} from "./util";
// subscribe - subscribe to a Subject
// notify - for each subscriber, invoke!
export function Observer () {
  const subscribers = [];

  const subscribe = (subscriber) => {
    subscribers.push(subscriber);
  }

  const unSubscribe = (subscriber) => {
    for(var i=0; i<subscribers.length; i++){
      if(subscribers[i] === subscriber){
        subscribers.splice(i,1);
        i++;
      }
    }
  }

  const notify = (data) => {
    subscribers.forEach(subscriber => subscriber(data));
  }

  return {
    subscribe: subscribe,
    unSubscribe: unSubscribe,
    notify: notify
  }
}

// Subject maintains some state
// registerObserver - register an observer, you will invoke the notify function when state changes
// unregisterObserver - remove from list of observers
export function Subject (state) {
  let _state = state;

  const observers = [];

  const getState = () => {
    return _state;
  }

  const setState = (s) => {
    _state = immutable(Object.assign(_state, s));
    notifyObservers(_state);
  }

  const registerObserver = (observer) => {
    observers.push(observer);
  }

  const unregisterObserver = (observer) => {
    observers = observers.filter(obs => obs !== observer);
  }

  const notifyObservers = (data) => {
    observers.forEach(observer => observer.notify(data));
  }

  return {
    getState: getState,
    registerObserver: registerObserver,
    setState: setState,
    unregisterObserver: unregisterObserver
  };
}
