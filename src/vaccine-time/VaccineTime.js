import React from 'react';
import BreadCrumbBar from './BreadCrumbBar.js';
import './VaccineTime.css';



function VaccineTime() {
  return (
    <div className="VaccineTime">
      <BreadCrumbBar />
      <p>Vaccine-Time is no longer useful, given schedule changes that came with the bivalent booster. So we've discontinued it. Please see other materials in the <a href='/#vaccines'>vaccines section of our home page</a></p>
    </div>
  );
}

export default VaccineTime;
