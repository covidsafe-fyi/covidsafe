import React from 'react';
import BreadCrumbBar from './BreadCrumbBar.js';
import People from './People.js';
import './VaccineTime.css';



function VaccineTime() {

  const supportAd = <>
  <div className='tdAd' colSpan='2'><b>SUPPORT</b>: Please enable <a href='https://www.geekwire.com/2022/after-wife-got-cancer-microsoft-engineer-built-a-tool-to-locate-anti-covid-drug-for-immunocompromised/'>me</a> to provide this helpful info to you (ad free) by giving a small donation:</div>
  <div className='tdAd'><b>Sponsor via</b> <a href='https://buymeacoffee.com/rrelyea'>buymeacoffee.com</a> or <a href='https://venmo.com/code?user_id=2295481921175552954'>venmo</a></div>
  </>;

  return (
    <div className="VaccineTime">
      <BreadCrumbBar />
      <p>Vaccine-Time is no longer useful, given schedule changes that came with the bivalent booster. So we've discontinued it. Please see other materials in the <a href='/#vaccines'>vaccines section of our home page</a></p>
    </div>
  );
}

export default VaccineTime;
