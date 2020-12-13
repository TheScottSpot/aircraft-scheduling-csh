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

// TODO add proptypes if you have enough time
// TODO do another code review before submission for clean ups
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

  const addFlightToRotation = (flight) => {
    let okayToAdd = true;
    //check to see if the flight is already in the rotation
    for (var i = 0; i < rotationState.length; i++) {
      if (rotationState[i].id === flight.id) {
        okayToAdd = false;
        setErrorMessage("You can't add the same flight twice!");
      }
    }
    if (okayToAdd === true) {
      //check to see if two flights are going at the same time
      for (i = 0; i < rotationState.length; i++) {
        if (flight.departuretime <= (rotationState[i].arrivaltime + 1200) &&
          (flight.arrivaltime >= (rotationState[i].departuretime - 1200))) {
            okayToAdd = false;
            setErrorMessage("That flight takes off or departs while another flight you've selected is already in the air.")
        }
      }
      if (okayToAdd === true) {
        //check to see if flight is in the air at midnight
        for (i = 0; i < rotationState.length; i++) {
          if ((flight.departuretime < 86400) && (flight.arrivalTime > 86400)) {
            okayToAdd = false;
            setErrorMessage("Flights can not be in the air at midnight.");
          }
        }
        if (okayToAdd === true) {
          //check to see if the closest departure to the arrival time is at the same airport
          let closestArrivalTime = 86401;
          let closestArrivalID = "";
          for (i = 0; i < rotationState.length; i++) {
            if ((flight.departuretime - rotationState[i].arrivaltime) < closestArrivalTime) {
              closestArrivalTime = rotationState[i].arrivaltime;
              closestArrivalID = rotationState[i].id;
            }
          }
          for (i = 0; i < rotationState.length; i++) {
            if (closestArrivalID === rotationState[i].id) {
              if (rotationState[i].destination !== flight.origin) {
                okayToAdd = false;
                setErrorMessage("The flight with the closest arrival time to the selected flight's departure does not have the same airport.");
              }
            }
          }
        }
      }
    }
    //final add logic
    if (okayToAdd === true) {
      setErrorMessage("");
      setRotationState([...rotationState, flight]);
      rotationState.sort((a, b) => (a.readable_departure > b.readable_departure) ? 1 : -1);
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
            <FlightsComponent flights={flightState} addFlightToRotationFunction={addFlightToRotation}></FlightsComponent>
          </div>
          <div className="column col-xl-1 col-lg-0"></div>
        </div>
      </div>
    </Router>
  );
}

export default App;
