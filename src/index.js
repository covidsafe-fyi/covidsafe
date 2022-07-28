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
import EvusheldOrder from './EvusheldOrder';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path='/' element={< App />}></Route>
        <Route exact path='/vaccine-time' element={< VaccineTime />}></Route>
        <Route exact path='/evusheld' element={<Medicine typeLower='evusheld' type='Evusheld' dosesInBox='24' />}></Route>
        <Route exact path='/evusheld/order' element={<EvusheldOrder />}></Route>
        <Route exact path='/paxlovid' element={<Medicine typeLower='paxlovid' type='Paxlovid' dosesInBox='20' />}></Route>
        <Route exact path='/bebtelovimab' element={<Medicine typeLower='bebtelovimab' type='Bebtelovimab' dosesInBox='5' />}></Route>
        <Route exact path='/sotrovimab' element={<Medicine typeLower='sotrovimab' type='Sotrovimab' dosesInBox='5' status='Sotrovimab is no longer effective against current Covid variants, so please use current treatments, such as: Paxlovid, Bebtelovimab, Lagevrio'/>}></Route>
        <Route exact path='/lagevrio' element={<Medicine typeLower='lagevrio' type='Lagevrio (molnupiravir)' dosesInBox='24' />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
