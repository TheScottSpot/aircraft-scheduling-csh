import React from 'react';

import '../styles/RotationComponent.scss';
import Trash from '../images/trash.png';
import Jets from '../images/jets.png';

function Rotation({rotation, removeFlightFromRotationFunction}) {

    const sortRotation = () => {
        rotation.sort((a, b) => (a.readable_departure > b.readable_departure) ? 1 : -1);
    }

    sortRotation();

    return (
        <div>
            <div className={
                rotation.length   
                    ? 'rotation-flight-container display-none'
                    : 'rotation-start-div display-block'
            }>
                Start by clicking a flight on the right to add it to the rotation!
            </div>
            <div className={
                rotation.length
                    ? 'display-block'
                    : 'rotation-start-div display-none'
            }>
                {rotation &&
                    rotation.map((rotationFlight, index) => {
                        return (
                            <div className="rotation-flight-container" key={index}>
                                <div className="columns">
                                    <div className="column col-11">
                                        <span className="font-weight-bold">Flight: {rotationFlight.id}</span><br />
                                    </div>
                                    <div className="column col-1 text-align-right">
                                        <img className="trash-icon" src={Trash} onClick={() => removeFlightFromRotationFunction(rotationFlight)} alt="Delete flight" />
                                    </div>
                                </div>
                                <div className="columns" style={{marginTop: "10px"}}>
                                    <div className="column col-3">
                                        {rotationFlight.origin}<br />
                                        {rotationFlight.readable_departure}
                                    </div>
                                    <div className="column col-6" style={{textAlign: "center"}}>
                                        <img src={Jets} alt="jets" />
                                    </div>
                                    <div className="column col-3" style={{textAlign: "right"}}>
                                        {rotationFlight.destination}<br />
                                        {rotationFlight.readable_arrival}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default Rotation;