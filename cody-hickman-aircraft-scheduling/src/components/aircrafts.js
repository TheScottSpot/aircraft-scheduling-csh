import React from 'react';

import '../styles/AircraftsComponent.scss';

function Aircrafts({aircrafts, flights, rotation}) {

    let utilization = "0";
    const setUtilization = () => {
        let totalTime = 86400;
        if (rotation) {
            for (var i = 0; i < rotation.length; i++) {
                totalTime -= (parseInt(rotation[i].arrivaltime) - parseInt(rotation[i].departuretime))
            }
            utilization = 100 - (parseInt((totalTime / 86400) * 100));
        }
    }

    setUtilization();

    return (
        <div className="aircrafts-container">
            {aircrafts &&
                aircrafts.map((aircraft, index) => {
                    return (
                        <div className="aircraft-div" key={index}>
                            <div className="aircraft-inner-div">
                                <span className="aircraft-id">{aircraft.type}</span><br />
                                ({utilization}%)
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default Aircrafts;