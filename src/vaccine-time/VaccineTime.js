import React from 'react';
import BreadCrumbBar from './BreadCrumbBar.js';
import People from './People.js';
import './VaccineTime.css';



function VaccineTime() {

  const supportAd = <>
  <div className='tdAd' colSpan='2'><b>SUPPORT</b>: Please enable <a href='https://www.geekwire.com/2022/after-wife-got-cancer-microsoft-engineer-built-a-tool-to-locate-anti-covid-drug-for-immunocompromised/'>me</a> to provide this helpful info to you (ad free) by giving a small donation:</div>
  <div className='tdAd'><b>Sponsor via</b> <a href='https://buymeacoffee.com/rrelyea'>buymeacoffee.com</a>, <a href='https://paypal.me/RobRelyea'>paypal</a>, or <a href='https://venmo.com/code?user_id=2295481921175552954'>venmo</a></div>
  </>;

  return (
    <div className="VaccineTime">
      <BreadCrumbBar />
      <h3 className="p-3 text-center">Track and Plan Vaccination Timing for Your Loved Ones</h3>
      <div className="p-3 text-center">NOTE: don't use this as a definitive source yet...This site is a work in progress! Send any bug reports or questions to: rob@relyeas.net</div>
      <div className="p-3 text-center">PRIVACY: Your data is never sent to our server. We don't store anything.</div>
      <br/>
      <People />
 
      <br />

      {supportAd}
      <br />

      <div><b>Links:</b> <a href='https://www.cdc.gov/vaccines/covid-19/downloads/COVID-19-vacc-schedule-at-a-glance-508.pdf'>CDC Vaccination Schedule Diagram</a></div>
      <br />
    </div>
  );
}

export default VaccineTime;
