import classnames from "classnames";
import React, { useEffect, useRef, useState } from "react";

export default function Menu (props) {

  const [open, setOpen] = useState(false);

  const node = useRef();

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", onOutsideClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
    };
  }, []);

  const getOnClick = (item) => {
    return () => { props.onClick(item); setOpen(false); }
  };

  const onOutsideClick = (e) => {
    if (node.current.contains(e.target)) {
      return
    }
    setOpen(false);
  }

  const onToggle = (e) => {
    setOpen(!open);
  };

  const classes = classnames("menu-dropdown", {open:open});

  return <div className="menu" ref={node}>
    <button onClick={onToggle} className="menu-toggle" >{props.toggleText}</button>
    <ul className={classes}>
      {props.items.map(
        item => <li key={item.name} className={classnames({disabled:item.disabled})} onClick={getOnClick(item)} ><span>{item.name}</span></li>
      )}
    </ul>
  </div>;

}
