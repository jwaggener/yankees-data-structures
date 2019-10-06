import classnames from "classnames";
import React, { useState, useEffect } from "react";

export default function Signature(props){

  const [initial, setInitial] = useState(true),
    [sigClosed, setSigClosed] = useState(false);

  useEffect(function(){
    setTimeout(() => {
      if(initial){
        setInitial(false);
        setSigClosed(true);
      }
    }, 2000)
  });

  function onToggle(){
    setInitial(false);
    setSigClosed(!sigClosed);
  }

  const classes = classnames("signature", {closed: sigClosed});

  return <div className={classes}>
      <span onClick={onToggle} className="trigger" ><img src="images/baseball_02.png" /></span>
      <div className="signature-content">
        <div>John Waggener</div>
        <div><a href="https://www.linkedin.com/in/johnwaggener/" target="_blank">LinkedIn</a></div>
        <div><a href="https://github.com/jwaggener/yankees-data-structures" target="_blank">
          GitHub
        </a></div>
      </div>
    </div>;
}
