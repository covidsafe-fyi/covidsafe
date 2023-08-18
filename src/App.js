import './App.css';
import masks from './assets/img/mask.svg';
import tests from './assets/img/beaker.svg';
import syringe from './assets/img/syringe.svg';
import treatment from './assets/img/treatment.svg';
import ventilation from './assets/img/ventilation-icon.svg';
import React from 'react';

function App() {
  return (
    <div className="App">
      <main id="main-content" className="covidgov-main">
        <div className="location-toolkit-wrap">
          <div className="toolkit">
            <div className="toolkit__wrap">
              <div className="toolkit__intro">
                <a href='/'><img className="center" src="logo192.png" alt='CovidSafe.fyi' height="96" width="96" /></a>
                <h2>Resources to keep yourself and others safe from COVID-⁠19.</h2>
                <p><i>Curated content from government and other trusted sites.</i></p>
                <p>
                  <b><a href='#preventive-medicines'>Preventive Medicines</a>:</b> <a href="#vaccines">Vaccines</a>, <a href="#immunocompromised">For Immunocompromised</a><br/>
                  <b><a href='#protective-measures'>Protective Measures</a>:</b> <a href="#masks">Masks</a>, <a href="#ventilation">Air Ventilation</a>, <a href="#tests">Tests</a><br/>
                  <b><a href='#have-covid'>Have Covid?</a>:</b> <a href="#test-to-treat">Test-to-Treat</a>, <a href="#treatments">Treatments</a>, <a href="#longcovid">LongCovid</a>             </p>
              </div>

              <h2 id="preventive-medicines" className="line-title">Preventive Medicines</h2>
            
              <div className="toolkit__boxes">
                <div className="toolkit__box">
                  <div className="toolkit__box__icon toolkit__desktop__icon">
                    <img src={syringe} className="small" width="47" height="55" alt="Syringe Icon" />
                  </div>
                  <div className="toolkit__box__content">
                    <h3 id='vaccines'>
                      <div className="toolkit__box__icon toolkit__mobile__icon">
                        <img src={syringe} className="small" width="47" height="55" alt="Syringe Icon" />
                      </div>
                      <span>Vaccines</span>
                    </h3>
                    <p>Being <i>"up to date"</i> with your COVID-19 vaccines is the best way to protect against severe illness and hospitalization from COVID-&#8288;19.</p>
                    <p>CDC Vaccination Schedule Infographic:</p><p className='lt50 mt20'><a href="https://www.cdc.gov/vaccines/covid-19/downloads/covid19-vaccination-recommendations-most-people.pdf">CDC Covid Vaccination Recommendations</a></p>
                    <p>Schdedule a Vaccine/Booster:</p>
                    &#8729; <a href="https://vaccines.gov/search" rel="noopener">Find a vaccine or booster at Vaccines.gov</a>
                    <p>Latest Clinical Guidance for Covid Vaccinations:</p>
                    &#8729; <a href="https://www.cdc.gov/vaccines/covid-19/clinical-considerations/interim-considerations-us.html">CDC Guidance for Vaccinations</a>
                  </div>
                </div>

                <div className="toolkit__box">
                  <div className="toolkit__box__icon toolkit__desktop__icon">
                    <img src={syringe} className="small" width="47" height="55" alt="Syringe Icon" />
                  </div>
                  <div className="toolkit__box__content">
                    <h3 id="immunocompromised">
                      <div className="toolkit__box__icon toolkit__mobile__icon">
                        <img src={syringe} className="small" width="47" height="55" alt="Syringe Icon" />
                      </div>
                      <span>More Protection for the Immunocompromised</span>
                    </h3>
                    <p>The latest guidance from cdc.gov for those who are immunocompromised:</p>
                    &#8729; <a href="https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/people-with-medical-conditions.html#immunocompromised" rel="noopener">CDC guidance for immunocompromised</a>
                    <p>
                      Evusheld:
                    </p>
                    &#8729; a preventive medicine that immunocompromised used between 12/2021 and 1/2023.
                    <p>
                      Evusheld News:
                    </p>
                    &#8729; <span><a href="https://www.fda.gov/drugs/drug-safety-and-availability/fda-authorizes-revisions-evusheld-dosing" rel="noopener">6/2022: FDA authorizes Evusheld doses every 6 months (since last 150/150 dose)</a> (fda.gov)</span>
                    <br/>
                    &#8729; <span><a href="https://www.fda.gov/emergency-preparedness-and-response/mcm-legal-regulatory-and-policy-framework/expiration-dating-extension#COVIDtherapeutics" rel="noopener">6/2022: Evusheld expiration dates adjusted, adding 6 months</a> (fda.gov)</span>
                    <br/>
                    &#8729; <span><a href="https://aspr.hhs.gov/COVID-19/Therapeutics/updates/Pages/important-update-27July2022.aspx" rel="noopener">7/2022: Doctors can now order an Evusheld dose with a simple web form</a> (hhs.gov)</span>
                    <br/>
                    &#8729; <span><a href="https://www.fda.gov/drugs/drug-safety-and-availability/fda-releases-important-information-about-risk-covid-19-due-certain-variants-not-neutralized-evusheld" rel="noopener">10/2022: Increased risk of COVID-19 due to certain variants not neutralized by Evusheld</a> (fda.gov)</span>
                    <br/>
                    &#8729; <span><a href="https://www.fda.gov/drugs/drug-safety-and-availability/fda-announces-evusheld-not-currently-authorized-emergency-use-us" rel="noopener">1/2023: Evusheld no longer authorized for use in US</a> (fda.gov)</span>
                    
                    <p>
                      Evusheld2 News:
                    </p>
                    &#8729; <span><a href="https://www.astrazeneca.com/media-centre/statements/2022/first-participant-dosed-in-supernova-phase-i-iii-trial-evaluating-azd5156-for-prevention-of-covid-19.html" rel="noopener">12/2022: 1st participant dosed in SUPERNOVA Phase I/III trial evaluating AZD5156, a next-gen long-acting antibody combination, for prevention of COVID-19</a> (astrazeneca.com)</span>
                    <br/>
                    

                    <p>Evusheld Guide:</p>
                    &#8729; Tips and trick to get (the now discontinued) Evusheld: <a href="/evusheld/guide/" rel="noopener">Evusheld Guide</a>                    
                    <p>NO LONGER USEFUL -Evusheld Provider List:</p>
                    &#8729; <a href="/evusheld" rel="noopener">Evusheld Locator at CovidSafe.fyi/evusheld</a>

                  </div>
                </div>
              </div>

              <h2 id="protective-measures" className="line-title">Protective Measures</h2>
              
              <div className="toolkit__boxes">
                <div className="toolkit__box">
                  <div className="toolkit__box__icon toolkit__desktop__icon">
                    <img src={masks} width="52" height="31" alt="Mask Icon" />
                  </div>
                  <div className="toolkit__box__content">
                    <h3 id='masks'>
                      <div className="toolkit__box__icon toolkit__mobile__icon">
                        <img src={masks} width="52" height="31" alt="Mask Icon" />
                      </div>
                      <span>Masks</span>
                    </h3>
                    <p>Wear a mask to protect yourself and others when you go indoors in public. We recommend N95 masks, as they are much more protective.</p>
                    <p>Free N95 masks are available at many local pharmacies and healthcare providers. Check with stores in your area to see where you can find free masks.</p>
                    &#8729; <a href="https://www.cdc.gov/coronavirus/2019-ncov/your-health/free-masks.html" rel="noopener">Learn more about masks and where to get them</a><br/>
                    <p>Mask Nerd: technical analysis of masks -- youtube channel</p>
                    &#8729; <a href="https://www.youtube.com/channel/UC3fF_rzkmZD0ufN685YE7lg">Mask Nerd YouTube Channel</a>
                  </div>
                </div>

                <div className="toolkit__box">
                  <div className="toolkit__box__icon toolkit__desktop__icon">
                    <img src={ventilation} width="38" height="38" alt="Ventilation Icon" />
                  </div>
                  <div className="toolkit__box__content">
                    <h3 id='ventilation'>
                      <div className="toolkit__box__icon toolkit__mobile__icon">
                        <img src={ventilation} width="38" height="38" alt="Ventilation Icon" />
                      </div>
                      <span>Air Ventilation</span>
                    </h3>
                    <p>You can decrease your chances of get sick with simple actions in your home, like opening windows or filtering the air.</p>
                    &#8729; <a href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/improving-ventilation-home.html" rel="noopener">Improve Ventilation in Your Home</a>
                    <p>CleanAirCrew.org: DIY box fan air filters – Corsi-Rosenthal box</p>
                    &#8729; <a href="https://cleanaircrew.org/box-fan-filters/">Corsi-Rosenthal Box Fans</a>
                  </div>
                </div>

                <div className="toolkit__box">
                  <div className="toolkit__box__icon toolkit__desktop__icon">
                    <img src={tests} width="32" height="42" alt="Beaker Icon" />
                  </div>
                  <div className="toolkit__box__content">
                    <h3 id="tests">
                      <div className="toolkit__box__icon toolkit__mobile__icon">
                        <img src={tests} width="32" height="42" alt="Beaker Icon" />
                      </div>
                      <span>Tests</span>
                    </h3>
                    <p>COVID tests can help you know if you have COVID-&#8288;19 when you have symptoms, have been exposed, or are about to meet up with others.</p>
                    &#8729; <a href="https://covid.gov/tests" rel="noopener">Order free tests at COVIDtests.gov</a><br/>
                    <p>Most people with a health plan can go online, or to a pharmacy or store to purchase a rapid test at no cost (via reimbursement or free of charge through their insurance). Includes health plans you purchase or get through your work:</p>
                    &#8729; <a href="https://www.cms.gov/how-to-get-your-at-home-OTC-COVID-19-test-for-free" rel="noopener">Get tests via your private Health Insurance</a>

                    <p>
                      The latest guidance on using at-home tests, what to do with the results, and how to get at-home tests:
                    </p>
                    &#8729; <a href="https://www.cdc.gov/coronavirus/2019-ncov/testing/self-testing.html" rel="noopener">Learn more about at-home testing</a>
                  </div>
                </div>
              </div>

              <h2 id='have-covid' className="line-title">Have Covid?</h2>
              <p>Treatments for COVID-&#8288;19 are now widely available. If you test positive for COVID-19, talk to a doctor as soon as possible about <a href="https://www.cdc.gov/coronavirus/2019-ncov/your-health/treatments-for-severe-illness.html" className="usa-link usa-link--external" rel="noopener">treatment options</a>.</p>

              <div className="toolkit__boxes">
                <div className="toolkit__box">
                  <div className="toolkit__box__icon toolkit__desktop__icon">
                    <img src={treatment} width="38" height="38" alt="Medical Icon" />
                  </div>
                  <div className="toolkit__box__content">
                    <h3 id='test-to-treat'>
                      <div className="toolkit__box__icon toolkit__mobile__icon">
                        <img src={treatment} width="38" height="38" alt="Medical Icon" />
                      </div>
                      <span>Test-to-Treat</span>
                    </h3>
                    <p>The Test-to-Treat program is one easy way to get tested and get a prescription for treatment.</p>
                    &#8729; <a href="https://aspr.hhs.gov/TestToTreat" rel="noopener">Find a Test-to-Treat location near you</a>
                  </div>
                </div>

                <div className="toolkit__box">
                  <div className="toolkit__box__icon toolkit__desktop__icon">
                    <img src={treatment} width="38" height="38" alt="Medical Icon" />
                  </div>
                  <div className="toolkit__box__content">
                    <h3 id='treatments'>
                      <div className="toolkit__box__icon toolkit__mobile__icon">
                        <img src={treatment} width="38" height="38" alt="Medical Icon" />
                      </div>
                      <span>Treatments</span>
                    </h3>
                    <p>You need to get a prescription for a treatment from your doctor, a <a href="https://aspr.hhs.gov/TestToTreat">Test-to-Treat location</a>, or a telehealth doctor. Then find a pharmacy near you with these treatments in stock:</p>
                    &#8729; <a href="/paxlovid" rel="noopener">Paxlovid locator</a> (consult <a href='https://www.covid19treatmentguidelines.nih.gov/therapies/antiviral-therapy/ritonavir-boosted-nirmatrelvir--paxlovid-/paxlovid-drug-drug-interactions/'>drug-drug interactions</a>)<br/>
                    &#8729; <a href="/lagevrio" rel="noopener">Molnuripavir (Lagevrio) locator</a><br/>
                    <p>Remdesivir</p>
                    &#8729; <a href="/remdesivir" rel="noopener">Remdesivir (outpatient) locator</a><br/>
                    &#8729; <a href="https://www.covid19treatmentguidelines.nih.gov/therapies/antiviral-therapy/remdesivir/" rel="noopener">Remdesivir info (nih.gov)</a><br/>
                    <p>NO LONGER USEFUL</p>
                    &#8729; <a href="https://www.fda.gov/drugs/drug-safety-and-availability/fda-announces-bebtelovimab-not-currently-authorized-any-us-region" rel="noopener">Bebtelovimab no longer authorized - 11/30/2022 (fda.com)</a><br/> 
                  </div>
                </div>

                <div className="toolkit__box">
                  <div className="toolkit__box__icon toolkit__desktop__icon">
                    <img src={treatment} width="38" height="38" alt="Medical Icon" />
                  </div>
                  <div className="toolkit__box__content">
                    <h3 id='longcovid'>
                      <div className="toolkit__box__icon toolkit__mobile__icon">
                        <img src={treatment} width="38" height="38" alt="Medical Icon" />
                      </div>
                      <span>LongCovid</span>
                    </h3>
                    <p>
                      Help the National Institutes of Health learn more about long term COVID-19 symptoms and how to treat them.
                    </p>
                    &#8729; <a href="https://recovercovid.org/" rel="noopener">Join a research study near you</a>
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

export default App;
