import './App.css';
import syringe from './assets/img/syringe.svg';
import React from 'react';

function EvusheldOrder() {
  document.title = "Order Evusheld";
  return (
    <div className="App">
      <main id="main-content" className="covidgov-main">
        <div className="location-toolkit-wrap">
          <div className="toolkit">
            <div className="toolkit__wrap">
              <div className="toolkit__intro">
                <h3 className='breadcrumbbar'><a href='/'><img src="../../logo192.png" alt='CovidSafe.fyi' height="96" width="96" /></a>&nbsp;&gt;&nbsp;<a href='/#immunocompromised'>immunocompromised</a>&nbsp;&gt;&nbsp;<a href='/evusheld/order'>Order Evusheld</a></h3>
              </div>

              <h2 id="preventive-medicines" className="line-title">Ordering Evusheld</h2>
            
              <div className="toolkit__boxes">
     
                <div className="toolkit__box">
                  <div className="toolkit__box__icon toolkit__desktop__icon">
                    <img src={syringe} className="small" width="47" height="55" alt="Syringe Icon" />
                  </div>
                  <div className="toolkit__box__content">
                    <h3 id="immunocompromised">
                      <div className="toolkit__box__icon toolkit__mobile__icon">
                        <img src={syringe} className="small" width="47" height="55" alt="Syringe Icon" />
                      </div>
                    </h3>
                    
                    <h3>NOTE: Evusheld is no long effective against current Covid variants (https://www.fda.gov/drugs/drug-safety-and-availability/fda-announces-evusheld-not-currently-authorized-emergency-use-us)</h3>
                    <p>
                      Evusheld Order Form for Small Volume Orders (1-3 patient courses):
                    </p>
                    &#8729; <a href="https://app.smartsheet.com/b/form/21e4312a2985457f982bb2738cf82744" rel="noopener">Evusheld Dose Order Form</a><br/>
                    &#8729; <a href="https://aspr.hhs.gov/COVID-19/Therapeutics/updates/Pages/important-update-27July2022.aspx">HHS Announcement about small volume ordering</a>
                    <p>
                      Astra Zeneca:
                    </p>
                    &#8729; Evusheld HelpLine for Providers: 1-833-EVUSHLD (<a href="tel:1-833-388-7453">1-833-388-7453</a>)<br/>
                    &#8729; Evusheld WebSite: <a href="https://evusheld.com">AstraZeneca Evusheld Product Website</a><br/>
                    
                    <p>
                      More info from CovidSafe.fyi on Evusheld:
                    </p>
                    &#8729; Evusheld Locator, Evusheld Guide, Evusheld News: <a href="/#immunocompromised">CovidSafe.fyi/#immuncompromised</a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
      
      <b>Contact info:</b> <a href="https://linktr.ee/rrelyea">linktr.ee/rrelyea</a><br/>
      <b>Programmers:</b> <a href="https://github.com/covidsafe-fyi/covidsafe">/covidsafe</a>, <a href="https://github.com/rrelyea/covid-therapeutics">/covid-therapeutics</a><br/>
      <br/>
    </div>
  );
}

export default EvusheldOrder;
