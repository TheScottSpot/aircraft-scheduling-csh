export function addFlightToRotation(flight, rotationState, setErrorMessage, setRotationState) {
    let okayToAdd = true;
    //check to see if the flight is already in the rotation
    for (var i = 0; i < rotationState.length; i++) {
      if (rotationState[i].id === flight.id) {
        okayToAdd = false;
        setErrorMessage("You can't add the same flight twice!");
      }
    }
    if (okayToAdd) {
      //check to see if two flights are going at the same time
      for (i = 0; i < rotationState.length; i++) {
        if (flight.departuretime <= (rotationState[i].arrivaltime + 1200) &&
          (flight.arrivaltime >= (rotationState[i].departuretime - 1200))) {
            okayToAdd = false;
            setErrorMessage("That flight takes off or departs while another flight you've selected is already in the air.")
        }
      }
      if (okayToAdd) {
        //check to see if flight is in the air at midnight
        for (i = 0; i < rotationState.length; i++) {
          if ((flight.departuretime < 86400) && (flight.arrivalTime > 86400)) {
            okayToAdd = false;
            setErrorMessage("Flights can not be in the air at midnight.");
          }
        }
        if (okayToAdd) {
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
    if (okayToAdd) {
      setErrorMessage("");
      setRotationState([...rotationState, flight]);
      rotationState.sort((a, b) => (a.readable_departure > b.readable_departure) ? 1 : -1);
    }
  }