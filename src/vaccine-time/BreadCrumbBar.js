
import React from "react";

function BreadCrumbBar() {
    return (
      <h3 className="breadCrumbBar">
          <a href="/"><img src="logo192.png" alt='CovidSafe.fyi' height="96" width="96" /></a>&nbsp;&gt;&nbsp;<a href="/vaccines">vaccines</a>&nbsp;&gt;&nbsp;<a href="/vaccine-time">vaccine-time</a>
      </h3>
    );
  }
  
  export default BreadCrumbBar;