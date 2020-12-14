import './styles/App.scss';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AircraftsComponent from './components/aircrafts';
import DateSwitcherComponent from './components/date-switcher';
import FlightsComponent from './components/flights';
import RotationCompnent from './components/rotation';
import ScheduleMeter from './components/schedule-meter';
import { useAircraftsData, useFlightsData } from './FetchHooks';
import leftArrowBlack from './images/arrow-left-black.png';
import leftArrowGray from './images/arrow-left-gray.png';
import rightArrowBlack from './images/arrow-right-black.png';
import rightArrowGray from './images/arrow-right-gray.png';

import { addFlightToRotation } from  './components/helpers/addFlightToRotation';

function App() {
  const [pageState, setPageState] = useState(0)
  const [leftImgSrc, setLeftImgSrc] = useState(leftArrowGray);
  const [rightImgSrc, setRightImgSrc] = useState(rightArrowBlack);
  const [flightState] = useFlightsData(pageState);
  const [aircraftsState] =  useAircraftsData();
  const [rotationState, setRotationState] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  
  const previousPage = () => {
    if (pageState >= 5) {
      setPageState(pageState - 5);
    }
  }

  const nextPage = () => {
    if (flightState.length >=  5) {
      setPageState(pageState + 5);
    }
  }

  const removeFlightFromRotation = (flight) => {
      console.log("remove is being hit");
      setRotationState([...rotationState.filter(f => f.id !== flight.id)]);
  }


  useEffect(()=> {
    if (flightState) {
      if (pageState < 5) {
        setLeftImgSrc(leftArrowGray);
      }
      else {
        setLeftImgSrc(leftArrowBlack);
      }
      if (flightState.length === 5) {
        setRightImgSrc(rightArrowBlack);
      }
      if (flightState.length < 5) {
        setRightImgSrc(rightArrowGray);
      }
    }
  }, [flightState])

  return (
    <Router>
      <div className="App">
        <DateSwitcherComponent></DateSwitcherComponent>
        <div className="columns main-container">
          <div className="column col-xl-1 col-lg-0"></div>
          <div className="column col-xl-2 col-lg-12">
            <div className="title-label">Aircrafts</div>
            <AircraftsComponent aircrafts = {aircraftsState} flights={flightState} rotation={rotationState}></AircraftsComponent>
          </div>
          <div className="column col-xl-6 col-lg-12">
            <div className="title-label">
              Rotation
            </div>
            <RotationCompnent rotation={rotationState} removeFlightFromRotationFunction={removeFlightFromRotation}></RotationCompnent>
            <ScheduleMeter rotation={rotationState}></ScheduleMeter>
            <div className="error-message">{errorMessage}</div>
          </div>
          <div className="column col-xl-2 col-lg-12">
            <div className="title-label">
              <img className="arrow-left" src={leftImgSrc} onClick={previousPage} alt="left arrow" />
              Flights
              <img className="arrow-right" src={rightImgSrc} onClick={nextPage} alt="right arrow" />
            </div>
            <FlightsComponent flights={flightState} addFlightToRotationFunction={(flight) => addFlightToRotation(flight, rotationState, setErrorMessage, setRotationState)}></FlightsComponent>
          </div>
          <div className="column col-xl-1 col-lg-0"></div>
        </div>
      </div>
    </Router>
  );
}

export default App;
