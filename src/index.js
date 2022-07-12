import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';
import VaccineTime from './vaccine-time/VaccineTime';
import Medicine from './medicine/Medicine';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path='/' element={< App />}></Route>
        <Route exact path='/vaccines' element={< App bookmark='vaccines'  />}></Route>
        <Route exact path='/immunocompromised' element={< App bookmark='immunocompromised'  />}></Route>
        <Route exact path='/have-covid' element={< App bookmark='have-covid'  />}></Route>
        <Route exact path='/vaccine-time' element={< VaccineTime />}></Route>
        <Route exact path='/evusheld' element={ <Medicine typeLower='evusheld' type='Evusheld' dosesInBox='24' />}></Route>
        <Route exact path='/paxlovid' element={ <Medicine typeLower='paxlovid' type='Paxlovid' dosesInBox='20' />}></Route>
        <Route exact path='/bebtelovimab' element={ <Medicine typeLower='bebtelovimab' type='Bebtelovimab' dosesInBox='5' />}></Route>
        <Route exact path='/sotrovimab' element={ <Medicine typeLower='sotrovimab' type='Sotrovimab' dosesInBox='5'/>}></Route>
        <Route exact path='/lagevrio' element={ <Medicine typeLower='lagevrio' type='Lagevrio (molnupiravir)' dosesInBox='24' />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
