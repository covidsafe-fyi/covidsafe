import Papa from 'papaparse';
import React from 'react';
import ReactDOM from 'react-dom'
import MapChart from "./MapChart";
import allStates from "./data/allstates.json";
import DoseViewer from './DoseViewer.js'
import DosesGiven from './DosesGiven.js'
import './Medicine.css';
import TrackVisibility from 'react-on-screen';

var stateFilter = null;
var countyFilter = null;
var adjacentCounties = null;
var countiesPerState = null;
var cityFilter = null;
var zipFilter = null;
var providerFilter = null;
var pageLocation = "";
var dataUpdated = null;
var branch = "main";
var baseUri = "https://raw.githubusercontent.com/rrelyea/covid-therapeutics/" + branch + "/";
var dataDate = null;
var currentState = null;
var medicine = null;
var medicineLower = null;
var dosesInBox = null;

function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(function (word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

function toNumber(str) {
  if (str.trim() === "") {
    return "--";
  }
  else
  {
    return parseFloat(str).toFixed(0);
  }
}

function toDate(str) {
  if (str.trim() === "") {
    return "--";
  }
  else
  {
    var dateString = (new Date(str)).toDateString();
    var dateLength = dateString.length;
    return dateString.substring(0, dateLength - 5);
  }
}

function SwapKeyword(url, keyword) {
  return url.replace("KEYWORD", keyword)
}

function navigateTo(state, county) {
  const params = new URLSearchParams(window.location.search);
  if (state !== "USA" && state !== "" && state !== null) { 
    params.set('state', state);
    countiesPerState = null;
  } else if (params.has('state')) {
    params.delete('state');
  }

  if (county !== "< county >" && county !== "" && county !== null) { 
    params.set('county', toTitleCase(county))
  } else if (params.has('county')) {
    params.delete('county');
  }
  
  if (params.has('city')) params.delete('city');
  if (params.has('zip')) params.delete('zip');
  if (params.has('provider')) params.delete('provider');

  var paramsString = params.toString();
  window.history.replaceState({}, null, paramsString.length === 0 ? `${window.location.pathname}` : `${window.location.pathname}?${params.toString()}`);
  renderPage();
}

function renderPage() {
  if (states === null || mabSites === null || testToTreat === null || dosesGivenPerWeek === null) {
    return;
  }

  if (states !== null && dataDate !== null && testToTreat !== null && dosesGivenPerWeek !== null && mabSites0315 === null) {
    load0315Providers();
    return;
  }

  var urlParams = new URLSearchParams(window.location.search);

  stateFilter = urlParams.has('state') ? urlParams.get('state').toUpperCase() : null;
  countyFilter = urlParams.has('county') ? urlParams.get('county').toUpperCase() : null;
  if (stateFilter !== "USA" && countyFilter !== null) {
    adjacentCounties = null;
    Papa.parse(baseUri + "data/counties/adjacency/"+stateFilter+"/"+countyFilter.toLowerCase()+".csv", {
      download: true,
      complete: function(download) {
        adjacentCounties = download.data;
        var neighboringCounties = document.getElementById('neighboringCounties');
        while (neighboringCounties.lastChild) {
          neighboringCounties.lastChild.remove();
        }

        for (var i = 0; i < adjacentCounties.length; i++) {
          var a = document.createElement('a');
          var item = adjacentCounties[i];
          a.href = "?state=" + item[1] + "&county=" + item[0];
          a.innerText = toTitleCase(item[0]) + (item[1] !== stateFilter ? "(" + item[1] + ")" : "");
          if (i > 0) {
            var space = document.createTextNode(" ");
            neighboringCounties.appendChild(space);
          }
          neighboringCounties.appendChild(a);
        }

        if (adjacentCounties.length < 1) {
          var noneStr = document.createTextNode("None");
          neighboringCounties.appendChild(noneStr);
        }
      }
    });
  }

  if (stateFilter !== "USA" && countiesPerState == null) {
    Papa.parse(baseUri + "data/counties/per-state/"+stateFilter+".csv", {
      download: true,
      complete: function(download) {
        countiesPerState = download.data;
        var chooseCounty = document.getElementById('chooseCounty');
        if (chooseCounty != null) {
          while (chooseCounty.lastElementChild) {
            chooseCounty.removeChild(chooseCounty.lastElementChild);
          }
          for (var i = 0; i < countiesPerState.length; i++) {
            var option = document.createElement('option');
            var item = countiesPerState[i];
            option.value = item[0].toUpperCase();
            option.innerText = item[0];
            chooseCounty.appendChild(option);
            if (countyFilter !== null && item[0].toUpperCase() === countyFilter.toUpperCase()) {
              chooseCounty.value = item[0].toUpperCase();
            }
          }
        }
      }
    });
  }

  cityFilter = urlParams.has('city') ? urlParams.get('city').toUpperCase() : null;
  zipFilter = urlParams.has('zip') ? urlParams.get('zip') : null;
  providerFilter = urlParams.has('provider') ? toTitleCase(urlParams.get('provider').replaceAll('-',' ')) : null;
  if (zipFilter == null && providerFilter == null && cityFilter == null && countyFilter == null && stateFilter == null) {
    stateFilter = "USA";
  }
  pageLocation = window.location.hash;

  if (zipFilter !== null && providerFilter !== null) {
    document.title = medicine + " '" + toTitleCase(providerFilter) + "'";
  } else {
    if (stateFilter !== "USA" && countyFilter !== null) document.title = stateFilter + "/" + toTitleCase(countyFilter) + " " + medicine + " Providers in " + toTitleCase(countyFilter) + " County, " + stateFilter
    else if (stateFilter !== "USA" && cityFilter !== null) document.title = stateFilter + "/" + toTitleCase(cityFilter) + " " + medicine + " Providers in " + toTitleCase(cityFilter) + ", " + stateFilter;
    else if (stateFilter !== "USA") document.title = stateFilter + " " + medicine + " Providers in " + stateFilter;
    else if (providerFilter !== null) document.title = medicine + " '" + toTitleCase(providerFilter) + "'"
    else document.title = medicine + " Providers in USA";
  }
  var page = 
    <div>
      <div >
        <NavigationHeader />
        <div>
          <ProviderHeader />
          <HarvestInfo />
          <NationalDetails />
        </div>
        <MedicineNavigator />
        <Footer />
      </div>
    </div>
    
  ReactDOM.render(page, document.getElementById('root'));
}

function NavigationHeader() {
  const mapClick = (e) => {
    var element = e.target;
    var state_code = null;
    if (element.tagName === "text")
    {
      state_code = element.innerHTML;
    }
    else if (element.tagName === "path")
    {
      var parent = element.parentElement;
      var index = Array.from(parent.children).indexOf(element);
      const cur = allStates.find(s => s.index === index);
      state_code = cur.id;
    }

    if(e.ctrlKey) {
      var querystring = state_code === null ? "" : "?state="+state_code;
      var url = window.location.pathname + querystring;
      window.open(url, '_blank');
    } else {
      var chooseState = document.getElementById('chooseState');

      if (state_code !== null) {
        chooseState.value = state_code;
        navigateTo(state_code, null);  
      }
      else
      {
        navigateTo("USA", null);
      }
    }
  }

  const handleDrugChange = (e) => {
    if (e.target.value === "covid-safe") {
      document.location = "/";
    } else if (e.target.value === "trials") {
      document.location = "https://rrelyea.github.io/trials/?qs=Pfizer%20Vaccine:BNT162b2,Moderna%20Vaccine:mRNA-1273,Evusheld:AZD7442,Long-Covid,Paxlovid:nirmatrelvir%20ritonavir,Bebtelovimab,molnupiravir";
    } else {
      document.location = '/'+ e.target.value + window.location.search;
    }
  }

  const handleStateChange = (e) => {
    navigateTo(e.target.value, null);
  }

  const handleCountyChange = (e) => {
    navigateTo(stateFilter, e.target.value);
  }

  var linkToState = stateFilter !== "USA" ? "?state=" + stateFilter : window.location.pathname.split("?")[0];
  return zipFilter === null || providerFilter === null ?
    <>
      <div className='centered'>
        <h3><a href='/'>CovidSafe.fyi</a> &gt; {medicineLower !== 'evusheld' ? <a href='/have-covid'>have covid?</a> : <a href='immunocompromised'>immunocompromised</a> } &gt; <a href={'/'+ medicineLower + window.location.search}>{medicineLower}</a></h3>
        <label className='chooseState' htmlFor='chooseState'>
          <select className='mediumFont' defaultValue={medicineLower} onChange={(e) => handleDrugChange(e)}> 
            <option value='evusheld'>Evusheld</option>
            <option disabled="disabled">----</option>
            <option value='paxlovid'>Paxlovid</option>
            <option value='bebtelovimab'>Bebtelovimab</option>
            <option value='lagevrio'>Molnupiravir</option>
          </select>
          { medicineLower === "lagevrio" ? " (Lagevrio) " : " "}
           providers in:
        </label> <select className='mediumFont' id='chooseState' value={stateFilter != null ? stateFilter.toUpperCase() : ""} onChange={(e) => handleStateChange(e)}>
          {states != null ? states.data.map((state,index) => 
            index > 0 ? <option key={index} value={state[3].trim()}>{state[2].trim() + " (" + state[3].trim() + ")"}</option> : false
          ) : false } 
        </select> { stateFilter !== "USA" ? <> <select className='mediumFont' id='chooseCounty' onChange={(e) => handleCountyChange(e)}>
          </select> { countyFilter !== null ? <a href={linkToState}>(clear)</a> : false }
        </> : false
        }
      </div>
      { cityFilter !== null ? <div className='centered'>City: {toTitleCase(cityFilter)} <a href={linkToState}>(clear)</a> </div> : false }
      { providerFilter !== null ? <div className='centered'>Provider contains '{providerFilter}' <a href={linkToState}>(clear)</a> </div> : false }
      { zipFilter !== null ? <div className='centered'>Zip Code: {zipFilter} </div> : false }
      <div onClick={mapClick} className='mapDiv'>
        <MapChart id='mapChart' />
      </div>
      { medicineLower === "evusheld" ? <div className='centered'>Use: <a href='/evusheld/guide/'>Evusheld Guide</a> for tips and info to get Evusheld<br/></div> : false }
    </>
  : false;
}

function ProviderHeader() {
  return providerFilter !== null & zipFilter !== null ? 
    <>
      <div className='centered'>{medicine} Provider: <b>{toTitleCase(providerFilter)}</b></div>
      <div>&nbsp;</div>
    </> : false;
}

function HarvestInfo() {
  return (stateFilter !== "USA" || zipFilter !== null || providerFilter !== null || cityFilter != null || countyFilter !== null) ?
  <div className='smallerCentered'>
    [<a href={baseUri + "data/therapeutics/"+medicineLower+"/"+medicineLower+"-providers.csv"}>Data</a> harvested from <a href="https://healthdata.gov/Health/COVID-19-Public-Therapeutic-Locator/rxn6-qnx8">healthdata.gov</a>, which last updated: {dataUpdated}. Support: <a href='https://buymeacoffee.com/rrelyea'>coffee</a>, <a href='https://paypal.me/RobRelyea'>paypal</a>, <a href='https://venmo.com/code?user_id=2295481921175552954'>venmo</a>]
  </div>
  : false;
}

function NeighboringCounties() {
  return stateFilter !== "USA" && countyFilter !== null ? <>
    <div className='smallerCentered'>&nbsp;</div>
    <div>
      <span>- Neighboring: </span>
      <span id='neighboringCounties'></span>
    </div>
    </> : false ;
}

function NationalDetails() {
  return <>
    <div className='smallerCentered'>&nbsp;</div>
    { states !== null ? GetNationalDetails(states.data, dataDate !== null ? mabSites0315.data : mabSites.data) : false }
  </>;
}


function GetNationalDetails(states, providers) {
  var providerLists = [];
  var totalsCollection = null;
  currentState = null;
  for (var index = 0; index < states.length; index++) {
    var state = states[index];
    var results = GetStateDetails(state, index, providers);
    if (results) {
      var header = results[0];
      var totals = results[1];
      var providersResults = results[2];
      if (header !== null) { currentState = state; }
      if (totals !== null) { totalsCollection = totals; }
      if (providersResults !== null) { 
        providerLists.push(providersResults);
      }
    }
  }

  var Providers = providerLists;
  var healthDeptTable = currentState !== null ? <>
        <table className='healthDeptTable'>
          <tbody>
            <tr>
            <td>
              <div className='b'>
                  {currentState[2] + " (" + currentState[3] + ")"} Health Department Info
              </div>
              {currentState[5] !== "" ? <div>- <a href={"mailto:"+currentState[5]}>{currentState[5]}</a></div> : false}
              {currentState[6] !== "" ? <div>- {currentState[6]}</div> : false}
              {currentState[4] !== "" ? <div>- <a href={"https://twitter.com/"+currentState[4]}>{'@'+currentState[4]}</a></div> : false}
              {currentState[0] !== "" ? <div>- <a href={"https://"+currentState[0]}>{currentState[0]}</a></div> : false}
              {currentState[8] !== "" ? <div>- <a href={"https://"+currentState[8]}>{currentState[3]} Covid Site</a></div> : false}
              {currentState[7] !== "" ? <div>- Search for "{medicineLower}" term: <a href={'https://'+SwapKeyword(currentState[7], medicine)}>results</a></div> : false}

              { currentState[3] !== "USA" ?
              <>
                <div className='b'>{totalsCollection.totalType}</div>
                <div> - Providers: {Number(totalsCollection.providerCount).toLocaleString('en-US')}</div>
                <div> - Available Doses: {Number(totalsCollection.availableTotal).toLocaleString('en-US')}</div>
                {medicineLower!=="evusheld" && totalsCollection.show100kStats ? <div className='lm10'> - per 100k: {Number(totalsCollection.availableTotal/totalsCollection.pop100Ks).toFixed(0).toLocaleString('en-US')}</div> : false }
                <NeighboringCounties />
                <div>&nbsp;</div>
              </> : false }
            </td>
            <td>
              <DosesGiven medicine={medicine} stateCode={currentState[3]} dosesGivenPerWeek={dosesGivenPerWeek} totals={totals} />
            </td>
            </tr>
          </tbody>
        </table>
      </> : false;
  if (totals !== null && totals.providerCount === 0) {
    if (currentState != null && currentState[3] === "USA") {
      Providers = [<tr><td colSpan='3'>Choose a State to see Providers</td></tr>];
    } else {
      Providers = [<tr><td colSpan='3'>No Providers Found in this Location</td></tr>];
    }
  }

  return (healthDeptTable != null || Providers != null ?
      <>
        {healthDeptTable}
        <div className='smallerCentered'>&nbsp;</div>
        <table className='providerTable'>
          { currentState == null || (currentState !== null && currentState[3] !== "USA") ?
          <thead>
            <tr key='header'>
              <th>&nbsp;State - County - City&nbsp;</th>
              <th>Provider</th>
              <th>Doses</th>
            </tr>
          </thead> : false }
          <tbody>
            {Providers}
          </tbody>
        </table>
      </> : false);
}


const supportAd = <tr>
  <td className='tdAd' colSpan='2'><b>SUPPORT</b>: Please enable <a href='https://www.geekwire.com/2022/after-wife-got-cancer-microsoft-engineer-built-a-tool-to-locate-anti-covid-drug-for-immunocompromised/'>me</a> to provide this helpful info to you (ad free) by giving a small donation:</td>
  <td className='tdAd'>
  <b>Sponsor via</b> <a href='https://buymeacoffee.com/rrelyea'>buymeacoffee.com</a>, <a href='https://paypal.me/RobRelyea'>paypal</a>, or <a href='https://venmo.com/code?user_id=2295481921175552954'>venmo</a>
  </td>
  </tr>;

function GetStateDetails(state, index, providers) {
  if (state[3].trim() === "") return null;

  var availableTotal = 0;
  var providerCountTotals = 0;
  var firstLink = 0;

  var state_code = state[3] !== null ? state[3].trim() : state[3];

  var lastCity = "";
  var lastCounty = "";
  var lastState = "";
  var lastCityStyle = null;
  var cityMarkup = null;

  if (stateFilter !== null && stateFilter !== state_code) return false;

  var filteredProviders = providers.filter((provider) => provider[5] === state_code && 
  ((stateFilter === null || stateFilter === state_code) 
  && (zipFilter === null || zipFilter === provider[6].substring(0,5))
  && (countyFilter === null || countyFilter === provider[4].toUpperCase())
  && (cityFilter === null || cityFilter === provider[3].toUpperCase()))
        );

  var providerList = filteredProviders.map((provider, index) => {
    // ignore blank lines in provider file
    if (provider.length === 1) 
    {
      return false;
    }

    var county = provider[4];
    var city = provider[3];

    var provider_x = toTitleCase(provider[0].replaceAll('-',' '));
    if (providerFilter === null || provider_x.includes(providerFilter)) {
      // use encodeURIComponent for "#"
      var linkToProvider = "?provider=" + encodeURIComponent(provider_x.replaceAll(' ', '-')) + "&zip=" + provider[6].substring(0,5);
      var linkToState = "?state=" + state_code;
      var zipCode = provider[6].substring(0,5);
      var linkToCounty = linkToState + "&county=" + county;
      var linkToCity = linkToState + "&city=" + city;
      var firstRowOfCity = lastCity !== toTitleCase(city) || lastCounty !== county || lastState !== state_code;
      if (firstRowOfCity) {
        lastCity = toTitleCase(city); 
        lastState = state_code;
        lastCounty = county;
        cityMarkup = 
        <div className='countyCity'>
          <a href={linkToState}>{state_code}</a><br/>
          <a href={linkToCounty}>{toTitleCase(county)}</a><br/>
          <a href={linkToCity}>{toTitleCase(city)}</a>
        </div>;
        lastCityStyle = lastCityStyle === "odd" ? "even" : "odd";
      } else {
        cityMarkup = null;
      }

      var availableColNum = dataDate !== null ? 12 : 9;
      var available = toNumber(provider[availableColNum]);

      var npiColNum = dataDate !== null ? 15 : 11;
      var geocodeNum = 10;
      var geoCode = provider[geocodeNum];
      var testToTreatData = geoCode in testToTreat ? testToTreat[geoCode] : null;
      var npi = provider[npiColNum].trim() === "" ? "" : "NPI# " + parseInt(provider[npiColNum]);
      availableTotal += available === "--" ? 0 : parseInt(available);
      providerCountTotals += 1;

      var reportDateColNum = dataDate !== null ? 13 : 12;
      var testToTreatSection = null;
      if (testToTreatData !== null) {
        testToTreatSection = <>
          {testToTreatData[7] !== "" || testToTreat[8] !== null ? 
          <div>TestToTreat <a href={testToTreatData[7]}>link</a> <span>{testToTreatData[8]}</span>
          </div> : false }
        </>
      }
      
      var placeSupportAd = Math.floor(Math.random() * 33) === 0;

      return <>
        <tr key={index} className={lastCityStyle}>
          <td>
            {cityMarkup}
          </td>
          <td className='tdProvider'>
            <div className='mediumFont'><a href={linkToProvider}>{provider_x}</a></div>
            <div>{toTitleCase(provider[1])}</div>
            { testToTreatSection }
            { zipFilter !== null && providerFilter !== null ? 
              <>
              <div>{toTitleCase(provider[2])}</div>
              <div>{provider[6]}</div>
              <div>{npi}</div>
              </>
              : false }
            <div className='tinyFont'>&nbsp;</div>
          </td>
          <td className='tdChart'>
            { zipFilter !== null && providerFilter !== null ? (<>
              <div><span className='doseCount'>{available}</span> <span className='doseLabel'> avail @{toDate(provider[reportDateColNum])}</span></div>
              <div className='tinyFont'>&nbsp;</div>
            </>) :
            <>
            <a href={linkToProvider}>
              <TrackVisibility partialVisibility offset={1000}>
                {({ isVisible }) =>  isVisible && <DoseViewer medicine={medicine} dosesInBox={dosesInBox} zipCode={zipCode} provider={provider_x} mini='true' available={available} state={state_code}
                    site={medicineLower} dataDate={dataDate} popUpdate={provider[reportDateColNum].substring(5,10)} />
                }
              </TrackVisibility>
            </a>
            </>}
          </td>
        </tr>
        {zipFilter !== null && providerFilter !== null && pageLocation==="" ?
          <tr key={index} className={lastCityStyle}>
            <td colSpan='3'>
              <DoseViewer medicine={medicine} dosesInBox={dosesInBox} zipCode={zipFilter} provider={provider_x} available={available} site={medicineLower} dataDate={dataDate} popUpdate={provider[reportDateColNum].substring(5,10)} />
            </td>
          </tr>
          :false
        }
        {zipFilter !== null && providerFilter !== null && pageLocation!=="" && medicine === "Evusheld" ?
          <tr key={index} className={lastCityStyle}>
            <td colSpan='3'>
              <DoseViewer medicine={medicine} dosesInBox={dosesInBox} zipCode={zipFilter} provider={provider_x} />
            </td>
          </tr>
          :false
        }
        {placeSupportAd ? supportAd : false}
      </>
    } else {
      return false;
    }
  });

  var header = state_code === stateFilter && state.length > 1 && state[2] != null && state[2].trim() !== "state" ?
  <tr key={index}>
    <td className='infoLabels'>
      {state[2]} Health Dept:
    </td>
    <td className='stateInfo' colSpan='2'>
    <span>{state[7] !== "" ? <span>{firstLink++ === 0?"":"|"} <a href={'https://'+SwapKeyword(state[7], medicine)}>{"'" + medicine + "' search"}</a></span> : false }</span>
      <span>{state[8] !== ""? <span>&nbsp;{firstLink++ === 0?"":"|"} <a href={'https://'+state[8]}>Covid Info</a></span> : false }</span>
      <span>{state[0] !== "" ? <span>&nbsp;{firstLink++ === 0?"":"|"} <a href={"https://"+state[0]}>{state[0]}</a></span> : false }</span>
      <span>{state[5] !== "" ? <span><span> | </span><a href={"mailto:"+state[5]}>{state[5]}</a></span> : ""}</span>  
      <span>{state[6] !== "" ? " | " + state[6] : ""}</span> 
      <span>{state[4] !== "" ? <span> | <a href={"https://twitter.com/"+state[4]}>{'@'+state[4]}</a></span> : false } </span> 
    </td>
  </tr>
  : null;

  var totals = {
      "totalType" : cityFilter !== null ? toTitleCase(cityFilter): (countyFilter !== null? toTitleCase(countyFilter) + " County":(zipFilter!=null?"Zip":(stateFilter !== "USA" ? state[3] + " State":""))),
      "providerCount" : providerCountTotals,
      "availableTotal" : availableTotal,
      "icAdults" : (state[11]*.027*.779).toFixed(0),
      "pop" : state[11],
      "pop100Ks" : state[11] / 100000,
      "show100kStats" : stateFilter !== "USA" && countyFilter === null && cityFilter === null && zipFilter === null && providerFilter === null
  }

  if (header != null || (totals != null && totals.providerCount !== 0) || providerList.length !== 0) {
      providerList.push(supportAd); // place support ad to tail end of providers
    return [header, totals, providerList];
  } else {
    return false;
  }
}

function MedicineNavigator() {
  return zipFilter === null && providerFilter === null ?
    <>
    <div className='smallerCentered'>&nbsp;</div>
    <div className='smallerCentered'>
        <b>Stay Covid-Safe:</b> <a href='https://rrelyea.github.io/covid-safe'>info about preventive medicines, protective measures, and treatments</a>
    </div>
    </>
    : false;
}

function Footer() {
  return <>
    <div className='smallerFont'>&nbsp;</div>
    <div className='smallerCentered'>
      <b>Why I built this site:</b> <a href='https://www.geekwire.com/2022/after-wife-got-cancer-microsoft-engineer-built-a-tool-to-locate-anti-covid-drug-for-immunocompromised/'>geekwire</a>, <a href='https://cnn.com/2022/04/13/opinions/evusheld-immunocompromised-covid-19-equity-relyea/index.html'>CNN op-ed</a> <b>Contact Info:</b> <a href='https://twitter.com/rrelyea'>twitter</a>, <a href='https://linktr.ee/rrelyea'>email/more</a> <b>Sponsor site:</b> <a href='https://buymeacoffee.com/rrelyea'>coffee</a>, <a href='https://paypal.me/RobRelyea'>paypal</a>, <a href='https://venmo.com/code?user_id=2295481921175552954'>venmo</a> <b>Programmers:</b> <a href="https://github.com/covidsafe-fyi/covidsafe">/covidsafe</a>, <a href="https://github.com/rrelyea/covid-therapeutics">/covid-therapeutics</a>
    </div>
    <div className='smallerCentered'>&nbsp;</div>
  </>;
}
var mabSites0315 = null;
var mabSites = null;
var states = null;
var testToTreat = null;
var dosesGivenPerWeek = null;

function load0315Providers() {
  var providers0315 = baseUri + "data/therapeutics/2022-03-15-Snapshot/"+medicineLower+"-data.csv"
  Papa.parse(providers0315, {
    download: true,
    complete: function(mabResults) {
      mabSites0315 = mabResults;
      renderPage();
    }
  });
}

function loadData() {
  var currentProviders = baseUri + "data/therapeutics/"+medicineLower+"/"+medicineLower+"-providers.csv"
  Papa.parse(currentProviders, {
    download: true,
    complete: function(mabResults) {
      mabSites = mabResults;
      renderPage();
    }
  });

  var currentTime = new Date();
  var urlSuffix = currentTime.getMinutes() + "-" + currentTime.getSeconds();
  Papa.parse(baseUri + "data/states/state-health-info.csv?"+urlSuffix, {
    download: true,
    complete: function(stateResults) {
      states = stateResults;
      renderPage();
    }
  });

  Papa.parse(baseUri + "data/therapeutics/process-dates.csv", {
    download: true,
    complete: function(lastProcessedData) {
      // parse date as UTC, but it is really eastern time, so add 5 hours to have correct UTC time.
      var dataUpdatedDate = new Date(lastProcessedData.data[0][0] + 'Z');
      dataUpdatedDate.setHours(dataUpdatedDate.getHours() + 5);

      // create string with local time/date
      dataUpdated = dataUpdatedDate.toLocaleString('en-US', {weekday: 'short', month: 'numeric', day:'numeric', hour:'numeric', minute:'numeric', timeZoneName: 'short' });
      renderPage();
    }
  });

  Papa.parse(baseUri + "data/therapeutics/"+medicineLower+"/doses-given-per-week.csv", {
    download: true,
    complete: function(results) {
      dosesGivenPerWeek = results.data;
      renderPage();
    }
  });

  if (medicineLower === "paxlovid") {
    testToTreat = {};
    Papa.parse(baseUri + "data/therapeutics/testToTreat/testToTreat-providers.csv", {
      download: true,
      complete: function(testToTreatResults) {
        testToTreatResults.data.forEach((provider)=> {
          testToTreat[provider[9]] = provider;
        });
        renderPage();
      }
    });
  } else {
    testToTreat = {};
  }

}

function Medicine(props) {
  medicine = props.type;
  medicineLower = props.typeLower;
  dosesInBox = props.dosesInBox;

  loadData();
  return (
    <div className="Medicine">
    </div>
  );
}

export default Medicine;