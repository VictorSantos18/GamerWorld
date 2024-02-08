import React from "react";
import "./style.css";

function Divider(props){
  return (
    <div className="line">
        <h2>{props.children}</h2>
    </div>
  );
};

export default Divider;
