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

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path='/' element={< App />}></Route>
        <Route exact path='/vaccines' element={< App bookmark='vaccines'  />}></Route>
        <Route exact path='/vaccine-time' element={< VaccineTime />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
